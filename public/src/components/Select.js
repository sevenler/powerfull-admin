define('src/components/Select.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file Select
   * @description
   * @author fex
   * @date 2017-11-07
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var uncontrollable_1 = tslib_1.__importDefault(require("node_modules/uncontrollable/index"));
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  ''/*@require node_modules/react-datetime/css/react-datetime.css*/;
  var Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  var PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  var downshift_1 = tslib_1.__importDefault(require("node_modules/downshift/dist/downshift.cjs"));
  var icons_1 = require("src/components/icons.tsx");
  // @ts-ignore
  var match_sorter_1 = tslib_1.__importDefault(require("node_modules/match-sorter/dist/match-sorter.cjs"));
  var helper_1 = require("src/utils/helper.ts");
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  var union_1 = tslib_1.__importDefault(require("node_modules/lodash/union"));
  var Options_1 = require("src/renderers/Form/Options.tsx");
  var react_dom_1 = require("node_modules/react-dom/index");
  var theme_1 = require("src/theme.tsx");
  var Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  var Input_1 = tslib_1.__importDefault(require("src/components/Input.tsx"));
  function value2array(value, props) {
      if (props.multi || props.multiple) {
          if (typeof value === 'string') {
              value = value.split(props.delimiter || ',');
          }
          if (!Array.isArray(value)) {
              if (value === null || value === undefined) {
                  return [];
              }
              value = [value];
          }
          return value
              .map(function (value) { return expandValue(value, props); })
              .filter(function (item) { return item; });
      }
      else if (Array.isArray(value)) {
          value = value[0];
      }
      var expandedValue = expandValue(value, props);
      return expandedValue ? [expandedValue] : [];
  }
  exports.value2array = value2array;
  function expandValue(value, props) {
      var valueType = typeof value;
      if (valueType !== 'string' &&
          valueType !== 'number' &&
          valueType !== 'boolean') {
          return value;
      }
      var options = props.options;
      if (!options) {
          return null;
      }
      return find_1.default(options, optionValueCompare(value, props.valueField || 'value'));
  }
  exports.expandValue = expandValue;
  function matchOptionValue(a, b, valueField) {
      if (valueField === void 0) { valueField = 'value'; }
      return helper_1.isObject(a)
          ? a === b[valueField || 'value']
          : String(b[valueField || 'value']) === String(a);
  }
  exports.matchOptionValue = matchOptionValue;
  function optionValueCompare(a, valueField) {
      if (valueField === void 0) { valueField = 'value'; }
      return function (b) { return matchOptionValue(a, b, valueField); };
  }
  exports.optionValueCompare = optionValueCompare;
  function normalizeOptions(options) {
      if (typeof options === 'string') {
          return options.split(',').map(function (item) { return ({
              label: item,
              value: item
          }); });
      }
      else if (Array.isArray(options) &&
          typeof options[0] === 'string') {
          return options.map(function (item) { return ({
              label: item,
              value: item
          }); });
      }
      else if (Array.isArray(options)) {
          return options.map(function (item) {
              var option = tslib_1.__assign(tslib_1.__assign({}, item), { value: item && item.value });
              if (typeof option.children !== 'undefined') {
                  option.children = normalizeOptions(option.children);
              }
              return option;
          });
      }
      else if (isPlainObject_1.default(options)) {
          return Object.keys(options).map(function (key) { return ({
              label: options[key],
              value: key
          }); });
      }
      return [];
  }
  exports.normalizeOptions = normalizeOptions;
  var DownshiftChangeTypes = downshift_1.default.stateChangeTypes;
  var Select = /** @class */ (function (_super) {
      tslib_1.__extends(Select, _super);
      function Select(props) {
          var _this = _super.call(this, props) || this;
          _this.menu = react_1.default.createRef();
          _this.open = _this.open.bind(_this);
          _this.close = _this.close.bind(_this);
          _this.toggle = _this.toggle.bind(_this);
          _this.onBlur = _this.onBlur.bind(_this);
          _this.onFocus = _this.onFocus.bind(_this);
          _this.focus = _this.focus.bind(_this);
          _this.inputRef = _this.inputRef.bind(_this);
          _this.handleChange = _this.handleChange.bind(_this);
          _this.handleInputChange = _this.handleInputChange.bind(_this);
          _this.clearValue = _this.clearValue.bind(_this);
          _this.handleStateChange = _this.handleStateChange.bind(_this);
          _this.handleKeyPress = _this.handleKeyPress.bind(_this);
          _this.getTarget = _this.getTarget.bind(_this);
          _this.toggleCheckAll = _this.toggleCheckAll.bind(_this);
          _this.handleAddClick = _this.handleAddClick.bind(_this);
          _this.handleEditClick = _this.handleEditClick.bind(_this);
          _this.handleDeleteClick = _this.handleDeleteClick.bind(_this);
          _this.state = {
              isOpen: props.defaultOpen || false,
              isFocused: false,
              inputValue: '',
              highlightedIndex: -1,
              selection: value2array(props.value, props)
          };
          return _this;
      }
      Select.prototype.componentDidMount = function () {
          var _a = this.props, loadOptions = _a.loadOptions, options = _a.options, multiple = _a.multiple, defaultCheckAll = _a.defaultCheckAll, onChange = _a.onChange, simpleValue = _a.simpleValue;
          var selection = this.state.selection;
          if (multiple && defaultCheckAll && options.length) {
              selection = union_1.default(options, selection);
              this.setState({
                  selection: selection
              });
              // 因为等 State 设置完后再 onChange，会让 form 再 didMount 中的
              // onInit 出去的数据没有包含这部分，所以从 state 回调中拿出来了
              // 存在风险
              onChange(simpleValue ? selection.map(function (item) { return item.value; }) : selection);
          }
          loadOptions && loadOptions('');
      };
      Select.prototype.componentWillReceiveProps = function (nextProps) {
          var props = this.props;
          if (props.value !== nextProps.value ||
              JSON.stringify(props.options) !== JSON.stringify(nextProps.options)) {
              this.setState({
                  selection: value2array(nextProps.value, nextProps)
              });
          }
      };
      Select.prototype.open = function () {
          var _this = this;
          this.props.disabled ||
              this.setState({
                  isOpen: true,
                  highlightedIndex: -1
              }, function () { return setTimeout(_this.focus, 500); });
      };
      Select.prototype.close = function () {
          this.setState({
              isOpen: false
          });
      };
      Select.prototype.toggle = function (e) {
          var _this = this;
          if (e &&
              this.menu.current &&
              this.menu.current.contains(e.target)) {
              return;
          }
          this.props.disabled ||
              this.setState({
                  isOpen: !this.state.isOpen,
                  highlightedIndex: -1
              }, this.state.isOpen ? undefined : function () { return setTimeout(_this.focus, 500); });
      };
      Select.prototype.onFocus = function (e) {
          this.props.disabled ||
              this.state.isOpen ||
              this.setState({
                  isFocused: true
              }, this.focus);
          this.props.onFocus && this.props.onFocus(e);
      };
      Select.prototype.onBlur = function (e) {
          this.setState({
              isFocused: false
          });
          this.props.onBlur && this.props.onBlur(e);
      };
      Select.prototype.focus = function () {
          this.input
              ? this.input.focus()
              : this.getTarget() && this.getTarget().focus();
      };
      Select.prototype.blur = function () {
          this.input
              ? this.input.blur()
              : this.getTarget() && this.getTarget().blur();
      };
      Select.prototype.getTarget = function () {
          if (!this.target) {
              this.target = react_dom_1.findDOMNode(this);
          }
          return this.target;
      };
      Select.prototype.inputRef = function (ref) {
          this.input = ref;
      };
      Select.prototype.toggleCheckAll = function () {
          var _a = this.props, options = _a.options, onChange = _a.onChange, simpleValue = _a.simpleValue;
          var selection = this.state.selection;
          var optionsValues = options.map(function (option) { return option.value; });
          var selectionValues = selection.map(function (select) { return select.value; });
          var checkedAll = optionsValues.every(function (option) { return selectionValues.indexOf(option) > -1; });
          selection = checkedAll ? [] : options;
          onChange(simpleValue ? selection.map(function (item) { return item.value; }) : selection);
      };
      Select.prototype.removeItem = function (index, e) {
          var _a = this.props, onChange = _a.onChange, simpleValue = _a.simpleValue, disabled = _a.disabled;
          if (disabled) {
              return;
          }
          var value = this.state.selection;
          e && e.stopPropagation();
          value = Array.isArray(value) ? value.concat() : [value];
          value.splice(index, 1);
          onChange(simpleValue ? value.map(function (item) { return item.value; }) : value);
      };
      Select.prototype.handleInputChange = function (evt) {
          var _this = this;
          var loadOptions = this.props.loadOptions;
          this.setState({
              inputValue: evt.currentTarget.value
          }, function () { return loadOptions && loadOptions(_this.state.inputValue); });
      };
      Select.prototype.handleChange = function (selectItem) {
          var _a = this.props, onChange = _a.onChange, multiple = _a.multiple, simpleValue = _a.simpleValue, valueField = _a.valueField;
          var selection = this.state.selection;
          if (multiple) {
              var selectionValues = selection.map(function (item) { return item[valueField]; });
              selection = selection.concat();
              var idx = selectionValues.indexOf(selectItem[valueField]);
              if (~idx) {
                  selection.splice(idx, 1);
              }
              else {
                  selection.push(selectItem);
              }
              onChange(simpleValue ? selection.map(function (item) { return item[valueField]; }) : selection);
          }
          else {
              onChange(simpleValue ? selectItem[valueField] : selectItem);
          }
      };
      Select.prototype.handleStateChange = function (changes) {
          var _a = this.props, multiple = _a.multiple, checkAll = _a.checkAll;
          var update = {};
          var loadOptions = this.props.loadOptions;
          var doLoad = false;
          switch (changes.type) {
              case DownshiftChangeTypes.keyDownEnter:
              case DownshiftChangeTypes.clickItem:
                  update = tslib_1.__assign(tslib_1.__assign({}, update), { isOpen: multiple ? true : false, isFocused: multiple && checkAll ? true : false });
                  doLoad = true;
                  break;
              case DownshiftChangeTypes.changeInput:
                  update.highlightedIndex = 0;
              case DownshiftChangeTypes.keyDownArrowDown:
              case DownshiftChangeTypes.keyDownArrowUp:
              case DownshiftChangeTypes.itemMouseEnter:
                  update = tslib_1.__assign(tslib_1.__assign({}, update), changes);
                  break;
          }
          if (Object.keys(update).length) {
              this.setState(update, doLoad && loadOptions ? function () { return loadOptions(''); } : undefined);
          }
      };
      Select.prototype.handleKeyPress = function (e) {
          if (e.key === ' ') {
              this.toggle();
          }
      };
      Select.prototype.clearValue = function (e) {
          var onChange = this.props.onChange;
          e.preventDefault();
          e.stopPropagation();
          onChange('');
      };
      Select.prototype.handleAddClick = function () {
          var onAdd = this.props.onAdd;
          onAdd && onAdd();
      };
      Select.prototype.handleEditClick = function (e, item) {
          var onEdit = this.props.onEdit;
          e.preventDefault();
          e.stopPropagation();
          onEdit && onEdit(item);
      };
      Select.prototype.handleDeleteClick = function (e, item) {
          var onDelete = this.props.onDelete;
          e.preventDefault();
          e.stopPropagation();
          onDelete && onDelete(item);
      };
      Select.prototype.renderValue = function (_a) {
          var _this = this;
          var inputValue = _a.inputValue, isOpen = _a.isOpen;
          var _b = this.props, multiple = _b.multiple, placeholder = _b.placeholder, ns = _b.classPrefix, labelField = _b.labelField, disabled = _b.disabled;
          var selection = this.state.selection;
          if (!selection.length) {
              return (react_1.default.createElement("div", { key: "placeholder", className: ns + "Select-placeholder" }, placeholder));
          }
          return selection.map(function (item, index) {
              return multiple ? (react_1.default.createElement("div", { className: ns + "Select-value", key: index },
                  react_1.default.createElement("span", { className: ns + "Select-valueIcon " + (disabled || item.disabled ? 'is-disabled' : ''), onClick: _this.removeItem.bind(_this, index) }, "\u00D7"),
                  react_1.default.createElement("span", { className: ns + "Select-valueLabel" }, item[labelField || 'label']))) : (react_1.default.createElement("div", { className: ns + "Select-value", key: index }, item[labelField || 'label']));
          });
      };
      Select.prototype.renderOuter = function (_a) {
          var _this = this;
          var selectedItem = _a.selectedItem, getItemProps = _a.getItemProps, highlightedIndex = _a.highlightedIndex, inputValue = _a.inputValue, isOpen = _a.isOpen, getToggleButtonProps = _a.getToggleButtonProps, getInputProps = _a.getInputProps;
          var _b = this.props, popOverContainer = _b.popOverContainer, options = _b.options, valueField = _b.valueField, labelField = _b.labelField, noResultsText = _b.noResultsText, loadOptions = _b.loadOptions, creatable = _b.creatable, multiple = _b.multiple, cx = _b.classnames, checkAll = _b.checkAll, checkAllLabel = _b.checkAllLabel, searchable = _b.searchable, createBtnLabel = _b.createBtnLabel, disabled = _b.disabled, searchPromptText = _b.searchPromptText, editable = _b.editable, removable = _b.removable, overlayPlacement = _b.overlayPlacement;
          var selection = this.state.selection;
          var checkedAll = false;
          var checkedPartial = false;
          var filtedOptions = inputValue && isOpen && !loadOptions
              ? match_sorter_1.default(options, inputValue, {
                  keys: [labelField || 'label', valueField || 'value']
              })
              : options.concat();
          var selectionValues = selection.map(function (select) { return select[valueField]; });
          if (multiple && checkAll) {
              var optionsValues = options.map(function (option) { return option[valueField]; });
              checkedAll = optionsValues.every(function (option) { return selectionValues.indexOf(option) > -1; });
              checkedPartial = optionsValues.some(function (option) { return selectionValues.indexOf(option) > -1; });
          }
          var menu = (react_1.default.createElement("div", { ref: this.menu, className: cx('Select-menu') },
              searchable ? (react_1.default.createElement("div", { className: cx("Select-input", {
                      'is-focused': this.state.isFocused
                  }) },
                  react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" }),
                  react_1.default.createElement(Input_1.default, tslib_1.__assign({}, getInputProps({
                      onFocus: this.onFocus,
                      onBlur: this.onBlur,
                      disabled: disabled,
                      placeholder: searchPromptText,
                      onChange: this.handleInputChange,
                      ref: this.inputRef
                  }))))) : null,
              multiple && checkAll && filtedOptions.length ? (react_1.default.createElement("div", { className: cx('Select-option') },
                  react_1.default.createElement(Checkbox_1.default, { checked: checkedPartial, partial: checkedPartial && !checkedAll, onChange: this.toggleCheckAll }, checkAllLabel))) : null,
              filtedOptions.length ? (filtedOptions.map(function (item, index) {
                  var checked = selectedItem === item || !!~selectionValues.indexOf(item[valueField]);
                  return (react_1.default.createElement("div", tslib_1.__assign({}, getItemProps({
                      key: typeof item.value === 'string'
                          ? item.label + "-" + item.value
                          : index,
                      index: index,
                      item: item,
                      disabled: item.disabled
                  }), { className: cx("Select-option", {
                          'is-disabled': item.disabled,
                          'is-highlight': highlightedIndex === index,
                          'is-active': checked
                      }) }),
                      removable ? (react_1.default.createElement("a", { "data-tooltip": "\u79FB\u9664", "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon", onClick: function (e) { return _this.handleDeleteClick(e, item); } }))) : null,
                      editable ? (react_1.default.createElement("a", { "data-tooltip": "\u7F16\u8F91", "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon", onClick: function (e) { return _this.handleEditClick(e, item); } }))) : null,
                      checkAll || multiple ? (react_1.default.createElement(Checkbox_1.default, { checked: checked, trueValue: item.value, onChange: function () {
                              _this.handleChange(item);
                          }, disabled: item.disabled },
                          item.disabled
                              ? item[labelField]
                              : Options_1.highlight(item[labelField], inputValue, cx('Select-option-hl')),
                          item.tip)) : (react_1.default.createElement("span", null,
                          item.disabled
                              ? item[labelField]
                              : Options_1.highlight(item[labelField], inputValue, cx('Select-option-hl')),
                          item.tip))));
              })) : (react_1.default.createElement("div", { className: cx('Select-noResult') }, noResultsText)),
              creatable && !disabled ? (react_1.default.createElement("a", { className: cx('Select-addBtn'), onClick: this.handleAddClick },
                  react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                  createBtnLabel)) : null));
          return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || this.getTarget, target: this.getTarget, placement: overlayPlacement, show: true },
              react_1.default.createElement(PopOver_1.default, { overlay: true, className: cx('Select-popover'), style: { minWidth: this.target ? this.target.offsetWidth : 'auto' }, onHide: this.close }, menu)));
      };
      Select.prototype.render = function () {
          var _this = this;
          var _a = this.props, cx = _a.classnames, multiple = _a.multiple, searchable = _a.searchable, inline = _a.inline, className = _a.className, value = _a.value, loading = _a.loading, spinnerClassName = _a.spinnerClassName, clearable = _a.clearable, labelField = _a.labelField, disabled = _a.disabled, checkAll = _a.checkAll;
          var selection = this.state.selection;
          var inputValue = this.state.inputValue;
          return (react_1.default.createElement(downshift_1.default, { selectedItem: selection, highlightedIndex: this.state.highlightedIndex, isOpen: this.state.isOpen, inputValue: inputValue, onChange: 
              /*展示 Checkbox 的时候，会出发多次 onChange 原因待查*/ multiple ||
                  checkAll
                  ? helper_1.noop
                  : this.handleChange, onStateChange: this.handleStateChange, itemToString: function (item) { return (item ? item[labelField] : ''); } }, function (options) {
              var _a;
              var isOpen = options.isOpen;
              return (react_1.default.createElement("div", { tabIndex: disabled ? -1 : 0, onKeyPress: _this.handleKeyPress, onClick: _this.toggle, onFocus: _this.onFocus, onBlur: _this.onBlur, className: cx("Select", (_a = {},
                      _a["Select--multi"] = multiple,
                      _a["Select--inline"] = inline,
                      _a["Select--searchable"] = searchable,
                      _a['is-opened'] = isOpen,
                      _a['is-focused'] = _this.state.isFocused,
                      _a['is-disabled'] = disabled,
                      _a), className) },
                  react_1.default.createElement("div", { className: cx("Select-valueWrap") }, _this.renderValue(options)),
                  clearable && !disabled && value && value.length ? (react_1.default.createElement("a", { onClick: _this.clearValue, className: cx('Select-clear') },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  loading ? (react_1.default.createElement("span", { className: cx('Select-spinner') },
                      react_1.default.createElement("i", { className: spinnerClassName }))) : null,
                  react_1.default.createElement("span", { className: cx('Select-arrow') }),
                  isOpen ? _this.renderOuter(options) : null));
          }));
      };
      Select.defaultProps = {
          multiple: false,
          clearable: true,
          creatable: false,
          createBtnLabel: '新增选项',
          searchPromptText: '输入内容进行检索',
          loadingPlaceholder: '加载中..',
          noResultsText: '未找到任何结果',
          clearAllText: '移除所有',
          clearValueText: '移除',
          placeholder: '请选择',
          valueField: 'value',
          labelField: 'label',
          spinnerClassName: 'fa fa-spinner fa-spin fa-1x fa-fw',
          inline: false,
          disabled: false,
          checkAll: false,
          checkAllLabel: '全选',
          defaultCheckAll: false,
          overlayPlacement: 'auto'
      };
      return Select;
  }(react_1.default.Component));
  exports.Select = Select;
  exports.default = theme_1.themeable(uncontrollable_1.default(Select, {
      value: 'onChange'
  }));
  //# sourceMappingURL=/src/components/Select.js.map
  

});
