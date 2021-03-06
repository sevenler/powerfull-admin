define('src/components/calendar/Calendar.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 基于 react-datetime 改造。
   */
  var react_datetime_1 = tslib_1.__importDefault(require("node_modules/react-datetime/DateTime"));
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var CalendarContainer_1 = tslib_1.__importDefault(require("src/components/calendar/CalendarContainer.tsx"));
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var BaseDatePicker = /** @class */ (function (_super) {
      tslib_1.__extends(BaseDatePicker, _super);
      function BaseDatePicker() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.getComponentProps = (function (origin) {
              return function () {
                  var props = origin.call(_this);
                  props.setDateTimeState = _this.setState.bind(_this);
                  [
                      'onChange',
                      'onClose',
                      'requiredConfirm',
                      'classPrefix',
                      'prevIcon',
                      'nextIcon',
                      'isEndDate'
                  ].forEach(function (key) { return (props[key] = _this.props[key]); });
                  return props;
              };
          })(_this.getComponentProps);
          _this.setDate = function (type) {
              var nextViews = {
                  month: 'days',
                  year: 'days'
              };
              return function (e) {
                  _this.setState({
                      viewDate: _this.state.viewDate
                          .clone()[type](parseInt(e.target.closest('td').getAttribute('data-value'), 10))
                          .startOf(type),
                      currentView: nextViews[type]
                  });
                  _this.props.onViewModeChange(nextViews[type]);
              };
          };
          return _this;
      }
      BaseDatePicker.prototype.render = function () {
          var Component = CalendarContainer_1.default;
          return (react_1.default.createElement("div", { className: classnames_1.default('rdt rdtStatic rdtOpen', this.props.className) },
              react_1.default.createElement("div", { key: "dt", className: "rdtPicker" },
                  react_1.default.createElement(Component, { view: this.state.currentView, viewProps: this.getComponentProps() }))));
      };
      return BaseDatePicker;
  }(react_datetime_1.default));
  var Calendar = BaseDatePicker;
  exports.default = Calendar;
  //# sourceMappingURL=/src/components/calendar/Calendar.js.map
  

});
