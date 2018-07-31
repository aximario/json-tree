"use strict";
module.exports = function (data, config) {
    var id = config.id || 'id';
    var pid = config.pid || 'pid';
    var children = config.children || 'children';
    var idMap = {};
    var jsonTree = [];
    data.forEach(function (v) {
        idMap[v[id]] = v;
    });
    data.forEach(function (v) {
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
};
