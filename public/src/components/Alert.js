define('src/components/Alert.tsx', function(require, exports, module) {

  "use strict";
  /**
   * @file Alert
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var Modal_1 = tslib_1.__importDefault(require("src/components/Modal.tsx"));
  var Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  var theme_1 = require("src/theme.tsx");
  var Alert = /** @class */ (function (_super) {
      tslib_1.__extends(Alert, _super);
      function Alert(props) {
          var _this = _super.call(this, props) || this;
          _this.state = {
              show: false,
              title: '',
              content: '',
              confirm: false
          };
          _this.close = _this.close.bind(_this);
          _this.handleConfirm = _this.handleConfirm.bind(_this);
          _this.handleCancel = _this.handleCancel.bind(_this);
          _this.modalRef = _this.modalRef.bind(_this);
          _this.bodyRef = _this.bodyRef.bind(_this);
          return _this;
      }
      Alert.getInstance = function () {
          if (!Alert.instance) {
              console.warn('Alert 组件应该没有被渲染，所以隐性的渲染到 body 了');
              var container = document.body;
              var div = document.createElement('div');
              container.appendChild(div);
              react_dom_1.render(react_1.default.createElement(exports.ThemedAlert, null), div);
          }
          return Alert.instance;
      };
      Alert.prototype.componentWillMount = function () {
          Alert.instance = this;
      };
      Alert.prototype.componentDidMount = function () {
          this._body && (this._body.innerHTML = this.state.content);
      };
      Alert.prototype.componentDidUpdate = function (prevProps, prevState) {
          if (prevState.content !== this.state.content) {
              this._body && (this._body.innerHTML = this.state.content);
          }
      };
      Alert.prototype.componentWillUnmount = function () {
          Alert.instance = null;
      };
      Alert.prototype.handleConfirm = function () {
          this.close(true);
      };
      Alert.prototype.handleCancel = function () {
          this.close(false);
      };
      Alert.prototype.close = function (confirmed) {
          var _this = this;
          var isConfirm = this.state.confirm;
          this.setState({
              show: false
          }, isConfirm ? function () { return _this._resolve(confirmed); } /*this._reject()*/ : undefined);
      };
      Alert.prototype.alert = function (content, title) {
          this.setState({
              title: title,
              content: content,
              show: true,
              confirm: false
          });
      };
      Alert.prototype.confirm = function (content, title, confirmText) {
          var _this = this;
          this.setState({
              title: title,
              content: content,
              show: true,
              confirm: true,
              confirmText: confirmText
          });
          return new Promise(function (resolve) {
              _this._resolve = resolve;
          });
      };
      Alert.prototype.modalRef = function (ref) {
          this._modal = ref;
      };
      Alert.prototype.bodyRef = function (ref) {
          this._body = ref;
          this._body && (this._body.innerHTML = this.state.content);
      };
      Alert.prototype.render = function () {
          var _a = this.props, container = _a.container, cancelText = _a.cancelText, confirmText = _a.confirmText, title = _a.title, confirmBtnLevel = _a.confirmBtnLevel, alertBtnLevel = _a.alertBtnLevel, cx = _a.classnames, classPrefix = _a.classPrefix;
          return (react_1.default.createElement(Modal_1.default, { show: this.state.show, onHide: this.handleCancel, container: container, ref: this.modalRef },
              react_1.default.createElement("div", { className: cx('Modal-header') },
                  react_1.default.createElement("div", { className: cx('Modal-title') }, this.state.title || title)),
              react_1.default.createElement("div", { className: cx('Modal-body') },
                  react_1.default.createElement("div", { ref: this.bodyRef })),
              react_1.default.createElement("div", { className: cx('Modal-footer') },
                  this.state.confirm ? (react_1.default.createElement(Button_1.default, { onClick: this.handleCancel }, cancelText)) : null,
                  react_1.default.createElement(Button_1.default, { level: this.state.confirm ? confirmBtnLevel : alertBtnLevel, onClick: this.handleConfirm }, this.state.confirmText || confirmText))));
      };
      Alert.instance = null;
      Alert.defaultProps = {
          confirmText: '确认',
          cancelText: '取消',
          title: '系统消息',
          alertBtnLevel: 'primary',
          confirmBtnLevel: 'danger'
      };
      return Alert;
  }(react_1.default.Component));
  exports.Alert = Alert;
  exports.alert = function (content, title) { return Alert.getInstance().alert(content, title); };
  exports.confirm = function (content, title, confirmText) {
      return Alert.getInstance().confirm(content, title, confirmText);
  };
  exports.ThemedAlert = theme_1.themeable(Alert);
  exports.default = exports.ThemedAlert;
  //# sourceMappingURL=/src/components/Alert.js.map
  

});
