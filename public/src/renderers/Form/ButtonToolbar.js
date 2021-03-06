define('src/renderers/Form/ButtonToolbar.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  var ButtonToolbarControl = /** @class */ (function (_super) {
      tslib_1.__extends(ButtonToolbarControl, _super);
      function ButtonToolbarControl() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ButtonToolbarControl.prototype.render = function () {
          var _a = this.props, render = _a.render, className = _a.className, ns = _a.classPrefix, buttons = _a.buttons;
          return (react_1.default.createElement("div", { className: classnames_1.default(ns + "ButtonToolbar", className) }, Array.isArray(buttons)
              ? buttons.map(function (button, key) {
                  return render("button/" + key, button, {
                      key: key
                  });
              })
              : null));
      };
      ButtonToolbarControl.defaultProps = {};
      return ButtonToolbarControl;
  }(react_1.default.Component));
  exports.ButtonToolbarControl = ButtonToolbarControl;
  var ButtonToolbarRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ButtonToolbarRenderer, _super);
      function ButtonToolbarRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ButtonToolbarRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'button-toolbar',
              sizeMutable: false,
              strictMode: false // data 变化也更新
          })
      ], ButtonToolbarRenderer);
      return ButtonToolbarRenderer;
  }(ButtonToolbarControl));
  exports.ButtonToolbarRenderer = ButtonToolbarRenderer;
  //# sourceMappingURL=/src/renderers/Form/ButtonToolbar.js.map
  

});
