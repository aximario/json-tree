import {
  ConstructOptions,
  DestructOptions,
  DestructOptionsMode,
  NodeType,
} from './index.interface'

/**
 * According to the configured props id and pid and children
 * build each node into one or more trees
 */
export function construct(nodes: any[], config?: ConstructOptions) {
  const id = (config && config.id) || 'id'
  const pid = (config && config.pid) || 'pid'
  const children = (config && config.children) || 'children'

  const idMap: any = {}
  const jsonTree: any[] = []

  nodes.forEach(v => {
    v && v[id] && (idMap[v[id]] = v)
  })
  nodes.forEach(v => {
    if (v && v[id]) {
      let parent = idMap[v[pid]]
      if (parent) {
        !parent[children] && (parent[children] = [])
        parent[children].push(v)
      } else {
        jsonTree.push(v)
      }
    }
  })

  return jsonTree
}

/**
 * According to the configured id and pid split the tree into nodes
 */
export function destruct(forest: object[] | object, config?: DestructOptions) {
  const id = (config && config.id) || 'id'
  const pid = (config && config.pid) || 'pid'
  const children = (config && config.children) || 'children'
  const mode = (config && config.mode) || DestructOptionsMode.all

  function flatTree(tree: object) {
    const queue = [tree]
    const result = []
    while (queue.length > 0) {
      let currentNode: any = queue.shift()
      if (currentNode.hasOwnProperty(id)) {
        let type = NodeType.leaf
        if (currentNode.hasOwnProperty(pid) && Boolean(currentNode[pid])) {
          if (currentNode[children] && currentNode[children].length) {
            type = NodeType.branch
          }
        } else {
          type = NodeType.root
        }
        if (type === NodeType.root) {
          currentNode = { ...currentNode, [pid]: null }
        }
        if (type === NodeType.root || type === NodeType.branch) {
          if (currentNode[children]) {
            currentNode[children].forEach((v: any) => {
              v && queue.push({ ...v, [pid]: currentNode[id] })
            })
          }
        }
        delete currentNode[children]
        if (mode === DestructOptionsMode.all) {
          result.push(currentNode)
        }
        if (mode === DestructOptionsMode.branch && type === NodeType.branch) {
          result.push(currentNode)
        }
        if (mode === DestructOptionsMode.leaf && type === NodeType.leaf) {
          result.push(currentNode)
        }
        if (
          mode === DestructOptionsMode.nonleaf &&
          (type === NodeType.root || type === NodeType.branch)
        ) {
          result.push(currentNode)
        }
        if (mode === DestructOptionsMode.root && type === NodeType.root) {
          result.push(currentNode)
        }
      }
    }
    return result
  }

  if (Array.isArray(forest)) {
    return forest.map(v => flatTree(v)).reduce((pre, cur) => pre.concat(cur))
  } else {
    return flatTree(forest)
  }
}

export default {
  construct,
  destruct,
}
