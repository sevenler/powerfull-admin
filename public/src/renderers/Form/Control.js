define('src/renderers/Form/Control.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  var factory_1 = require("src/factory.tsx");
  var combo_1 = require("src/store/combo.ts");
  var helper_1 = require("src/utils/helper.ts");
  var Scoped_1 = require("src/Scoped.tsx");
  var mobx_1 = require("node_modules/mobx/lib/index");
  var FormControl = /** @class */ (function (_super) {
      tslib_1.__extends(FormControl, _super);
      function FormControl() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.lazyValidate = debounce_1.default(_this.validate.bind(_this), 250, {
              trailing: true,
              leading: false
          });
          _this.lazyEmitChange = debounce_1.default(_this.emitChange.bind(_this), 250, {
              trailing: true,
              leading: false
          });
          _this.state = { value: _this.value = _this.props.control.value };
          return _this;
      }
      FormControl.prototype.componentWillMount = function () {
          var _this = this;
          var _a = this.props, form = _a.formStore, _b = _a.control, name = _b.name, id = _b.id, type = _b.type, required = _b.required, validations = _b.validations, validationErrors = _b.validationErrors, unique = _b.unique, value = _b.value, multiple = _b.multiple, delimiter = _b.delimiter, valueField = _b.valueField, labelField = _b.labelField, joinValues = _b.joinValues, extractValue = _b.extractValue;
          this.getValue = this.getValue.bind(this);
          this.setValue = this.setValue.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleBulkChange = this.handleBulkChange.bind(this);
          this.setPrinstineValue = this.setPrinstineValue.bind(this);
          this.controlRef = this.controlRef.bind(this);
          this.handleBlur = this.handleBlur.bind(this);
          if (!name) {
              return;
          }
          var model = (this.model = form.registryItem(name, {
              id: id,
              type: type,
              required: required,
              unique: unique,
              value: value,
              rules: validations,
              messages: validationErrors,
              multiple: multiple,
              delimiter: delimiter,
              valueField: valueField,
              labelField: labelField,
              joinValues: joinValues,
              extractValue: extractValue
          }));
          if (this.model.unique &&
              form.parentStore &&
              form.parentStore.storeType === combo_1.ComboStore.name) {
              var combo = form.parentStore;
              combo.bindUniuqueItem(this.model);
          }
          // 同步 value
          this.setState({
              value: this.value = model.value
          });
          this.reaction = mobx_1.reaction(function () { return model.value; }, function (value) { return _this.setState({ value: _this.value = value }); });
      };
      FormControl.prototype.componentDidMount = function () {
          var _this = this;
          var _a = this.props, store = _a.store, form = _a.formStore, _b = _a.control, name = _b.name, validate = _b.validate, addHook = _a.addHook;
          if (name && form !== store) {
              var value = helper_1.getVariable(store.data, name);
              if (typeof value !== 'undefined' && value !== this.getValue()) {
                  this.handleChange(value, false, true);
              }
          }
          // 提交前先把之前的 lazyEmit 执行一下。
          this.hook3 = function () {
              _this.lazyEmitChange.flush();
              _this.lazyValidate.flush();
          };
          addHook(this.hook3, 'flush');
          var formItem = this.model;
          if (formItem && validate) {
              var finalValidate_1 = helper_1.promisify(validate.bind(formItem));
              this.hook2 = function () {
                  formItem.clearError('control:valdiate');
                  return finalValidate_1(form.data, formItem.value).then(function (ret) {
                      if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                          formItem.addError(ret, 'control:valdiate');
                      }
                  });
              };
              addHook(this.hook2);
          }
      };
      FormControl.prototype.componentWillReceiveProps = function (nextProps) {
          var props = this.props;
          var form = nextProps.formStore;
          // if (!nextProps.control.name) {
          //   // 把 name 删了, 对 model 做清理
          //   this.model && this.disposeModel();
          //   this.reaction && this.reaction();
          //   this.model = undefined;
          //   return;
          // } else if (nextProps.control.name !== props.control.name || !this.model) {
          //   // 对 model 做清理
          //   this.model && this.disposeModel();
          //   this.reaction && this.reaction();
          //   // name 是后面才有的，比如编辑模式下就会出现。
          //   const model = (this.model = form.registryItem(nextProps.control.name, {
          //     id: nextProps.control.id,
          //     type: nextProps.control.type,
          //     required: nextProps.control.required,
          //     unique: nextProps.control.unique,
          //     value: nextProps.control.value,
          //     rules: nextProps.control.validations,
          //     multiple: nextProps.control.multiple,
          //     delimiter: nextProps.control.delimiter,
          //     valueField: nextProps.control.valueField,
          //     labelField: nextProps.control.labelField,
          //     joinValues: nextProps.control.joinValues,
          //     extractValue: nextProps.control.extractValue,
          //     messages: nextProps.control.validationErrors
          //   }));
          //   // this.forceUpdate();
          //   this.setState({
          //     value: model.value
          //   });
          //   this.reaction = reaction(
          //     () => model.value,
          //     value => this.setState({value})
          //   );
          // }
          if (this.model &&
              helper_1.anyChanged([
                  'id',
                  'validations',
                  'validationErrors',
                  'value',
                  'required',
                  'unique',
                  'multiple',
                  'delimiter',
                  'valueField',
                  'labelField',
                  'joinValues',
                  'extractValue'
              ], props.control, nextProps.control)) {
              this.model.config({
                  required: nextProps.control.required,
                  id: nextProps.control.id,
                  unique: nextProps.control.unique,
                  value: nextProps.control.value,
                  rules: nextProps.control.validations,
                  multiple: nextProps.control.multiple,
                  delimiter: nextProps.control.delimiter,
                  valueField: nextProps.control.valueField,
                  labelField: nextProps.control.labelField,
                  joinValues: nextProps.control.joinValues,
                  extractValue: nextProps.control.extractValue,
                  messages: nextProps.control.validationErrors
              });
          }
      };
      FormControl.prototype.componentDidUpdate = function (prevProps) {
          var _a = this.props, store = _a.store, form = _a.formStore, data = _a.data, name = _a.control.name;
          if (!name) {
              return;
          }
          // form 里面部分塞 service 的用法
          var value;
          if (form !== store &&
              data !== prevProps.data &&
              (value = helper_1.getVariable(data, name)) !==
                  helper_1.getVariable(prevProps.data, name)) {
              this.handleChange(value, false, true);
          }
      };
      FormControl.prototype.componentWillUnmount = function () {
          this.hook && this.props.removeHook(this.hook);
          this.hook2 && this.props.removeHook(this.hook2);
          this.hook3 && this.props.removeHook(this.hook3, 'flush');
          this.lazyValidate.cancel();
          // this.lazyEmitChange.flush();
          this.lazyEmitChange.cancel();
          this.reaction && this.reaction();
          this.disposeModel();
      };
      FormControl.prototype.disposeModel = function () {
          var form = this.props.formStore;
          if (this.model &&
              this.model.unique &&
              form.parentStore &&
              form.parentStore.storeType === combo_1.ComboStore.name) {
              var combo = form.parentStore;
              combo.unBindUniuqueItem(this.model);
          }
          this.model && form.unRegistryItem(this.model);
      };
      FormControl.prototype.controlRef = function (control) {
          var _a = this.props, addHook = _a.addHook, removeHook = _a.removeHook, form = _a.formStore;
          // 因为 control 有可能被 n 层 hoc 包裹。
          while (control && control.getWrappedInstance) {
              control = control.getWrappedInstance();
          }
          if (control && control.validate && this.model) {
              var formItem_1 = this.model;
              var validate_1 = helper_1.promisify(control.validate.bind(control));
              this.hook = function () {
                  formItem_1.clearError('component:valdiate');
                  return validate_1(form.data, formItem_1.value).then(function (ret) {
                      if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                          formItem_1.setError(ret, 'component:valdiate');
                      }
                  });
              };
              addHook(this.hook);
          }
          else if (!control && this.hook) {
              removeHook(this.hook);
              this.hook = undefined;
          }
          this.control = control;
      };
      FormControl.prototype.validate = function () {
          var _this = this;
          var form = this.props.formStore;
          if (this.model) {
              if (this.model.unique &&
                  form.parentStore &&
                  form.parentStore.storeType === combo_1.ComboStore.name) {
                  var combo = form.parentStore;
                  var group = combo.uniques.get(this.model.name);
                  group.items.forEach(function (item) { return item.validate(); });
              }
              else {
                  this.model.validate(this.hook);
                  form
                      .getItemsByName(this.model.name)
                      .forEach(function (item) { return item !== _this.model && item.validate(); });
              }
          }
      };
      FormControl.prototype.handleChange = function (value, submitOnChange, changeImmediately) {
          if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
          if (changeImmediately === void 0) { changeImmediately = false; }
          var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, type = _b.type, pipeOut = _b.pipeOut, conrolChangeImmediately = _b.changeImmediately, formInited = _a.formInited;
          // todo 以后想办法不要強耦合类型。
          if (!this.model || ~['service'].indexOf(type)) {
              onChange && onChange.apply(void 0, arguments);
              return;
          }
          if (pipeOut) {
              var oldValue = this.model.value;
              value = pipeOut(value, oldValue, form.data);
          }
          this.setState({
              value: this.value = value
          });
          changeImmediately || conrolChangeImmediately || !formInited
              ? this.emitChange(submitOnChange)
              : this.lazyEmitChange(submitOnChange);
      };
      FormControl.prototype.emitChange = function (submitOnChange) {
          if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
          var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, validateOnChange = _b.validateOnChange, name = _b.name, onFormItemChange = _b.onChange;
          if (!this.model) {
              return;
          }
          var value = this.value; // value 跟 this.state.value 更及时。
          var oldValue = this.model.value;
          if (oldValue === value) {
              return;
          }
          this.model.changeValue(value);
          if (validateOnChange === true ||
              (validateOnChange !== false && (form.submited || this.model.validated))) {
              this.lazyValidate();
          }
          else if (validateOnChange === false && !this.model.valid) {
              this.model.reset();
          }
          onFormItemChange && onFormItemChange(value, oldValue, this.model, form);
          onChange && onChange(value, name, submitOnChange === true);
      };
      FormControl.prototype.handleBlur = function (e) {
          var _a = this.props, onBlur = _a.onBlur, validateOnBlur = _a.control.validateOnBlur;
          if (validateOnBlur && this.model) {
              this.validate();
          }
          onBlur && onBlur(e);
      };
      FormControl.prototype.handleBulkChange = function (values, submitOnChange) {
          if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
          var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, validateOnChange = _b.validateOnChange, type = _b.type, onBulkChange = _a.onBulkChange;
          if (!helper_1.isObject(values)) {
              return;
          }
          else if (!this.model || ~['service'].indexOf(type)) {
              onBulkChange && onBulkChange(values);
              return;
          }
          var lastKey = '';
          var lastValue;
          Object.keys(values).forEach(function (key) {
              var value = values[key];
              lastKey = key;
              lastValue = value;
          });
          // is empty
          if (!lastKey) {
              return;
          }
          form.setValues(values);
          if (validateOnChange !== false && (form.submited || this.model.validated)) {
              this.lazyValidate();
          }
          onChange && onChange(lastValue, lastKey, submitOnChange === true);
      };
      FormControl.prototype.setPrinstineValue = function (value) {
          if (!this.model) {
              return;
          }
          var _a = this.props, form = _a.formStore, pipeOut = _a.control.pipeOut;
          if (pipeOut) {
              var oldValue = this.model.value;
              value = pipeOut(value, oldValue, form.data);
          }
          this.model.changeValue(value, true);
      };
      FormControl.prototype.getValue = function () {
          var _a = this.props, form = _a.formStore, control = _a.control;
          var value = this.state.value;
          if (control.pipeIn) {
              value = control.pipeIn(value, form.data);
          }
          return value;
      };
      // 兼容老版本用法，新版本直接用 onChange 就可以。
      FormControl.prototype.setValue = function (value, key) {
          var _a;
          var name = this.props.control.name;
          if (!key || key === name) {
              this.handleChange(value);
          }
          else {
              this.handleBulkChange((_a = {},
                  _a[key] = value,
                  _a));
          }
      };
      FormControl.prototype.render = function () {
          var _a = this.props, render = _a.render, _b = _a.control, pipeIn = _b.pipeIn, pipeOut = _b.pipeOut, onChange = _b.onChange, control = tslib_1.__rest(_b, ["pipeIn", "pipeOut", "onChange"]), formMode = _a.formMode, controlWidth = _a.controlWidth, type = _a.type, store = _a.store, data = _a.data, disabled = _a.disabled, rest = tslib_1.__rest(_a, ["render", "control", "formMode", "controlWidth", "type", "store", "data", "disabled"]);
          var model = this.model;
          var value = this.getValue();
          return render('', control, tslib_1.__assign(tslib_1.__assign({}, rest), { defaultSize: controlWidth, disabled: disabled || control.disabled, formItem: model, formMode: control.mode || formMode, ref: this.controlRef, defaultValue: control.value, data: store ? store.data : data, value: value, formItemValue: value, onChange: this.handleChange, onBlur: this.handleBlur, setValue: this.setValue, getValue: this.getValue, onBulkChange: this.handleBulkChange, prinstine: model ? model.prinstine : undefined, setPrinstineValue: this.setPrinstineValue }));
      };
      FormControl.propsList = ['control'];
      FormControl.defaultProps = {};
      return FormControl;
  }(react_1.default.PureComponent));
  exports.default = FormControl;
  var FormControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(FormControlRenderer, _super);
      function FormControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      FormControlRenderer.prototype.controlRef = function (ref) {
          var originRef = this.control;
          _super.prototype.controlRef.call(this, ref);
          var scoped = this.context;
          if (!this.control) {
              return;
          }
          if (ref) {
              scoped.registerComponent(this.control);
          }
          else {
              scoped.unRegisterComponent(originRef);
          }
      };
      FormControlRenderer.displayName = 'Control';
      FormControlRenderer.contextType = Scoped_1.ScopedContext;
      FormControlRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: function (path) {
                  return /(^|\/)form(?:\/.*)?\/control$/i.test(path) &&
                      !/\/control\/control$/i.test(path);
              },
              name: 'control'
          })
      ], FormControlRenderer);
      return FormControlRenderer;
  }(FormControl));
  exports.FormControlRenderer = FormControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/Control.js.map
  

});
