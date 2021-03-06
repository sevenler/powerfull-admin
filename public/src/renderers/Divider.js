define('src/renderers/Divider.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Divider = /** @class */ (function (_super) {
      tslib_1.__extends(Divider, _super);
      function Divider() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Divider.prototype.render = function () {
          var _a = this.props, cx = _a.classnames, className = _a.className, lineStyle = _a.lineStyle;
          return (react_1.default.createElement("div", { className: cx('Divider', lineStyle ? "Divider--" + lineStyle : '', className) }));
      };
      Divider.defaultProps = {
          className: '',
          lineStyle: 'dashed'
      };
      return Divider;
  }(react_1.default.Component));
  exports.default = Divider;
  var DividerRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(DividerRenderer, _super);
      function DividerRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      DividerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:divider|hr)$/,
              name: 'divider'
          })
      ], DividerRenderer);
      return DividerRenderer;
  }(Divider));
  exports.DividerRenderer = DividerRenderer;
  //# sourceMappingURL=/src/renderers/Divider.js.map
  

});
