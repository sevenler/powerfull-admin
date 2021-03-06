define('src/renderers/Container.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var Container = /** @class */ (function (_super) {
      tslib_1.__extends(Container, _super);
      function Container() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Container.prototype.renderBody = function () {
          var _a = this.props, children = _a.children, body = _a.body, render = _a.render, cx = _a.classnames, bodyClassName = _a.bodyClassName;
          return (react_1.default.createElement("div", { className: cx('Container-body', bodyClassName) }, children
              ? typeof children === 'function'
                  ? children(this.props)
                  : children
              : body
                  ? render('body', body)
                  : null));
      };
      Container.prototype.render = function () {
          var _a = this.props, className = _a.className, size = _a.size, cx = _a.classnames;
          return (react_1.default.createElement("div", { className: cx('Container', className) }, this.renderBody()));
      };
      Container.propsList = ['body', 'className'];
      Container.defaultProps = {
          className: ''
      };
      return Container;
  }(react_1.default.Component));
  exports.default = Container;
  var ContainerRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ContainerRenderer, _super);
      function ContainerRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ContainerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)container$/,
              name: 'container'
          })
      ], ContainerRenderer);
      return ContainerRenderer;
  }(Container));
  exports.ContainerRenderer = ContainerRenderer;
  //# sourceMappingURL=/src/renderers/Container.js.map
  

});
