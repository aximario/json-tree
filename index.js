const jsonTree = function (data, config) {
	let id = config.id || 'id',
		pid = config.pid || 'pid',
		children = config.children || 'children';

	let idMap = [],
		jsonTree = [];

	data.forEach(v => {
		idMap[v[id]] = v;
	});

	data.forEach(v => {
		let parent = idMap[v[pid]];
		if(parent) {
			!parent[children] && (parent[children] = []);
			parent[children].push(v);
		} else {
			jsonTree.push(v);
		}
	});

	return {data: jsonTree};
};

module.exports = jsonTree;
