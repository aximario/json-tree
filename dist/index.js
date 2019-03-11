"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
function bfs(tree, id, pid, children, operation) {
    var queue = [tree];
    var _loop_1 = function () {
        var _a;
        var currentNode = queue.shift();
        if (currentNode.hasOwnProperty(id)) {
            if (!currentNode.hasOwnProperty(pid)) {
                currentNode = __assign({}, currentNode, (_a = {}, _a[pid] = null, _a));
            }
            operation(currentNode);
            if (currentNode[children]) {
                currentNode[children].forEach(function (v) {
                    var _a;
                    return queue.push(__assign({}, v, (_a = {}, _a[pid] = currentNode[id], _a)));
                });
            }
        }
        else {
            throw new Error('you need to specify the [id] of the json tree');
        }
    };
    while (queue.length) {
        _loop_1();
    }
}
function destruct(forest, config) {
    var id = config && config.id || 'id';
    var pid = config && config.pid || 'pid';
    var children = config && config.children || 'children';
    var nodes = [];
    forest.forEach(function (v) {
        bfs(v, id, pid, children, function (value) { nodes.push(value); });
    });
    return nodes.map(function (v) { delete v[children]; return v; });
}
exports.destruct = destruct;
exports["default"] = {
    construct: construct,
    destruct: destruct
};
