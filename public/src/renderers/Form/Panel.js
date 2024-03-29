define('src/renderers/Form/Panel.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Panel_1 = tslib_1.__importDefault(require("src/renderers/Panel.tsx"));
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var PanelRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(PanelRenderer, _super);
      function PanelRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      PanelRenderer.prototype.renderBody = function () {
          var _a = this.props, render = _a.render, renderFormItems = _a.renderFormItems, body = _a.body, bodyClassName = _a.bodyClassName, controls = _a.controls, tabs = _a.tabs, fieldSet = _a.fieldSet, mode = _a.mode, formMode = _a.formMode, horizontal = _a.horizontal, $path = _a.$path, ns = _a.classPrefix;
          if (!body && (controls || tabs || fieldSet)) {
              var props = {};
              mode && (props.mode = mode);
              horizontal && (props.horizontal = horizontal);
              return (react_1.default.createElement("div", { className: classnames_1.default(ns + "Form--" + (props.mode || formMode || 'normal'), bodyClassName) }, renderFormItems({
                  controls: controls,
                  tabs: tabs,
                  fieldSet: fieldSet
              }, $path.replace(/^.*form\//, ''), props)));
          }
          return _super.prototype.renderBody.call(this);
      };
      PanelRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?panel$/,
              weight: -100,
              name: 'panel-control'
          })
      ], PanelRenderer);
      return PanelRenderer;
  }(Panel_1.default));
  exports.PanelRenderer = PanelRenderer;
  //# sourceMappingURL=/src/renderers/Form/Panel.js.map
  

});
