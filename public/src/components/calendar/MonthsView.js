define('src/components/calendar/MonthsView.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  var MonthsView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/MonthsView"));
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var CustomMonthsView = /** @class */ (function (_super) {
      tslib_1.__extends(CustomMonthsView, _super);
      function CustomMonthsView() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.renderMonth = function (props, month) {
              var localMoment = _this.props.viewDate;
              var monthStr = localMoment
                  .localeData()
                  .monthsShort(localMoment.month(month));
              var strLength = 3;
              // Because some months are up to 5 characters long, we want to
              // use a fixed string length for consistency
              var monthStrFixedLength = monthStr.substring(0, strLength);
              return (react_1.default.createElement("td", tslib_1.__assign({}, props),
                  react_1.default.createElement("span", null, monthStrFixedLength)));
          };
          return _this;
      }
      CustomMonthsView.prototype.render = function () {
          return (react_1.default.createElement("div", { className: "rdtMonths" },
              react_1.default.createElement("table", null,
                  react_1.default.createElement("thead", null,
                      react_1.default.createElement("tr", null,
                          react_1.default.createElement("th", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'years') }, "\u00AB"),
                          react_1.default.createElement("th", { className: "rdtSwitch" },
                              this.props.viewDate.year(),
                              "\u5E74"),
                          react_1.default.createElement("th", { className: "rdtNext", onClick: this.props.addTime(1, 'years') }, "\u00BB")))),
              react_1.default.createElement("table", null,
                  react_1.default.createElement("tbody", null, this.renderMonths()))));
      };
      return CustomMonthsView;
  }(MonthsView_1.default));
  exports.default = CustomMonthsView;
  //# sourceMappingURL=/src/components/calendar/MonthsView.js.map
  

});
