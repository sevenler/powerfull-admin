define('examples/components/SchemaRender.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var index_1 = require("src/index.tsx");
  var axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  var Toast_1 = require("src/components/Toast.tsx");
  var Alert_1 = require("src/components/Alert.tsx");
  var Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  var LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  var Drawer_1 = tslib_1.__importDefault(require("src/components/Drawer.tsx"));
  var react_overlays_1 = require("node_modules/react-overlays/lib/index");
  var react_router_1 = require("node_modules/react-router/lib/index");
  function loadEditor() {
      return new Promise(function (resolve) {
          return require(['src/components/Editor.tsx'], function (component) {
              return resolve(component.default);
          });
      });
  }
  function default_1(schema) {
      var _a;
      if (!schema['$schema']) {
          schema = tslib_1.__assign({ $schema: 'https://houtai.baidu.com/v2/schemas/page.json' }, schema);
      }
      return react_router_1.withRouter((_a = /** @class */ (function (_super) {
              tslib_1.__extends(class_1, _super);
              function class_1(props) {
                  var _this = _super.call(this, props) || this;
                  _this.state = { open: false };
                  _this.toggleCode = function () {
                      return _this.setState({
                          open: !_this.state.open
                      });
                  };
                  _this.close = function () {
                      return _this.setState({
                          open: false
                      });
                  };
                  var router = props.router;
                  var normalizeLink = function (to) {
                      to = to || '';
                      var location = router.getCurrentLocation();
                      if (to && to[0] === '#') {
                          to = location.pathname + location.search + to;
                      }
                      else if (to && to[0] === '?') {
                          to = location.pathname + to;
                      }
                      var idx = to.indexOf('?');
                      var idx2 = to.indexOf('#');
                      var pathname = ~idx
                          ? to.substring(0, idx)
                          : ~idx2
                              ? to.substring(0, idx2)
                              : to;
                      var search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
                      var hash = ~idx2 ? to.substring(idx2) : location.hash;
                      if (!pathname) {
                          pathname = location.pathname;
                      }
                      else if (pathname[0] != '/' && !/^https?:\/\//.test(pathname)) {
                          var relativeBase = location.pathname;
                          var paths = relativeBase.split('/');
                          paths.pop();
                          var m = void 0;
                          while ((m = /^\.\.?\//.exec(pathname))) {
                              if (m[0] === '../') {
                                  paths.pop();
                              }
                              pathname = pathname.substring(m[0].length);
                          }
                          pathname = paths.concat(pathname).join('/');
                      }
                      return pathname + search + hash;
                  };
                  _this.env = {
                      updateLocation: function (location, replace) {
                          router[replace ? 'replace' : 'push'](normalizeLink(location));
                      },
                      isCurrentUrl: function (to) {
                          var link = normalizeLink(to);
                          return router.isActive(link);
                      },
                      jumpTo: function (to) {
                          to = normalizeLink(to);
                          if (/^https?:\/\//.test(to)) {
                              window.location.replace(to);
                          }
                          else {
                              router.push(to);
                          }
                      },
                      fetcher: function (_a) {
                          var url = _a.url, method = _a.method, data = _a.data, config = _a.config, headers = _a.headers;
                          config = config || {};
                          config.headers = headers || {};
                          if (data && data instanceof FormData) {
                              // config.headers = config.headers || {};
                              // config.headers['Content-Type'] = 'multipart/form-data';
                          }
                          else if (data &&
                              typeof data !== 'string' &&
                              !(data instanceof Blob) &&
                              !(data instanceof ArrayBuffer)) {
                              data = JSON.stringify(data);
                              config.headers['Content-Type'] = 'application/json';
                          }
                          if (method !== 'post' && method !== 'put' && method !== 'patch') {
                              if (data) {
                                  if (method === 'delete') {
                                      config.data = data;
                                  }
                                  else {
                                      config.params = data;
                                  }
                              }
                              return axios_1.default[method](url, config);
                          }
                          return axios_1.default[method](url, data, config);
                      },
                      isCancel: function (value) { return axios_1.default.isCancel(value); },
                      notify: function (type, msg) {
                          return Toast_1.toast[type]
                              ? Toast_1.toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                              : console.warn('[Notify]', type, msg);
                      },
                      alert: Alert_1.alert,
                      confirm: Alert_1.confirm,
                      copy: function (content) { return console.log('Copy', content); }
                  };
                  _this.handleEditorMount = _this.handleEditorMount.bind(_this);
                  return _this;
              }
              class_1.prototype.handleEditorMount = function (editor, monaco) {
                  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                      enableSchemaRequest: true,
                      validate: true
                  });
              };
              class_1.prototype.renderCode = function () {
                  return (react_1.default.createElement(LazyComponent_1.default, { getComponent: loadEditor, editorDidMount: this.handleEditorMount, language: "json", value: schema, placeholder: "\u52A0\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u3002\u3002\u3002", disabled: true }));
              };
              class_1.prototype.renderSchema = function () {
                  var _a = this.props, router = _a.router, location = _a.location, theme = _a.theme;
                  return index_1.render(schema, {
                      location: location,
                      theme: theme
                  }, this.env);
              };
              class_1.prototype.render = function () {
                  var ns = this.props.classPrefix;
                  var showCode = this.props.showCode;
                  return (react_1.default.createElement("div", { className: "schema-wrapper" },
                      showCode !== false ? (react_1.default.createElement(Drawer_1.default, { classPrefix: ns, size: "lg", onHide: this.close, show: this.state.open, position: "left" }, this.state.open ? this.renderCode() : null)) : null,
                      this.renderSchema(),
                      showCode !== false ? (react_1.default.createElement(react_overlays_1.Portal, { container: function () { return document.querySelector('.navbar-nav'); } },
                          react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: this.toggleCode, active: this.state.open, iconOnly: true, tooltip: "\u67E5\u770B\u6E90\u7801", level: "link", placement: "bottom", className: "view-code" },
                              react_1.default.createElement("i", { className: "fa fa-code" })))) : null));
              };
              return class_1;
          }(react_1.default.Component)),
          _a.displayName = 'SchemaRenderer',
          _a));
  }
  exports.default = default_1;
  //# sourceMappingURL=/examples/components/SchemaRender.js.map
  

});
