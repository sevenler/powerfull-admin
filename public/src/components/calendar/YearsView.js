define('src/components/calendar/YearsView.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  var YearsView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/YearsView"));
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var CustomYearsView = /** @class */ (function (_super) {
      tslib_1.__extends(CustomYearsView, _super);
      function CustomYearsView() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.renderYear = function (props, year) {
              return (react_1.default.createElement("td", tslib_1.__assign({}, props),
                  react_1.default.createElement("span", null, year)));
          };
          return _this;
      }
      CustomYearsView.prototype.render = function () {
          var year = this.props.viewDate.year();
          year = year - (year % 10);
          return (react_1.default.createElement("div", { className: "rdtYears" },
              react_1.default.createElement("table", null,
                  react_1.default.createElement("thead", null,
                      react_1.default.createElement("tr", null,
                          react_1.default.createElement("th", { className: "rdtPrev", onClick: this.props.subtractTime(10, 'years') }, "\u00AB"),
                          react_1.default.createElement("th", { className: "rdtSwitch" },
                              year,
                              "\u5E74-",
                              year + 9,
                              "\u5E74"),
                          react_1.default.createElement("th", { className: "rdtNext", onClick: this.props.addTime(10, 'years') }, "\u00BB")))),
              react_1.default.createElement("table", null,
                  react_1.default.createElement("tbody", null, this.renderYears(year)))));
      };
      return CustomYearsView;
  }(YearsView_1.default));
  exports.default = CustomYearsView;
  //# sourceMappingURL=/src/components/calendar/YearsView.js.map
  

});
