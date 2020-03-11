define('src/components/DatePicker.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file DatePicker
   * @description 时间选择器组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  require("node_modules/moment/locale/zh-cn");
  var icons_1 = require("src/components/icons.tsx");
  var PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  var Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  var theme_1 = require("src/theme.tsx");
  var Calendar_1 = tslib_1.__importDefault(require("src/components/calendar/Calendar.tsx"));
  var availableShortcuts = {
      today: {
          label: '今天',
          date: function (now) {
              return now.startOf('day');
          }
      },
      yesterday: {
          label: '昨天',
          date: function (now) {
              return now.add(-1, 'days').startOf('day');
          }
      },
      thisweek: {
          label: '本周一',
          date: function (now) {
              return now.startOf('week').add(-1, 'weeks');
          }
      },
      thismonth: {
          label: '本月初',
          date: function (now) {
              return now.startOf('month');
          }
      },
      prevmonth: {
          label: '上个月初',
          date: function (now) {
              return now.startOf('month').add(-1, 'month');
          }
      },
      prevquarter: {
          label: '上个季节初',
          date: function (now) {
              return now.startOf('quarter').add(-1, 'quarter');
          }
      },
      thisquarter: {
          label: '本季度初',
          date: function (now) {
              return now.startOf('quarter');
          }
      },
      tomorrow: {
          label: '明天',
          date: function (now) {
              return now.add(1, 'days').startOf('day');
          }
      },
      endofthisweek: {
          label: '本周日',
          date: function (now) {
              return now.endOf('week');
          }
      },
      endofthismonth: {
          label: '本月底',
          date: function (now) {
              return now.endOf('month');
          }
      }
  };
  var advancedShortcuts = [
      {
          regexp: /^(\d+)daysago$/,
          resolve: function (_, days) {
              return {
                  label: days + "\u5929\u524D",
                  date: function (now) {
                      return now.subtract(days, 'days');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)dayslater$/,
          resolve: function (_, days) {
              return {
                  label: days + "\u5929\u540E",
                  date: function (now) {
                      return now.add(days, 'days');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)weeksago$/,
          resolve: function (_, weeks) {
              return {
                  label: weeks + "\u5468\u524D",
                  date: function (now) {
                      return now.subtract(weeks, 'weeks');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)weekslater$/,
          resolve: function (_, weeks) {
              return {
                  label: weeks + "\u5468\u540E",
                  date: function (now) {
                      return now.add(weeks, 'weeks');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)monthsago$/,
          resolve: function (_, months) {
              return {
                  label: months + "\u6708\u524D",
                  date: function (now) {
                      return now.subtract(months, 'months');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)monthslater$/,
          resolve: function (_, months) {
              return {
                  label: months + "\u6708\u540E",
                  date: function (now) {
                      return now.add(months, 'months');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)quartersago$/,
          resolve: function (_, quarters) {
              return {
                  label: quarters + "\u5B63\u5EA6\u524D",
                  date: function (now) {
                      return now.subtract(quarters, 'quarters');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)quarterslater$/,
          resolve: function (_, quarters) {
              return {
                  label: quarters + "\u5B63\u5EA6\u540E",
                  date: function (now) {
                      return now.add(quarters, 'quarters');
                  }
              };
          }
      }
  ];
  var DatePicker = /** @class */ (function (_super) {
      tslib_1.__extends(DatePicker, _super);
      function DatePicker(props) {
          var _this = _super.call(this, props) || this;
          _this.state = {
              isOpened: false,
              isFocused: false,
              value: _this.props.value
                  ? moment_1.default(_this.props.value, _this.props.format)
                  : undefined
          };
          _this.domRef = function (ref) {
              _this.dom = ref;
          };
          _this.handleChange = _this.handleChange.bind(_this);
          _this.selectRannge = _this.selectRannge.bind(_this);
          _this.checkIsValidDate = _this.checkIsValidDate.bind(_this);
          _this.open = _this.open.bind(_this);
          _this.close = _this.close.bind(_this);
          _this.handleFocus = _this.handleFocus.bind(_this);
          _this.handleBlur = _this.handleBlur.bind(_this);
          _this.clearValue = _this.clearValue.bind(_this);
          _this.handleClick = _this.handleClick.bind(_this);
          _this.handleKeyPress = _this.handleKeyPress.bind(_this);
          _this.getParent = _this.getParent.bind(_this);
          _this.getTarget = _this.getTarget.bind(_this);
          _this.handlePopOverClick = _this.handlePopOverClick.bind(_this);
          _this.renderShortCuts = _this.renderShortCuts.bind(_this);
          return _this;
      }
      DatePicker.prototype.componentWillReceiveProps = function (nextProps) {
          if (this.props.value !== nextProps.value) {
              this.setState({
                  value: nextProps.value
                      ? moment_1.default(nextProps.value, nextProps.format)
                      : undefined
              });
          }
      };
      DatePicker.prototype.focus = function () {
          if (!this.dom) {
              return;
          }
          this.dom.focus();
      };
      DatePicker.prototype.handleFocus = function () {
          this.setState({
              isFocused: true
          });
      };
      DatePicker.prototype.handleBlur = function () {
          this.setState({
              isFocused: false
          });
      };
      DatePicker.prototype.handleKeyPress = function (e) {
          if (e.key === ' ') {
              this.handleClick();
          }
      };
      DatePicker.prototype.handleClick = function () {
          this.state.isOpened ? this.close() : this.open();
      };
      DatePicker.prototype.handlePopOverClick = function (e) {
          e.stopPropagation();
          e.preventDefault();
      };
      DatePicker.prototype.open = function (fn) {
          this.props.disabled ||
              this.setState({
                  isOpened: true
              }, fn);
      };
      DatePicker.prototype.close = function () {
          this.setState({
              isOpened: false
          });
      };
      DatePicker.prototype.clearValue = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var onChange = this.props.onChange;
          onChange('');
      };
      DatePicker.prototype.handleChange = function (value) {
          var _a = this.props, onChange = _a.onChange, format = _a.format, minTime = _a.minTime, maxTime = _a.maxTime, dateFormat = _a.dateFormat, timeFormat = _a.timeFormat, closeOnSelect = _a.closeOnSelect, utc = _a.utc;
          if (!moment_1.default.isMoment(value)) {
              return;
          }
          if (minTime && value && value.isBefore(minTime, 'second')) {
              value = minTime;
          }
          else if (maxTime && value && value.isAfter(maxTime, 'second')) {
              value = maxTime;
          }
          onChange(utc ? moment_1.default.utc(value).format(format) : value.format(format));
          if (closeOnSelect && dateFormat && !timeFormat) {
              this.close();
          }
      };
      DatePicker.prototype.selectRannge = function (item) {
          var closeOnSelect = this.props.closeOnSelect;
          var now = moment_1.default();
          this.handleChange(item.date(now));
          closeOnSelect && this.close();
      };
      DatePicker.prototype.checkIsValidDate = function (currentDate) {
          var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
          if (minDate && currentDate.isBefore(minDate, 'day')) {
              return false;
          }
          else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
              return false;
          }
          return true;
      };
      DatePicker.prototype.getTarget = function () {
          return this.dom;
      };
      DatePicker.prototype.getParent = function () {
          return this.dom;
      };
      DatePicker.prototype.getAvailableShortcuts = function (key) {
          if (availableShortcuts[key]) {
              return availableShortcuts[key];
          }
          for (var i = 0, len = advancedShortcuts.length; i < len; i++) {
              var item = advancedShortcuts[i];
              var m = item.regexp.exec(key);
              if (m) {
                  return item.resolve.apply(item, m);
              }
          }
          return null;
      };
      DatePicker.prototype.renderShortCuts = function (shortcuts) {
          var _this = this;
          if (!shortcuts) {
              return null;
          }
          var ns = this.props.classPrefix;
          var shortcutArr;
          if (typeof shortcuts === 'string') {
              shortcutArr = shortcuts.split(',');
          }
          else {
              shortcutArr = shortcuts;
          }
          return (react_1.default.createElement("ul", { className: ns + "DatePicker-shortcuts" }, shortcutArr.map(function (item) {
              if (!item) {
                  return null;
              }
              var shortcut = {};
              if (typeof item === 'string') {
                  shortcut = _this.getAvailableShortcuts(item);
                  shortcut.key = item;
              }
              else if (item.date) {
                  shortcut = tslib_1.__assign(tslib_1.__assign({}, item), { date: function () { return item.date; } });
              }
              return (react_1.default.createElement("li", { className: ns + "DatePicker-shortcut", onClick: function () { return _this.selectRannge(shortcut); }, key: shortcut.key || shortcut.label },
                  react_1.default.createElement("a", null, shortcut.label)));
          })));
      };
      DatePicker.prototype.render = function () {
          var _a = this.props, ns = _a.classPrefix, className = _a.className, value = _a.value, placeholder = _a.placeholder, disabled = _a.disabled, inputFormat = _a.inputFormat, dateFormat = _a.dateFormat, timeFormat = _a.timeFormat, viewMode = _a.viewMode, timeConstraints = _a.timeConstraints, popOverContainer = _a.popOverContainer, clearable = _a.clearable, shortcuts = _a.shortcuts, utc = _a.utc, overlayPlacement = _a.overlayPlacement;
          var isOpened = this.state.isOpened;
          var date = this.state.value;
          return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(ns + "DatePicker", {
                  'is-disabled': disabled,
                  'is-focused': this.state.isFocused
              }, className), ref: this.domRef, onClick: this.handleClick },
              date ? (react_1.default.createElement("span", { className: ns + "DatePicker-value" }, date.format(inputFormat))) : (react_1.default.createElement("span", { className: ns + "DatePicker-placeholder" }, placeholder)),
              clearable && !disabled && value ? (react_1.default.createElement("a", { className: ns + "DatePicker-clear", onClick: this.clearValue },
                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
              react_1.default.createElement("a", { className: ns + "DatePicker-toggler" }),
              isOpened ? (react_1.default.createElement(Overlay_1.default, { target: this.getTarget, container: popOverContainer || this.getParent, rootClose: false, placement: overlayPlacement, show: true },
                  react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "DatePicker-popover", onHide: this.close, overlay: true, onClick: this.handlePopOverClick },
                      this.renderShortCuts(shortcuts),
                      react_1.default.createElement(Calendar_1.default, { value: date, onChange: this.handleChange, requiredConfirm: !!(dateFormat && timeFormat), dateFormat: dateFormat, timeFormat: timeFormat, isValidDate: this.checkIsValidDate, viewMode: viewMode, timeConstraints: timeConstraints, input: false, onClose: this.close })))) : null));
      };
      DatePicker.defaultProps = {
          viewMode: 'days',
          shortcuts: '',
          closeOnSelect: true,
          overlayPlacement: 'auto'
      };
      return DatePicker;
  }(react_1.default.Component));
  exports.DatePicker = DatePicker;
  exports.default = theme_1.themeable(DatePicker);
  //# sourceMappingURL=/src/components/DatePicker.js.map
  

});