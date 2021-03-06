define('src/components/Switch.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file Switch
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var theme_1 = require("src/theme.tsx");
  var sizeMap = {
      md: 'i-switch-md',
      lg: 'i-switch-lg',
      middle: 'i-switch-md',
      large: 'i-switch-lg'
  };
  var levelMap = {
      info: 'bg-info',
      primary: 'bg-primary',
      danger: 'bg-danger'
  };
  var Switch = /** @class */ (function (_super) {
      tslib_1.__extends(Switch, _super);
      function Switch(props) {
          var _this = _super.call(this, props) || this;
          _this.hanldeCheck = _this.hanldeCheck.bind(_this);
          return _this;
      }
      Switch.prototype.hanldeCheck = function (e) {
          var _a = this.props, trueValue = _a.trueValue, falseValue = _a.falseValue, onChange = _a.onChange;
          if (!onChange) {
              return;
          }
          onChange(e.currentTarget.checked ? trueValue : falseValue);
      };
      Switch.prototype.render = function () {
          var _a = this.props, size = _a.size, level = _a.level, className = _a.className, classPrefix = _a.classPrefix, onChange = _a.onChange, value = _a.value, inline = _a.inline, trueValue = _a.trueValue, falseValue = _a.falseValue, disabled = _a.disabled, readOnly = _a.readOnly, checked = _a.checked, cx = _a.classnames, rest = tslib_1.__rest(_a, ["size", "level", "className", "classPrefix", "onChange", "value", "inline", "trueValue", "falseValue", "disabled", "readOnly", "checked", "classnames"]);
          className =
              (className ? className : '') +
                  (size && sizeMap[size] ? " " + sizeMap[size] : '') +
                  (level && levelMap[level] ? " " + levelMap[level] : '');
          return (react_1.default.createElement("label", { className: cx("Switch", disabled ? 'is-disabled' : '', className) },
              react_1.default.createElement("input", tslib_1.__assign({ type: "checkbox", checked: typeof checked !== 'undefined'
                      ? checked
                      : typeof value === 'undefined'
                          ? false
                          : value == trueValue, onChange: this.hanldeCheck, disabled: disabled, readOnly: readOnly }, rest)),
              react_1.default.createElement("i", null)));
      };
      Switch.defaultProps = {
          trueValue: true,
          falseValue: false
      };
      return Switch;
  }(react_1.default.PureComponent));
  exports.Switch = Switch;
  exports.default = theme_1.themeable(Switch);
  //# sourceMappingURL=/src/components/Switch.js.map
  

});
