define('src/components/DateRangePicker.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file DateRangePicker
   * @description 自定义日期范围时间选择器组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var icons_1 = require("src/components/icons.tsx");
  var Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  var Calendar_1 = tslib_1.__importDefault(require("src/components/calendar/Calendar.tsx"));
  var PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  var theme_1 = require("src/theme.tsx");
  var helper_1 = require("src/utils/helper.ts");
  var availableRanges = {
      'today': {
          label: '今天',
          startDate: function (now) {
              return now.startOf('day');
          },
          endDate: function (now) {
              return now;
          }
      },
      'yesterday': {
          label: '昨天',
          startDate: function (now) {
              return now.add(-1, 'days').startOf('day');
          },
          endDate: function (now) {
              return now.add(-1, 'days').endOf('day');
          }
      },
      '1dayago': {
          label: '最近1天',
          startDate: function (now) {
              return now.add(-1, 'days');
          },
          endDate: function (now) {
              return now;
          }
      },
      '7daysago': {
          label: '最近7天',
          startDate: function (now) {
              return now.add(-7, 'days').startOf('day');
          },
          endDate: function (now) {
              return now.add(-1, 'days').endOf('day');
          }
      },
      '90daysago': {
          label: '最近90天',
          startDate: function (now) {
              return now.add(-90, 'days').startOf('day');
          },
          endDate: function (now) {
              return now.add(-1, 'days').endOf('day');
          }
      },
      'prevweek': {
          label: '上周',
          startDate: function (now) {
              return now.startOf('week').add(-1, 'weeks');
          },
          endDate: function (now) {
              return now
                  .startOf('week')
                  .add(-1, 'days')
                  .endOf('day');
          }
      },
      'thismonth': {
          label: '本月',
          startDate: function (now) {
              return now.startOf('month');
          },
          endDate: function (now) {
              return now;
          }
      },
      'prevmonth': {
          label: '上个月',
          startDate: function (now) {
              return now.startOf('month').add(-1, 'month');
          },
          endDate: function (now) {
              return now
                  .startOf('month')
                  .add(-1, 'day')
                  .endOf('day');
          }
      },
      'prevquarter': {
          label: '上个季节',
          startDate: function (now) {
              return now.startOf('quarter').add(-1, 'quarter');
          },
          endDate: function (now) {
              return now
                  .startOf('quarter')
                  .add(-1, 'day')
                  .endOf('day');
          }
      },
      'thisquarter': {
          label: '本季度',
          startDate: function (now) {
              return now.startOf('quarter');
          },
          endDate: function (now) {
              return now;
          }
      }
  };
  var DateRangePicker = /** @class */ (function (_super) {
      tslib_1.__extends(DateRangePicker, _super);
      function DateRangePicker(props) {
          var _this = _super.call(this, props) || this;
          _this.nextMonth = moment_1.default().add(1, 'months');
          _this.open = _this.open.bind(_this);
          _this.close = _this.close.bind(_this);
          _this.handleStartChange = _this.handleStartChange.bind(_this);
          _this.handleEndChange = _this.handleEndChange.bind(_this);
          _this.handleFocus = _this.handleFocus.bind(_this);
          _this.handleBlur = _this.handleBlur.bind(_this);
          _this.checkStartIsValidDate = _this.checkStartIsValidDate.bind(_this);
          _this.checkEndIsValidDate = _this.checkEndIsValidDate.bind(_this);
          _this.confirm = _this.confirm.bind(_this);
          _this.clearValue = _this.clearValue.bind(_this);
          _this.dom = react_1.default.createRef();
          _this.handleClick = _this.handleClick.bind(_this);
          _this.handleKeyPress = _this.handleKeyPress.bind(_this);
          _this.handlePopOverClick = _this.handlePopOverClick.bind(_this);
          _this.renderDay = _this.renderDay.bind(_this);
          var _a = _this.props, format = _a.format, joinValues = _a.joinValues, delimiter = _a.delimiter, value = _a.value;
          _this.state = tslib_1.__assign({ isOpened: false, isFocused: false }, DateRangePicker.unFormatValue(value, format, joinValues, delimiter));
          return _this;
      }
      DateRangePicker.formatValue = function (newValue, format, joinValues, delimiter, utc) {
          if (utc === void 0) { utc = false; }
          newValue = [
              (utc ? moment_1.default.utc(newValue.startDate) : newValue.startDate).format(format),
              (utc ? moment_1.default.utc(newValue.endDate) : newValue.endDate).format(format)
          ];
          if (joinValues) {
              newValue = newValue.join(delimiter);
          }
          return newValue;
      };
      DateRangePicker.unFormatValue = function (value, format, joinValues, delimiter) {
          if (!value) {
              return {
                  startDate: undefined,
                  endDate: undefined
              };
          }
          if (joinValues && typeof value === 'string') {
              value = value.split(delimiter);
          }
          return {
              startDate: value[0] ? moment_1.default(value[0], format) : undefined,
              endDate: value[1] ? moment_1.default(value[1], format) : undefined
          };
      };
      DateRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
          var props = this.props;
          var value = nextProps.value, format = nextProps.format, joinValues = nextProps.joinValues, delimiter = nextProps.delimiter;
          if (props.value !== value) {
              this.setState(tslib_1.__assign({}, DateRangePicker.unFormatValue(value, format, joinValues, delimiter)));
          }
      };
      DateRangePicker.prototype.focus = function () {
          if (!this.dom.current || this.props.disabled) {
              return;
          }
          this.dom.current.focus();
      };
      DateRangePicker.prototype.blur = function () {
          if (!this.dom.current || this.props.disabled) {
              return;
          }
          this.dom.current.blur();
      };
      DateRangePicker.prototype.handleFocus = function () {
          this.setState({
              isFocused: true
          });
      };
      DateRangePicker.prototype.handleBlur = function () {
          this.setState({
              isFocused: false
          });
      };
      DateRangePicker.prototype.open = function () {
          if (this.props.disabled) {
              return;
          }
          this.setState({
              isOpened: true
          });
      };
      DateRangePicker.prototype.close = function () {
          this.setState({
              isOpened: false
          }, this.blur);
      };
      DateRangePicker.prototype.handleClick = function () {
          this.state.isOpened ? this.close() : this.open();
      };
      DateRangePicker.prototype.handlePopOverClick = function (e) {
          e.stopPropagation();
          e.preventDefault();
      };
      DateRangePicker.prototype.handleKeyPress = function (e) {
          if (e.key === ' ') {
              this.handleClick();
          }
      };
      DateRangePicker.prototype.confirm = function () {
          if (!this.state.startDate || !this.state.endDate) {
              return;
          }
          else if (this.state.startDate.isAfter(this.state.endDate)) {
              return;
          }
          this.props.onChange(DateRangePicker.formatValue({
              startDate: this.state.startDate,
              endDate: this.state.endDate
          }, this.props.format, this.props.joinValues, this.props.delimiter, this.props.utc));
          this.close();
      };
      DateRangePicker.prototype.handleStartChange = function (newValue) {
          if (this.state.startDate &&
              !this.state.endDate &&
              newValue.isAfter(this.state.startDate)) {
              return this.setState({
                  endDate: newValue.clone()
              });
          }
          this.setState({
              startDate: newValue.clone()
          });
      };
      DateRangePicker.prototype.handleEndChange = function (newValue) {
          newValue =
              !this.state.endDate && !this.props.timeFormat
                  ? newValue.endOf('day')
                  : newValue;
          if (this.state.endDate &&
              !this.state.startDate &&
              newValue.isBefore(this.state.endDate)) {
              return this.setState({
                  startDate: newValue.clone()
              });
          }
          this.setState({
              endDate: newValue.clone()
          });
      };
      DateRangePicker.prototype.selectRannge = function (range) {
          var closeOnSelect = this.props.closeOnSelect;
          var now = moment_1.default();
          this.setState({
              startDate: range.startDate(now.clone()),
              endDate: range.endDate(now.clone())
          }, closeOnSelect ? this.confirm : helper_1.noop);
      };
      DateRangePicker.prototype.renderRanges = function (ranges) {
          var _this = this;
          if (!ranges) {
              return null;
          }
          var ns = this.props.classPrefix;
          var rangeArr;
          if (typeof ranges === 'string') {
              rangeArr = ranges.split(',');
          }
          else {
              rangeArr = ranges;
          }
          return (react_1.default.createElement("ul", { className: ns + "DateRangePicker-rangers" }, rangeArr.map(function (item) {
              if (!item) {
                  return null;
              }
              var range = {};
              if (typeof item === 'string') {
                  range = availableRanges[item];
                  range.key = item;
              }
              else if (item.startDate &&
                  item.endDate) {
                  range = tslib_1.__assign(tslib_1.__assign({}, item), { startDate: function () { return item.startDate; }, endDate: function () { return item.endDate; } });
              }
              return (react_1.default.createElement("li", { className: ns + "DateRangePicker-ranger", onClick: function () { return _this.selectRannge(range); }, key: range.key || range.label },
                  react_1.default.createElement("a", null, range.label)));
          })));
      };
      DateRangePicker.prototype.clearValue = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
          onChange(resetValue);
      };
      DateRangePicker.prototype.checkStartIsValidDate = function (currentDate) {
          var endDate = this.state.endDate;
          var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
          maxDate =
              maxDate && endDate
                  ? maxDate.isBefore(endDate)
                      ? maxDate
                      : endDate
                  : maxDate || endDate;
          if (minDate && currentDate.isBefore(minDate, 'day')) {
              return false;
          }
          else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
              return false;
          }
          return true;
      };
      DateRangePicker.prototype.checkEndIsValidDate = function (currentDate) {
          var startDate = this.state.startDate;
          var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
          minDate =
              minDate && startDate
                  ? minDate.isAfter(startDate)
                      ? minDate
                      : startDate
                  : minDate || startDate;
          if (minDate && currentDate.isBefore(minDate, 'day')) {
              return false;
          }
          else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
              return false;
          }
          return true;
      };
      DateRangePicker.prototype.renderDay = function (props, currentDate) {
          var _a = this.state, startDate = _a.startDate, endDate = _a.endDate;
          if (startDate &&
              endDate &&
              currentDate.isBetween(startDate, endDate, 'day', '[]')) {
              props.className += ' rdtBetween';
          }
          return react_1.default.createElement("td", tslib_1.__assign({}, props), currentDate.date());
      };
      DateRangePicker.prototype.render = function () {
          var _this = this;
          var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, placeholder = _a.placeholder, popOverContainer = _a.popOverContainer, inputFormat = _a.inputFormat, format = _a.format, dateFormat = _a.dateFormat, joinValues = _a.joinValues, delimiter = _a.delimiter, clearable = _a.clearable, timeFormat = _a.timeFormat, ranges = _a.ranges, disabled = _a.disabled, iconClassName = _a.iconClassName, overlayPlacement = _a.overlayPlacement;
          var _b = this.state, isOpened = _b.isOpened, isFocused = _b.isFocused, startDate = _b.startDate, endDate = _b.endDate;
          var selectedDate = DateRangePicker.unFormatValue(value, format, joinValues, delimiter);
          var startViewValue = selectedDate.startDate
              ? selectedDate.startDate.format(inputFormat)
              : '';
          var endViewValue = selectedDate.endDate
              ? selectedDate.endDate.format(inputFormat)
              : '';
          var arr = [];
          startViewValue && arr.push(startViewValue);
          endViewValue && arr.push(endViewValue);
          return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(ns + "DateRangePicker", {
                  'is-disabled': disabled,
                  'is-focused': isFocused
              }, className), ref: this.dom, onClick: this.handleClick },
              arr.length ? (react_1.default.createElement("span", { className: ns + "DateRangePicker-value" }, arr.join(' 至 '))) : (react_1.default.createElement("span", { className: ns + "DateRangePicker-placeholder" }, placeholder)),
              clearable && !disabled && value ? (react_1.default.createElement("a", { className: ns + "DateRangePicker-clear", onClick: this.clearValue },
                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
              react_1.default.createElement("a", { className: ns + "DateRangePicker-toggler" },
                  react_1.default.createElement("i", { className: iconClassName })),
              isOpened ? (react_1.default.createElement(Overlay_1.default, { target: function () { return _this.dom.current; }, onHide: this.close, container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), rootClose: false, placement: overlayPlacement, show: true },
                  react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "DateRangePicker-popover", onHide: this.close, onClick: this.handlePopOverClick, overlay: true },
                      react_1.default.createElement("div", { className: ns + "DateRangePicker-wrap" },
                          this.renderRanges(ranges),
                          react_1.default.createElement(Calendar_1.default, { className: ns + "DateRangePicker-start", value: startDate, onChange: this.handleStartChange, requiredConfirm: false, dateFormat: dateFormat, timeFormat: timeFormat, isValidDate: this.checkStartIsValidDate, viewMode: "days", input: false, onClose: this.close, renderDay: this.renderDay }),
                          react_1.default.createElement(Calendar_1.default, { className: ns + "DateRangePicker-end", value: endDate, onChange: this.handleEndChange, requiredConfirm: false, dateFormat: dateFormat, timeFormat: timeFormat, viewDate: this.nextMonth, isEndDate: true, isValidDate: this.checkEndIsValidDate, viewMode: "days", input: false, onClose: this.close, renderDay: this.renderDay }),
                          react_1.default.createElement("div", { key: "button", className: ns + "DateRangePicker-actions" },
                              react_1.default.createElement("a", { className: classnames_1.default('rdtBtn rdtBtnConfirm', {
                                      'is-disabled': !this.state.startDate || !this.state.endDate
                                  }), onClick: this.confirm }, "\u786E\u8BA4"),
                              react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.close }, "\u53D6\u6D88")))))) : null));
      };
      DateRangePicker.defaultProps = {
          placeholder: '请选择日期范围',
          format: 'X',
          inputFormat: 'YYYY-MM-DD',
          joinValues: true,
          clearable: true,
          delimiter: ',',
          ranges: 'yesterday,7daysago,prevweek,thismonth,prevmonth,prevquarter',
          iconClassName: 'fa fa-calendar',
          resetValue: '',
          closeOnSelect: true,
          overlayPlacement: 'auto'
      };
      return DateRangePicker;
  }(react_1.default.Component));
  exports.DateRangePicker = DateRangePicker;
  exports.default = theme_1.themeable(DateRangePicker);
  //# sourceMappingURL=/src/components/DateRangePicker.js.map
  

});
