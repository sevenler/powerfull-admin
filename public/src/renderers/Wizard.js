define('src/renderers/Wizard.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Scoped_1 = require("src/Scoped.tsx");
  var factory_1 = require("src/factory.tsx");
  var service_1 = require("src/store/service.ts");
  var types_1 = require("src/types.ts");
  var tpl_1 = require("src/utils/tpl.ts");
  var helper_1 = require("src/utils/helper.ts");
  var api_1 = require("src/utils/api.ts");
  var components_1 = require("src/components/index.tsx");
  var react_dom_1 = require("node_modules/react-dom/index");
  var resize_sensor_1 = require("src/utils/resize-sensor.ts");
  var Wizard = /** @class */ (function (_super) {
      tslib_1.__extends(Wizard, _super);
      function Wizard() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.affixDom = react_1.default.createRef();
          _this.footerDom = react_1.default.createRef();
          _this.initalValues = {};
          _this.state = {
              currentStep: -1 // init 完后会设置成 1
          };
          return _this;
      }
      Wizard.prototype.componentDidMount = function () {
          var _this = this;
          var _a = this.props, initApi = _a.initApi, initFetch = _a.initFetch, initAsyncApi = _a.initAsyncApi, initFinishedField = _a.initFinishedField, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed, onInit = _a.onInit;
          if (api_1.isEffectiveApi(initApi, store.data, initFetch)) {
              store
                  .fetchInitData(initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed,
                  onSuccess: function () {
                      if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                          store.data[initFinishedField || 'finished']) {
                          return;
                      }
                      return helper_1.until(function () { return store.checkRemote(initAsyncApi, store.data); }, function (ret) { return ret && ret[initFinishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); });
                  }
              })
                  .then(function (value) {
                  onInit && onInit(store.data);
                  var state = {
                      currentStep: 1
                  };
                  if (value &&
                      value.data &&
                      (typeof value.data.step === 'number' ||
                          (typeof value.data.step === 'string' &&
                              /^\d+$/.test(value.data.step)))) {
                      state.currentStep = parseInt(value.data.step, 10);
                  }
                  _this.setState(state, function () {
                      // 如果 initApi 返回的状态是正在提交，则进入轮顺状态。
                      if (value &&
                          value.data &&
                          (value.data.submiting || value.data.submited)) {
                          _this.checkSubmit();
                      }
                  });
                  return value;
              });
          }
          else {
              this.setState({
                  currentStep: 1
              }, function () { return onInit && onInit(store.data); });
          }
          var dom = react_dom_1.findDOMNode(this);
          var parent = dom ? helper_1.getScrollParent(dom) : null;
          if (!parent || parent === document.body) {
              parent = window;
          }
          this.parentNode = parent;
          parent.addEventListener('scroll', this.affixDetect);
          this.unSensor = resize_sensor_1.resizeSensor(dom, this.affixDetect);
          this.affixDetect();
      };
      Wizard.prototype.componentDidUpdate = function (prevProps) {
          var props = this.props;
          var store = props.store, fetchSuccess = props.fetchSuccess, fetchFailed = props.fetchFailed;
          if (api_1.isApiOutdated(prevProps.initApi, props.initApi, prevProps.data, props.data)) {
              store.fetchData(props.initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed
              });
          }
      };
      Wizard.prototype.componentWillUnmount = function () {
          this.asyncCancel && this.asyncCancel();
          var parent = this.parentNode;
          parent && parent.removeEventListener('scroll', this.affixDetect);
          this.unSensor && this.unSensor();
      };
      Wizard.prototype.affixDetect = function () {
          if (!this.props.affixFooter ||
              !this.affixDom.current ||
              !this.footerDom.current) {
              return;
          }
          var affixDom = this.affixDom.current;
          var footerDom = this.footerDom.current;
          var affixed = false;
          footerDom.offsetWidth &&
              (affixDom.style.cssText = "width: " + footerDom.offsetWidth + "px;");
          if (this.props.affixFooter === 'always') {
              affixed = true;
              footerDom.classList.add('invisible2');
          }
          else {
              var clip = footerDom.getBoundingClientRect();
              var clientHeight = window.innerHeight;
              affixed = clip.top + clip.height / 2 > clientHeight;
          }
          affixed ? affixDom.classList.add('in') : affixDom.classList.remove('in');
      };
      Wizard.prototype.gotoStep = function (index) {
          var steps = this.props.steps || [];
          index = Math.max(Math.min(steps.length, index), 1);
          this.setState({
              currentStep: index
          });
      };
      Wizard.prototype.formRef = function (ref) {
          if (ref) {
              while (ref && ref.getWrappedInstance) {
                  ref = ref.getWrappedInstance();
              }
              this.form = ref;
          }
          else {
              this.form = undefined;
          }
      };
      Wizard.prototype.submitToTarget = function (target, values) {
          throw new Error('Please implements this!');
      };
      Wizard.prototype.reloadTarget = function (target, data) {
          throw new Error('Please implements this!');
      };
      Wizard.prototype.reload = function (subPath, query, ctx) {
          var _this = this;
          if (query) {
              return this.receive(query);
          }
          var _a = this.props, initApi = _a.initApi, initAsyncApi = _a.initAsyncApi, initFinishedField = _a.initFinishedField, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
          if (api_1.isEffectiveApi(initApi, store.data) && this.state.currentStep === 1) {
              store
                  .fetchInitData(initApi, store.data, {
                  successMessage: fetchSuccess,
                  errorMessage: fetchFailed,
                  onSuccess: function () {
                      if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                          store.data[initFinishedField || 'finished']) {
                          return;
                      }
                      return helper_1.until(function () { return store.checkRemote(initAsyncApi, store.data); }, function (ret) { return ret && ret[initFinishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); });
                  }
              })
                  .then(function (value) {
                  var state = {
                      currentStep: 1
                  };
                  if (value &&
                      value.data &&
                      (typeof value.data.step === 'number' ||
                          (typeof value.data.step === 'string' &&
                              /^\d+$/.test(value.data.step)))) {
                      state.currentStep = parseInt(value.data.step, 10);
                  }
                  _this.setState(state, function () {
                      // 如果 initApi 返回的状态是正在提交，则进入轮顺状态。
                      if (value &&
                          value.data &&
                          (value.data.submiting || value.data.submited)) {
                          _this.checkSubmit();
                      }
                  });
                  return value;
              });
          }
      };
      Wizard.prototype.receive = function (values) {
          var store = this.props.store;
          store.updateData(values);
          this.reload();
      };
      Wizard.prototype.domRef = function (ref) {
          this.dom = ref;
      };
      Wizard.prototype.getPopOverContainer = function () {
          return this.dom;
      };
      // 用来还原异步提交状态。
      Wizard.prototype.checkSubmit = function () {
          var _a;
          var _this = this;
          var _b = this.props, store = _b.store, steps = _b.steps, asyncApi = _b.asyncApi, finishedField = _b.finishedField, env = _b.env;
          var step = steps[this.state.currentStep - 1];
          var finnalAsyncApi = (step && step.asyncApi) ||
              (this.state.currentStep === steps.length && asyncApi);
          if (!step || !api_1.isEffectiveApi(finnalAsyncApi, store.data)) {
              return;
          }
          store.markSaving(true);
          store.updateData((_a = {},
              _a[finishedField || 'finished'] = false,
              _a));
          helper_1.until(function () { return store.checkRemote(finnalAsyncApi, store.data); }, function (ret) { return ret && ret[finishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); })
              .then(function () {
              store.markSaving(false);
              _this.gotoStep(_this.state.currentStep + 1);
          })
              .catch(function (e) {
              env.notify('error', e.message);
              store.markSaving(false);
          });
      };
      Wizard.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
          var _this = this;
          if (throwErrors === void 0) { throwErrors = false; }
          var _a = this.props, onAction = _a.onAction, store = _a.store, env = _a.env;
          if (action.actionType === 'next' || action.type === 'submit') {
              this.form.doAction(tslib_1.__assign(tslib_1.__assign({}, action), { actionType: 'submit' }), data);
          }
          else if (action.actionType === 'prev') {
              this.gotoStep(this.state.currentStep - 1);
          }
          else if (action.type === 'reset') {
              this.form.reset();
          }
          else if (action.actionType === 'dialog') {
              store.openDialog(data);
          }
          else if (action.actionType === 'ajax') {
              if (!action.api) {
                  return env.alert("\u5F53 actionType \u4E3A ajax \u65F6\uFF0C\u8BF7\u8BBE\u7F6E api \u5C5E\u6027");
              }
              return store
                  .saveRemote(action.api, data, {
                  successMessage: action.messages && action.messages.success,
                  errorMessage: action.messages && action.messages.failed
              })
                  .then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                  return tslib_1.__generator(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              this.form && this.form.isValidated() && this.form.validate(true);
                              if (!(action.feedback && helper_1.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                              return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                          case 1:
                              _a.sent();
                              _a.label = 2;
                          case 2:
                              action.reload
                                  ? this.reloadTarget(action.reload, store.data)
                                  : action.redirect
                                      ? env.updateLocation(tpl_1.filter(action.redirect, store.data))
                                      : null;
                              return [2 /*return*/];
                      }
                  });
              }); })
                  .catch(function () { });
          }
          else if (action.actionType === 'reload') {
              action.target && this.reloadTarget(action.target, data);
          }
          else if (onAction) {
              onAction(e, action, data, throwErrors, delegate || this.context);
          }
      };
      Wizard.prototype.openFeedback = function (dialog, ctx) {
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
      Wizard.prototype.handleChange = function (values) {
          var store = this.props.store;
          store.updateData(values);
      };
      Wizard.prototype.handleInit = function (values) {
          var step = this.state.currentStep;
          this.initalValues[step] = this.initalValues[step] || values;
      };
      Wizard.prototype.handleReset = function (values) {
          var store = this.props.store;
          var initalValue = this.initalValues[this.state.currentStep];
          var reseted = {};
          Object.keys(values).forEach(function (key) {
              reseted[key] = initalValue.hasOwnProperty(key)
                  ? initalValue[key]
                  : undefined;
          });
          store.updateData(reseted);
      };
      // 接管里面 form 的提交，不能直接让 form 提交，因为 wizard 自己需要知道进度。
      Wizard.prototype.handleSubmit = function (values, action) {
          var _a, _b;
          var _this = this;
          var _c = this.props, store = _c.store, steps = _c.steps, api = _c.api, asyncApi = _c.asyncApi, finishedField = _c.finishedField, target = _c.target, redirect = _c.redirect, reload = _c.reload, env = _c.env, onFinished = _c.onFinished;
          var step = steps[this.state.currentStep - 1];
          store.updateData(values);
          if (this.state.currentStep < steps.length) {
              var finnalAsyncApi_1 = action.asyncApi || step.asyncApi;
              api_1.isEffectiveApi(finnalAsyncApi_1, store.data) &&
                  store.updateData((_a = {},
                      _a[finishedField || 'finished'] = false,
                      _a));
              if (api_1.isEffectiveApi(action.api || step.api, store.data)) {
                  store
                      .saveRemote(action.api || step.api, store.data, {
                      onSuccess: function () {
                          if (!api_1.isEffectiveApi(finnalAsyncApi_1, store.data) ||
                              store.data[finishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(function () { return store.checkRemote(finnalAsyncApi_1, store.data); }, function (ret) { return ret && ret[finishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); });
                      }
                  })
                      .then(function (value) {
                      return _this.gotoStep(value && typeof value.step === 'number'
                          ? value.step
                          : _this.state.currentStep + 1);
                  })
                      .catch(function () {
                      // do nothing
                  });
              }
              else {
                  this.gotoStep(this.state.currentStep + 1);
              }
          }
          else {
              // 最后一步
              if (target) {
                  this.submitToTarget(target, store.data);
              }
              else if (action.api || step.api || api) {
                  var finnalAsyncApi_2 = action.asyncApi || step.asyncApi || asyncApi;
                  api_1.isEffectiveApi(finnalAsyncApi_2, store.data) &&
                      store.updateData((_b = {},
                          _b[finishedField || 'finished'] = false,
                          _b));
                  var formStore = this.form
                      ? this.form.props.store
                      : store;
                  store.markSaving(true);
                  formStore
                      .saveRemote(action.api || step.api || api, store.data, {
                      onSuccess: function () {
                          if (!api_1.isEffectiveApi(finnalAsyncApi_2, store.data) ||
                              store.data[finishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(function () { return store.checkRemote(finnalAsyncApi_2, store.data); }, function (ret) { return ret && ret[finishedField || 'finished']; }, function (cancel) { return (_this.asyncCancel = cancel); });
                      }
                  })
                      .then(function (value) {
                      store.updateData(tslib_1.__assign(tslib_1.__assign({}, store.data), value));
                      store.markSaving(false);
                      if (value && typeof value.step === 'number') {
                          _this.gotoStep(value.step);
                      }
                      else if (onFinished && onFinished(value, action) === false) {
                          // 如果是 false 后面的操作就不执行
                          return value;
                      }
                      if (redirect) {
                          env.updateLocation(tpl_1.filter(redirect, store.data));
                      }
                      else if (reload) {
                          _this.reloadTarget(reload, store.data);
                      }
                      return value;
                  })
                      .catch(function (e) {
                      store.markSaving(false);
                      console.error(e);
                  });
              }
              else {
                  onFinished && onFinished(store.data, action);
              }
          }
          return false;
      };
      Wizard.prototype.handleDialogConfirm = function (values, action, targets) {
          var store = this.props.store;
          if (action.mergeData &&
              values.length === 1 &&
              values[0] &&
              targets[0].props.type === 'form') {
              store.updateData(values[0]);
          }
          store.closeDialog();
      };
      Wizard.prototype.handleDialogClose = function () {
          var store = this.props.store;
          store.closeDialog();
      };
      Wizard.prototype.renderSteps = function () {
          var _this = this;
          var _a = this.props, steps = _a.steps, store = _a.store, mode = _a.mode, ns = _a.classPrefix, cx = _a.classnames;
          var currentStep = this.state.currentStep;
          return (react_1.default.createElement("div", { className: ns + "Wizard-steps " + ns + "Wizard--" + mode, id: "form-wizard" }, Array.isArray(steps) && steps.length ? (react_1.default.createElement("ul", null, steps.map(function (step, key) {
              var canJump = isJumpable(step, key, currentStep, store.data);
              return (react_1.default.createElement("li", { key: key, className: cx({
                      'is-complete': canJump,
                      'is-active': currentStep === key + 1
                  }), onClick: function () { return (canJump ? _this.gotoStep(key + 1) : null); } },
                  react_1.default.createElement("span", { className: cx('Badge', {
                          // 'Badge--success': canJump && currentStep != key + 1,
                          'is-active': currentStep === key + 1 ||
                              (canJump && currentStep != key + 1)
                      }) }, key + 1),
                  step.title || step.label || "\u7B2C " + (key + 1) + " \u6B65"));
          }))) : null));
      };
      Wizard.prototype.renderActions = function () {
          var _this = this;
          var _a = this.props, steps = _a.steps, store = _a.store, readOnly = _a.readOnly, disabled = _a.disabled, actionClassName = _a.actionClassName, actionPrevLabel = _a.actionPrevLabel, actionNextLabel = _a.actionNextLabel, actionNextSaveLabel = _a.actionNextSaveLabel, actionFinishLabel = _a.actionFinishLabel, render = _a.render;
          if (!Array.isArray(steps)) {
              return null;
          }
          var currentStepIndex = this.state.currentStep;
          var nextStep = steps[currentStepIndex];
          var prevStep = steps[currentStepIndex - 2];
          var waiting = store.loading;
          var step = steps[currentStepIndex - 1];
          if (!step) {
              return null;
          }
          var prevCanJump = prevStep
              ? isJumpable(prevStep, currentStepIndex - 2, currentStepIndex, store.data)
              : false;
          if (step.actions && Array.isArray(step.actions)) {
              return step.actions.length ? (react_1.default.createElement(react_1.default.Fragment, null, step.actions.map(function (action, index) {
                  return render("action/" + index, action, {
                      key: index,
                      onAction: _this.handleAction,
                      disabled: action.disabled ||
                          waiting ||
                          disabled ||
                          (action.actionType === 'prev' && !prevCanJump) ||
                          (action.actionType === 'next' &&
                              readOnly &&
                              (!!step.api || !nextStep))
                  });
              }))) : null;
          }
          return (react_1.default.createElement(react_1.default.Fragment, null,
              render("prev-btn", {
                  type: 'button',
                  label: actionPrevLabel,
                  actionType: 'prev',
                  className: actionClassName
              }, {
                  disabled: waiting || !prevCanJump || disabled,
                  onAction: this.handleAction
              }),
              render("next-btn", {
                  type: 'button',
                  label: !nextStep
                      ? actionFinishLabel
                      : !step.api
                          ? actionNextLabel
                          : actionNextSaveLabel,
                  actionType: 'next',
                  primary: !nextStep || !!step.api,
                  className: actionClassName
              }, {
                  disabled: waiting || disabled || (readOnly && (!!step.api || !nextStep)),
                  onAction: this.handleAction
              })));
      };
      Wizard.prototype.renderFooter = function () {
          var actions = this.renderActions();
          if (!actions) {
              return actions;
          }
          var _a = this.props, cx = _a.classnames, affixFooter = _a.affixFooter;
          return (react_1.default.createElement(react_1.default.Fragment, null,
              react_1.default.createElement("div", { ref: this.footerDom, className: cx('Panel-footer') }, actions),
              affixFooter ? (react_1.default.createElement("div", { ref: this.affixDom, className: cx('Panel-fixedBottom') },
                  react_1.default.createElement("div", { className: cx('Panel-footer') }, actions))) : null));
      };
      Wizard.prototype.renderWizard = function () {
          var _a = this.props, className = _a.className, steps = _a.steps, render = _a.render, store = _a.store, ns = _a.classPrefix, cx = _a.classnames;
          var currentStep = this.state.currentStep;
          var step = Array.isArray(steps) ? steps[currentStep - 1] : null;
          return (react_1.default.createElement("div", { ref: this.domRef, className: cx(ns + "Panel " + ns + "Panel--default " + ns + "Wizard", className) },
              this.renderSteps(),
              react_1.default.createElement("div", { className: ns + "Wizard-stepContent clearfix" }, step ? (render('body', tslib_1.__assign(tslib_1.__assign({}, step), { type: 'form', wrapWithPanel: false, 
                  // 接口相关需要外部来接管
                  api: null }), {
                  key: this.state.currentStep,
                  ref: this.formRef,
                  onInit: this.handleInit,
                  onReset: this.handleReset,
                  onSubmit: this.handleSubmit,
                  onAction: this.handleAction,
                  disabled: store.loading,
                  popOverContainer: this.getPopOverContainer,
                  onChange: this.handleChange
              })) : currentStep === -1 ? ('初始中。。') : (react_1.default.createElement("p", { className: "text-danger" }, "\u914D\u7F6E\u9519\u8BEF"))),
              render('dialog', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                  store.action.dialog)), { type: 'dialog' }), {
                  key: 'dialog',
                  data: store.dialogData,
                  onConfirm: this.handleDialogConfirm,
                  onClose: this.handleDialogClose,
                  show: store.dialogOpen
              }),
              this.renderFooter(),
              react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading })));
      };
      Wizard.prototype.render = function () {
          return this.renderWizard();
      };
      var _a, _b, _c, _d, _e, _f;
      Wizard.defaultProps = {
          mode: 'horizontal',
          readOnly: false,
          messages: {},
          actionClassName: '',
          actionPrevLabel: '上一步',
          actionNextLabel: '下一步',
          actionNextSaveLabel: '保存并下一步',
          actionFinishLabel: '完成'
      };
      Wizard.propsList = [
          'steps',
          'mode',
          'messages',
          'actionClassName',
          'actionPrevLabel',
          'actionNextLabel',
          'actionNextSaveLabel',
          'actionFinishLabel',
          'onFinished',
          'affixFooter'
      ];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "affixDetect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "formRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "domRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "getPopOverContainer", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _b : Object, Object, Boolean, typeof (_c = typeof Scoped_1.IScopedContext !== "undefined" && Scoped_1.IScopedContext) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleAction", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleInit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleReset", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleSubmit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Array, typeof (_e = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _e : Object, typeof (_f = typeof Array !== "undefined" && Array) === "function" ? _f : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleDialogConfirm", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleDialogClose", null);
      return Wizard;
  }(react_1.default.Component));
  exports.default = Wizard;
  function isJumpable(step, index, currentStep, data) {
      var canJump = false;
      if (step && step.hasOwnProperty('jumpable')) {
          canJump = step.jumpable;
      }
      else if (step && step.jumpableOn) {
          canJump = tpl_1.evalExpression(step.jumpableOn, helper_1.createObject(data, {
              currentStep: currentStep
          }));
      }
      else {
          canJump = index + 1 < currentStep;
      }
      return canJump;
  }
  var WizardRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(WizardRenderer, _super);
      function WizardRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      WizardRenderer.prototype.componentWillMount = function () {
          var scoped = this.context;
          scoped.registerComponent(this);
      };
      WizardRenderer.prototype.componentWillUnmount = function () {
          var scoped = this.context;
          scoped.unRegisterComponent(this);
          _super.prototype.componentWillUnmount.call(this);
      };
      WizardRenderer.prototype.doAction = function (action, data, throwErrors) {
          if (throwErrors === void 0) { throwErrors = false; }
          return this.handleAction(undefined, action, data);
      };
      WizardRenderer.prototype.submitToTarget = function (target, values) {
          var scoped = this.context;
          scoped.send(target, values);
      };
      WizardRenderer.prototype.reloadTarget = function (target, data) {
          var scoped = this.context;
          scoped.reload(target, data);
      };
      WizardRenderer.prototype.handleDialogConfirm = function (values, action, targets) {
          _super.prototype.handleDialogConfirm.call(this, values, action, targets);
          var store = this.props.store;
          var scoped = this.context;
          if (action.reload) {
              scoped.reload(action.reload, store.data);
          }
          else if (store.action && store.action.reload) {
              scoped.reload(store.action.reload, store.data);
          }
      };
      WizardRenderer.contextType = Scoped_1.ScopedContext;
      WizardRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)wizard$/,
              storeType: service_1.ServiceStore.name,
              name: 'wizard',
              isolateScope: true
          })
      ], WizardRenderer);
      return WizardRenderer;
  }(Wizard));
  exports.WizardRenderer = WizardRenderer;
  //# sourceMappingURL=/src/renderers/Wizard.js.map
  

});
