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

function bfs(tree: object, id: string, pid: string, children: string, operation: (node: object) => void) {
	const queue = [tree];
	while (queue.length) {
		let currentNode = queue.shift();
		if (currentNode.hasOwnProperty(id)) {
			if (!currentNode.hasOwnProperty(pid)) {
				currentNode = { ...currentNode, [pid]: null };
			}
			operation(currentNode);
			if (currentNode[children]) {
				currentNode[children].forEach((v) => queue.push({ ...v, [pid]: currentNode[id] }));
			}
		} else {
			throw new Error('you need to specify the [id] of the json tree')
		}
	}
}

export function destruct(forest: object[], config?: Config) {
	const id = config && config.id || 'id';
	const pid = config && config.pid || 'pid';
	const children = config && config.children || 'children';

	const nodes = [];

	forest.forEach((v) => {
		bfs(v, id, pid, children, (value) => { nodes.push(value) });
	});
	return nodes.map(v => { delete v[children]; return v });
}

export default {
	construct,
	destruct,
}
