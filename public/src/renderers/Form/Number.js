define('src/renderers/Form/Number.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var rc_input_number_1 = tslib_1.__importDefault(require("node_modules/rc-input-number/lib/index"));
  var tpl_1 = require("src/utils/tpl.ts");
  var NumberControl = /** @class */ (function (_super) {
      tslib_1.__extends(NumberControl, _super);
      function NumberControl(props) {
          var _this = _super.call(this, props) || this;
          _this.handleChange = _this.handleChange.bind(_this);
          return _this;
      }
      NumberControl.prototype.handleChange = function (inputValue) {
          var _a = this.props, ns = _a.classPrefix, onChange = _a.onChange, resetValue = _a.resetValue;
          onChange(typeof inputValue === 'undefined' ? resetValue || '' : inputValue);
      };
      NumberControl.prototype.filterNum = function (value) {
          if (typeof value !== 'number') {
              value = tpl_1.filter(value, this.props.data);
              value = /^[-]?\d+/.test(value) ? parseInt(value, 10) : undefined;
          }
          return value;
      };
      NumberControl.prototype.render = function () {
          var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, step = _a.step, precision = _a.precision, max = _a.max, min = _a.min, disabled = _a.disabled, placeholder = _a.placeholder;
          var precisionProps = {};
          if (typeof precision === 'number') {
              precisionProps.precision = precision;
          }
          return (react_1.default.createElement("div", { className: classnames_1.default(ns + "NumberControl", className) },
              react_1.default.createElement(rc_input_number_1.default, tslib_1.__assign({ prefixCls: ns + "Number", value: value, step: step, max: this.filterNum(max), min: this.filterNum(min), onChange: this.handleChange, disabled: disabled, placeholder: placeholder }, precisionProps))));
      };
      NumberControl.defaultProps = {
          step: 1,
          resetValue: ''
      };
      return NumberControl;
  }(react_1.default.Component));
  exports.default = NumberControl;
  var NumberControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(NumberControlRenderer, _super);
      function NumberControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      NumberControlRenderer.defaultProps = {
          validations: 'isNumeric'
      };
      NumberControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'number'
          })
      ], NumberControlRenderer);
      return NumberControlRenderer;
  }(NumberControl));
  exports.NumberControlRenderer = NumberControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/Number.js.map
  

});
