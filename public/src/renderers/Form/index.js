define('src/renderers/Form/index.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var form_1 = require("src/store/form.ts");
  var tpl_1 = require("src/utils/tpl.ts");
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  var helper_1 = require("src/utils/helper.ts");
  var debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  var flatten_1 = tslib_1.__importDefault(require("node_modules/lodash/flatten"));
  var find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  var Scoped_1 = require("src/Scoped.tsx");
  var qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  var tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  var api_1 = require("src/utils/api.ts");
  var Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  var components_1 = require("src/components/index.tsx");
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var Form = /** @class */ (function (_super) {
      tslib_1.__extends(Form, _super);
      function Form(props) {
          var _this = _super.call(this, props) || this;
          _this.hooks = {};
          _this.shouldLoadInitApi = false;
          _this.lazyHandleChange = debounce_1.default(_this.handleChange.bind(_this), 250, {
              trailing: true,
              leading: false
          });
          _this.onInit = _this.onInit.bind(_this);
          _this.handleAction = _this.handleAction.bind(_this);
          _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
          _this.handleDialogClose = _this.handleDialogClose.bind(_this);
          _this.handleDrawerConfirm = _this.handleDrawerConfirm.bind(_this);
          _this.handleDrawerClose = _this.handleDrawerClose.bind(_this);
          _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
          _this.validate = _this.validate.bind(_this);
          _this.submit = _this.submit.bind(_this);
          _this.addHook = _this.addHook.bind(_this);
          _this.removeHook = _this.removeHook.bind(_this);
          _this.handleChange = _this.handleChange.bind(_this);
          _this.renderFormItems = _this.renderFormItems.bind(_this);
          _this.reload = _this.reload.bind(_this);
          _this.silentReload = _this.silentReload.bind(_this);
          _this.initInterval = _this.initInterval.bind(_this);
          return _this;
      }
      Form.prototype.componentWillMount = function () {
          var _a = this.props, store = _a.store, canAccessSuperData = _a.canAccessSuperData, persistData = _a.persistData;
          store.setCanAccessSuperData(canAccessSuperData !== false);
          persistData && store.getPersistData();
          if (store &&
              store.parentStore &&
              store.parentStore.storeType === 'ComboStore') {
              var combo = store.parentStore;
              combo.addForm(store);
              combo.forms.forEach(function (item) {
                  return item.items.forEach(function (item) { return item.unique && item.syncOptions(); });
              });
          }
      };
      Form.prototype.componentDidMount = function () {
          var _this = this;
          var _a = this.props, initApi = _a.initApi, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, initAsyncApi = _a.initAsyncApi, initFinishedField = _a.initFinishedField, initCheckInterval = _a.initCheckInterval, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed, onValidate = _a.onValidate;
          this.mounted = true;
          if (onValidate) {
              var finnalValidate_1 = helper_1.promisify(onValidate);
              this.disposeOnValidate = this.addHook(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                  var result;
                  return tslib_1.__generator(this, function (_a) {
                      switch (_a.label) {
                          case 0: return [4 /*yield*/, finnalValidate_1(store.data, store)];
                          case 1:
                              result = _a.sent();
                              if (result && helper_1.isObject(result)) {
                                  Object.keys(result).forEach(function (key) {
                                      var msg = result[key];
                                      var item = store.getItemByName(key);
                                      // 没有这个 formItem
                                      if (!item) {
                                          return;
                                      }
                                      if (msg) {
                                          msg = Array.isArray(msg) ? msg : [msg];
                                          item.addError(msg);
                                      }
                                      else {
                                          item.clearError();
                                      }
                                  });
                              }
                              return [2 /*return*/];
                      }
                  });
              }); });
          }
          if (api_1.isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
              store
                  .fetchInitData(initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed,
                  onSuccess: function () {
                      if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                          store.data[initFinishedField || 'finished']) {
                          return;
                      }
                      return helper_1.until(function () { return store.checkRemote(initAsyncApi, store.data); }, function (ret) { return ret && ret[initFinishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); }, initCheckInterval);
                  }
              })
                  .then(this.initInterval)
                  .then(this.onInit);
          }
          else {
              setTimeout(this.onInit.bind(this), 4);
          }
      };
      Form.prototype.componentDidUpdate = function (prevProps) {
          var props = this.props;
          var store = props.store;
          if (api_1.isApiOutdated(prevProps.initApi, props.initApi, prevProps.data, props.data)) {
              var fetchSuccess = props.fetchSuccess, fetchFailed = props.fetchFailed;
              store
                  .fetchData(props.initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed
              })
                  .then(this.initInterval);
          }
      };
      Form.prototype.componentWillUnmount = function () {
          this.mounted = false;
          clearTimeout(this.timer);
          // this.lazyHandleChange.flush();
          this.lazyHandleChange.cancel();
          this.asyncCancel && this.asyncCancel();
          this.disposeOnValidate && this.disposeOnValidate();
          var store = this.props.store;
          if (store &&
              store.parentStore &&
              store.parentStore.storeType === 'ComboStore') {
              var combo = store.parentStore;
              mobx_state_tree_1.isAlive(combo) && combo.removeForm(store);
          }
      };
      Form.prototype.onInit = function () {
          return tslib_1.__awaiter(this, void 0, void 0, function () {
              var _a, onInit, store, submitOnInit, data, initedAt, hooks;
              return tslib_1.__generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          _a = this.props, onInit = _a.onInit, store = _a.store, submitOnInit = _a.submitOnInit;
                          if (!mobx_state_tree_1.isAlive(store)) {
                              return [2 /*return*/];
                          }
                          data = helper_1.cloneObject(store.data);
                          initedAt = store.initedAt;
                          store.setInited(true);
                          hooks = this.hooks['init'] || [];
                          return [4 /*yield*/, Promise.all(hooks.map(function (hook) { return hook(data); }))];
                      case 1:
                          _b.sent();
                          if (!mobx_state_tree_1.isAlive(store)) {
                              return [2 /*return*/];
                          }
                          if (store.initedAt !== initedAt) {
                              // 说明，之前的数据已经失效了。
                              // 比如 combo 一开始设置了初始值，然后 form 的 initApi 又返回了新的值。
                              // 这个时候 store 的数据应该已经 init 了新的值。但是 data 还是老的，这个时候
                              // onInit 出去就是错误的。
                              data = tslib_1.__assign(tslib_1.__assign({}, data), store.data);
                          }
                          onInit && onInit(data, this.props);
                          submitOnInit &&
                              this.handleAction(undefined, {
                                  type: 'submit'
                              }, store.data);
                          return [2 /*return*/];
                  }
              });
          });
      };
      Form.prototype.reload = function (subPath, query, ctx, silent) {
          var _a;
          var _this = this;
          if (query) {
              return this.receive(query);
          }
          var _b = this.props, store = _b.store, initApi = _b.initApi, initAsyncApi = _b.initAsyncApi, initFinishedField = _b.initFinishedField, _c = _b.messages, fetchSuccess = _c.fetchSuccess, fetchFailed = _c.fetchFailed;
          api_1.isEffectiveApi(initAsyncApi, store.data) &&
              store.updateData((_a = {},
                  _a[initFinishedField || 'finished'] = false,
                  _a));
          api_1.isEffectiveApi(initApi, store.data)
              ? store
                  .fetchInitData(initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed,
                  silent: silent,
                  onSuccess: function () {
                      if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                          store.data[initFinishedField || 'finished']) {
                          return;
                      }
                      return helper_1.until(function () { return store.checkRemote(initAsyncApi, store.data); }, function (ret) { return ret && ret[initFinishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); });
                  }
              })
                  .then(this.initInterval)
                  .then(function () { return store.reset(undefined, false); })
              : store.reset(undefined, false);
      };
      Form.prototype.receive = function (values) {
          var store = this.props.store;
          store.updateData(values);
          this.reload();
      };
      Form.prototype.silentReload = function (target, query) {
          this.reload(target, query, undefined, true);
      };
      Form.prototype.initInterval = function (value) {
          var _a = this.props, interval = _a.interval, silentPolling = _a.silentPolling, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, data = _a.data;
          clearTimeout(this.timer);
          interval &&
              this.mounted &&
              (!stopAutoRefreshWhen || !tpl_1.evalExpression(stopAutoRefreshWhen, data)) &&
              (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 3000)));
          return value;
      };
      Form.prototype.isValidated = function () {
          return this.props.store.validated;
      };
      Form.prototype.validate = function (forceValidate) {
          var store = this.props.store;
          this.flush();
          return store.validate(this.hooks['validate'] || [], forceValidate);
      };
      Form.prototype.clearErrors = function () {
          var store = this.props.store;
          return store.clearErrors();
      };
      Form.prototype.submit = function (fn) {
          var _a = this.props, store = _a.store, messages = _a.messages;
          this.flush();
          return store.submit(fn, this.hooks['validate' || []], messages && messages.validateFailed);
      };
      // 如果开启了 lazyChange，需要一个 flush 方法把队列中值应用上。
      Form.prototype.flush = function () {
          var hooks = this.hooks['flush'] || [];
          hooks.forEach(function (fn) { return fn(); });
          this.lazyHandleChange.flush();
      };
      Form.prototype.reset = function () {
          var _a = this.props, store = _a.store, onReset = _a.onReset;
          store.reset(onReset);
      };
      Form.prototype.addHook = function (fn, type) {
          var _this = this;
          if (type === void 0) { type = 'validate'; }
          this.hooks[type] = this.hooks[type] || [];
          this.hooks[type].push(type === 'flush' ? fn : helper_1.promisify(fn));
          return function () {
              _this.removeHook(fn, type);
              fn = helper_1.noop;
          };
      };
      Form.prototype.removeHook = function (fn, type) {
          if (type === void 0) { type = 'validate'; }
          var hooks = this.hooks[type];
          if (!hooks) {
              return;
          }
          for (var i = 0, len = hooks.length; i < len; i++) {
              var hook = hooks[i];
              if (hook === fn || hook.raw === fn) {
                  hooks.splice(i, 1);
                  len--;
                  i--;
              }
          }
      };
      Form.prototype.handleChange = function (value, name, submit) {
          var _a = this.props, onChange = _a.onChange, store = _a.store, submitOnChange = _a.submitOnChange;
          onChange &&
              onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
          (submit || submitOnChange) &&
              this.handleAction(undefined, {
                  type: 'submit'
              }, store.data);
      };
      Form.prototype.handleFormSubmit = function (e) {
          e.preventDefault();
          return this.handleAction(e, {
              type: 'submit'
          }, this.props.store.data);
      };
      Form.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
          var _this = this;
          if (throwErrors === void 0) { throwErrors = false; }
          var _a = this.props, store = _a.store, onSubmit = _a.onSubmit, api = _a.api, asyncApi = _a.asyncApi, finishedField = _a.finishedField, checkInterval = _a.checkInterval, _b = _a.messages, saveSuccess = _b.saveSuccess, saveFailed = _b.saveFailed, resetAfterSubmit = _a.resetAfterSubmit, onAction = _a.onAction, onSaved = _a.onSaved, onReset = _a.onReset, onFinished = _a.onFinished, onFailed = _a.onFailed, redirect = _a.redirect, reload = _a.reload, target = _a.target, env = _a.env, onChange = _a.onChange, clearPersistDataAfterSubmit = _a.clearPersistDataAfterSubmit, trimValues = _a.trimValues;
          // 做动作之前，先把数据同步一下。
          this.flush();
          if (trimValues) {
              store.trimValues();
          }
          // 如果 data 就是当前层，则 flush 一下。
          if (data === this.props.data) {
              data = store.data;
          }
          if (Array.isArray(action.required) && action.required.length) {
              return store.validateFields(action.required).then(function (result) {
                  if (!result) {
                      env.notify('error', '依赖的部分字段没有通过验证，请注意填写！');
                  }
                  else {
                      _this.handleAction(e, tslib_1.__assign(tslib_1.__assign({}, action), { required: undefined }), data, throwErrors, delegate);
                  }
              });
          }
          if (action.type === 'submit' ||
              action.actionType === 'submit' ||
              action.actionType === 'confirm') {
              store.setCurrentAction(action);
              return this.submit(function (values) {
                  var _a;
                  if (onSubmit && onSubmit(values, action) === false) {
                      return Promise.resolve(values);
                  }
                  if (target) {
                      _this.submitToTarget(target, values);
                  }
                  else if (action.actionType === 'reload') {
                      action.target && _this.reloadTarget(action.target, values);
                  }
                  else if (action.actionType === 'dialog') {
                      store.openDialog(data);
                  }
                  else if (action.actionType === 'drawer') {
                      store.openDrawer(data);
                  }
                  else if (api_1.isEffectiveApi(action.api || api, values)) {
                      var finnalAsyncApi_1 = action.asyncApi || asyncApi;
                      api_1.isEffectiveApi(finnalAsyncApi_1, store.data) &&
                          store.updateData((_a = {},
                              _a[finishedField || 'finished'] = false,
                              _a));
                      return store
                          .saveRemote(action.api || api, values, {
                          successMessage: saveSuccess,
                          errorMessage: saveFailed,
                          onSuccess: function () {
                              if (!api_1.isEffectiveApi(finnalAsyncApi_1, store.data) ||
                                  store.data[finishedField || 'finished']) {
                                  return;
                              }
                              return helper_1.until(function () { return store.checkRemote(finnalAsyncApi_1, store.data); }, function (ret) { return ret && ret[finishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); }, checkInterval);
                          }
                      })
                          .then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                          return tslib_1.__generator(this, function (_a) {
                              switch (_a.label) {
                                  case 0:
                                      onSaved && onSaved(values, response);
                                      if (!(action.feedback && helper_1.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                                      return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                                  case 1:
                                      _a.sent();
                                      _a.label = 2;
                                  case 2: return [2 /*return*/, values];
                              }
                          });
                      }); });
                  }
                  return Promise.resolve(values);
              })
                  .then(function (values) {
                  if (onFinished && onFinished(values, action) === false) {
                      return values;
                  }
                  resetAfterSubmit && store.reset(onReset);
                  clearPersistDataAfterSubmit && store.clearPersistData();
                  if (action.redirect || redirect) {
                      env.updateLocation(tpl_1.filter(action.redirect || redirect, store.data));
                  }
                  else if (action.reload || reload) {
                      _this.reloadTarget(action.reload || reload, store.data);
                  }
                  return values;
              })
                  .catch(function (reason) {
                  onFailed && onFailed(reason, store.errors);
                  if (throwErrors) {
                      throw reason;
                  }
              });
          }
          else if (action.type === 'reset') {
              store.setCurrentAction(action);
              store.reset(onReset);
          }
          else if (action.actionType === 'dialog') {
              store.setCurrentAction(action);
              store.openDialog(data);
          }
          else if (action.actionType === 'drawer') {
              store.setCurrentAction(action);
              store.openDrawer(data);
          }
          else if (action.actionType === 'ajax') {
              store.setCurrentAction(action);
              if (!api_1.isEffectiveApi(action.api)) {
                  return env.alert("\u5F53 actionType \u4E3A ajax \u65F6\uFF0C\u8BF7\u8BBE\u7F6E api \u5C5E\u6027");
              }
              return store
                  .saveRemote(action.api, data, {
                  successMessage: (action.messages && action.messages.success) || saveSuccess,
                  errorMessage: (action.messages && action.messages.failed) || saveFailed
              })
                  .then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                  return tslib_1.__generator(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              response &&
                                  onChange &&
                                  onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
                              if (!store.validated) return [3 /*break*/, 2];
                              return [4 /*yield*/, this.validate(true)];
                          case 1:
                              _a.sent();
                              _a.label = 2;
                          case 2:
                              if (!(action.feedback && helper_1.isVisible(action.feedback, store.data))) return [3 /*break*/, 4];
                              return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                          case 3:
                              _a.sent();
                              _a.label = 4;
                          case 4:
                              action.redirect &&
                                  env.updateLocation(tpl_1.filter(action.redirect, store.data));
                              action.reload && this.reloadTarget(action.reload, store.data);
                              return [2 /*return*/];
                      }
                  });
              }); })
                  .catch(function () { });
          }
          else if (action.actionType === 'reload') {
              store.setCurrentAction(action);
              action.target && this.reloadTarget(action.target, data);
          }
          else if (onAction) {
              // 不识别的丢给上层去处理。
              return onAction(e, action, data, throwErrors, delegate || this.context);
          }
      };
      Form.prototype.handleDialogConfirm = function (values, action, ctx, targets) {
          var _a = this.props, store = _a.store, onChange = _a.onChange;
          if ((action.mergeData || store.action.mergeData) &&
              values.length === 1 &&
              values[0] &&
              targets[0].props.type === 'form') {
              store.updateData(values[0]);
              onChange &&
                  onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
          }
          store.closeDialog(true);
      };
      Form.prototype.handleDialogClose = function () {
          var store = this.props.store;
          store.closeDialog(false);
      };
      Form.prototype.handleDrawerConfirm = function (values, action, ctx, targets) {
          var _a = this.props, store = _a.store, onChange = _a.onChange;
          if ((action.mergeData || store.action.mergeData) &&
              values.length === 1 &&
              values[0] &&
              targets[0].props.type === 'form') {
              store.updateData(values[0]);
              onChange &&
                  onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
          }
          store.closeDrawer(true);
      };
      Form.prototype.handleDrawerClose = function () {
          var store = this.props.store;
          store.closeDrawer(false);
      };
      Form.prototype.submitToTarget = function (target, values) {
          // 会被覆写
      };
      Form.prototype.reloadTarget = function (target, data) {
          // 会被覆写
      };
      Form.prototype.openFeedback = function (dialog, ctx) {
          var _this = this;
          return new Promise(function (resolve) {
              var store = _this.props.store;
              store.setCurrentAction({
                  type: 'button',
                  actionType: 'dialog',
                  dialog: dialog
              });
              store.openDialog(ctx, undefined, function (confirmed) {
                  resolve(confirmed);
              });
          });
      };
      Form.prototype.buildActions = function () {
          var _a = this.props, actions = _a.actions, submitText = _a.submitText, controls = _a.controls;
          if (typeof actions !== 'undefined' ||
              !submitText ||
              (Array.isArray(controls) &&
                  controls.some(function (item) {
                      return !!~['submit', 'button', 'reset', 'button-group'].indexOf(item.type);
                  }))) {
              return actions;
          }
          return [
              {
                  type: 'submit',
                  label: submitText,
                  primary: true
              }
          ];
      };
      Form.prototype.renderFormItems = function (schema, region, otherProps) {
          if (region === void 0) { region = ''; }
          if (otherProps === void 0) { otherProps = {}; }
          return this.renderControls(schema.controls, region, otherProps);
          // return schema.tabs ? this.renderTabs(schema.tabs, schema, region)
          // : schema.fieldSet ? this.renderFiledSet(schema.fieldSet, schema, region) : this.renderControls(schema.controls as SchemaNode, schema, region);
      };
      Form.prototype.renderControls = function (controls, region, otherProps) {
          var _this = this;
          if (otherProps === void 0) { otherProps = {}; }
          controls = controls || [];
          if (!Array.isArray(controls)) {
              controls = [controls];
          }
          if (this.props.mode === 'row') {
              var ns_1 = this.props.classPrefix;
              controls = flatten_1.default(controls).filter(function (item) {
                  if (item.hidden || item.visible === false) {
                      return false;
                  }
                  var exprProps = filter_schema_1.default(item, _this.props.store.data);
                  if (exprProps.hidden || exprProps.visible === false) {
                      return false;
                  }
                  return true;
              });
              if (!controls.length) {
                  return null;
              }
              return (react_1.default.createElement("div", { className: ns_1 + "Form-row" }, controls.map(function (control, key) {
                  return ~['hidden', 'formula'].indexOf(control.type) ||
                      control.mode === 'inline' ? (_this.renderControl(control, key, otherProps)) : (react_1.default.createElement("div", { key: key, className: classnames_1.default(ns_1 + "Form-col", control.columnClassName) }, _this.renderControl(control, '', tslib_1.__assign(tslib_1.__assign({}, otherProps), { mode: 'row' }))));
              })));
          }
          return controls.map(function (control, key) {
              return _this.renderControl(control, key, otherProps, region);
          });
      };
      Form.prototype.renderControl = function (control, key, otherProps, region) {
          if (key === void 0) { key = ''; }
          if (otherProps === void 0) { otherProps = {}; }
          if (region === void 0) { region = ''; }
          if (!control) {
              return null;
          }
          else if (typeof control === 'string') {
              control = {
                  type: 'tpl',
                  tpl: control
              };
          }
          var props = tslib_1.__assign(tslib_1.__assign({}, this.props), otherProps);
          var form = this.props.store;
          var render = props.render, mode = props.mode, horizontal = props.horizontal, store = props.store, disabled = props.disabled, controlWidth = props.controlWidth, resolveDefinitions = props.resolveDefinitions, lazyChange = props.lazyChange, formLazyChange = props.formLazyChange;
          var subProps = {
              formStore: form,
              data: store.data,
              key: (control.name || '') + "-" + control.type + "-" + key,
              formInited: form.inited,
              formMode: mode,
              formHorizontal: horizontal,
              controlWidth: controlWidth,
              disabled: disabled || control.disabled || form.loading,
              btnDisabled: form.loading || form.validating,
              onAction: this.handleAction,
              onChange: formLazyChange === false ? this.handleChange : this.lazyHandleChange,
              addHook: this.addHook,
              removeHook: this.removeHook,
              renderFormItems: this.renderFormItems,
              formPristine: form.pristine
          };
          var subSchema = control.type === 'control'
              ? control
              : {
                  type: 'control',
                  control: control
              };
          if (subSchema.control) {
              var control_1 = subSchema.control;
              if (control_1.$ref) {
                  subSchema.control = control_1 = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, resolveDefinitions(control_1.$ref)), control_1), filter_schema_1.default(control_1, store.data));
                  delete control_1.$ref;
              }
              else {
                  subSchema.control = control_1 = tslib_1.__assign(tslib_1.__assign({}, control_1), filter_schema_1.default(control_1, store.data));
              }
              if (control_1.component && control_1.label && control_1.name) {
                  control_1.component = Item_1.asFormItem(control_1.options || {})(control_1.component);
              }
              control_1.hiddenOn && (subSchema.hiddenOn = control_1.hiddenOn);
              control_1.visibleOn && (subSchema.visibleOn = control_1.visibleOn);
              lazyChange === false && (control_1.changeImmediately = true);
          }
          return render("" + (region ? region + "/" : '') + key, subSchema, subProps);
      };
      Form.prototype.renderBody = function () {
          var _a = this.props, tabs = _a.tabs, fieldSet = _a.fieldSet, controls = _a.controls, mode = _a.mode, className = _a.className, cx = _a.classnames, debug = _a.debug, $path = _a.$path, store = _a.store, render = _a.render;
          var WrapperComponent = this.props.wrapperComponent ||
              (/(?:\/|^)form\//.test($path) ? 'div' : 'form');
          return (react_1.default.createElement(WrapperComponent, { className: cx("Form", "Form--" + (mode || 'normal'), className), onSubmit: this.handleFormSubmit, noValidate: true },
              debug ? (react_1.default.createElement("pre", null,
                  react_1.default.createElement("code", null, JSON.stringify(store.data, null, 2)))) : null,
              react_1.default.createElement(Spinner_1.default, { show: store.loading, overlay: true }),
              this.renderFormItems({
                  tabs: tabs,
                  fieldSet: fieldSet,
                  controls: controls
              }),
              render('modal', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                  store.action.dialog)), { type: 'dialog' }), {
                  key: 'dialog',
                  data: store.dialogData,
                  onConfirm: this.handleDialogConfirm,
                  onClose: this.handleDialogClose,
                  show: store.dialogOpen
              }),
              render('modal', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                  store.action.drawer)), { type: 'drawer' }), {
                  key: 'drawer',
                  data: store.drawerData,
                  onConfirm: this.handleDrawerConfirm,
                  onClose: this.handleDrawerClose,
                  show: store.drawerOpen
              })));
      };
      Form.prototype.render = function () {
          var _a = this.props, wrapWithPanel = _a.wrapWithPanel, render = _a.render, title = _a.title, store = _a.store, panelClassName = _a.panelClassName, headerClassName = _a.headerClassName, footerClassName = _a.footerClassName, actionsClassName = _a.actionsClassName, bodyClassName = _a.bodyClassName, cx = _a.classnames, affixFooter = _a.affixFooter, lazyLoad = _a.lazyLoad;
          var body = this.renderBody();
          if (wrapWithPanel) {
              body = render('body', {
                  type: 'panel',
                  title: title
              }, {
                  className: cx(panelClassName, 'Panel--form'),
                  children: body,
                  actions: this.buildActions(),
                  onAction: this.handleAction,
                  disabled: store.loading,
                  btnDisabled: store.loading || store.validating,
                  headerClassName: headerClassName,
                  footerClassName: footerClassName,
                  actionsClassName: actionsClassName,
                  bodyClassName: bodyClassName,
                  affixFooter: affixFooter
              });
          }
          if (lazyLoad) {
              body = react_1.default.createElement(components_1.LazyComponent, null, body);
          }
          return body;
      };
      Form.defaultProps = {
          title: '表单',
          submitText: '提交',
          initFetch: true,
          wrapWithPanel: true,
          mode: 'normal',
          collapsable: false,
          controlWidth: 'full',
          horizontal: {
              left: 2,
              right: 10,
              offset: 2
          },
          panelClassName: 'Panel--default',
          messages: {
              fetchFailed: '初始化失败',
              saveSuccess: '保存成功',
              saveFailed: '保存失败'
          },
          wrapperComponent: '',
          finishedField: 'finished',
          initFinishedField: 'finished'
      };
      Form.propsList = [
          'title',
          'header',
          'controls',
          'tabs',
          'fieldSet',
          'submitText',
          'initFetch',
          'wrapWithPanel',
          'mode',
          'collapsable',
          'horizontal',
          'panelClassName',
          'messages',
          'wrapperComponent',
          'resetAfterSubmit',
          'submitOnInit',
          'submitOnChange',
          'onInit',
          'onReset',
          'onSubmit',
          'onChange',
          'onFailed',
          'onFinished',
          'canAccessSuperData',
          'lazyChange',
          'formLazyChange',
          'lazyLoad',
          'formInited'
      ];
      return Form;
  }(react_1.default.Component));
  exports.default = Form;
  var FormRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(FormRenderer, _super);
      function FormRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      FormRenderer.prototype.componentWillMount = function () {
          var scoped = this.context;
          scoped.registerComponent(this);
          _super.prototype.componentWillMount.call(this);
      };
      FormRenderer.prototype.componentDidMount = function () {
          _super.prototype.componentDidMount.call(this);
          if (this.props.autoFocus) {
              var scoped = this.context;
              var inputs = scoped.getComponents();
              var focuableInput_1 = find_1.default(inputs, function (input) { return input.focus; });
              focuableInput_1 && setTimeout(function () { return focuableInput_1.focus(); }, 200);
          }
      };
      FormRenderer.prototype.componentWillUnmount = function () {
          var scoped = this.context;
          scoped.unRegisterComponent(this);
          _super.prototype.componentWillUnmount.call(this);
      };
      FormRenderer.prototype.doAction = function (action, data, throwErrors) {
          if (throwErrors === void 0) { throwErrors = false; }
          return this.handleAction(undefined, action, data, throwErrors);
      };
      FormRenderer.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
          if (throwErrors === void 0) { throwErrors = false; }
          if (action.target && action.actionType !== 'reload') {
              var scoped_1 = this.context;
              return Promise.all(action.target.split(',').map(function (name) {
                  var target = scoped_1.getComponentByName(name);
                  return (target &&
                      target.doAction &&
                      target.doAction(tslib_1.__assign(tslib_1.__assign({}, action), { target: undefined }), ctx, throwErrors));
              }));
          }
          else {
              return _super.prototype.handleAction.call(this, e, action, ctx, throwErrors, delegate);
          }
      };
      FormRenderer.prototype.handleDialogConfirm = function (values, action, ctx, targets) {
          _super.prototype.handleDialogConfirm.call(this, values, action, ctx, targets);
          var store = this.props.store;
          var scoped = this.context;
          if (action.reload) {
              scoped.reload(action.reload, ctx);
          }
          else if (store.action && store.action.reload) {
              scoped.reload(store.action.reload, ctx);
          }
      };
      FormRenderer.prototype.submitToTarget = function (target, values) {
          var scoped = this.context;
          scoped.send(target, values);
      };
      FormRenderer.prototype.reloadTarget = function (target, data) {
          var scoped = this.context;
          scoped.reload(target, data);
      };
      FormRenderer.prototype.reload = function (target, query, ctx) {
          if (query) {
              return this.receive(query);
          }
          var scoped = this.context;
          var subPath = '';
          var idx;
          var subQuery = null;
          if (target && ~(idx = target.indexOf('.'))) {
              subPath = target.substring(idx + 1);
              target = target.substring(0, idx);
          }
          var idx2 = target ? target.indexOf('?') : -1;
          if (~idx2) {
              subQuery = tpl_builtin_1.dataMapping(qs_1.default.parse(target.substring(idx2 + 1)), ctx);
              target = target.substring(0, idx2);
          }
          var component;
          if (target &&
              (component = scoped.getComponentByName(target)) &&
              component.reload) {
              component.reload(subPath, subQuery, ctx);
          }
          else if (target === '*') {
              _super.prototype.reload.call(this);
              var components = scoped.getComponents();
              components.forEach(function (component) {
                  return component.reload && component.reload('', subQuery, ctx);
              });
          }
          else {
              _super.prototype.reload.call(this);
          }
      };
      FormRenderer.prototype.receive = function (values, name) {
          if (name) {
              var scoped = this.context;
              var idx = name.indexOf('.');
              var subPath = '';
              if (~idx) {
                  subPath = name.substring(1 + idx);
                  name = name.substring(0, idx);
              }
              var component = scoped.getComponentByName(name);
              component && component.receive && component.receive(values, subPath);
              return;
          }
          return _super.prototype.receive.call(this, values);
      };
      FormRenderer.contextType = Scoped_1.ScopedContext;
      FormRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: function (path) {
                  return /(^|\/)form$/.test(path) &&
                      !/(^|\/)form(?:\/.+)?\/control\/form$/.test(path);
              },
              storeType: form_1.FormStore.name,
              name: 'form',
              isolateScope: true
          })
      ], FormRenderer);
      return FormRenderer;
  }(Form));
  exports.FormRenderer = FormRenderer;
  //# sourceMappingURL=/src/renderers/Form/index.js.map
  

});
