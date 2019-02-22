"use strict";
exports.__esModule = true;
function construct(nodes, config) {
    var id = config && config.id || 'id';
    var pid = config && config.pid || 'pid';
    var children = config && config.children || 'children';
    var idMap = {};
    var jsonTree = [];
    nodes.forEach(function (v) { idMap[v[id]] = v; });
    nodes.forEach(function (v) {
        var parent = idMap[v[pid]];
        if (parent) {
            !parent[children] && (parent[children] = []);
            parent[children].push(v);
        }
        else {
            jsonTree.push(v);
        }
    });
    return jsonTree;
}
exports.construct = construct;
;
function bfs(tree, children, operation) {
    var queue = [tree];
    while (queue.length) {
        var currentNode = queue.shift();
        operation(currentNode);
        if (currentNode[children]) {
            currentNode[children].forEach(function (v) { return queue.push(v); });
        }
    }
}
function destruct(forest, children) {
    var kids = children || 'children';
    var nodes = [];
    forest.forEach(function (v) {
        bfs(v, kids, function (value) { nodes.push(value); });
    });
    return nodes.map(function (v) { delete v[children]; return v; });
}
exports.destruct = destruct;
exports["default"] = {
    construct: construct,
    destruct: destruct
};
