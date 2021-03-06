define('src/renderers/Link.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var tpl_1 = require("src/utils/tpl.ts");
  var LinkField = /** @class */ (function (_super) {
      tslib_1.__extends(LinkField, _super);
      function LinkField() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      LinkField.prototype.render = function () {
          var _a = this.props, className = _a.className, body = _a.body, href = _a.href, cx = _a.classnames, blank = _a.blank, htmlTarget = _a.htmlTarget, data = _a.data, render = _a.render;
          var value = this.props.value;
          var finnalHref = href ? tpl_1.filter(href, data) : '';
          return (react_1.default.createElement("a", { href: finnalHref || value, target: htmlTarget || (blank ? '_blank' : '_self'), className: cx('Link', className) }, body ? render('body', body) : finnalHref || value || '链接'));
      };
      LinkField.defaultProps = {
          className: '',
          blank: false
      };
      return LinkField;
  }(react_1.default.Component));
  exports.LinkField = LinkField;
  var LinkFieldRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(LinkFieldRenderer, _super);
      function LinkFieldRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      LinkFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)link$/,
              name: 'link'
          })
      ], LinkFieldRenderer);
      return LinkFieldRenderer;
  }(LinkField));
  exports.LinkFieldRenderer = LinkFieldRenderer;
  //# sourceMappingURL=/src/renderers/Link.js.map
  

});
