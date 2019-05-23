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
/**
 * constrcut 方法
 * 根据提供的 id, pid 和 children 将一个个节点构建成一棵或者多棵树
 * @param nodes 节点对象
 * @param config 配置对象
 */
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
/**
 * destruct 方法
 * 根据配置的 id, pid 和 children 把解构化的树型对象拆解为一个个节点
 * @param forest 单个或者多个树型对象
 * @param config 配置
 */
function destruct(forest, config) {
    var id = config && config.id || 'id';
    var pid = config && config.pid || 'pid';
    var children = config && config.children || 'children';
    function flatTree(tree) {
        var queue = [tree];
        var result = [];
        var _loop_1 = function () {
            var _a;
            var currentNode = queue.shift();
            if (currentNode.hasOwnProperty(id)) {
                if (!currentNode.hasOwnProperty(pid)) {
                    currentNode = __assign({}, currentNode, (_a = {}, _a[pid] = null, _a));
                }
                if (currentNode[children]) {
                    currentNode[children].forEach(function (v) {
                        var _a;
                        return queue.push(__assign({}, v, (_a = {}, _a[pid] = currentNode[id], _a)));
                    });
                }
                result.push(currentNode);
                delete currentNode[children];
            }
            else {
                throw new Error('you need to specify the [id] of the json tree');
            }
        };
        while (queue.length) {
            _loop_1();
        }
        return result;
    }
    if (Array.isArray(forest)) {
        return forest.map(function (v) { return flatTree(v); }).reduce(function (pre, cur) { return pre.concat(cur); });
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
