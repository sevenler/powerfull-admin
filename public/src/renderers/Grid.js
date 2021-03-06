define('src/renderers/Grid.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  exports.ColProps = ['lg', 'md', 'sm', 'xs'];
  function fromBsClass(cn) {
      if (typeof cn === 'string' && cn) {
          return cn.replace(/\bcol-(xs|sm|md|lg)-(\d+)\b/g, function (_, bp, size) { return "Grid-col--" + bp + size; });
      }
      return cn;
  }
  function copProps2Class(props) {
      var cns = [];
      var modifiers = exports.ColProps;
      modifiers.forEach(function (modifier) {
          return props &&
              props[modifier] &&
              cns.push("Grid-col--" + modifier + props[modifier]);
      });
      cns.length || cns.push('Grid-col--sm');
      return cns.join(' ');
  }
  var Grid = /** @class */ (function (_super) {
      tslib_1.__extends(Grid, _super);
      function Grid() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Grid.prototype.renderChild = function (region, node, key, length) {
          var _a = this.props, render = _a.render, itemRender = _a.itemRender;
          return itemRender
              ? itemRender(node, key, length, this.props)
              : render(region, node);
      };
      Grid.prototype.renderColumn = function (column, key, length) {
          var colProps = pick_1.default(column, exports.ColProps);
          colProps = tslib_1.__assign({}, colProps);
          var cx = this.props.classnames;
          return (react_1.default.createElement("div", { key: key, className: cx(copProps2Class(colProps), fromBsClass(column.columnClassName)) }, Array.isArray(column)
              ? this.renderColumns(column)
              : this.renderChild("column/" + key, column, key, length)));
      };
      Grid.prototype.renderColumns = function (columns) {
          var _this = this;
          var _a = this.props, className = _a.className, cx = _a.classnames;
          return (react_1.default.createElement("div", { className: cx('Grid', className) }, columns.map(function (column, key) {
              return _this.renderColumn(column, key, columns.length);
          })));
      };
      Grid.prototype.render = function () {
          return this.renderColumns(this.props.columns);
      };
      Grid.propsList = ['columns'];
      Grid.defaultProps = {};
      return Grid;
  }(react_1.default.Component));
  exports.default = Grid;
  var GridRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(GridRenderer, _super);
      function GridRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      GridRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)grid$/,
              name: 'grid'
          })
      ], GridRenderer);
      return GridRenderer;
  }(Grid));
  exports.GridRenderer = GridRenderer;
  //# sourceMappingURL=/src/renderers/Grid.js.map
  

});
