import 'ts-jest'
import { construct, destruct } from './index'
import { DestructOptionsMode } from './index.interface'

describe('construct 方法是否正确', () => {
  test('构建单个树 - 空树', () => {
    expect(construct([], {
      id: 'id',
      pid: 'parent_id',
      children: 'kids'
    })).toEqual([])
  })
  test('构建单个树', () => {
    expect(construct([
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
  test('构建单个树-含有 null 和 undefined', () => {
    expect(construct([
      { id: 6, parent_id: 2, data: '这是其他数据' },
      null,
      { id: 7, parent_id: 3, data: '这是其他数据' },
      { id: 2, parent_id: 1, data: '这是其他数据' },
      { id: 4, parent_id: 2, data: '这是其他数据' },
      { id: 1, parent_id: 0, data: '这是其他数据' },
      undefined,
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
  test('构建多个树', () => {
    expect(construct([
      { id: 1, parent_id: 0, data: '这是其他数据' },
      { id: 2, parent_id: 1, data: '这是其他数据' },
      { id: 3, parent_id: 1, data: '这是其他数据' },
      { id: 4, parent_id: 0, data: '这是其他数据' },
      { id: 5, parent_id: 4, data: '这是其他数据' },
      { id: 6, parent_id: 4, data: '这是其他数据' },
      { id: 7, parent_id: 0, data: '这是其他数据' },
      { id: 8, parent_id: 7, data: '这是其他数据' },
      { id: 9, parent_id: 7, data: '这是其他数据' },
      { id: 10, parent_id: 9, data: '这是其他数据' }
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
              "data": "这是其他数据"
            },
            {
              "id": 3,
              "parent_id": 1,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 4,
          "parent_id": 0,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 5,
              "parent_id": 4,
              "data": "这是其他数据"
            },
            {
              "id": 6,
              "parent_id": 4,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 7,
          "parent_id": 0,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 8,
              "parent_id": 7,
              "data": "这是其他数据"
            },
            {
              "id": 9,
              "parent_id": 7,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 10,
                  "parent_id": 9,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        }
      ])
  })
  test('构建多个树-含有 null 和 undefined', () => {
    expect(construct([
      { id: 1, parent_id: 0, data: '这是其他数据' },
      { id: 2, parent_id: 1, data: '这是其他数据' },
      { id: 3, parent_id: 1, data: '这是其他数据' },
      { id: 4, parent_id: 0, data: '这是其他数据' },
      null,
      { id: 5, parent_id: 4, data: '这是其他数据' },
      { id: 6, parent_id: 4, data: '这是其他数据' },
      { id: 7, parent_id: 0, data: '这是其他数据' },
      { id: 8, parent_id: 7, data: '这是其他数据' },
      undefined,
      { id: 9, parent_id: 7, data: '这是其他数据' },
      { id: 10, parent_id: 9, data: '这是其他数据' }
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
              "data": "这是其他数据"
            },
            {
              "id": 3,
              "parent_id": 1,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 4,
          "parent_id": 0,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 5,
              "parent_id": 4,
              "data": "这是其他数据"
            },
            {
              "id": 6,
              "parent_id": 4,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 7,
          "parent_id": 0,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 8,
              "parent_id": 7,
              "data": "这是其他数据"
            },
            {
              "id": 9,
              "parent_id": 7,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 10,
                  "parent_id": 9,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        }
      ])
  })
})

describe('destruct 方法是否正确', () => {
  test('解构单个树 - 空树', () => {
    expect(
      destruct({}, {
        pid: 'parent_id',
        children: 'kids',
      })
    ).toEqual([]);
  });
  test('解构单个树', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
        }
      )
    ).toEqual(
      expect.arrayContaining([
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
      ])
    );
  });
  test('解构单个树 children中含有 null 和 undefined', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            null,
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    undefined,
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
        }
      )
    ).toEqual(
      expect.arrayContaining([
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
      ])
    );
  });
  test('解构多个树', () => {
    expect(
      destruct([
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据"
            },
            {
              "id": 3,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 4,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 5,
              "data": "这是其他数据"
            },
            {
              "id": 6,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 7,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 8,
              "data": "这是其他数据"
            },
            {
              "id": 9,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 10,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        }
      ], {
          pid: 'parent_id',
          children: 'kids',
        })
    ).toEqual(expect.arrayContaining([
      { id: 1, parent_id: null, data: '这是其他数据' },
      { id: 2, parent_id: 1, data: '这是其他数据' },
      { id: 3, parent_id: 1, data: '这是其他数据' },
      { id: 4, parent_id: null, data: '这是其他数据' },
      { id: 5, parent_id: 4, data: '这是其他数据' },
      { id: 6, parent_id: 4, data: '这是其他数据' },
      { id: 7, parent_id: null, data: '这是其他数据' },
      { id: 8, parent_id: 7, data: '这是其他数据' },
      { id: 9, parent_id: 7, data: '这是其他数据' },
      { id: 10, parent_id: 9, data: '这是其他数据' }
    ]))
  })
  test('解构多个树 - 空树', () => {
    expect(
      destruct([], {
        pid: 'parent_id',
        children: 'kids',
      })
    ).toEqual([])
  })
  test('解构多个树 children中含有 null 和 undefined', () => {
    expect(
      destruct([
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据"
            },
            null,
            {
              "id": 3,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 4,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 5,
              "data": "这是其他数据"
            },
            undefined,
            {
              "id": 6,
              "data": "这是其他数据"
            }
          ]
        },
        {
          "id": 7,
          "data": "这是其他数据",
          "kids": [
            undefined,
            {
              "id": 8,
              "data": "这是其他数据"
            },
            {
              "id": 9,
              "data": "这是其他数据",
              "kids": [
                null,
                {
                  "id": 10,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        }
      ], {
          pid: 'parent_id',
          children: 'kids',
        })
    ).toEqual(expect.arrayContaining([
      { id: 1, parent_id: null, data: '这是其他数据' },
      { id: 2, parent_id: 1, data: '这是其他数据' },
      { id: 3, parent_id: 1, data: '这是其他数据' },
      { id: 4, parent_id: null, data: '这是其他数据' },
      { id: 5, parent_id: 4, data: '这是其他数据' },
      { id: 6, parent_id: 4, data: '这是其他数据' },
      { id: 7, parent_id: null, data: '这是其他数据' },
      { id: 8, parent_id: 7, data: '这是其他数据' },
      { id: 9, parent_id: 7, data: '这是其他数据' },
      { id: 10, parent_id: 9, data: '这是其他数据' }
    ]))
  })
  test('解构单个树 mode = branch', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
          mode: DestructOptionsMode.branch
        }
      )
    ).toEqual(
      expect.arrayContaining([
        { id: 6, parent_id: 2, data: '这是其他数据' },
        { id: 2, parent_id: 1, data: '这是其他数据' },
        { id: 3, parent_id: 1, data: '这是其他数据' },
        { id: 5, parent_id: 2, data: '这是其他数据' }
      ])
    );
  });
  test('解构单个树 mode = leaf', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
          mode: DestructOptionsMode.leaf
        }
      )
    ).toEqual(
      expect.arrayContaining([
        { id: 7, parent_id: 3, data: '这是其他数据' },
        { id: 4, parent_id: 2, data: '这是其他数据' },
        { id: 9, parent_id: 5, data: '这是其他数据' },
        { id: 8, parent_id: 3, data: '这是其他数据' },
        { id: 10, parent_id: 6, data: '这是其他数据' }
      ])
    );
  });
  test('解构单个树 mode = nonleaf', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
          mode: DestructOptionsMode.nonleaf
        }
      )
    ).toEqual(
      expect.arrayContaining([
        { id: 1, parent_id: null, data: '这是其他数据' },
        { id: 6, parent_id: 2, data: '这是其他数据' },
        { id: 2, parent_id: 1, data: '这是其他数据' },
        { id: 3, parent_id: 1, data: '这是其他数据' },
        { id: 5, parent_id: 2, data: '这是其他数据' }
      ])
    );
  });
  test('解构单个树 mode = root', () => {
    expect(
      destruct(
        {
          "id": 1,
          "data": "这是其他数据",
          "kids": [
            {
              "id": 2,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 6,
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
                  "data": "这是其他数据"
                },
                {
                  "id": 5,
                  "data": "这是其他数据",
                  "kids": [
                    {
                      "id": 9,
                      "data": "这是其他数据"
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "data": "这是其他数据",
              "kids": [
                {
                  "id": 7,
                  "data": "这是其他数据"
                },
                {
                  "id": 8,
                  "data": "这是其他数据"
                }
              ]
            }
          ]
        },
        {
          pid: 'parent_id',
          children: 'kids',
          mode: DestructOptionsMode.root
        }
      )
    ).toEqual(
      expect.arrayContaining([
        { id: 1, parent_id: null, data: '这是其他数据' }
      ])
    );
  });
})
