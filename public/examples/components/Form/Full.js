define('examples/components/Form/Full.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      $schema: 'https://houtai.baidu.com/v2/schemas/page.json#',
      title: '所有 Form 元素列举',
      data: {
          id: 1
      },
      body: [
          {
              type: 'form',
              api: '/api/mock2/saveForm?waitSeconds=2',
              title: '表单项',
              mode: 'horizontal',
              // debug: true,
              autoFocus: true,
              controls: [
                  {
                      type: 'html',
                      html: '<p>html 片段, 可以用来添加说明性文字</p>'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      name: 'var1',
                      label: '文本'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      name: 'withHelp',
                      label: '带提示信息',
                      desc: '这是一段描述文字'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'password',
                      name: 'password',
                      label: '密码',
                      inline: true
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'number',
                      name: 'number',
                      label: '数字',
                      placeholder: '',
                      inline: true,
                      value: 5,
                      min: 1,
                      max: 10
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'tag',
                      name: 'tag',
                      label: '标签',
                      placeholder: '',
                      clearable: true,
                      options: ['lixiaolong', 'zhouxingxing', 'yipingpei', 'liyuanfang']
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      name: 'placeholder',
                      label: 'Placeholder',
                      placeholder: 'Placeholder'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      disabled: true,
                      name: 'disabled',
                      label: '禁用状态',
                      placeholder: '这里禁止输入内容'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      name: 'text-sug',
                      label: '文本提示',
                      options: ['lixiaolong', 'zhouxingxing', 'yipingpei', 'liyuanfang'],
                      addOn: {
                          type: 'text',
                          label: '$'
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'text',
                      name: 'text-sug-multiple',
                      label: '文本提示多选',
                      multiple: true,
                      options: ['lixiaolong', 'zhouxingxing', 'yipingpei', 'liyuanfang']
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'static',
                      name: 'static',
                      labelClassName: 'text-muted',
                      label: '静态展示',
                      value: '这是静态展示的值'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'static',
                      name: 'static2',
                      label: '静态展示',
                      value: '这是静态展示的值',
                      copyable: {
                          content: 'blabla'
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'checkboxes',
                      name: 'checkboxes',
                      label: '多选框',
                      options: [
                          {
                              label: '选项1',
                              value: 1
                          },
                          {
                              label: '选项2',
                              value: 2
                          },
                          {
                              label: '选项3',
                              disabled: true,
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'checkboxes',
                      name: 'checkboxesInline',
                      label: '多选内联',
                      inline: true,
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'radios',
                      name: 'radios',
                      label: '单选',
                      options: [
                          {
                              label: '选项1',
                              value: 1
                          },
                          {
                              label: '选项2',
                              value: 2
                          },
                          {
                              label: '选项3',
                              disabled: true,
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'radios',
                      name: 'radiosInline',
                      label: '单选内联',
                      inline: true,
                      options: [
                          {
                              label: '选项1',
                              value: 1
                          },
                          {
                              label: '选项2',
                              value: 2
                          },
                          {
                              label: '选项3',
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'button-group',
                      name: 'btn-group',
                      label: '按钮组',
                      description: '类似于单选效果',
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'button-group',
                      name: 'btn-group2',
                      label: '按钮组',
                      clearable: true,
                      description: '可清除',
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'button-group',
                      name: 'btn-group3',
                      label: '按钮组',
                      multiple: true,
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ],
                      desc: '可多选'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'list',
                      name: 'List',
                      label: 'List',
                      desc: '也差不多，只是展示方式不一样',
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'list',
                      name: 'list2',
                      label: 'List',
                      desc: '可多选',
                      multiple: true,
                      options: [
                          {
                              label: '选项 A',
                              value: 1
                          },
                          {
                              label: '选项 B',
                              value: 2
                          },
                          {
                              label: '选项 C',
                              value: 3
                          }
                      ]
                  },
                  // {
                  //     type: "divider"
                  // },
                  // {
                  //     type: "list",
                  //     name: "list3",
                  //     label: "List",
                  //     desc: "支持顶部显示提示信息",
                  //     options: [
                  //         {
                  //             label: "选项 A",
                  //             value: 1,
                  //             tip: '提示 A'
                  //         },
                  //         {
                  //             label: "选项 B",
                  //             value: 2,
                  //             tip: '提示 B'
                  //         },
                  //         {
                  //             label: "选项 C",
                  //             value: 3,
                  //             tip: '提示 C'
                  //         }
                  //     ]
                  // },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'list',
                      name: 'list4',
                      label: 'List',
                      imageClassName: 'thumb-lg',
                      desc: '支持放张图片',
                      options: [
                          {
                              image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3893101144,2877209892&fm=23&gp=0.jpg',
                              value: 1,
                              label: '图片1'
                          },
                          {
                              image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3893101144,2877209892&fm=23&gp=0.jpg',
                              value: 2,
                              label: '图片2'
                          },
                          {
                              image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3893101144,2877209892&fm=23&gp=0.jpg',
                              value: 3,
                              label: '图片3'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'list',
                      name: 'list5',
                      label: 'List',
                      desc: '支持文字排版',
                      options: [
                          {
                              value: 1,
                              body: "<div class=\"m-l-sm m-r-sm m-b-sm m-t-xs\">\n                                <div class=\"text-md p-b-xs b-inherit b-b m-b-xs\">\u5957\u9910\uFF1AC01</div>\n                                <div class=\"text-sm\">CPU\uFF1A22\u6838</div>\n                                <div class=\"text-sm\">\u5185\u5B58\uFF1A10GB</div>\n                                <div class=\"text-sm\">SSD\u76D8\uFF1A1024GB</div>\n                            </div>"
                          },
                          {
                              value: 2,
                              body: "<div class=\"m-l-sm m-r-sm  m-b-sm m-t-xs\">\n                            <div class=\"text-md p-b-xs b-inherit b-b m-b-xs\">\u5957\u9910\uFF1AC02</div>\n                            <div class=\"text-sm\">CPU\uFF1A23\u6838</div>\n                            <div class=\"text-sm\">\u5185\u5B58\uFF1A11GB</div>\n                            <div class=\"text-sm\">SSD\u76D8\uFF1A1025GB</div>\n                            </div>"
                          },
                          {
                              value: 3,
                              disabled: true,
                              body: "<div class=\"m-l-sm m-r-sm  m-b-sm m-t-xs\">\n                            <div class=\"text-md p-b-xs b-inherit b-b m-b-xs\">\u5957\u9910\uFF1AC03</div>\n                            <div class=\"text-sm\">CPU\uFF1A24\u6838</div>\n                            <div class=\"text-sm\">\u5185\u5B58\uFF1A12GB</div>\n                            <div class=\"text-sm\">SSD\u76D8\uFF1A1026GB</div>\n                            </div>"
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'rating',
                      count: 5,
                      value: 3,
                      label: '评分',
                      name: 'rating',
                      readOnly: false,
                      half: false
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'switch',
                      name: 'switch',
                      label: '开关'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'checkbox',
                      name: 'checkbox',
                      label: '勾选框',
                      option: ''
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'select',
                      name: 'type',
                      label: '单选',
                      inline: true,
                      options: [
                          {
                              label: '选项1',
                              value: 1
                          },
                          {
                              label: '选项2',
                              value: 2
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'select',
                      name: 'type2',
                      label: '多选',
                      multiple: true,
                      inline: true,
                      options: [
                          {
                              label: '选项1',
                              value: 1
                          },
                          {
                              label: '选项2',
                              value: 2
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'color',
                      name: 'color',
                      inline: true,
                      label: 'Color'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'date',
                      name: 'date',
                      inline: true,
                      label: '日期'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'datetime',
                      name: 'datetime',
                      inline: true,
                      label: '日期+时间'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'time',
                      name: 'time',
                      inline: true,
                      label: '时间'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'date-range',
                      name: 'daterangee',
                      inline: true,
                      label: '时间范围'
                  },
                  {
                      type: 'divider'
                  },
                  [
                      {
                          type: 'datetime',
                          name: 'starttime',
                          label: '开始时间',
                          maxDate: '${endtime}'
                      },
                      {
                          type: 'datetime',
                          name: 'endtime',
                          label: '结束时间',
                          minDate: '${starttime}'
                      }
                  ],
                  {
                      type: 'divider'
                  },
                  {
                      type: 'group',
                      label: '时间范围',
                      required: '',
                      gap: 'xs',
                      description: '选择自定义后，可以选择日期范围',
                      controls: [
                          {
                              type: 'button-group',
                              name: 'range1',
                              value: 'today',
                              // btnActiveClassName: "btn-primary active",
                              btnActiveLevel: 'primary',
                              mode: 'inline',
                              options: [
                                  {
                                      label: '今天',
                                      value: 'today'
                                  },
                                  {
                                      label: '昨天',
                                      value: 'yesterday'
                                  },
                                  {
                                      label: '近三天',
                                      value: '3days'
                                  },
                                  {
                                      label: '近一周',
                                      value: 'week'
                                  },
                                  {
                                      label: '自定义',
                                      value: 'custom'
                                  }
                              ]
                          },
                          {
                              type: 'date',
                              name: 'starttime1',
                              maxDate: '${endtime1}',
                              visibleOn: "data.range1 == 'custom'",
                              mode: 'inline'
                          },
                          {
                              type: 'date',
                              name: 'endtime1',
                              minDate: '${starttime1}',
                              visibleOn: "data.range1 == 'custom'",
                              mode: 'inline'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'input-group',
                      size: 'sm',
                      inline: true,
                      label: 'Icon 组合',
                      controls: [
                          {
                              type: 'icon',
                              addOnclassName: 'no-bg',
                              className: 'text-sm',
                              icon: 'search'
                              // "vendor": "iconfont"
                          },
                          {
                              type: 'text',
                              placeholder: '搜索作业ID/名称',
                              inputClassName: 'b-l-none p-l-none',
                              name: 'jobName'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'input-group',
                      label: '各种组合',
                      inline: true,
                      controls: [
                          {
                              type: 'select',
                              name: 'memoryUnits',
                              options: [
                                  {
                                      label: 'Gi',
                                      value: 'Gi'
                                  },
                                  {
                                      label: 'Mi',
                                      value: 'Mi'
                                  },
                                  {
                                      label: 'Ki',
                                      value: 'Ki'
                                  }
                              ],
                              value: 'Gi'
                          },
                          {
                              type: 'text',
                              name: 'memory'
                          },
                          {
                              type: 'select',
                              name: 'memoryUnits2',
                              options: [
                                  {
                                      label: 'Gi',
                                      value: 'Gi'
                                  },
                                  {
                                      label: 'Mi',
                                      value: 'Mi'
                                  },
                                  {
                                      label: 'Ki',
                                      value: 'Ki'
                                  }
                              ],
                              value: 'Gi'
                          },
                          {
                              type: 'button',
                              label: 'Go'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'image',
                      name: 'image',
                      label: '图片'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'image',
                      name: 'imageCrop',
                      label: '图片带裁剪',
                      crop: {
                          aspectRatio: 1.7777777777777777
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'image',
                      name: 'imageLimit',
                      label: '图片带限制',
                      limit: {
                          width: 200,
                          height: 200
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'textarea',
                      name: 'textarea',
                      label: '多行文本'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'json-editor',
                      name: 'json',
                      value: "{\n    \"a\": 1,\n    \"b\": [\n        1,\n        2,\n        3\n    ]\n}",
                      label: 'Json Editor'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'rich-text',
                      name: 'html',
                      label: 'Rich Text',
                      value: "<p>Just do <code>IT</code>!</p>"
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'repeat',
                      name: 'repeat',
                      label: '时间频率'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'tree',
                      name: 'tree',
                      label: '树',
                      options: [
                          {
                              label: 'Folder A',
                              value: 1,
                              children: [
                                  {
                                      label: 'file A',
                                      value: 2
                                  },
                                  {
                                      label: 'file B',
                                      value: 3
                                  }
                              ]
                          },
                          {
                              label: 'file C',
                              value: 4
                          },
                          {
                              label: 'file D',
                              value: 5
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'tree',
                      name: 'trees',
                      label: '树多选',
                      multiple: true,
                      options: [
                          {
                              label: 'Folder A',
                              value: 1,
                              children: [
                                  {
                                      label: 'file A',
                                      value: 2
                                  },
                                  {
                                      label: 'file B',
                                      value: 3
                                  }
                              ]
                          },
                          {
                              label: 'file C',
                              value: 4
                          },
                          {
                              label: 'file D',
                              value: 5
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'tree-select',
                      name: 'selecttree',
                      label: '树选择器',
                      options: [
                          {
                              label: 'Folder A',
                              value: 1,
                              children: [
                                  {
                                      label: 'file A',
                                      value: 2
                                  },
                                  {
                                      label: 'file B',
                                      value: 3
                                  }
                              ]
                          },
                          {
                              label: 'file C',
                              value: 4
                          },
                          {
                              label: 'file D',
                              value: 5
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'tree-select',
                      name: 'selecttrees',
                      label: '树多选选择器',
                      multiple: true,
                      options: [
                          {
                              label: 'Folder A',
                              value: 1,
                              children: [
                                  {
                                      label: 'file A',
                                      value: 2
                                  },
                                  {
                                      label: 'file B',
                                      value: 3
                                  }
                              ]
                          },
                          {
                              label: 'file C',
                              value: 4
                          },
                          {
                              label: 'file D',
                              value: 5
                          }
                      ]
                  },
                  {
                      type: 'nested-select',
                      name: 'nestedSelect',
                      label: '级联选择器',
                      size: 'sm',
                      options: [
                          {
                              label: 'A',
                              value: 'a'
                          },
                          {
                              label: 'B',
                              value: 'b',
                              children: [
                                  {
                                      label: 'B-1',
                                      value: 'b-1'
                                  },
                                  {
                                      label: 'B-2',
                                      value: 'b-2'
                                  },
                                  {
                                      label: 'B-3',
                                      value: 'b-3'
                                  }
                              ]
                          },
                          {
                              label: 'C',
                              value: 'c'
                          }
                      ]
                  },
                  {
                      type: 'nested-select',
                      name: 'nestedSelectMul',
                      label: '级联选择器多选',
                      size: 'sm',
                      multiple: true,
                      options: [
                          {
                              label: 'A',
                              value: 'a'
                          },
                          {
                              label: 'B',
                              value: 'b',
                              children: [
                                  {
                                      label: 'B-1',
                                      value: 'b-1'
                                  },
                                  {
                                      label: 'B-2',
                                      value: 'b-2'
                                  },
                                  {
                                      label: 'B-3',
                                      value: 'b-3'
                                  }
                              ]
                          },
                          {
                              label: 'C',
                              value: 'c'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'city',
                      name: 'city',
                      label: '城市选择器'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'matrix',
                      name: 'matrix',
                      label: '矩阵开关',
                      rowLabel: '行标题说明',
                      columns: [
                          {
                              label: '列1'
                          },
                          {
                              label: '列2'
                          }
                      ],
                      rows: [
                          {
                              label: '行1'
                          },
                          {
                              label: '行2'
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'combo',
                      name: 'combo',
                      label: '组合单条',
                      controls: [
                          {
                              name: 'a',
                              type: 'text',
                              placeholder: 'A'
                          },
                          {
                              name: 'b',
                              type: 'select',
                              options: ['a', 'b', 'c']
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'combo',
                      name: 'combo2',
                      label: '组合多条',
                      multiple: true,
                      value: [{}],
                      controls: [
                          {
                              name: 'a',
                              type: 'text',
                              placeholder: 'A'
                          },
                          {
                              name: 'b',
                              type: 'select',
                              options: ['a', 'b', 'c']
                          }
                      ]
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'form',
                      label: '子表单',
                      name: 'subForm',
                      btnLabel: '点击设置',
                      form: {
                          title: '子表单',
                          controls: [
                              {
                                  name: 'a',
                                  type: 'text',
                                  label: 'Foo'
                              },
                              {
                                  name: 'b',
                                  type: 'switch',
                                  label: 'Boo'
                              }
                          ]
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'form',
                      label: '子表单多条',
                      name: 'subForm2',
                      btnLabel: '点击设置',
                      labelField: 'a',
                      multiple: true,
                      form: {
                          title: '子表单',
                          controls: [
                              {
                                  name: 'a',
                                  type: 'text',
                                  label: 'Foo'
                              },
                              {
                                  name: 'b',
                                  type: 'switch',
                                  label: 'Boo'
                              }
                          ]
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'file',
                      name: 'file',
                      label: '文件上传',
                      joinValues: false
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'range',
                      name: 'range',
                      label: '范围'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'button-toolbar',
                      buttons: [
                          {
                              type: 'submit',
                              label: '登录'
                          },
                          {
                              type: 'reset',
                              label: '重置'
                          },
                          {
                              type: 'button',
                              label: '导出',
                              href: 'http://www.baidu.com',
                              level: 'success'
                          }
                      ]
                  }
              ],
              actions: [
                  {
                      type: 'submit',
                      label: '登录'
                  },
                  {
                      type: 'reset',
                      label: '重置'
                  },
                  {
                      type: 'button',
                      label: '导出',
                      href: 'http://www.baidu.com',
                      level: 'success'
                  }
              ]
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Form/Full.js.map
  

});