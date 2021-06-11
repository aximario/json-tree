export interface ConstructOptions {
  // node's id name prop
  id?: string;
  // node's parent id prop
  pid?: string;
  // node's children prop
  children?: string;
}

export enum DestructOptionsMode {
  all = 'all',
  leaf = 'leaf',
  branch = 'branch',
  nonleaf = 'nonleaf',
  root = 'root'
}

export interface DestructOptions extends ConstructOptions {
  // destruct mode
  mode?: DestructOptionsMode
}

export enum NodeType {
  root = 'root',
  branch = 'branch',
  leaf = 'leaf'
}
