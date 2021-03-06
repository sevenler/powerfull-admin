define('src/renderers/Form/Tabs.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Tabs_1 = tslib_1.__importDefault(require("src/renderers/Tabs.tsx"));
  var TabsRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(TabsRenderer, _super);
      function TabsRenderer() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.renderTab = function (tab, props, key) {
              var _a = _this.props, renderFormItems = _a.renderFormItems, formMode = _a.formMode, formHorizontal = _a.formHorizontal, $path = _a.$path, render = _a.render, cx = _a.classnames;
              if (renderFormItems &&
                  !tab.type &&
                  (tab.controls || tab.fieldSet || tab.tabs)) {
                  return (react_1.default.createElement("div", { className: cx("Form--" + (tab.mode || formMode || 'normal')) }, renderFormItems(tab, $path.replace(/^.*form\//, '') + "/" + key, {
                      mode: tab.mode || formMode,
                      horizontal: tab.horizontal || formHorizontal
                  })));
              }
              return render("tab/" + key, tab.body || tab.tab || tab);
          };
          return _this;
      }
      TabsRenderer.defaultProps = {
          mountOnEnter: false // form 中的不按需渲染
      };
      TabsRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:.+)?\/control\/tabs$/i,
              weight: -100,
              name: 'tabs-control'
          })
      ], TabsRenderer);
      return TabsRenderer;
  }(Tabs_1.default));
  exports.TabsRenderer = TabsRenderer;
  //# sourceMappingURL=/src/renderers/Form/Tabs.js.map
  

});
