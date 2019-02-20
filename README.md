# JSON-Tree

把扁平化的数据转为成结构化的数据，把结构化的数据扁平化

## 安装

```bash
npm install --save @aximario/json-tree
```

## API

construct(data, config)

* data: 数组,扁平化数据
* config: 配置对象
    - id 数据里的 id，string 类型
    - pid 数据里的父 id，string 类型
    - children 生成结果中子节点的字段名，string 类型
* 返回一个数组对象，里面可能包含多个树结构

destruct(data, children)

* data: 数组,扁平化数据
* children: 数据子节点的字段名，string 类型
* 返回一个数组对象，里面为展开的数据


## 用法

```javascript
const jt = require('@aximario/json-tree');

let data = [
    {id: 6, parent_id: 2, data: '这是其他数据'},
    {id: 7, parent_id: 3, data: '这是其他数据'},
    {id: 2, parent_id: 1, data: '这是其他数据'},
    {id: 4, parent_id: 2, data: '这是其他数据'},
    {id: 1, parent_id: 0, data: '这是其他数据'},
    {id: 9, parent_id: 5, data: '这是其他数据'},
    {id: 8, parent_id: 3, data: '这是其他数据'},
    {id: 3, parent_id: 1, data: '这是其他数据'},
    {id: 5, parent_id: 2, data: '这是其他数据'},
    {id: 10, parent_id:6, data: '这是其他数据'}
];

let result = jt.construct(data, {
    id: 'id',
    pid: 'parent_id',
    children: 'kids'
});

console.log(JSON.stringify(result, null, '\t'));

/** 结果
[
	{
		"id": 1,
		"parent_id": 0,
		"data": "这是其他数据",
		"kids": [
			{
				"id": 2,
				"parent_id": 1,
				"data": "这是其他数据",
				"kids": [
					{
						"id": 6,
						"parent_id": 2,
						"data": "这是其他数据",
						"kids": [
							{
								"id": 10,
								"parent_id": 6,
								"data": "这是其他数据"
							}
						]
					},
					{
						"id": 4,
						"parent_id": 2,
						"data": "这是其他数据"
					},
					{
						"id": 5,
						"parent_id": 2,
						"data": "这是其他数据",
						"kids": [
							{
								"id": 9,
								"parent_id": 5,
								"data": "这是其他数据"
							}
						]
					}
				]
			},
			{
				"id": 3,
				"parent_id": 1,
				"data": "这是其他数据",
				"kids": [
					{
						"id": 7,
						"parent_id": 3,
						"data": "这是其他数据"
					},
					{
						"id": 8,
						"parent_id": 3,
						"data": "这是其他数据"
					}
				]
			}
		]
	}
]
*/

const destructedData = jt.destruct(result, 'kids')

console.log(destructedData)
/**
[
    {id: 6, parent_id: 2, data: '这是其他数据'},
    {id: 7, parent_id: 3, data: '这是其他数据'},
    {id: 2, parent_id: 1, data: '这是其他数据'},
    {id: 4, parent_id: 2, data: '这是其他数据'},
    {id: 1, parent_id: 0, data: '这是其他数据'},
    {id: 9, parent_id: 5, data: '这是其他数据'},
    {id: 8, parent_id: 3, data: '这是其他数据'},
    {id: 3, parent_id: 1, data: '这是其他数据'},
    {id: 5, parent_id: 2, data: '这是其他数据'},
    {id: 10, parent_id:6, data: '这是其他数据'}
]
 */
```