define('src/components/Range.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file Range
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_input_range_1 = tslib_1.__importDefault(require("node_modules/react-input-range/lib/js/index"));
  var uncontrollable_1 = tslib_1.__importDefault(require("node_modules/uncontrollable/index"));
  var theme_1 = require("src/theme.tsx");
  var Range = /** @class */ (function (_super) {
      tslib_1.__extends(Range, _super);
      function Range() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Range.prototype.render = function () {
          var _a = this.props, min = _a.min, max = _a.max, value = _a.value, className = _a.className, ns = _a.classPrefix, multiple = _a.multiple;
          var classNames = {
              activeTrack: multiple
                  ? ns + "InputRange-track is-active"
                  : ns + "InputRange-track",
              disabledInputRange: ns + "InputRange is-disabled",
              inputRange: ns + "InputRange",
              labelContainer: ns + "InputRange-labelContainer",
              maxLabel: ns + "InputRange-label " + ns + "InputRange-label--max",
              minLabel: ns + "InputRange-label " + ns + "InputRange-label--min",
              slider: ns + "InputRange-slider",
              sliderContainer: ns + "InputRange-sliderContainer",
              track: ns + "InputRange-track " + ns + "InputRange-track--background",
              valueLabel: ns + "InputRange-label " + ns + "InputRange-label--value"
          };
          return (react_1.default.createElement(react_input_range_1.default, tslib_1.__assign({}, this.props, { className: className, classNames: classNames, minValue: min, maxValue: max, value: value, multiple: multiple })));
      };
      Range.defaultProps = {
          min: 1,
          max: 100
      };
      return Range;
  }(react_1.default.Component));
  exports.Range = Range;
  exports.default = theme_1.themeable(uncontrollable_1.default(Range, {
      value: 'onChange'
  }));
  //# sourceMappingURL=/src/components/Range.js.map
  

});
