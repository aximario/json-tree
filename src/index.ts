interface Config {
	id?: string;
	pid?: string;
	children?: string;
}

/**
 * constrcut 方法
 * 根据提供的 id, pid 和 children 将一个个节点构建成一棵或者多棵树
 * @param nodes 节点对象
 * @param config 配置对象
 */
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

/**
 * destruct 方法
 * 根据配置的 id, pid 和 children 把解构化的树型对象拆解为一个个节点
 * @param forest 单个或者多个树型对象
 * @param config 配置
 */
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
