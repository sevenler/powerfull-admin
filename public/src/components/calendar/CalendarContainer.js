define('src/components/calendar/CalendarContainer.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  var CalendarContainer_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/CalendarContainer"));
  var DaysView_1 = tslib_1.__importDefault(require("src/components/calendar/DaysView.tsx"));
  var YearsView_1 = tslib_1.__importDefault(require("src/components/calendar/YearsView.tsx"));
  var MonthsView_1 = tslib_1.__importDefault(require("src/components/calendar/MonthsView.tsx"));
  var CustomCalendarContainer = /** @class */ (function (_super) {
      tslib_1.__extends(CustomCalendarContainer, _super);
      function CustomCalendarContainer() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.viewComponents = tslib_1.__assign(tslib_1.__assign({}, _this.viewComponents), { days: DaysView_1.default, years: YearsView_1.default, months: MonthsView_1.default });
          return _this;
      }
      return CustomCalendarContainer;
  }(CalendarContainer_1.default));
  exports.default = CustomCalendarContainer;
  //# sourceMappingURL=/src/components/calendar/CalendarContainer.js.map
  

});
