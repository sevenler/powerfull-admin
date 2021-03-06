define('src/renderers/Form/Switch.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var Switch_1 = tslib_1.__importDefault(require("src/components/Switch.tsx"));
  var SwitchControl = /** @class */ (function (_super) {
      tslib_1.__extends(SwitchControl, _super);
      function SwitchControl() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SwitchControl.prototype.render = function () {
          var _a = this.props, className = _a.className, ns = _a.classPrefix, cx = _a.classnames, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option, onChange = _a.onChange, disabled = _a.disabled, optionAtLeft = _a.optionAtLeft;
          return (react_1.default.createElement("div", { className: cx("SwitchControl", className) },
              optionAtLeft ? (react_1.default.createElement("span", { className: cx('Switch-option') }, option)) : null,
              react_1.default.createElement(Switch_1.default, { classPrefix: ns, value: value, trueValue: trueValue, falseValue: falseValue, disabled: disabled, onChange: onChange }),
              optionAtLeft ? null : (react_1.default.createElement("span", { className: cx('Switch-option') }, option))));
      };
      SwitchControl.defaultProps = {
          trueValue: true,
          falseValue: false,
          optionAtLeft: false
      };
      return SwitchControl;
  }(react_1.default.Component));
  exports.default = SwitchControl;
  var SwitchControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(SwitchControlRenderer, _super);
      function SwitchControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SwitchControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'switch',
              sizeMutable: false
          })
      ], SwitchControlRenderer);
      return SwitchControlRenderer;
  }(SwitchControl));
  exports.SwitchControlRenderer = SwitchControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/Switch.js.map
  

});
