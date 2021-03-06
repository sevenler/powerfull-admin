define('src/renderers/Spinner.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  var factory_1 = require("src/factory.tsx");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var SpinnerRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(SpinnerRenderer, _super);
      function SpinnerRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SpinnerRenderer.prototype.render = function () {
          return react_1.default.createElement(Spinner_1.default, tslib_1.__assign({}, this.props));
      };
      SpinnerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)spinner$/,
              name: 'spinner'
          })
      ], SpinnerRenderer);
      return SpinnerRenderer;
  }(react_1.default.Component));
  exports.SpinnerRenderer = SpinnerRenderer;
  //# sourceMappingURL=/src/renderers/Spinner.js.map
  

});
