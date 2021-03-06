define('src/renderers/Alert.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var factory_1 = require("src/factory.tsx");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  var TplRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(TplRenderer, _super);
      function TplRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      TplRenderer.prototype.render = function () {
          var _a = this.props, render = _a.render, body = _a.body, rest = tslib_1.__rest(_a, ["render", "body"]);
          return react_1.default.createElement(Alert2_1.default, tslib_1.__assign({}, rest), render('body', body));
      };
      TplRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)alert$/,
              name: 'alert'
          })
      ], TplRenderer);
      return TplRenderer;
  }(react_1.default.Component));
  exports.TplRenderer = TplRenderer;
  //# sourceMappingURL=/src/renderers/Alert.js.map
  

});
