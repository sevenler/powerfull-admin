define('src/renderers/IFrame.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var helper_1 = require("src/utils/helper.ts");
  var Scoped_1 = require("src/Scoped.tsx");
  var api_1 = require("src/utils/api.ts");
  var IFrame = /** @class */ (function (_super) {
      tslib_1.__extends(IFrame, _super);
      function IFrame() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.IFrameRef = react_1.default.createRef();
          return _this;
      }
      // 当别的组件通知 iframe reload 的时候执行。
      IFrame.prototype.reload = function (subpath, query) {
          if (query) {
              return this.receive(query);
          }
          var _a = this.props, src = _a.src, data = _a.data;
          if (src) {
              this.IFrameRef.current.src = api_1.buildApi(src, data).url;
          }
      };
      // 当别的组件把数据发给 iframe 里面的时候执行。
      IFrame.prototype.receive = function (values) {
          var _a = this.props, src = _a.src, data = _a.data;
          if (src) {
              this.IFrameRef.current.src = api_1.buildApi(src, helper_1.createObject(data, values)).url;
          }
      };
      IFrame.prototype.render = function () {
          var _a = this.props, className = _a.className, src = _a.src, width = _a.width, height = _a.height, frameBorder = _a.frameBorder, data = _a.data, style = _a.style;
          style = tslib_1.__assign({}, style);
          width !== void 0 && (style.width = width);
          height !== void 0 && (style.height = height);
          return (react_1.default.createElement("iframe", { className: className, frameBorder: frameBorder, style: style, ref: this.IFrameRef, src: src ? api_1.buildApi(src, data).url : undefined }));
      };
      IFrame.propsList = ['src', 'className'];
      IFrame.defaultProps = {
          className: '',
          width: '100%',
          height: '100%',
          frameBorder: 0
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "reload", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "receive", null);
      return IFrame;
  }(react_1.default.Component));
  exports.default = IFrame;
  var IFrameRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(IFrameRenderer, _super);
      function IFrameRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      IFrameRenderer.prototype.componentWillMount = function () {
          var scoped = this.context;
          scoped.registerComponent(this);
      };
      IFrameRenderer.prototype.componentWillUnmount = function () {
          var scoped = this.context;
          scoped.unRegisterComponent(this);
      };
      IFrameRenderer.contextType = Scoped_1.ScopedContext;
      IFrameRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)iframe$/,
              name: 'iframe'
          })
      ], IFrameRenderer);
      return IFrameRenderer;
  }(IFrame));
  exports.IFrameRenderer = IFrameRenderer;
  //# sourceMappingURL=/src/renderers/IFrame.js.map
  

});
