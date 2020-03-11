define('src/renderers/Remark.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var TooltipWrapper_1 = tslib_1.__importDefault(require("src/components/TooltipWrapper.tsx"));
  var tpl_1 = require("src/utils/tpl.ts");
  var theme_1 = require("src/theme.tsx");
  function filterContents(tooltip, data) {
      if (typeof tooltip === 'string') {
          return tpl_1.filter(tooltip, data);
      }
      else if (tooltip) {
          return tooltip.title
              ? {
                  title: tpl_1.filter(tooltip.title, data),
                  content: tooltip.content || tooltip.body
                      ? tpl_1.filter(tooltip.content || tooltip.body || '', data)
                      : undefined
              }
              : tooltip.content || tooltip.body
                  ? tpl_1.filter(tooltip.content || tooltip.body || '', data)
                  : undefined;
      }
      return tooltip;
  }
  exports.filterContents = filterContents;
  var Remark = /** @class */ (function (_super) {
      tslib_1.__extends(Remark, _super);
      function Remark() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Remark.prototype.render = function () {
          var _a = this.props, className = _a.className, icon = _a.icon, tooltip = _a.tooltip, placement = _a.placement, rootClose = _a.rootClose, trigger = _a.trigger, container = _a.container, ns = _a.classPrefix, cx = _a.classnames, content = _a.content, data = _a.data;
          return (react_1.default.createElement("div", { className: cx("Remark", (tooltip && tooltip.className) || className || "Remark--warning") },
              react_1.default.createElement(TooltipWrapper_1.default, { classPrefix: ns, classnames: cx, tooltip: filterContents(tooltip || content, data), placement: (tooltip && tooltip.placement) || placement, rootClose: (tooltip && tooltip.rootClose) || rootClose, trigger: (tooltip && tooltip.trigger) || trigger, container: container, delay: tooltip && tooltip.delay },
                  react_1.default.createElement("i", { className: cx('Remark-icon', (tooltip && tooltip.icon) || icon) }))));
      };
      Remark.propsList = [];
      Remark.defaultProps = {
          icon: 'fa fa-question-circle',
          trigger: ['hover', 'focus']
      };
      return Remark;
  }(react_1.default.Component));
  exports.default = theme_1.themeable(Remark);
  var RemarkRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(RemarkRenderer, _super);
      function RemarkRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      RemarkRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)remark$/,
              name: 'remark'
          })
      ], RemarkRenderer);
      return RemarkRenderer;
  }(Remark));
  exports.RemarkRenderer = RemarkRenderer;
  //# sourceMappingURL=/src/renderers/Remark.js.map
  

});
