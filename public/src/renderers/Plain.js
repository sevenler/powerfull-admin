define('src/renderers/Plain.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var tpl_1 = require("src/utils/tpl.ts");
  var Plain = /** @class */ (function (_super) {
      tslib_1.__extends(Plain, _super);
      function Plain() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Plain.prototype.render = function () {
          var _a = this.props, className = _a.className, wrapperComponent = _a.wrapperComponent, value = _a.value, text = _a.text, data = _a.data, tpl = _a.tpl, inline = _a.inline, placeholder = _a.placeholder, cx = _a.classnames;
          var Component = wrapperComponent || (inline ? 'span' : 'div');
          return (react_1.default.createElement(Component, { className: cx('PlainField', className) }, tpl || text ? (tpl_1.filter(tpl || text, data)) : typeof value === 'undefined' || value === '' || value === null ? (react_1.default.createElement("span", { className: "text-muted" }, placeholder)) : (String(value))));
      };
      Plain.defaultProps = {
          wrapperComponent: '',
          inline: true,
          placeholder: '-'
      };
      return Plain;
  }(react_1.default.Component));
  exports.Plain = Plain;
  var PlainRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(PlainRenderer, _super);
      function PlainRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      PlainRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:plain|text)$/,
              name: 'plain'
          })
      ], PlainRenderer);
      return PlainRenderer;
  }(Plain));
  exports.PlainRenderer = PlainRenderer;
  //# sourceMappingURL=/src/renderers/Plain.js.map
  

});
