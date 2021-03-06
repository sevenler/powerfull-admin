define('src/renderers/Icon.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Icon = /** @class */ (function (_super) {
      tslib_1.__extends(Icon, _super);
      function Icon() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Icon.prototype.render = function () {
          var _a = this.props, icon = _a.icon, vendor = _a.vendor, cx = _a.classnames, className = _a.className;
          return (react_1.default.createElement("i", { className: cx(vendor === 'iconfont'
                  ? "iconfont icon-" + icon
                  : vendor + " " + vendor + "-" + icon, className) }));
      };
      Icon.defaultProps = {
          icon: '',
          vendor: 'fa'
      };
      return Icon;
  }(react_1.default.Component));
  exports.Icon = Icon;
  var TplRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(TplRenderer, _super);
      function TplRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      TplRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)icon$/,
              name: 'icon'
          })
      ], TplRenderer);
      return TplRenderer;
  }(Icon));
  exports.TplRenderer = TplRenderer;
  //# sourceMappingURL=/src/renderers/Icon.js.map
  

});
