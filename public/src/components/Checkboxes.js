define('src/components/Checkboxes.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file Checkboxes
   * @description 多选输入框
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var uncontrollable_1 = tslib_1.__importDefault(require("node_modules/uncontrollable/index"));
  var Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var chunk_1 = tslib_1.__importDefault(require("node_modules/lodash/chunk"));
  var helper_1 = require("src/utils/helper.ts");
  var theme_1 = require("src/theme.tsx");
  var Select_1 = require("src/components/Select.tsx");
  function value2array(value, props) {
      if (props.multi || props.multiple) {
          if (typeof value === "string") {
              value = value.split(props.delimiter || ",");
          }
          if (!Array.isArray(value)) {
              if (value === null || value === undefined) {
                  return [];
              }
              value = [value];
          }
          return value
              .map(function (value) {
              return expandValue(!props.joinValues &&
                  value &&
                  value.hasOwnProperty(props.valueField || "value")
                  ? value[props.valueField || "value"]
                  : value, props);
          })
              .filter(function (item) { return item; });
      }
      var expandedValue = expandValue(value, props);
      return expandedValue ? [expandedValue] : [];
  }
  exports.value2array = value2array;
  function expandValue(value, props) {
      var valueType = typeof value;
      if (valueType !== "string" &&
          valueType !== "number" &&
          valueType !== "boolean" &&
          valueType !== "object") {
          return null;
      }
      var options = props.options, valueField = props.valueField;
      if (!options) {
          return null;
      }
      if (valueType === "object" &&
          value &&
          value.hasOwnProperty(valueField || "value")) {
          value = value[valueField || "value"] || "";
      }
      return find_1.default(helper_1.flattenTree(options), Select_1.optionValueCompare(value, valueField || "value"));
  }
  exports.expandValue = expandValue;
  var Checkboxes = /** @class */ (function (_super) {
      tslib_1.__extends(Checkboxes, _super);
      function Checkboxes() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Checkboxes.prototype.toggleOption = function (option) {
          var _a = this.props, value = _a.value, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, options = _a.options;
          var valueArray = value2array(value, {
              multiple: true,
              valueField: valueField,
              delimiter: delimiter,
              options: options
          });
          var idx = valueArray.indexOf(option);
          if (!~idx) {
              option =
                  value2array(option[valueField || "value"], {
                      multiple: true,
                      valueField: valueField,
                      delimiter: delimiter,
                      options: options
                  })[0] || option;
              idx = valueArray.indexOf(option);
          }
          if (~idx) {
              valueArray.splice(idx, 1);
          }
          else {
              valueArray.push(option);
          }
          var newValue = valueArray;
          if (joinValues) {
              newValue = newValue
                  .map(function (item) { return item[valueField || "value"]; })
                  .join(delimiter);
          }
          else if (extractValue) {
              newValue = newValue.map(function (item) { return item[valueField || "value"]; });
          }
          onChange && onChange(newValue);
      };
      Checkboxes.prototype.render = function () {
          var _this = this;
          var _a = this.props, value = _a.value, valueField = _a.valueField, delimiter = _a.delimiter, options = _a.options, className = _a.className, placeholder = _a.placeholder, columnsCount = _a.columnsCount, disabled = _a.disabled, inline = _a.inline, labelClassName = _a.labelClassName;
          var valueArray = value2array(value, {
              multiple: true,
              valueField: valueField,
              delimiter: delimiter,
              options: options
          });
          var body = [];
          if (options) {
              body = options.map(function (option, key) { return (react_1.default.createElement(Checkbox_1.default, { key: key, onChange: function () { return _this.toggleOption(option); }, checked: !!~valueArray.indexOf(option), disabled: disabled || option.disabled, inline: inline, labelClassName: labelClassName }, option.label)); });
          }
          if (!inline && columnsCount > 1) {
              var cellClassName_1 = "col-sm-" + (12 / columnsCount)
                  .toFixed(1)
                  .replace(/\.0$/, "")
                  .replace(/\./, "-");
              body = chunk_1.default(body, columnsCount).map(function (group, groupIndex) { return (react_1.default.createElement("div", { className: "row", key: groupIndex }, group.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: cellClassName_1 }, item)); }))); });
          }
          return (react_1.default.createElement("div", { className: className }, body && body.length ? body : placeholder));
      };
      Checkboxes.defaultProps = {
          joinValues: true,
          extractValue: false,
          inline: false,
          delimiter: ",",
          columnsCount: 1 // 一行显示一个
      };
      return Checkboxes;
  }(react_1.default.PureComponent));
  exports.Checkboxes = Checkboxes;
  exports.default = theme_1.themeable(uncontrollable_1.default(Checkboxes, {
      value: "onChange"
  }));
  //# sourceMappingURL=/src/components/Checkboxes.js.map
  

});
