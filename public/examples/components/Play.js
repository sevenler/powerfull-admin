define('examples/components/Play.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Toast_1 = require("src/components/Toast.tsx");
  var index_1 = require("src/index.tsx");
  var axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  var react_frame_component_1 = tslib_1.__importDefault(require("node_modules/react-frame-component/lib/index"));
  var strip_json_comments_1 = tslib_1.__importDefault(require("node_modules/strip-json-comments/index"));
  var Editor_1 = tslib_1.__importDefault(require("src/components/Editor.tsx"));
  var DEFAULT_CONTENT = "{\n    \"$schema\": \"https://houtai.baidu.com/v2/schemas/page.json#\",\n    \"type\": \"page\",\n    \"title\": \"Title\",\n    \"body\": \"Body\",\n    \"aside\": \"Aside\",\n    \"toolbar\": \"Toolbar\"\n}";
  var scopes = {
      'none': "",
      'body': "{\n        \"type\": \"page\",\n        \"body\": SCHEMA_PLACEHOLDER\n    }",
      'form': "{\n        \"type\": \"page\",\n        \"body\": {\n            \"title\": \"\",\n            \"type\": \"form\",\n            \"autoFocus\": false,\n            \"api\": \"/api/mock/saveForm?waitSeconds=1\",\n            \"mode\": \"horizontal\",\n            \"controls\": SCHEMA_PLACEHOLDER,\n            \"submitText\": null,\n            \"actions\": []\n        }\n    }",
      'form-item': "{\n        \"type\": \"page\",\n        \"body\": {\n            \"title\": \"\",\n            \"type\": \"form\",\n            \"mode\": \"horizontal\",\n            \"autoFocus\": false,\n            \"controls\": [\n                SCHEMA_PLACEHOLDER\n            ],\n            \"submitText\": null,\n            \"actions\": []\n        }\n    }"
  };
  var PlayGround = /** @class */ (function (_super) {
      tslib_1.__extends(PlayGround, _super);
      function PlayGround(props) {
          var _this = _super.call(this, props) || this;
          _this.state = null;
          _this.startX = 0;
          _this.oldContents = '';
          var schema = _this.buildSchema(props.code || DEFAULT_CONTENT, props);
          _this.state = {
              asideWidth: props.asideWidth || Math.max(300, window.innerWidth * 0.3),
              schema: schema,
              schemaCode: JSON.stringify(schema, null, 2)
          };
          _this.handleMouseDown = _this.handleMouseDown.bind(_this);
          _this.handleMouseMove = _this.handleMouseMove.bind(_this);
          _this.handleMouseUp = _this.handleMouseUp.bind(_this);
          _this.removeWindowEvents = _this.removeWindowEvents.bind(_this);
          _this.handleChange = _this.handleChange.bind(_this);
          _this.schemaProps = {
              style: {
                  height: '100%'
              }
          };
          _this.env = {
              updateLocation: function () { },
              fetcher: function (config) {
                  config = tslib_1.__assign({ dataType: 'json' }, config);
                  if (config.dataType === 'json' && config.data) {
                      config.data = JSON.stringify(config.data);
                      config.headers = config.headers || {};
                      config.headers['Content-Type'] = 'application/json';
                  }
                  return axios_1.default[config.method](config.url, config.data, config);
              },
              notify: function (type, msg) {
                  return Toast_1.toast[type]
                      ? Toast_1.toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                      : console.warn('[Notify]', type, msg);
              }
          };
          var links = [].slice
              .call(document.head.querySelectorAll('link,style'))
              .map(function (item) { return item.outerHTML; });
          _this.frameTemplate = "<!DOCTYPE html><html><head>" + links.join('') + "</head><body><div></div></body></html>";
          return _this;
      }
      PlayGround.prototype.componentWillReceiveProps = function (nextprops) {
          var props = this.props;
          if (props.code !== nextprops.code) {
              var schema = this.buildSchema(nextprops.code || DEFAULT_CONTENT, nextprops);
              this.setState({
                  schema: schema,
                  schemaCode: JSON.stringify(schema, null, 2)
              });
          }
      };
      PlayGround.prototype.componentDidMount = function () {
          this.props.setAsideFolded && this.props.setAsideFolded(true);
      };
      PlayGround.prototype.componentWillUnmount = function () {
          this.props.setAsideFolded && this.props.setAsideFolded(false);
      };
      PlayGround.prototype.buildSchema = function (schemaContent, props) {
          if (props === void 0) { props = this.props; }
          var query = props.location.query;
          try {
              var scope = query.scope || props.scope;
              if (scope && scopes[scope]) {
                  schemaContent = scopes[scope].replace('SCHEMA_PLACEHOLDER', schemaContent);
              }
              schemaContent = strip_json_comments_1.default(schemaContent).replace(/('|")raw:/g, '$1'); // 去掉注释
              return JSON.parse(schemaContent);
          }
          catch (e) {
              console.error(this.formatMessage(e.message, schemaContent));
          }
          return {};
      };
      PlayGround.prototype.formatMessage = function (message, input) {
          if (/position\s?(\d+)$/.test(message)) {
              var lines = input
                  .substring(0, parseInt(RegExp.$1, 10))
                  .split(/\n|\r\n|\r/);
              message = "Json \u8BED\u6CD5\u9519\u8BEF\uFF0C\u8BF7\u68C0\u6D4B\u3002\u51FA\u9519\u4F4D\u7F6E\uFF1A" + lines.length + "\uFF0C\u5217\uFF1A" + lines[lines.length - 1].length + "\u3002";
          }
          return message;
      };
      PlayGround.prototype.renderPreview = function () {
          var schema = this.state.schema;
          if (!this.props.useIFrame) {
              return index_1.render(schema, this.schemaProps, this.env);
          }
          return (react_1.default.createElement(react_frame_component_1.default, { width: "100%", height: "100%", frameBorder: 0, initialContent: this.frameTemplate }, index_1.render(schema, this.schemaProps, this.env)));
      };
      PlayGround.prototype.handleChange = function (value) {
          this.setState({
              schemaCode: value
          });
          try {
              var schema = JSON.parse(value);
              this.setState({
                  schema: schema
              });
          }
          catch (e) {
              //ignore
          }
      };
      PlayGround.prototype.handleMouseDown = function (e) {
          this.startX = e.clientX;
          this.startWidth = this.state.asideWidth;
          // this.startPosition.y = e.clientY;
          window.addEventListener('mouseup', this.handleMouseUp);
          window.addEventListener('mousemove', this.handleMouseMove);
          return false;
      };
      PlayGround.prototype.handleMouseMove = function (e) {
          var diff = this.startX - e.clientX;
          e.preventDefault();
          this.setState({
              asideWidth: Math.min(800, Math.max(200, this.startWidth + diff))
          });
      };
      PlayGround.prototype.handleMouseUp = function () {
          this.removeWindowEvents();
      };
      PlayGround.prototype.removeWindowEvents = function () {
          window.removeEventListener('mouseup', this.handleMouseUp);
          window.removeEventListener('mousemove', this.handleMouseMove);
      };
      PlayGround.prototype.renderEditor = function () {
          return (react_1.default.createElement(Editor_1.default, { value: this.state.schemaCode, onChange: this.handleChange, language: "json" }));
      };
      PlayGround.prototype.render = function () {
          var vertical = this.props.vertical;
          if (vertical) {
              return (react_1.default.createElement("div", { className: "vbox" },
                  react_1.default.createElement("div", { className: "row-row" },
                      react_1.default.createElement("div", { className: "cell pos-rlt" },
                          react_1.default.createElement("div", { className: "scroll-y h-full pos-abt w-full" }, this.renderPreview()))),
                  react_1.default.createElement("div", { className: "row-row", style: { height: 200 } },
                      react_1.default.createElement("div", { className: "cell" }, this.renderEditor()))));
          }
          return (react_1.default.createElement("div", { style: {
                  position: 'absolute',
                  top: 50,
                  bottom: 0
              } },
              react_1.default.createElement("div", { className: "hbox" },
                  react_1.default.createElement("div", { className: "col pos-rlt" },
                      react_1.default.createElement("div", { className: "scroll-y h-full pos-abt w-full" }, this.renderPreview())),
                  react_1.default.createElement("div", { className: "col bg-light lter b-l bg-auto pos-rlt", style: { width: this.state.asideWidth } },
                      react_1.default.createElement("div", { className: "resizer", onMouseDown: this.handleMouseDown }),
                      this.renderEditor()))));
      };
      PlayGround.defaultProps = {
          useIFrame: false,
          vertical: false
      };
      return PlayGround;
  }(react_1.default.Component));
  exports.default = PlayGround;
  //# sourceMappingURL=/examples/components/Play.js.map
  

});
