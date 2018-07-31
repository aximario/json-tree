import 'ts-jest'
import jsonTree from './index'

test('可以完成正确的转换', () => {
  expect(jsonTree([
    { id: 6, parent_id: 2, data: '这是其他数据' },
    { id: 7, parent_id: 3, data: '这是其他数据' },
    { id: 2, parent_id: 1, data: '这是其他数据' },
    { id: 4, parent_id: 2, data: '这是其他数据' },
    { id: 1, parent_id: 0, data: '这是其他数据' },
    { id: 9, parent_id: 5, data: '这是其他数据' },
    { id: 8, parent_id: 3, data: '这是其他数据' },
    { id: 3, parent_id: 1, data: '这是其他数据' },
    { id: 5, parent_id: 2, data: '这是其他数据' },
    { id: 10, parent_id: 6, data: '这是其他数据' }
  ], {
      id: 'id',
      pid: 'parent_id',
      children: 'kids'
    })).toEqual([
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
    ])
})