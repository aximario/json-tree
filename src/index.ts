interface Config {
	id?: string;
	pid?: string;
	children?: string;
}

export function construct(nodes: object[], config?: Config) {
	const id = config && config.id || 'id';
	const pid = config && config.pid || 'pid';
	const children = config && config.children || 'children';

	const idMap = {};
	const jsonTree = [];

	nodes.forEach((v) => { idMap[v[id]] = v; });
	nodes.forEach((v) => {
		let parent = idMap[v[pid]];
		if (parent) {
			!parent[children] && (parent[children] = []);
			parent[children].push(v);
		} else {
			jsonTree.push(v);
		}
	});

	return jsonTree;
};

function bfs(tree: object, children: string, operation: (node: object) => void) {
	let queue = [tree];
	while (queue.length) {
		const currentNode = queue.shift();
		operation(currentNode);
		if (currentNode[children]) {
			currentNode[children].forEach((v) => queue.push(v));
		}
	}
}

export function destruct(forest: object[], children?: string) {
	const kids = children || 'children';

	const nodes = [];

	forest.forEach((v) => {
		bfs(v, kids, (value) => { nodes.push(value) });
	});
	return nodes.map(v => { delete v[children]; return v });
}

export default {
	construct,
	destruct,
}
