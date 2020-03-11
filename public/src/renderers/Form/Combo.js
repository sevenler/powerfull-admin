define('src/renderers/Form/Combo.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var combo_1 = require("src/store/combo.ts");
  var Tabs_1 = tslib_1.__importStar(require("src/components/Tabs.tsx"));
  var helper_1 = require("src/utils/helper.ts");
  var sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  var tpl_1 = require("src/utils/tpl.ts");
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  var tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  var api_1 = require("src/utils/api.ts");
  var components_1 = require("src/components/index.tsx");
  var memoize_1 = tslib_1.__importDefault(require("node_modules/lodash/memoize"));
  function pickVars(vars, fields) {
      return fields.reduce(function (data, key) {
          data[key] = tpl_builtin_1.resolveVariable(key, vars);
          return data;
      }, {});
  }
  var ComboControl = /** @class */ (function (_super) {
      tslib_1.__extends(ComboControl, _super);
      function ComboControl(props) {
          var _this = _super.call(this, props) || this;
          _this.subForms = [];
          _this.subFormDefaultValues = [];
          _this.keys = [];
          _this.toDispose = [];
          _this.id = helper_1.guid();
          _this.refsMap = {};
          _this.makeFormRef = memoize_1.default(function (index) { return function (ref) {
              return _this.formRef(ref, index);
          }; });
          _this.memoizedFormatValue = memoize_1.default(function (strictMode, syncFields, value, index, data) {
              return helper_1.createObject(helper_1.extendObject(data, tslib_1.__assign({ index: index, __index: index }, data)), tslib_1.__assign(tslib_1.__assign({}, value), Array.isArray(syncFields) ? pickVars(data, syncFields) : null));
          }, function (strictMode, syncFields, value, index, data) {
              return Array.isArray(syncFields) ? JSON.stringify([value, index, data, pickVars(data, syncFields)]) : strictMode ? JSON.stringify([value, index]) : JSON.stringify([value, index, data]);
          });
          _this.handleChange = _this.handleChange.bind(_this);
          _this.handleSingleFormChange = _this.handleSingleFormChange.bind(_this);
          _this.handleSingleFormInit = _this.handleSingleFormInit.bind(_this);
          _this.handleFormInit = _this.handleFormInit.bind(_this);
          _this.handleAction = _this.handleAction.bind(_this);
          _this.addItem = _this.addItem.bind(_this);
          _this.removeItem = _this.removeItem.bind(_this);
          _this.dragTipRef = _this.dragTipRef.bind(_this);
          _this.flush = _this.flush.bind(_this);
          _this.handleComboTypeChange = _this.handleComboTypeChange.bind(_this);
          _this.defaultValue = tslib_1.__assign({}, props.scaffold);
          return _this;
      }
      ComboControl.prototype.componentWillMount = function () {
          var _a = this.props, store = _a.store, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, formItem = _a.formItem, addHook = _a.addHook;
          store.config({
              minLength: minLength,
              maxLength: maxLength,
              length: this.getValueAsArray().length
          });
          formItem && formItem.setSubStore(store);
          addHook && this.toDispose.push(addHook(this.flush, 'flush'));
      };
      ComboControl.prototype.componentWillReceiveProps = function (nextProps) {
          var props = this.props;
          if (helper_1.anyChanged(['minLength', 'maxLength', 'value'], props, nextProps)) {
              var store = nextProps.store, minLength = nextProps.minLength, maxLength = nextProps.maxLength;
              var values_1 = this.getValueAsArray(nextProps);
              store.config({
                  minLength: minLength,
                  maxLength: maxLength,
                  length: values_1.length
              });
              if (store.activeKey >= values_1.length) {
                  store.setActiveKey(Math.max(0, values_1.length - 1));
              }
              // combo 进来了新的值，且这次 form 初始化时带来的新值变化，但是之前的值已经 onInit 过了
              // 所以，之前 onInit 设置进去的初始值是过时了的。这个时候修复一下。
              if (nextProps.value !== props.value && !props.formInited && this.subFormDefaultValues.length) {
                  this.subFormDefaultValues = this.subFormDefaultValues.map(function (item, index) {
                      return tslib_1.__assign(tslib_1.__assign({}, item), { values: values_1[index] });
                  });
              }
          }
      };
      ComboControl.prototype.componentWillUnmount = function () {
          var _a, _b, _c, _d;
          var formItem = this.props.formItem;
          formItem && formItem.setSubStore(null);
          this.toDispose.forEach(function (fn) { return fn(); });
          this.toDispose = [];
          (_b = (_a = this.memoizedFormatValue.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
          (_d = (_c = this.makeFormRef.cache).clear) === null || _d === void 0 ? void 0 : _d.call(_c);
      };
      ComboControl.prototype.getValueAsArray = function (props) {
          if (props === void 0) { props = this.props; }
          var flat = props.flat, joinValues = props.joinValues, delimiter = props.delimiter;
          var value = props.value;
          if (joinValues && flat && typeof value === 'string') {
              value = value.split(delimiter || ',');
          }
          else if (!Array.isArray(value)) {
              value = [];
          }
          else {
              value = value.concat();
          }
          return value;
      };
      ComboControl.prototype.addItemWith = function (condition) {
          var _a = this.props, flat = _a.flat, joinValues = _a.joinValues, delimiter = _a.delimiter, scaffold = _a.scaffold, disabled = _a.disabled, submitOnChange = _a.submitOnChange;
          if (disabled) {
              return;
          }
          var value = this.getValueAsArray();
          value.push(flat
              ? condition.scaffold || scaffold || ''
              : tslib_1.__assign({}, (condition.scaffold || scaffold)));
          this.keys.push(helper_1.guid());
          if (flat && joinValues) {
              value = value.join(delimiter || ',');
          }
          this.props.onChange(value, submitOnChange, true);
      };
      ComboControl.prototype.addItem = function () {
          var _a = this.props, flat = _a.flat, joinValues = _a.joinValues, delimiter = _a.delimiter, scaffold = _a.scaffold, disabled = _a.disabled, submitOnChange = _a.submitOnChange;
          if (disabled) {
              return;
          }
          var value = this.getValueAsArray();
          value.push(flat
              ? scaffold || ''
              : tslib_1.__assign({}, scaffold));
          this.keys.push(helper_1.guid());
          if (flat && joinValues) {
              value = value.join(delimiter || ',');
          }
          this.props.onChange(value, submitOnChange, true);
      };
      ComboControl.prototype.removeItem = function (key) {
          return tslib_1.__awaiter(this, void 0, void 0, function () {
              var _a, flat, joinValues, delimiter, disabled, deleteApi, deleteConfirmText, data, env, value, ctx, confirmed, result;
              return tslib_1.__generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          _a = this.props, flat = _a.flat, joinValues = _a.joinValues, delimiter = _a.delimiter, disabled = _a.disabled, deleteApi = _a.deleteApi, deleteConfirmText = _a.deleteConfirmText, data = _a.data, env = _a.env;
                          if (disabled) {
                              return [2 /*return*/];
                          }
                          value = this.getValueAsArray();
                          ctx = helper_1.createObject(data, value[key]);
                          if (!api_1.isEffectiveApi(deleteApi, ctx)) return [3 /*break*/, 3];
                          return [4 /*yield*/, env.confirm(deleteConfirmText ? tpl_1.filter(deleteConfirmText, ctx) : '确认要删除？')];
                      case 1:
                          confirmed = _b.sent();
                          if (!confirmed) {
                              // 如果不确认，则跳过！
                              return [2 /*return*/];
                          }
                          return [4 /*yield*/, env.fetcher(deleteApi, ctx)];
                      case 2:
                          result = _b.sent();
                          if (!result.ok) {
                              env.notify('error', '删除失败');
                              return [2 /*return*/];
                          }
                          _b.label = 3;
                      case 3:
                          value.splice(key, 1);
                          this.keys.splice(key, 1);
                          if (flat && joinValues) {
                              value = value.join(delimiter || ',');
                          }
                          this.props.onChange(value);
                          return [2 /*return*/];
                  }
              });
          });
      };
      ComboControl.prototype.handleChange = function (values, diff, _a) {
          var index = _a.index;
          var _b = this.props, flat = _b.flat, store = _b.store, joinValues = _b.joinValues, delimiter = _b.delimiter, disabled = _b.disabled, submitOnChange = _b.submitOnChange;
          if (disabled) {
              return;
          }
          var value = this.getValueAsArray();
          value[index] = flat ? values.flat : tslib_1.__assign({}, values);
          if (flat && joinValues) {
              value = value.join(delimiter || ',');
          }
          this.props.onChange(value, submitOnChange, true);
          store.forms.forEach(function (item) {
              return item.items.forEach(function (item) { return item.unique && item.syncOptions(); });
          });
      };
      ComboControl.prototype.handleSingleFormChange = function (values) {
          this.props.onChange(tslib_1.__assign({}, values), this.props.submitOnChange, true);
      };
      ComboControl.prototype.handleFormInit = function (values, _a) {
          var index = _a.index;
          var _b = this.props, syncDefaultValue = _b.syncDefaultValue, flat = _b.flat, joinValues = _b.joinValues, delimiter = _b.delimiter, formInited = _b.formInited, onChange = _b.onChange, submitOnChange = _b.submitOnChange, setPrinstineValue = _b.setPrinstineValue;
          this.subFormDefaultValues.push({
              index: index,
              values: values,
              setted: false
          });
          if (syncDefaultValue === false || this.subFormDefaultValues.length !== this.subForms.length) {
              return;
          }
          var value = this.getValueAsArray();
          var isModified = false;
          this.subFormDefaultValues = this.subFormDefaultValues.map(function (_a) {
              var index = _a.index, values = _a.values, setted = _a.setted;
              var newValue = flat ? values.flat : tslib_1.__assign({}, values);
              if (!setted && helper_1.isObjectShallowModified(value[index], newValue)) {
                  value[index] = flat ? values.flat : tslib_1.__assign({}, values);
                  isModified = true;
              }
              return {
                  index: index,
                  values: values,
                  setted: true
              };
          });
          if (!isModified) {
              return;
          }
          if (flat && joinValues) {
              value = value.join(delimiter || ',');
          }
          formInited
              ? onChange(value, submitOnChange, true)
              : setPrinstineValue(value);
      };
      ComboControl.prototype.handleSingleFormInit = function (values) {
          var _a = this.props, syncDefaultValue = _a.syncDefaultValue, setPrinstineValue = _a.setPrinstineValue, value = _a.value;
          if (syncDefaultValue !== false && helper_1.isObjectShallowModified(value, values) && setPrinstineValue) {
              setPrinstineValue(tslib_1.__assign({}, values));
          }
      };
      ComboControl.prototype.handleAction = function (action) {
          var onAction = this.props.onAction;
          if (action.actionType === 'delete') {
              action.index !== void 0 && this.removeItem(action.index);
              return;
          }
          onAction && onAction.apply(null, arguments);
      };
      ComboControl.prototype.validate = function () {
          var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, messages = _a.messages;
          if (minLength && (!Array.isArray(value) || value.length < minLength)) {
              return ((messages && messages.minLengthValidateFailed) ||
                  "\u7EC4\u5408\u8868\u5355\u6210\u5458\u6570\u91CF\u4E0D\u591F\uFF0C\u4F4E\u4E8E\u8BBE\u5B9A\u7684\u6700\u5C0F" + minLength + "\u4E2A\uFF0C\u8BF7\u6DFB\u52A0\u66F4\u591A\u7684\u6210\u5458\u3002");
          }
          else if (maxLength && Array.isArray(value) && value.length > maxLength) {
              return ((messages && messages.maxLengthValidateFailed) ||
                  "\u7EC4\u5408\u8868\u5355\u6210\u5458\u6570\u91CF\u8D85\u51FA\uFF0C\u8D85\u51FA\u8BBE\u5B9A\u7684\u6700\u5927" + maxLength + "\u4E2A\uFF0C\u8BF7\u5220\u9664\u591A\u4F59\u7684\u6210\u5458\u3002");
          }
          else if (this.subForms.length) {
              return Promise.all(this.subForms.map(function (item) { return item.validate(); })).then(function (values) {
                  if (~values.indexOf(false)) {
                      return ((messages && messages.validateFailed) ||
                          '子表单验证失败，请仔细检查');
                  }
                  return;
              });
          }
      };
      ComboControl.prototype.flush = function () {
          this.subForms.forEach(function (form) { return form.flush(); });
      };
      ComboControl.prototype.dragTipRef = function (ref) {
          if (!this.dragTip && ref) {
              this.initDragging();
          }
          else if (this.dragTip && !ref) {
              this.destroyDragging();
          }
          this.dragTip = ref;
      };
      ComboControl.prototype.initDragging = function () {
          var _this = this;
          var ns = this.props.classPrefix;
          var submitOnChange = this.props.submitOnChange;
          var dom = react_dom_1.findDOMNode(this);
          this.sortable = new sortablejs_1.default(dom.querySelector("." + ns + "Combo-items"), {
              group: "combo-" + this.id,
              animation: 150,
              handle: "." + ns + "Combo-itemDrager",
              ghostClass: ns + "Combo-item--dragging",
              onEnd: function (e) {
                  // 没有移动
                  if (e.newIndex === e.oldIndex) {
                      return;
                  }
                  // 换回来
                  var parent = e.to;
                  if (e.oldIndex < parent.childNodes.length - 1) {
                      parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                  }
                  else {
                      parent.appendChild(e.item);
                  }
                  var value = _this.props.value;
                  if (!Array.isArray(value)) {
                      return;
                  }
                  var newValue = value.concat();
                  newValue.splice(e.newIndex, 0, newValue.splice(e.oldIndex, 1)[0]);
                  _this.keys.splice(e.newIndex, 0, _this.keys.splice(e.oldIndex, 1)[0]);
                  _this.props.onChange(newValue, submitOnChange, true);
              }
          });
      };
      ComboControl.prototype.destroyDragging = function () {
          this.sortable && this.sortable.destroy();
      };
      ComboControl.prototype.formRef = function (ref, index) {
          if (index === void 0) { index = 0; }
          if (ref) {
              while (ref && ref.getWrappedInstance) {
                  ref = ref.getWrappedInstance();
              }
              this.subForms[index] = ref;
              this.refsMap[index] = ref;
          }
          else {
              var form_1 = this.refsMap[index];
              this.subForms = this.subForms.filter(function (item) { return item !== form_1; });
              this.subFormDefaultValues = this.subFormDefaultValues.filter(function (_a) {
                  var dIndex = _a.index;
                  return dIndex !== index;
              });
              delete this.refsMap[index];
          }
      };
      ComboControl.prototype.formatValue = function (value, index) {
          var _a = this.props, flat = _a.flat, data = _a.data, strictMode = _a.strictMode, syncFields = _a.syncFields;
          if (flat) {
              value = {
                  flat: value
              };
          }
          value = value || this.defaultValue;
          return this.memoizedFormatValue(strictMode !== false, syncFields, value, index, data);
      };
      ComboControl.prototype.pickCondition = function (value) {
          var conditions = this.props.conditions;
          return find_1.default(conditions, function (item) { return item.test && tpl_1.evalExpression(item.test, value); });
      };
      ComboControl.prototype.handleComboTypeChange = function (index, selection) {
          var _a = this.props, multiple = _a.multiple, onChange = _a.onChange, value = _a.value, flat = _a.flat, submitOnChange = _a.submitOnChange;
          var conditions = this.props.conditions;
          var condition = find_1.default(conditions, function (item) { return item.label === selection.label; });
          if (!condition) {
              return;
          }
          if (multiple) {
              var newValue = this.getValueAsArray();
              newValue.splice(index, 1, tslib_1.__assign({}, tpl_builtin_1.dataMapping(condition.scaffold || {}, newValue[index])));
              // todo 支持 flat
              onChange(newValue, submitOnChange, true);
          }
          else {
              onChange(tslib_1.__assign({}, tpl_builtin_1.dataMapping(condition.scaffold || {}, value)), submitOnChange, true);
          }
      };
      ComboControl.prototype.handleTabSelect = function (key) {
          var store = this.props.store;
          store.setActiveKey(key);
      };
      ComboControl.prototype.renderPlaceholder = function () {
          return (react_1.default.createElement("span", { className: "text-muted" }, this.props.placeholder || '没有数据'));
      };
      ComboControl.prototype.renderTabsMode = function () {
          var _this = this;
          var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, tabsStyle = _a.tabsStyle, formClassName = _a.formClassName, render = _a.render, disabled = _a.disabled, store = _a.store, flat = _a.flat, subFormMode = _a.subFormMode, addButtonText = _a.addButtonText, addable = _a.addable, removable = _a.removable, typeSwitchable = _a.typeSwitchable, itemRemovableOn = _a.itemRemovableOn, delimiter = _a.delimiter, canAccessSuperData = _a.canAccessSuperData, addIcon = _a.addIcon, deleteIcon = _a.deleteIcon, tabsLabelTpl = _a.tabsLabelTpl, conditions = _a.conditions, changeImmediately = _a.changeImmediately;
          var controls = this.props.controls;
          var value = this.props.value;
          if (flat && typeof value === 'string') {
              value = value.split(delimiter || ',');
          }
          var finnalRemovable = store.removable !== false && // minLength ?
              !disabled && // 控件自身是否禁用
              removable !== false; // 是否可以删除
          if (!Array.isArray(value)) {
              return this.renderPlaceholder();
          }
          // todo 支持拖拽排序。
          return (react_1.default.createElement(Tabs_1.default, { mode: tabsStyle, activeKey: store.activeKey, onSelect: this.handleTabSelect, additionBtns: !disabled ? (react_1.default.createElement("li", { className: cx("Tabs-link") }, store.addable && addable !== false ? (Array.isArray(conditions) && conditions.length ? (render('add-button', {
                  type: 'dropdown-button',
                  icon: addIcon,
                  label: addButtonText || '新增',
                  level: 'info',
                  size: 'sm',
                  closeOnClick: true
              }, {
                  buttons: conditions.map(function (item) { return ({
                      label: item.label,
                      onClick: function (e) {
                          _this.addItemWith(item);
                          return false;
                      }
                  }); })
              })) : (react_1.default.createElement("a", { onClick: this.addItem, "data-tooltip": "\u65B0\u589E\u4E00\u6761\u6570\u636E" },
                  addIcon ? react_1.default.createElement("i", { className: cx('m-r-xs', addIcon) }) : null,
                  react_1.default.createElement("span", null, addButtonText || '新增')))) : null)) : null }, value.map(function (value, index) {
              var data = _this.formatValue(value, index);
              var condition = null;
              var toolbar = undefined;
              if (finnalRemovable && // 表达式判断单条是否可删除
                  (!itemRemovableOn ||
                      tpl_1.evalExpression(itemRemovableOn, value) !== false)) {
                  toolbar = (react_1.default.createElement("a", { onClick: _this.removeItem.bind(_this, index), key: "remove", className: cx("Combo-toolbarBtn " + (!store.removable ? 'is-disabled' : '')), "data-tooltip": "\u5220\u9664", "data-position": "bottom" },
                      react_1.default.createElement("i", { className: deleteIcon })));
              }
              if (Array.isArray(conditions) && conditions.length) {
                  condition = _this.pickCondition(data);
                  controls = condition ? condition.controls : undefined;
              }
              var finnalControls = flat && controls
                  ? [
                      tslib_1.__assign(tslib_1.__assign({}, (controls && controls[0])), { name: 'flat' })
                  ]
                  : controls;
              return (react_1.default.createElement(Tabs_1.Tab, { title: tpl_1.filter(tabsLabelTpl || '成员${index|plus}', data), key: _this.keys[index] || (_this.keys[index] = helper_1.guid()), toolbar: toolbar, eventKey: index, 
                  // 不能按需渲染，因为 unique 会失效。
                  mountOnEnter: false, unmountOnExit: false },
                  condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                      react_1.default.createElement("label", null, "\u7C7B\u578B"),
                      react_1.default.createElement(Select_1.default, { onChange: _this.handleComboTypeChange.bind(_this, index), options: conditions.map(function (item) { return ({
                              label: item.label,
                              value: item.label
                          }); }), value: condition.label, clearable: false }))) : null,
                  react_1.default.createElement("div", { className: cx("Combo-itemInner") }, finnalControls ? (render("multiple/" + index, {
                      type: 'form',
                      controls: finnalControls,
                      wrapperComponent: 'div',
                      wrapWithPanel: false,
                      mode: subFormMode,
                      className: cx("Combo-form", formClassName)
                  }, {
                      index: index,
                      disabled: disabled,
                      data: data,
                      onChange: _this.handleChange,
                      onInit: _this.handleFormInit,
                      onAction: _this.handleAction,
                      ref: _this.makeFormRef(index),
                      canAccessSuperData: canAccessSuperData,
                      lazyChange: changeImmediately ? false : true,
                      lazyFormChange: changeImmediately ? false : true,
                      value: undefined,
                      formItemValue: undefined
                  })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, "\u6570\u636E\u975E\u6CD5\uFF0C\u6216\u8005\u6570\u636E\u5DF2\u5931\u6548\uFF0C\u8BF7\u79FB\u9664")))));
          })));
      };
      ComboControl.prototype.renderMultipe = function () {
          var _this = this;
          if (this.props.tabsMode) {
              return this.renderTabsMode();
          }
          var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, formClassName = _a.formClassName, render = _a.render, multiLine = _a.multiLine, addButtonClassName = _a.addButtonClassName, disabled = _a.disabled, store = _a.store, flat = _a.flat, subFormMode = _a.subFormMode, draggable = _a.draggable, draggableTip = _a.draggableTip, addButtonText = _a.addButtonText, addable = _a.addable, removable = _a.removable, typeSwitchable = _a.typeSwitchable, itemRemovableOn = _a.itemRemovableOn, delimiter = _a.delimiter, canAccessSuperData = _a.canAccessSuperData, addIcon = _a.addIcon, dragIcon = _a.dragIcon, deleteIcon = _a.deleteIcon, noBorder = _a.noBorder, conditions = _a.conditions, lazyLoad = _a.lazyLoad, changeImmediately = _a.changeImmediately;
          var controls = this.props.controls;
          var value = this.props.value;
          if (flat && typeof value === 'string') {
              value = value.split(delimiter || ',');
          }
          var finnalRemovable = store.removable !== false && // minLength ?
              !disabled && // 控件自身是否禁用
              removable !== false; // 是否可以删除
          return (react_1.default.createElement("div", { className: cx("Combo Combo--multi", multiLine ? "Combo--ver" : "Combo--hor", noBorder ? "Combo--noBorder" : '', disabled ? 'is-disabled' : '') },
              react_1.default.createElement("div", { className: cx("Combo-items") }, Array.isArray(value)
                  ? value.map(function (value, index, thelist) {
                      var toolbar = [];
                      if (!disabled && draggable && thelist.length > 1) {
                          toolbar.push(react_1.default.createElement("a", { key: "drag", className: cx("Combo-toolbarBtn Combo-itemDrager"), "data-tooltip": "\u62D6\u62FD\u6392\u5E8F", "data-position": "bottom" },
                              react_1.default.createElement("i", { className: dragIcon })));
                      }
                      if (finnalRemovable && // 表达式判断单条是否可删除
                          (!itemRemovableOn ||
                              tpl_1.evalExpression(itemRemovableOn, value) !== false)) {
                          toolbar.push(react_1.default.createElement("a", { onClick: _this.removeItem.bind(_this, index), key: "remove", className: cx("Combo-toolbarBtn " + (!store.removable ? 'is-disabled' : '')), "data-tooltip": "\u5220\u9664", "data-position": "bottom" },
                              react_1.default.createElement("i", { className: deleteIcon })));
                      }
                      var data = _this.formatValue(value, index);
                      var condition = null;
                      if (Array.isArray(conditions) && conditions.length) {
                          condition = _this.pickCondition(data);
                          controls = condition ? condition.controls : undefined;
                      }
                      var finnalControls = flat && controls
                          ? [
                              tslib_1.__assign(tslib_1.__assign({}, (controls && controls[0])), { name: 'flat' })
                          ]
                          : controls;
                      return (react_1.default.createElement("div", { className: cx("Combo-item"), key: _this.keys[index] || (_this.keys[index] = helper_1.guid()) },
                          condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                              react_1.default.createElement("label", null, "\u7C7B\u578B"),
                              react_1.default.createElement(Select_1.default, { onChange: _this.handleComboTypeChange.bind(_this, index), options: conditions.map(function (item) { return ({
                                      label: item.label,
                                      value: item.label
                                  }); }), value: condition.label, clearable: false }))) : null,
                          react_1.default.createElement("div", { className: cx("Combo-itemInner") }, finnalControls ? (render("multiple/" + index, {
                              type: 'form',
                              controls: finnalControls,
                              wrapperComponent: 'div',
                              wrapWithPanel: false,
                              mode: multiLine ? subFormMode : 'row',
                              className: cx("Combo-form", formClassName)
                          }, {
                              index: index,
                              disabled: disabled,
                              data: data,
                              onChange: _this.handleChange,
                              onInit: _this.handleFormInit,
                              onAction: _this.handleAction,
                              ref: _this.makeFormRef(index),
                              lazyChange: changeImmediately ? false : true,
                              lazyFormChange: changeImmediately ? false : true,
                              lazyLoad: lazyLoad,
                              canAccessSuperData: canAccessSuperData,
                              value: undefined,
                              formItemValue: undefined
                          })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, "\u6570\u636E\u975E\u6CD5\uFF0C\u6216\u8005\u6570\u636E\u5DF2\u5931\u6548\uFF0C\u8BF7\u79FB\u9664"))),
                          toolbar.length ? (react_1.default.createElement("div", { className: cx("Combo-itemToolbar") }, toolbar)) : null));
                  })
                  : null),
              !disabled ? (react_1.default.createElement("div", { className: cx("Combo-toolbar") },
                  store.addable && addable !== false ? (Array.isArray(conditions) && conditions.length ? (render('add-button', {
                      type: 'dropdown-button',
                      icon: addIcon,
                      label: addButtonText || '新增',
                      level: 'info',
                      size: 'sm',
                      closeOnClick: true
                  }, {
                      buttons: conditions.map(function (item) { return ({
                          label: item.label,
                          onClick: function (e) {
                              _this.addItemWith(item);
                              return false;
                          }
                      }); })
                  })) : (react_1.default.createElement("button", { type: "button", onClick: this.addItem, className: cx("Button Combo-addBtn", addButtonClassName), "data-tooltip": "\u65B0\u589E\u4E00\u6761\u6570\u636E" },
                      addIcon ? (react_1.default.createElement("i", { className: cx('Button-icon', addIcon) })) : null,
                      react_1.default.createElement("span", null, addButtonText || '新增')))) : null,
                  draggable ? (react_1.default.createElement("span", { className: cx("Combo-dragableTip"), ref: this.dragTipRef }, Array.isArray(value) && value.length > 1 ? draggableTip : '')) : null)) : null));
      };
      ComboControl.prototype.renderSingle = function () {
          var _a = this.props, conditions = _a.conditions, cx = _a.classnames, render = _a.render, value = _a.value, multiLine = _a.multiLine, formClassName = _a.formClassName, canAccessSuperData = _a.canAccessSuperData, noBorder = _a.noBorder, disabled = _a.disabled, typeSwitchable = _a.typeSwitchable;
          var controls = this.props.controls;
          var data = helper_1.isObject(value) ? value : this.defaultValue;
          var condition = null;
          if (Array.isArray(conditions) && conditions.length) {
              condition = this.pickCondition(data);
              controls = condition ? condition.controls : undefined;
          }
          return (react_1.default.createElement("div", { className: cx("Combo Combo--single", multiLine ? "Combo--ver" : "Combo--hor", noBorder ? "Combo--noBorder" : '', disabled ? 'is-disabled' : '') },
              react_1.default.createElement("div", { className: cx("Combo-item") },
                  condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                      react_1.default.createElement("label", null, "\u7C7B\u578B"),
                      react_1.default.createElement(Select_1.default, { onChange: this.handleComboTypeChange.bind(this, 0), options: conditions.map(function (item) { return ({
                              label: item.label,
                              value: item.label
                          }); }), value: condition.label, clearable: false }))) : null,
                  react_1.default.createElement("div", { className: cx("Combo-itemInner") }, controls ? (render('single', {
                      type: 'form',
                      controls: controls,
                      wrapperComponent: 'div',
                      wrapWithPanel: false,
                      mode: multiLine ? 'normal' : 'row',
                      className: cx("Combo-form", formClassName)
                  }, {
                      disabled: disabled,
                      data: helper_1.isObject(value) ? value : this.defaultValue,
                      onChange: this.handleSingleFormChange,
                      ref: this.makeFormRef(0),
                      onInit: this.handleSingleFormInit,
                      canAccessSuperData: canAccessSuperData
                  })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, "\u6570\u636E\u975E\u6CD5\uFF0C\u6216\u8005\u6570\u636E\u5DF2\u5931\u6548\uFF0C\u8BF7\u79FB\u9664"))))));
      };
      ComboControl.prototype.render = function () {
          var _a = this.props, formInited = _a.formInited, multiple = _a.multiple, className = _a.className, ns = _a.classPrefix, cx = _a.classnames, disabled = _a.disabled;
          return formInited ? (react_1.default.createElement("div", { className: cx("ComboControl", className) }, multiple ? this.renderMultipe() : this.renderSingle())) : null;
      };
      ComboControl.defaultProps = {
          minLength: 0,
          maxLength: 0,
          multiple: false,
          multiLine: false,
          addButtonClassName: '',
          formClassName: '',
          subFormMode: 'normal',
          draggableTip: '可拖拽排序',
          addButtonText: '新增',
          canAccessSuperData: false,
          addIcon: 'fa fa-plus',
          dragIcon: 'glyphicon glyphicon-sort',
          deleteIcon: 'glyphicon glyphicon-remove',
          tabsMode: false,
          tabsStyle: ''
      };
      ComboControl.propsList = [
          'minLength',
          'maxLength',
          'multiple',
          'multiLine',
          'addButtonClassName',
          'subFormMode',
          'draggableTip',
          'addButtonText',
          'draggable',
          'scaffold',
          'canAccessSuperData',
          'addIcon',
          'dragIcon',
          'deleteIcon',
          'noBorder',
          'conditions',
          'tabsMode',
          'tabsStyle',
          'lazyLoad',
          'changeImmediately',
          'strictMode',
          'controls',
          'conditions',
          'messages'
      ];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ComboControl.prototype, "handleTabSelect", null);
      return ComboControl;
  }(react_1.default.Component));
  exports.default = ComboControl;
  var ComboControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ComboControlRenderer, _super);
      function ComboControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ComboControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'combo',
              storeType: combo_1.ComboStore.name,
              extendsData: false
          })
      ], ComboControlRenderer);
      return ComboControlRenderer;
  }(ComboControl));
  exports.ComboControlRenderer = ComboControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/Combo.js.map
  

});
