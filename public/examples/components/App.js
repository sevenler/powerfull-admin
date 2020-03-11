define('examples/components/App.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var _404_1 = tslib_1.__importDefault(require("src/components/404.tsx"));
  var Layout_1 = tslib_1.__importDefault(require("src/components/Layout.tsx"));
  var AsideNav_1 = tslib_1.__importDefault(require("src/components/AsideNav.tsx"));
  var index_1 = require("src/components/index.tsx");
  var helper_1 = require("src/utils/helper.ts");
  var react_router_1 = require("node_modules/react-router/lib/index");
  var SchemaRender_1 = tslib_1.__importDefault(require("examples/components/SchemaRender.jsx"));
  var Simple_1 = tslib_1.__importDefault(require("examples/components/Page/Simple.jsx"));
  var Error_1 = tslib_1.__importDefault(require("examples/components/Page/Error.jsx"));
  var Form_1 = tslib_1.__importDefault(require("examples/components/Page/Form.jsx"));
  var Mode_1 = tslib_1.__importDefault(require("examples/components/Form/Mode.jsx"));
  var FieldSet_1 = tslib_1.__importDefault(require("examples/components/Form/FieldSet.jsx"));
  var Tabs_1 = tslib_1.__importDefault(require("examples/components/Form/Tabs.jsx"));
  var Remote_1 = tslib_1.__importDefault(require("examples/components/Form/Remote.jsx"));
  var Reaction_1 = tslib_1.__importDefault(require("examples/components/Form/Reaction.jsx"));
  var Validation_1 = tslib_1.__importDefault(require("examples/components/Form/Validation.jsx"));
  var Full_1 = tslib_1.__importDefault(require("examples/components/Form/Full.jsx"));
  var Static_1 = tslib_1.__importDefault(require("examples/components/Form/Static.jsx"));
  var Hint_1 = tslib_1.__importDefault(require("examples/components/Form/Hint.jsx"));
  var FieldSetInTabs_1 = tslib_1.__importDefault(require("examples/components/Form/FieldSetInTabs.jsx"));
  var Combo_1 = tslib_1.__importDefault(require("examples/components/Form/Combo.jsx"));
  var SubForm_1 = tslib_1.__importDefault(require("examples/components/Form/SubForm.jsx"));
  var RichText_1 = tslib_1.__importDefault(require("examples/components/Form/RichText.jsx"));
  var Editor_1 = tslib_1.__importDefault(require("examples/components/Form/Editor.jsx"));
  var Table_1 = tslib_1.__importDefault(require("examples/components/Form/Table.jsx"));
  var Picker_1 = tslib_1.__importDefault(require("examples/components/Form/Picker.jsx"));
  var Formula_1 = tslib_1.__importDefault(require("examples/components/Form/Formula.jsx"));
  var Custom_1 = tslib_1.__importDefault(require("examples/components/Form/Custom.jsx"));
  var Definitions_1 = tslib_1.__importDefault(require("examples/components/Form/Definitions.jsx"));
  var Doc_1 = tslib_1.__importDefault(require("examples/components/Doc.jsx"));
  var Table_2 = tslib_1.__importDefault(require("examples/components/CRUD/Table.jsx"));
  var ItemActions_1 = tslib_1.__importDefault(require("examples/components/CRUD/ItemActions.jsx"));
  var Grid_1 = tslib_1.__importDefault(require("examples/components/CRUD/Grid.jsx"));
  var List_1 = tslib_1.__importDefault(require("examples/components/CRUD/List.jsx"));
  var LoadMore_1 = tslib_1.__importDefault(require("examples/components/CRUD/LoadMore.jsx"));
  var Fix_1 = tslib_1.__importDefault(require("examples/components/CRUD/Fix.jsx"));
  var Aside_1 = tslib_1.__importDefault(require("examples/components/CRUD/Aside.jsx"));
  var Fields_1 = tslib_1.__importDefault(require("examples/components/CRUD/Fields.jsx"));
  var JumpNext_1 = tslib_1.__importDefault(require("examples/components/CRUD/JumpNext.jsx"));
  var Keyboards_1 = tslib_1.__importDefault(require("examples/components/CRUD/Keyboards.jsx"));
  var Footable_1 = tslib_1.__importDefault(require("examples/components/CRUD/Footable.jsx"));
  var Nested_1 = tslib_1.__importDefault(require("examples/components/CRUD/Nested.jsx"));
  var MergeCell_1 = tslib_1.__importDefault(require("examples/components/CRUD/MergeCell.jsx"));
  var HeaderGroup_1 = tslib_1.__importDefault(require("examples/components/CRUD/HeaderGroup.jsx"));
  var LoadOnce_1 = tslib_1.__importDefault(require("examples/components/CRUD/LoadOnce.jsx"));
  var Test_1 = tslib_1.__importDefault(require("examples/components/Sdk/Test.jsx"));
  var Schem_1 = tslib_1.__importDefault(require("examples/components/Form/Schem.jsx"));
  var Simple_2 = tslib_1.__importDefault(require("examples/components/Dialog/Simple.jsx"));
  var Drawer_1 = tslib_1.__importDefault(require("examples/components/Dialog/Drawer.jsx"));
  var Page_1 = tslib_1.__importDefault(require("examples/components/Linkage/Page.jsx"));
  var Form_2 = tslib_1.__importDefault(require("examples/components/Linkage/Form.jsx"));
  var Form2_1 = tslib_1.__importDefault(require("examples/components/Linkage/Form2.jsx"));
  var CRUD_1 = tslib_1.__importDefault(require("examples/components/Linkage/CRUD.jsx"));
  var Options_1 = tslib_1.__importDefault(require("examples/components/Linkage/Options.jsx"));
  var OptionsLocal_1 = tslib_1.__importDefault(require("examples/components/Linkage/OptionsLocal.jsx"));
  var Wizard_1 = tslib_1.__importDefault(require("examples/components/Wizard.jsx"));
  var Chart_1 = tslib_1.__importDefault(require("examples/components/Chart.jsx"));
  var Horizontal_1 = tslib_1.__importDefault(require("examples/components/Horizontal.jsx"));
  var Video_1 = tslib_1.__importDefault(require("examples/components/Video.jsx"));
  var Audio_1 = tslib_1.__importDefault(require("examples/components/Audio.jsx"));
  var Carousel_1 = tslib_1.__importDefault(require("examples/components/Carousel.jsx"));
  var Tasks_1 = tslib_1.__importDefault(require("examples/components/Tasks.jsx"));
  var Data_1 = tslib_1.__importDefault(require("examples/components/Services/Data.jsx"));
  var Schema_1 = tslib_1.__importDefault(require("examples/components/Services/Schema.jsx"));
  var Form_3 = tslib_1.__importDefault(require("examples/components/Services/Form.jsx"));
  var IFrame_1 = tslib_1.__importDefault(require("examples/components/IFrame.jsx"));
  var Normal_1 = tslib_1.__importDefault(require("examples/components/Tabs/Normal.jsx"));
  var Form_4 = tslib_1.__importDefault(require("examples/components/Tabs/Form.jsx"));
  var Tab1_1 = tslib_1.__importDefault(require("examples/components/Tabs/Tab1.jsx"));
  var Tab2_1 = tslib_1.__importDefault(require("examples/components/Tabs/Tab2.jsx"));
  var Tab3_1 = tslib_1.__importDefault(require("examples/components/Tabs/Tab3.jsx"));
  var Test_2 = tslib_1.__importDefault(require("examples/components/Test.jsx"));
  var Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  var Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  var DocSearch_1 = tslib_1.__importDefault(require("examples/components/DocSearch.jsx"));
  var PathPrefix = '/examples';
  var ContextPath = '';
  if ('development' === 'production') {
      PathPrefix = '';
      ContextPath = '/amis';
  }
  var navigations = [
      {
          label: '示例',
          children: [
              {
                  label: '页面',
                  icon: 'glyphicon glyphicon-th',
                  badge: 3,
                  badgeClassName: 'bg-info',
                  children: [
                      {
                          label: '简单页面',
                          path: 'pages/simple',
                          component: SchemaRender_1.default(Simple_1.default)
                      },
                      {
                          label: '初始化出错',
                          path: 'pages/error',
                          component: SchemaRender_1.default(Error_1.default)
                      },
                      {
                          label: '表单页面',
                          path: 'pages/form',
                          component: SchemaRender_1.default(Form_1.default)
                      }
                  ]
              },
              {
                  label: '表单',
                  icon: 'fa fa-list-alt',
                  children: [
                      {
                          label: '表单展示模式',
                          path: 'form/mode',
                          component: SchemaRender_1.default(Mode_1.default)
                      },
                      {
                          label: '所有类型汇总',
                          path: 'form/full',
                          component: SchemaRender_1.default(Full_1.default)
                      },
                      {
                          label: '静态展示',
                          path: 'form/static',
                          component: SchemaRender_1.default(Static_1.default)
                      },
                      {
                          label: '输入提示',
                          path: 'form/hint',
                          component: SchemaRender_1.default(Hint_1.default)
                      },
                      {
                          label: 'FieldSet',
                          path: 'form/fieldset',
                          component: SchemaRender_1.default(FieldSet_1.default)
                      },
                      {
                          label: 'Tabs',
                          path: 'form/tabs',
                          component: SchemaRender_1.default(Tabs_1.default)
                      },
                      {
                          label: 'FieldSet Tabs 组合',
                          path: 'form/fields-tabs',
                          component: SchemaRender_1.default(FieldSetInTabs_1.default)
                      },
                      {
                          label: '动态数据',
                          path: 'form/remote',
                          component: SchemaRender_1.default(Remote_1.default)
                      },
                      {
                          label: '显隐状态联动',
                          path: 'form/reaction',
                          component: SchemaRender_1.default(Reaction_1.default)
                      },
                      {
                          label: '表单验证',
                          path: 'form/validation',
                          component: SchemaRender_1.default(Validation_1.default)
                      },
                      {
                          label: '组合类型',
                          path: 'form/combo',
                          component: SchemaRender_1.default(Combo_1.default)
                      },
                      {
                          label: '多功能选择器',
                          path: 'form/picker',
                          component: SchemaRender_1.default(Picker_1.default)
                      },
                      {
                          label: '子表单',
                          path: 'form/sub-form',
                          component: SchemaRender_1.default(SubForm_1.default)
                      },
                      {
                          label: 'JSon Schema表单',
                          path: 'form/json-schema',
                          component: Schem_1.default
                      },
                      {
                          label: '富文本',
                          path: 'form/rich-text',
                          component: SchemaRender_1.default(RichText_1.default)
                      },
                      {
                          label: '代码编辑器',
                          path: 'form/ide',
                          component: SchemaRender_1.default(Editor_1.default)
                      },
                      {
                          label: '自定义组件',
                          path: 'form/custom',
                          component: SchemaRender_1.default(Custom_1.default)
                      },
                      {
                          label: '表格编辑',
                          path: 'form/table',
                          component: SchemaRender_1.default(Table_1.default)
                      },
                      {
                          label: '公式示例',
                          path: 'form/formula',
                          component: SchemaRender_1.default(Formula_1.default)
                      },
                      {
                          label: '引用',
                          path: 'form/definitions',
                          component: SchemaRender_1.default(Definitions_1.default)
                      }
                      // {
                      //     label: '布局测试',
                      //     path: 'form/layout-test',
                      //     component: makeSchemaRenderer(FormLayoutTestSchema)
                      // },
                      // {
                      //     label: '测试',
                      //     path: 'form/test',
                      //     component: makeSchemaRenderer(TestFormSchema)
                      // },
                  ]
              },
              {
                  label: '增删改查',
                  icon: 'fa fa-table',
                  children: [
                      {
                          label: '表格模式',
                          path: 'crud/table',
                          component: SchemaRender_1.default(Table_2.default)
                      },
                      {
                          label: '卡片模式',
                          path: 'crud/grid',
                          component: SchemaRender_1.default(Grid_1.default)
                      },
                      {
                          label: '列表模式',
                          path: 'crud/list',
                          component: SchemaRender_1.default(List_1.default)
                      },
                      {
                          label: '加载更多模式',
                          path: 'crud/load-more',
                          component: SchemaRender_1.default(LoadMore_1.default)
                      },
                      {
                          label: '操作交互显示',
                          path: 'crud/item-actions',
                          component: SchemaRender_1.default(ItemActions_1.default)
                      },
                      {
                          label: '列类型汇总',
                          path: 'crud/columns',
                          component: SchemaRender_1.default(Fields_1.default)
                      },
                      {
                          label: '可折叠',
                          path: 'crud/footable',
                          component: SchemaRender_1.default(Footable_1.default)
                      },
                      {
                          label: '嵌套',
                          path: 'crud/nested',
                          component: SchemaRender_1.default(Nested_1.default)
                      },
                      {
                          label: '合并单元格',
                          path: 'crud/merge-cell',
                          component: SchemaRender_1.default(MergeCell_1.default)
                      },
                      {
                          label: '表头分组',
                          path: 'crud/header-group',
                          component: SchemaRender_1.default(HeaderGroup_1.default)
                      },
                      {
                          label: '带边栏',
                          path: 'crud/aside',
                          component: SchemaRender_1.default(Aside_1.default)
                      },
                      {
                          label: '固定表头/列',
                          path: 'crud/fixed',
                          component: SchemaRender_1.default(Fix_1.default)
                      },
                      {
                          label: '键盘操作编辑',
                          path: 'crud/keyboards',
                          component: SchemaRender_1.default(Keyboards_1.default)
                      },
                      {
                          label: '操作并下一个',
                          path: 'crud/jump-next',
                          component: SchemaRender_1.default(JumpNext_1.default)
                      },
                      {
                          label: '一次性加载',
                          path: 'crud/load-once',
                          component: SchemaRender_1.default(LoadOnce_1.default)
                      }
                      // {
                      //     label: '测试',
                      //     path: 'crud/test',
                      //     component: makeSchemaRenderer(TestCrudSchema)
                      // }
                  ]
              },
              {
                  label: '弹框',
                  icon: 'fa fa-bomb',
                  children: [
                      {
                          label: '对话框',
                          path: 'dialog/simple',
                          component: SchemaRender_1.default(Simple_2.default)
                      },
                      {
                          label: '侧边弹出',
                          path: 'dialog/drawer',
                          component: SchemaRender_1.default(Drawer_1.default)
                      }
                  ]
              },
              {
                  label: '选项卡',
                  icon: 'fa fa-clone',
                  children: [
                      {
                          label: '常规选项卡',
                          path: 'tabs/normal',
                          component: SchemaRender_1.default(Normal_1.default)
                      },
                      {
                          label: '表单中选项卡分组',
                          path: 'tabs/form',
                          component: SchemaRender_1.default(Form_4.default)
                      },
                      {
                          label: '选项卡页面1',
                          path: 'tabs/tab1',
                          component: SchemaRender_1.default(Tab1_1.default)
                      },
                      {
                          label: '选项卡页面2',
                          path: 'tabs/tab2',
                          component: SchemaRender_1.default(Tab2_1.default)
                      },
                      {
                          label: '选项卡页面3',
                          path: 'tabs/tab3',
                          component: SchemaRender_1.default(Tab3_1.default)
                      }
                  ]
              },
              {
                  label: '联动',
                  icon: 'fa fa-bolt',
                  children: [
                      {
                          label: '地址栏变化自动更新',
                          path: 'linkpage/page',
                          component: SchemaRender_1.default(Page_1.default)
                      },
                      {
                          label: '选项联动',
                          path: 'linkpage/options-local',
                          component: SchemaRender_1.default(OptionsLocal_1.default)
                      },
                      {
                          label: '选项远程联动',
                          path: 'linkpage/options',
                          component: SchemaRender_1.default(Options_1.default)
                      },
                      {
                          label: '表单和表单联动',
                          path: 'linkpage/form',
                          component: SchemaRender_1.default(Form_2.default)
                      },
                      {
                          label: '表单自动更新',
                          path: 'linkpage/form2',
                          component: SchemaRender_1.default(Form2_1.default)
                      },
                      {
                          label: '表单和列表联动',
                          path: 'linkpage/crud',
                          component: SchemaRender_1.default(CRUD_1.default)
                      }
                  ]
              },
              {
                  label: '动态加载',
                  icon: 'fa fa-magic',
                  children: [
                      {
                          label: '动态加载数据',
                          path: 'services/data',
                          component: SchemaRender_1.default(Data_1.default)
                      },
                      {
                          label: '动态加载页面',
                          path: 'services/schema',
                          component: SchemaRender_1.default(Schema_1.default)
                      },
                      {
                          label: '动态加载部分表单',
                          path: 'services/form',
                          component: SchemaRender_1.default(Form_3.default)
                      }
                  ]
              },
              {
                  label: '向导',
                  icon: 'fa fa-desktop',
                  path: 'wizard',
                  component: SchemaRender_1.default(Wizard_1.default)
              },
              {
                  label: '排版',
                  icon: 'fa fa-columns',
                  path: 'horizontal',
                  component: SchemaRender_1.default(Horizontal_1.default)
              },
              {
                  label: '图表',
                  icon: 'fa fa-bar-chart',
                  path: 'chart',
                  component: SchemaRender_1.default(Chart_1.default)
              },
              {
                  label: '轮播图',
                  icon: 'fa fa-pause',
                  path: 'carousel',
                  component: SchemaRender_1.default(Carousel_1.default)
              },
              {
                  label: '音频',
                  icon: 'fa fa-volume-up',
                  path: 'audio',
                  component: SchemaRender_1.default(Audio_1.default)
              },
              {
                  label: '视频',
                  icon: 'fa fa-video-camera',
                  path: 'video',
                  component: SchemaRender_1.default(Video_1.default)
              },
              {
                  label: '异步任务',
                  icon: 'fa fa-tasks',
                  path: 'task',
                  component: SchemaRender_1.default(Tasks_1.default)
              },
              {
                  label: 'IFrame',
                  icon: 'fa fa-cloud',
                  path: 'iframe',
                  component: SchemaRender_1.default(IFrame_1.default)
              },
              {
                  label: 'SDK',
                  icon: 'fa fa-rocket',
                  path: 'sdk',
                  component: Test_1.default
              },
              {
                  label: 'Test',
                  icon: 'fa fa-code',
                  path: 'test',
                  component: Test_2.default
              }
          ]
      },
      Doc_1.default
  ];
  function isActive(link, location) {
      return !!(link && link === location.pathname);
  }
  var themes = [
      {
          label: '默认主题',
          ns: 'a-',
          value: 'default'
      },
      {
          label: '百度云舍',
          ns: 'cxd-',
          value: 'cxd'
      },
      {
          label: 'Dark',
          ns: 'dark-',
          value: 'dark'
      }
  ];
  var App = /** @class */ (function (_super) {
      tslib_1.__extends(App, _super);
      function App(props) {
          var _this = _super.call(this, props) || this;
          _this.state = {
              asideFolded: localStorage.getItem('asideFolded') === 'true',
              offScreen: false,
              headerVisible: true,
              themeIndex: 0,
              themes: themes,
              theme: themes[localStorage.getItem('themeIndex') || 0]
          };
          _this.toggleAside = _this.toggleAside.bind(_this);
          _this.setAsideFolded = _this.setAsideFolded.bind(_this);
          _this.setHeaderVisible = _this.setHeaderVisible.bind(_this);
          return _this;
      }
      App.prototype.componentDidMount = function () {
          if (this.state.theme.value !== 'default') {
              document.querySelectorAll('link[title]').forEach(function (item) {
                  item.disabled = true;
              });
              document.querySelector("link[title=" + this.state.theme.value + "]").disabled = false;
          }
      };
      App.prototype.componentDidUpdate = function (preProps, preState) {
          var props = this.props;
          if (preState.theme.value !== this.state.theme.value) {
              document.querySelector("link[title=" + preState.theme.value + "]").disabled = true;
              document.querySelector("link[title=" + this.state.theme.value + "]").disabled = false;
          }
          if (props.location.pathname !== preProps.location.pathname) {
              this.setState({
                  offScreen: false
              }, function () { return window.scrollTo(0, 0); });
              var pageURL = props.location.pathname;
              _hmt && _hmt.push(['_trackPageview', pageURL]);
          }
      };
      App.prototype.toggleAside = function () {
          this.setAsideFolded(!this.state.asideFolded);
      };
      App.prototype.setAsideFolded = function (folded) {
          if (folded === void 0) { folded = false; }
          localStorage.setItem('asideFolded', JSON.stringify(folded));
          this.setState({
              asideFolded: folded
          });
      };
      App.prototype.setHeaderVisible = function (visible) {
          if (visible === void 0) { visible = false; }
          this.setState({
              headerVisible: visible
          });
      };
      App.prototype.renderAside = function () {
          var location = this.props.location;
          if (location.pathname === '/edit') {
              return null;
          }
          var theme = this.state.theme;
          return (react_1.default.createElement(AsideNav_1.default, { theme: theme.value, navigations: navigations, renderLink: function (_a) {
                  var link = _a.link, active = _a.active, toggleExpand = _a.toggleExpand, cx = _a.classnames;
                  var children = [];
                  if (link.children) {
                      children.push(react_1.default.createElement("span", { key: "expand-toggle", className: cx('AsideNav-itemArrow'), onClick: function (e) { return toggleExpand(link, e); } }));
                  }
                  link.badge &&
                      children.push(react_1.default.createElement("b", { key: "badge", className: cx("AsideNav-itemBadge", link.badgeClassName || 'bg-info') }, link.badge));
                  link.icon &&
                      children.push(react_1.default.createElement("i", { key: "icon", className: cx("AsideNav-itemIcon", link.icon) }));
                  children.push(react_1.default.createElement("span", { className: cx("AsideNav-itemLabel"), key: "label" }, link.label));
                  return link.path ? (react_1.default.createElement(react_router_1.Link, { to: link.path[0] === '/'
                          ? ContextPath + link.path
                          : "" + ContextPath + PathPrefix + "/" + link.path }, children)) : (react_1.default.createElement("a", { onClick: link.children ? function () { return toggleExpand(link); } : null }, children));
              }, isActive: function (link) {
                  return isActive(link.path && link.path[0] === '/'
                      ? ContextPath + link.path
                      : "" + ContextPath + PathPrefix + "/" + link.path, location);
              } }));
      };
      App.prototype.renderHeader = function () {
          var _this = this;
          var location = this.props.location;
          var theme = this.state.theme;
          if (location.pathname === '/edit') {
              return (react_1.default.createElement("div", { id: "headerBar", className: "box-shadow bg-dark" },
                  react_1.default.createElement("div", { className: theme.ns + "Layout-brand" }, "AMis \u53EF\u89C6\u5316\u7F16\u8F91\u5668")));
          }
          return (react_1.default.createElement("div", null,
              react_1.default.createElement("div", { className: theme.ns + "Layout-brandBar" },
                  react_1.default.createElement("button", { onClick: function () { return _this.setState({ offScreen: !_this.state.offScreen }); }, className: "pull-right visible-xs" },
                      react_1.default.createElement("i", { className: "glyphicon glyphicon-align-justify" })),
                  react_1.default.createElement("div", { className: theme.ns + "Layout-brand" },
                      react_1.default.createElement("i", { className: "fa fa-paw" }),
                      react_1.default.createElement("span", { className: "hidden-folded m-l-sm" }, "AMis Renderer"))),
              react_1.default.createElement("div", { className: theme.ns + "Layout-headerBar" },
                  react_1.default.createElement("div", { className: "nav navbar-nav hidden-xs" },
                      react_1.default.createElement(Button_1.default, { theme: this.state.theme.value, level: "link", className: "no-shadow navbar-btn", onClick: this.toggleAside, tooltip: "\u5C55\u5F00\u6216\u6536\u8D77\u4FA7\u8FB9\u680F", placement: "bottom", iconOnly: true },
                          react_1.default.createElement("i", { className: this.state.asideFolded ? 'fa fa-indent' : 'fa fa-dedent' })),
                      react_1.default.createElement(Button_1.default, { theme: this.state.theme.value, level: "link", className: "no-shadow navbar-btn", href: "https://github.com/baidu/amis", tooltip: "\u524D\u5F80 Github \u4ED3\u5E93\u5730\u5740", placement: "bottom", iconOnly: true },
                          react_1.default.createElement("i", { className: 'fa fa-github' }))),
                  react_1.default.createElement("div", { className: "hidden-xs p-t-sm pull-right" },
                      "\u4E3B\u9898\uFF1A",
                      react_1.default.createElement(Select_1.default, { theme: this.state.theme.value, value: this.state.theme, options: this.state.themes, onChange: function (theme) {
                              _this.setState({ theme: theme });
                              localStorage.setItem('themeIndex', _this.state.themes.indexOf(theme));
                          } })),
                  react_1.default.createElement(DocSearch_1.default, { theme: this.state.theme.value }))));
      };
      App.prototype.render = function () {
          // const pathname = this.props.location.pathname;
          var theme = this.state.theme;
          return (react_1.default.createElement(Layout_1.default, { theme: theme.value, offScreen: this.state.offScreen, header: this.state.headerVisible ? this.renderHeader() : null, folded: this.state.asideFolded, aside: this.renderAside() },
              react_1.default.createElement(index_1.ToastComponent, { theme: theme.value }),
              react_1.default.createElement(index_1.AlertComponent, { theme: theme.value }),
              react_1.default.cloneElement(this.props.children, tslib_1.__assign(tslib_1.__assign({}, this.props.children.props), { setAsideFolded: this.setAsideFolded, setHeaderVisible: this.setHeaderVisible, theme: theme.value, classPrefix: theme.ns }))));
      };
      App = tslib_1.__decorate([
          react_router_1.withRouter,
          tslib_1.__metadata("design:paramtypes", [Object])
      ], App);
      return App;
  }(react_1.default.PureComponent));
  exports.App = App;
  function navigations2route(pathPrefix) {
      if (pathPrefix === void 0) { pathPrefix = PathPrefix; }
      var routes = [];
      navigations.forEach(function (root) {
          root.children &&
              helper_1.mapTree(root.children, function (item) {
                  if (item.path && item.component) {
                      routes.push(react_1.default.createElement(react_router_1.Route, { key: routes.length + 1, path: item.path[0] === '/'
                              ? ContextPath + item.path
                              : "" + ContextPath + pathPrefix + "/" + item.path, component: item.component }));
                  }
                  else if (item.path && item.getComponent) {
                      routes.push(react_1.default.createElement(react_router_1.Route, { key: routes.length + 1, path: item.path[0] === '/'
                              ? ContextPath + item.path
                              : "" + ContextPath + pathPrefix + "/" + item.path, getComponent: item.getComponent }));
                  }
              });
      });
      return routes;
  }
  function entry(_a) {
      var pathPrefix = _a.pathPrefix;
      PathPrefix = pathPrefix || PathPrefix;
      var history = react_router_1.browserHistory;
      // if ('development' === 'production') {
      //     history = hashHistory;
      // }
      return (react_1.default.createElement(react_router_1.Router, { history: history },
          react_1.default.createElement(react_router_1.Route, { component: App },
              react_1.default.createElement(react_router_1.Redirect, { from: ContextPath + "/", to: "" + ContextPath + PathPrefix + "/pages/simple" }),
              react_1.default.createElement(react_router_1.Redirect, { from: PathPrefix + "/", to: PathPrefix + "/pages/simple" }),
              navigations2route(PathPrefix),
              react_1.default.createElement(react_router_1.Route, { path: "*", component: _404_1.default }))));
  }
  exports.default = entry;
  //# sourceMappingURL=/examples/components/App.js.map
  

});
