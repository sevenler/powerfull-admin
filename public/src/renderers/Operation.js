define('src/renderers/Operation.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var OperationField = /** @class */ (function (_super) {
      tslib_1.__extends(OperationField, _super);
      function OperationField() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      OperationField.prototype.render = function () {
          var _a = this.props, className = _a.className, buttons = _a.buttons, render = _a.render, cx = _a.classnames;
          return (react_1.default.createElement("div", { className: cx('OperationField', className) }, Array.isArray(buttons)
              ? buttons.map(function (button, index) {
                  return render("" + index, tslib_1.__assign({ type: 'button', size: button.size || 'sm', level: button.level ||
                          (button.icon && !button.label ? 'link' : '') }, button), {
                      key: index
                  });
              })
              : null));
      };
      OperationField.propsList = ['buttons', 'label'];
      OperationField.defaultProps = {};
      return OperationField;
  }(react_1.default.Component));
  exports.OperationField = OperationField;
  var OperationFieldRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(OperationFieldRenderer, _super);
      function OperationFieldRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      OperationFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              // test: /(^|\/)table\/(.*\/)operation$/,
              test: function (path) { return /(^|\/)table\/(.*\/)operation$/.test(path); },
              name: 'operation'
          })
      ], OperationFieldRenderer);
      return OperationFieldRenderer;
  }(OperationField));
  exports.OperationFieldRenderer = OperationFieldRenderer;
  //# sourceMappingURL=/src/renderers/Operation.js.map
  

});
