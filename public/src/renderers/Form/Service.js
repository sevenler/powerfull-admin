define('src/renderers/Form/Service.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Service_1 = tslib_1.__importDefault(require("src/renderers/Service.tsx"));
  var Scoped_1 = require("src/Scoped.tsx");
  var service_1 = require("src/store/service.ts");
  var ServiceRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ServiceRenderer, _super);
      function ServiceRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ServiceRenderer.prototype.componentWillMount = function () {
          var scoped = this.context;
          scoped.registerComponent(this);
      };
      ServiceRenderer.prototype.componentDidMount = function () {
          var _a = this.props, formInited = _a.formInited, addHook = _a.addHook;
          // form层级下的所有service应该都会走这里
          // 但是传入props有可能是undefined，所以做个处理
          if (formInited !== false) {
              _super.prototype.componentDidMount.call(this);
          }
          else {
              addHook && addHook(this.initFetch, 'init');
          }
      };
      ServiceRenderer.prototype.componentDidUpdate = function (prevProps) {
          var formInited = this.props.formInited;
          if (formInited !== false) {
              _super.prototype.componentDidUpdate.call(this, prevProps);
          }
      };
      ServiceRenderer.prototype.componentWillUnmount = function () {
          var scoped = this.context;
          scoped.unRegisterComponent(this);
          var removeHook = this.props.removeHook;
          removeHook && removeHook(this.initFetch, 'init');
          _super.prototype.componentWillUnmount.call(this);
      };
      ServiceRenderer.prototype.renderBody = function () {
          var _a = this.props, render = _a.render, store = _a.store, schema = _a.body, controls = _a.controls, tabs = _a.tabs, feildSet = _a.feildSet, renderFormItems = _a.renderFormItems, formMode = _a.formMode, $path = _a.$path, cx = _a.classnames;
          var finnalSchema = store.schema ||
              schema || {
              controls: controls,
              tabs: tabs,
              feildSet: feildSet
          };
          if (finnalSchema &&
              !finnalSchema.type &&
              (finnalSchema.controls || finnalSchema.tabs || finnalSchema.feildSet) &&
              renderFormItems) {
              return (react_1.default.createElement("div", { key: store.schemaKey || 'forms', className: cx("Form--" + (formMode || 'normal')) }, renderFormItems(finnalSchema, 'controls', {
                  store: store,
                  data: store.data,
                  render: render
              })));
          }
          return _super.prototype.renderBody.call(this);
      };
      ServiceRenderer.contextType = Scoped_1.ScopedContext;
      ServiceRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form\/(.*)\/service$/,
              weight: -100,
              storeType: service_1.ServiceStore.name,
              storeExtendsData: false,
              name: 'service-control'
          })
      ], ServiceRenderer);
      return ServiceRenderer;
  }(Service_1.default));
  exports.ServiceRenderer = ServiceRenderer;
  //# sourceMappingURL=/src/renderers/Form/Service.js.map
  

});
