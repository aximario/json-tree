# JSON-Tree

[![Build Status](https://travis-ci.org/aximario/json-tree.svg?branch=master)](https://travis-ci.org/aximario/json-tree)
![downloads per month](https://img.shields.io/npm/dm/@aximario/json-tree)

把扁平化的数据构建成结构化的 JSON 或者把结构化的数据扁平化

## 安装

```bash
npm install --save @aximario/json-tree
```

## API

### `construct(data, config)`

construct 会自动过滤掉 null 和 undefined 值

#### 参数

| 字段 | 类型 | 描述 |
|-----|------|------|
| data | Array |数组，扁平化的数据|
|config | Object |配置对象|

##### config 参数

| 字段 | 类型 | 默认值 | 描述 |
|-----|------|------| -----|
| id | string | id |数据中的 id 字段名，会根据该字段构建树|
|pid | string | pid |数据中的 parent id 字段名，会根据该字段构建树|
|children | string | children |生成结果中子节点的字段名，会根据该字段构建树|

#### 返回

返回一个数组对象，里面可能包含多个树结构

### `destruct(data, config)`

destruct 会自动过滤掉 null 和 undefined 值

#### 参数

| 字段 | 类型 | 描述 |
|-----|------|------|
| data | Array |数组或者树型对象，结构化的数据|
|config | Object |配置对象|

##### config 参数

| 字段 | 类型 | 默认值 | 描述 |
|-----|------|------|------|
| id | string | id |数据中的 id 字段名，会根据该字段构建树|
|pid | string | pid | 数据中的 parent id 字段名，会根据该字段构建树|
|children | string | children | 生成结果中子节点的字段名，会根据该字段构建树|
|mode | Enum | all | 选择解构的结果集，all（默认）: 所有节点，root: 只返回根节点，leaf: 只返回叶节点，branch: 返回分支节点（不包含 root 节点），nonleaf: 返回根节点和分支节点|

#### 返回

返回一个数组对象，里面为展开的数据

## 用法示例

```javascript
import { construct, destruct } from '@aximario/json-tree'

const data = [
  { id: 6, parent_id: 2, data: '这是其他数据' },
  { id: 7, parent_id: 3, data: '这是其他数据' },
  { id: 2, parent_id: 1, data: '这是其他数据' },
  { id: 4, parent_id: 2, data: '这是其他数据' },
  { id: 1, parent_id: 0, data: '这是其他数据' },
  { id: 9, parent_id: 5, data: '这是其他数据' },
  { id: 8, parent_id: 3, data: '这是其他数据' },
  { id: 3, parent_id: 1, data: '这是其他数据' },
  { id: 5, parent_id: 2, data: '这是其他数据' },
  { id: 10, parent_id: 6, data: '这是其他数据' },
]

const result = construct(data, {
  id: 'id',
  pid: 'parent_id',
  children: 'kids',
})

console.log(JSON.stringify(result, null, '\t'))

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

const data2 = [
  {
    id: 1,
    data: '这是其他数据',
    kids: [
      {
        id: 2,
        data: '这是其他数据',
        kids: [
          {
            id: 6,
            data: '这是其他数据',
            kids: [
              {
                id: 10,
                parent_id: 6,
                data: '这是其他数据',
              },
            ],
          },
          {
            id: 4,
            data: '这是其他数据',
          },
          {
            id: 5,
            data: '这是其他数据',
            kids: [
              {
                id: 9,
                data: '这是其他数据',
              },
            ],
          },
        ],
      },
      {
        id: 3,
        data: '这是其他数据',
        kids: [
          {
            id: 7,
            data: '这是其他数据',
          },
          {
            id: 8,
            data: '这是其他数据',
          },
        ],
      },
    ],
  },
]

const destructedData = destruct(data2, {
  pid: 'parent_id', // 展开后的父节点 id 名称
  children: 'kids', // 子节点名称
})

console.log(destructedData)
/**
[
  { id: 6, parent_id: 2, data: '这是其他数据' },
  { id: 7, parent_id: 3, data: '这是其他数据' },
  { id: 2, parent_id: 1, data: '这是其他数据' },
  { id: 4, parent_id: 2, data: '这是其他数据' },
  { id: 1, parent_id: null, data: '这是其他数据' },
  { id: 9, parent_id: 5, data: '这是其他数据' },
  { id: 8, parent_id: 3, data: '这是其他数据' },
  { id: 3, parent_id: 1, data: '这是其他数据' },
  { id: 5, parent_id: 2, data: '这是其他数据' },
  { id: 10, parent_id: 6, data: '这是其他数据' }
]
 */
```
