define('src/renderers/ButtonGroup.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var ButtonGroup_1 = tslib_1.__importDefault(require("src/renderers/Form/ButtonGroup.tsx"));
  var factory_1 = require("src/factory.tsx");
  exports.default = ButtonGroup_1.default;
  var ButtonGroupRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ButtonGroupRenderer, _super);
      function ButtonGroupRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ButtonGroupRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:button|action)\-group$/,
              name: 'button-group'
          })
      ], ButtonGroupRenderer);
      return ButtonGroupRenderer;
  }(ButtonGroup_1.default));
  exports.ButtonGroupRenderer = ButtonGroupRenderer;
  //# sourceMappingURL=/src/renderers/ButtonGroup.js.map
  

});
