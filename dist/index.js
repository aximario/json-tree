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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destruct = exports.construct = void 0;
var index_interface_1 = require("./index.interface");
function construct(nodes, config) {
    var id = (config && config.id) || 'id';
    var pid = (config && config.pid) || 'pid';
    var children = (config && config.children) || 'children';
    var idMap = {};
    var jsonTree = [];
    nodes.forEach(function (v) {
        v && v[id] && (idMap[v[id]] = v);
    });
    nodes.forEach(function (v) {
        if (v && v[id]) {
            var parent_1 = idMap[v[pid]];
            if (parent_1) {
                !parent_1[children] && (parent_1[children] = []);
                parent_1[children].push(v);
            }
            else {
                jsonTree.push(v);
            }
        }
    });
    return jsonTree;
}
exports.construct = construct;
function destruct(forest, config) {
    var id = (config && config.id) || 'id';
    var pid = (config && config.pid) || 'pid';
    var children = (config && config.children) || 'children';
    var mode = (config && config.mode) || index_interface_1.DestructOptionsMode.all;
    function flatTree(tree) {
        var queue = [tree];
        var result = [];
        var _loop_1 = function () {
            var _a;
            var currentNode = queue.shift();
            if (currentNode.hasOwnProperty(id)) {
                var type = index_interface_1.NodeType.leaf;
                if (currentNode.hasOwnProperty(pid) && Boolean(currentNode[pid])) {
                    if (currentNode[children] && currentNode[children].length) {
                        type = index_interface_1.NodeType.branch;
                    }
                }
                else {
                    type = index_interface_1.NodeType.root;
                }
                if (type === index_interface_1.NodeType.root) {
                    currentNode = __assign(__assign({}, currentNode), (_a = {}, _a[pid] = null, _a));
                }
                if (type === index_interface_1.NodeType.root || type === index_interface_1.NodeType.branch) {
                    if (Array.isArray(currentNode[children]) && currentNode[children].length > 0) {
                        currentNode[children].forEach(function (v) {
                            var _a;
                            v && queue.push(__assign(__assign({}, v), (_a = {}, _a[pid] = currentNode[id], _a)));
                        });
                    }
                }
                delete currentNode[children];
                if (mode === index_interface_1.DestructOptionsMode.all) {
                    result.push(currentNode);
                }
                if (mode === index_interface_1.DestructOptionsMode.branch && type === index_interface_1.NodeType.branch) {
                    result.push(currentNode);
                }
                if (mode === index_interface_1.DestructOptionsMode.leaf && type === index_interface_1.NodeType.leaf) {
                    result.push(currentNode);
                }
                if (mode === index_interface_1.DestructOptionsMode.nonleaf &&
                    (type === index_interface_1.NodeType.root || type === index_interface_1.NodeType.branch)) {
                    result.push(currentNode);
                }
                if (mode === index_interface_1.DestructOptionsMode.root && type === index_interface_1.NodeType.root) {
                    result.push(currentNode);
                }
            }
        };
        while (queue.length > 0) {
            _loop_1();
        }
        return result;
    }
    if (Array.isArray(forest)) {
        return forest.map(function (v) { return flatTree(v); }).reduce(function (pre, cur) { return pre.concat(cur); }, []);
    }
    else {
        return flatTree(forest);
    }
}
exports.destruct = destruct;
exports.default = {
    construct: construct,
    destruct: destruct,
};
