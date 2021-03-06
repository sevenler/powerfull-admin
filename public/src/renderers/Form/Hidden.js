define('src/renderers/Form/Hidden.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Item_1 = require("src/renderers/Form/Item.tsx");
  var HiddenControl = /** @class */ (function (_super) {
      tslib_1.__extends(HiddenControl, _super);
      function HiddenControl() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      HiddenControl.prototype.render = function () {
          return null;
      };
      return HiddenControl;
  }(react_1.default.Component));
  exports.default = HiddenControl;
  var HiddenControlRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(HiddenControlRenderer, _super);
      function HiddenControlRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      HiddenControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'hidden',
              wrap: false,
              sizeMutable: false
          })
      ], HiddenControlRenderer);
      return HiddenControlRenderer;
  }(HiddenControl));
  exports.HiddenControlRenderer = HiddenControlRenderer;
  //# sourceMappingURL=/src/renderers/Form/Hidden.js.map
  

});
