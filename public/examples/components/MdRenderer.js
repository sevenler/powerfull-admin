define('examples/components/MdRenderer.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  /* eslint-disable no-unused-vars */
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = tslib_1.__importDefault(require("node_modules/react-dom/index"));
  var TitleBar_1 = tslib_1.__importDefault(require("src/components/TitleBar.tsx"));
  var LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  var Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  var PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  var AsideNav_1 = tslib_1.__importDefault(require("src/components/AsideNav.tsx"));
  var react_overlays_1 = require("node_modules/react-overlays/lib/index");
  var CodePreview = /** @class */ (function (_super) {
      tslib_1.__extends(CodePreview, _super);
      function CodePreview() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.state = {
              PlayGround: null
          };
          return _this;
      }
      CodePreview.prototype.componentDidMount = function () {
          var _this = this;
          require(['examples/components/Play.jsx'], function (component) {
              return _this.setState({
                  PlayGround: component.default
              });
          });
      };
      CodePreview.prototype.render = function () {
          var _this = this;
          var _a = this.props, container = _a.container, height = _a.height, setAsideFolded = _a.setAsideFolded, setHeaderVisible = _a.setHeaderVisible, rest = tslib_1.__rest(_a, ["container", "height", "setAsideFolded", "setHeaderVisible"]);
          var PlayGround = this.state.PlayGround;
          // 不要放在 .markdown-body 下面，因为样式会干扰，复写又麻烦，所以通过 Overlay 渲染到同级
          return (react_1.default.createElement("div", null,
              react_1.default.createElement("span", { style: { display: 'block', height: height }, ref: "span" }),
              PlayGround ? (react_1.default.createElement(Overlay_1.default, { container: container, target: function () { return _this.refs.span; }, placement: "bottom", show: true },
                  react_1.default.createElement(PopOver_1.default, { offset: { x: 0, y: -height }, style: { height: height }, className: "doc-shcema-preview-popover" },
                      react_1.default.createElement("div", { className: "doc-schema-preview" },
                          react_1.default.createElement(PlayGround, tslib_1.__assign({}, rest, { vertical: true })))))) : null));
      };
      return CodePreview;
  }(react_1.default.Component));
  function isActive(link, location) {
      return !!(link.fullPath && link.fullPath === location.hash);
  }
  function default_1(doc) {
      var _a;
      return _a = /** @class */ (function (_super) {
              tslib_1.__extends(class_1, _super);
              function class_1(props) {
                  var _this = _super.call(this, props) || this;
                  _this.ref = null;
                  _this.doms = [];
                  _this.divRef = _this.divRef.bind(_this);
                  _this.handleClick = _this.handleClick.bind(_this);
                  return _this;
              }
              class_1.prototype.componentDidMount = function () {
                  this.renderSchema();
                  if (location.hash && location.hash.length > 1) {
                      // 禁用自动跳转
                      if (window.history && 'scrollRestoration' in window.history) {
                          window.history.scrollRestoration = 'manual';
                      }
                      var dom = document.querySelector("[name=\"" + location.hash.substring(1) + "\"]");
                      dom && dom.scrollIntoView();
                  }
              };
              class_1.prototype.componentDidUpdate = function () {
                  this.renderSchema();
              };
              class_1.prototype.componentWillUnmount = function () {
                  this.doms.forEach(function (dom) { return react_dom_1.default.unmountComponentAtNode(dom); });
              };
              class_1.prototype.handleClick = function (e) {
                  var href = e.target.getAttribute('href');
                  if (href && href[0] !== '#' && !/^http/.test(href)) {
                      e.preventDefault();
                      this.props.push(href);
                  }
              };
              class_1.prototype.divRef = function (ref) {
                  this.ref = ref;
                  if (ref) {
                      ref.innerHTML = doc.html;
                  }
              };
              class_1.prototype.renderSchema = function () {
                  var _this = this;
                  var scripts = document.querySelectorAll('script[type="text/schema"]');
                  if (!scripts && !scripts.length) {
                      return;
                  }
                  var _loop_1 = function (i, len) {
                      var script = scripts[i];
                      var props = {};
                      [].slice.apply(script.attributes).forEach(function (item) {
                          props[item.name] = item.value;
                      });
                      var dom = document.createElement('div');
                      var height = props.height ? parseInt(props.height, 10) : 200;
                      dom.setAttribute('class', 'doc-play-ground');
                      dom.setAttribute('style', "height: " + height + "px;");
                      script.parentNode.replaceChild(dom, script);
                      this_1.doms.push(dom);
                      react_dom_1.default.unstable_renderSubtreeIntoContainer(this_1, react_1.default.createElement(LazyComponent_1.default, tslib_1.__assign({}, this_1.props, { container: function () { return react_dom_1.default.findDOMNode(_this); }, height: height, component: CodePreview, code: script.innerText, scope: props.scope, unMountOnHidden: true, placeholder: "\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u3002\u3002\u3002" })), dom);
                  };
                  var this_1 = this;
                  for (var i = 0, len = scripts.length; i < len; i++) {
                      _loop_1(i, len);
                  }
              };
              class_1.prototype.render = function () {
                  var location = this.props.location;
                  return (react_1.default.createElement("div", { className: "pos-rlt text-left" },
                      doc.title ? react_1.default.createElement(TitleBar_1.default, { title: doc.title }) : null,
                      react_1.default.createElement("div", { className: "markdown-body", ref: this.divRef }, "Doc"),
                      doc.toc && doc.toc.children && doc.toc.children.length > 1 ? (react_1.default.createElement(react_overlays_1.Portal, { container: function () { return document.querySelector('#asideInner'); } },
                          react_1.default.createElement(AsideNav_1.default, { navigations: [doc.toc], renderLink: function (_a) {
                                  var link = _a.link, active = _a.active, toggleExpand = _a.toggleExpand, depth = _a.depth, cx = _a.classnames;
                                  var children = [];
                                  if (link.children) {
                                      children.push(react_1.default.createElement("span", { key: "expand-toggle", className: cx("AsideNav-itemArrow") }));
                                  }
                                  link.badge &&
                                      children.push(react_1.default.createElement("b", { key: "badge", className: cx('AsideNav-itemBadge', link.badgeClassName || 'bg-info') }, link.badge));
                                  depth === 1 &&
                                      children.push(react_1.default.createElement("i", { key: "icon", className: cx('AsideNav-itemIcon fa fa-flag') }));
                                  children.push(react_1.default.createElement("span", { key: "label", className: cx('AsideNav-itemLabel') }, link.label));
                                  return link.fragment ? (react_1.default.createElement("a", { href: "#" + link.fragment }, children)) : (react_1.default.createElement("a", { onClick: link.children ? function () { return toggleExpand(link); } : null }, children));
                              }, isActive: function (link) { return isActive(link, location); } }))) : null));
              };
              return class_1;
          }(react_1.default.Component)),
          _a.displayName = 'MarkdownRenderer',
          _a;
  }
  exports.default = default_1;
  //# sourceMappingURL=/examples/components/MdRenderer.js.map
  

});
