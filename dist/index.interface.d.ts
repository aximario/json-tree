export interface ConstructOptions {
    id?: string;
    pid?: string;
    children?: string;
}
export declare enum DestructOptionsMode {
    all = "all",
    leaf = "leaf",
    branch = "branch",
    nonleaf = "nonleaf",
    root = "root"
}
export interface DestructOptions extends ConstructOptions {
    mode?: DestructOptionsMode;
}
export declare enum NodeType {
    root = "root",
    branch = "branch",
    leaf = "leaf"
}
