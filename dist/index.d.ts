import { ConstructOptions, DestructOptions } from './index.interface';
export declare function construct(nodes: any[], config?: ConstructOptions): any[];
export declare function destruct(forest: object[] | object, config?: DestructOptions): any[];
declare const _default: {
    construct: typeof construct;
    destruct: typeof destruct;
};
export default _default;
