define('src/renderers/Switch.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var Switch_1 = tslib_1.__importDefault(require("src/components/Switch.tsx"));
  var tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  var SwitchField = /** @class */ (function (_super) {
      tslib_1.__extends(SwitchField, _super);
      function SwitchField(props) {
          var _this = _super.call(this, props) || this;
          _this.handleChange = _this.handleChange.bind(_this);
          return _this;
      }
      SwitchField.prototype.handleChange = function (checked) {
          var _a;
          var _b = this.props, onQuickChange = _b.onQuickChange, name = _b.name, trueValue = _b.trueValue, falseValue = _b.falseValue, saveImmediately = _b.saveImmediately, readOnly = _b.readOnly, disabled = _b.disabled;
          onQuickChange &&
              !readOnly &&
              !disabled &&
              onQuickChange((_a = {},
                  _a[name] = checked ? trueValue : falseValue,
                  _a), saveImmediately);
      };
      SwitchField.prototype.render = function () {
          var _a = this.props, className = _a.className, ns = _a.classPrefix, placeholder = _a.placeholder, trueValue = _a.trueValue, falseValue = _a.falseValue, onQuickChange = _a.onQuickChange, option = _a.option, disabled = _a.disabled, name = _a.name, data = _a.data;
          var value = this.props.value;
          var viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
          var showOption = false;
          if (value === void 0 && name) {
              value = tpl_builtin_1.resolveVariable(name, data);
          }
          if (value !== void 0) {
              showOption = !!option;
              viewValue = (react_1.default.createElement(Switch_1.default, { inline: true, classPrefix: ns, checked: value == trueValue, onChange: this.handleChange, disabled: disabled || !onQuickChange }));
          }
          return (react_1.default.createElement("span", { className: classnames_1.default(ns + "SwitchField", className) },
              viewValue,
              showOption ? option : null));
      };
      SwitchField.defaultProps = {
          placeholder: '-',
          trueValue: true,
          falseValue: false,
          readOnly: true,
          saveImmediately: false
      };
      return SwitchField;
  }(react_1.default.Component));
  exports.SwitchField = SwitchField;
  var SwitchFieldRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(SwitchFieldRenderer, _super);
      function SwitchFieldRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SwitchFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)switch$/,
              name: 'switch'
          })
      ], SwitchFieldRenderer);
      return SwitchFieldRenderer;
  }(SwitchField));
  exports.SwitchFieldRenderer = SwitchFieldRenderer;
  //# sourceMappingURL=/src/renderers/Switch.js.map
  

});
