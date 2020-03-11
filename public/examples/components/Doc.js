define('examples/components/Doc.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var MdRenderer_1 = tslib_1.__importDefault(require("examples/components/MdRenderer.jsx"));
  exports.default = {
      prefix: function (_a) {
          var cx = _a.classnames;
          return react_1.default.createElement("li", { className: cx('AsideNav-divider') });
      },
      label: '文档',
      children: [
          {
              label: '快速开始',
              icon: 'fa fa-flash',
              path: '/docs/getting-started',
              getComponent: function (location, cb) {
                  return require(['docs/getting_started.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '基本用法',
              icon: 'fa fa-file',
              path: '/docs/basic',
              getComponent: function (location, cb) {
                  return require(['docs/basic.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '高级用法',
              icon: 'fa fa-rocket',
              path: '/docs/advanced',
              getComponent: function (location, cb) {
                  return require(['docs/advanced.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '渲染器手册',
              icon: 'fa fa-diamond',
              path: '/docs/renderers',
              getComponent: function (location, cb) {
                  return require(['docs/renderers.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              },
              children: [
                  {
                      label: 'Action',
                      path: '/docs/renderers/Action',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Action.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Alert',
                      path: '/docs/renderers/Alert',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Alert.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Audio',
                      path: '/docs/renderers/Audio',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Audio.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'ButtonGroup',
                      path: '/docs/renderers/ButtonGroup',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/ButtonGroup.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Carousel',
                      path: '/docs/renderers/Carousel',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Carousel.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Card',
                      path: '/docs/renderers/Card',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Card.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Cards',
                      path: '/docs/renderers/Cards',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Cards.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Chart',
                      path: '/docs/renderers/Chart',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Chart.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Collapse',
                      path: '/docs/renderers/Collapse',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Collapse.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'CRUD',
                      path: '/docs/renderers/CRUD',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/CRUD.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      },
                      children: [
                          {
                              label: 'CRUD-Table',
                              path: '/docs/renderers/CRUD-Table',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/CRUD-Table.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'CRUD-Cards',
                              path: '/docs/renderers/CRUD-Cards',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/CRUD-Cards.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'CRUD-List',
                              path: '/docs/renderers/CRUD-List',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/CRUD-List.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          }
                      ]
                  },
                  {
                      label: 'Definitions',
                      path: '/docs/renderers/Definitions',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Definitions.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Divider',
                      path: '/docs/renderers/Divider',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Divider.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Dialog',
                      path: '/docs/renderers/Dialog',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Dialog.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Drawer',
                      path: '/docs/renderers/Drawer',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Drawer.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Each',
                      path: '/docs/renderers/Each',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Each.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Field',
                      path: '/docs/renderers/Field',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Field.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Form',
                      path: '/docs/renderers/Form/Form',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Form/Form.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      },
                      children: [
                          {
                              label: 'Array',
                              path: '/docs/renderers/Form/Array',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Array.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Button',
                              path: '/docs/renderers/Form/Button',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Button.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Button-Toolbar',
                              path: '/docs/renderers/Form/Button-Toolbar',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Button-Toolbar.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Button-Group',
                              path: '/docs/renderers/Form/Button-Group',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Button-Group.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Chained-Select',
                              path: '/docs/renderers/Form/Chained-Select',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Chained-Select.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Checkbox',
                              path: '/docs/renderers/Form/Checkbox',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Checkbox.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Checkboxes',
                              path: '/docs/renderers/Form/Checkboxes',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Checkboxes.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'City',
                              path: '/docs/renderers/Form/City',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/City.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Color',
                              path: '/docs/renderers/Form/Color',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Color.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Combo',
                              path: '/docs/renderers/Form/Combo',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Combo.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Date',
                              path: '/docs/renderers/Form/Date',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Date.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Datetime',
                              path: '/docs/renderers/Form/Datetime',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Datetime.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Date-Range',
                              path: '/docs/renderers/Form/Date-Range',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Date-Range.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Editor',
                              path: '/docs/renderers/Form/Editor',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Editor.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Email',
                              path: '/docs/renderers/Form/Email',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Email.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'File',
                              path: '/docs/renderers/Form/File',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/File.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'FieldSet',
                              path: '/docs/renderers/Form/FieldSet',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/FieldSet.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Formula',
                              path: '/docs/renderers/Form/Formula',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Formula.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'FormItem',
                              path: '/docs/renderers/Form/FormItem',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/FormItem.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Grid',
                              path: '/docs/renderers/Form/Grid',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Grid.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Group',
                              path: '/docs/renderers/Form/Group',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Group.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'HBox',
                              path: '/docs/renderers/Form/HBox',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/HBox.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Hidden',
                              path: '/docs/renderers/Form/Hidden',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Hidden.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Image',
                              path: '/docs/renderers/Form/Image',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Image.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Input-Group',
                              path: '/docs/renderers/Form/Input-Group',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Input-Group.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'List',
                              path: '/docs/renderers/Form/List',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/List.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Matrix',
                              path: '/docs/renderers/Form/Matrix',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Matrix.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'NestedSelect',
                              path: '/docs/renderers/Form/NestedSelect',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/NestedSelect.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Number',
                              path: '/docs/renderers/Form/Number',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Number.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Panel',
                              path: '/docs/renderers/Form/Panel',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Panel.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Password',
                              path: '/docs/renderers/Form/Password',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Password.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Picker',
                              path: '/docs/renderers/Form/Picker',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Picker.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Radios',
                              path: '/docs/renderers/Form/Radios',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Radios.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Rating',
                              path: '/docs/renderers/Form/Rating',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Rating.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Range',
                              path: '/docs/renderers/Form/Range',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Range.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Repeat',
                              path: '/docs/renderers/Form/Repeat',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Repeat.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Rich-Text',
                              path: '/docs/renderers/Form/Rich-Text',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Rich-Text.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Select',
                              path: '/docs/renderers/Form/Select',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Select.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Switch',
                              path: '/docs/renderers/Form/Switch',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Switch.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Service',
                              path: '/docs/renderers/Form/Service',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Service.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'SubForm',
                              path: '/docs/renderers/Form/SubForm',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/SubForm.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Static',
                              path: '/docs/renderers/Static',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Static.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Tabs',
                              path: '/docs/renderers/Form/Tabs',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Tabs.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Table',
                              path: '/docs/renderers/Form/Table',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Table.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Tag',
                              path: '/docs/renderers/Form/Tag',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Tag.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Text',
                              path: '/docs/renderers/Form/Text',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Text.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Textarea',
                              path: '/docs/renderers/Form/Textarea',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Textarea.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Time',
                              path: '/docs/renderers/Form/Time',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Time.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Tree',
                              path: '/docs/renderers/Form/Tree',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Tree.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'TreeSelect',
                              path: '/docs/renderers/Form/TreeSelect',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/TreeSelect.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Url',
                              path: '/docs/renderers/Form/Url',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Form/Url.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          }
                      ]
                  },
                  {
                      label: 'Grid',
                      path: '/docs/renderers/Grid',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Grid.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'HBox',
                      path: '/docs/renderers/HBox',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/HBox.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Html',
                      path: '/docs/renderers/Html',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Html.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'iFrame',
                      path: '/docs/renderers/iFrame',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/iFrame.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'List',
                      path: '/docs/renderers/List',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/List.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Nav',
                      path: '/docs/renderers/Nav',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Nav.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Panel',
                      path: '/docs/renderers/Panel',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Panel.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Page',
                      path: '/docs/renderers/Page',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Page.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Plain',
                      path: '/docs/renderers/Plain',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Plain.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'QRCode',
                      path: '/docs/renderers/QRCode',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/QRCode.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Service',
                      path: '/docs/renderers/Service',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Service.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Table',
                      path: '/docs/renderers/Table',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Table.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      },
                      children: [
                          {
                              label: 'Column',
                              path: '/docs/renderers/Column',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Column.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          },
                          {
                              label: 'Operation',
                              path: '/docs/renderers/Operation',
                              getComponent: function (location, cb) {
                                  return require(['docs/renderers/Operation.md'], function (doc) {
                                      cb(null, MdRenderer_1.default(doc));
                                  });
                              }
                          }
                      ]
                  },
                  {
                      label: 'Tabs',
                      path: '/docs/renderers/Tabs',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Tabs.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Tasks',
                      path: '/docs/renderers/Tasks',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Tasks.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Tpl',
                      path: '/docs/renderers/Tpl',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Tpl.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Video',
                      path: '/docs/renderers/Video',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Video.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Wrapper',
                      path: '/docs/renderers/Wrapper',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Wrapper.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: 'Wizard',
                      path: '/docs/renderers/Wizard',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Wizard.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  },
                  {
                      label: '类型说明',
                      path: '/docs/renderers/Types',
                      getComponent: function (location, cb) {
                          return require(['docs/renderers/Types.md'], function (doc) {
                              cb(null, MdRenderer_1.default(doc));
                          });
                      }
                  }
              ]
          },
          {
              label: 'API 说明',
              path: '/docs/api',
              icon: 'fa fa-cloud',
              getComponent: function (location, cb) {
                  return require(['docs/api.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '如何定制',
              path: '/docs/sdk',
              icon: 'fa fa-cubes',
              getComponent: function (location, cb) {
                  return require(['docs/sdk.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '自定义组件',
              path: '/docs/dev',
              icon: 'fa fa-code',
              getComponent: function (location, cb) {
                  return require(['docs/dev.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          },
          {
              label: '样式说明',
              path: '/docs/style',
              icon: 'fa fa-laptop',
              getComponent: function (location, cb) {
                  return require(['docs/style.md'], function (doc) {
                      cb(null, MdRenderer_1.default(doc));
                  });
              }
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Doc.js.map
  

});
