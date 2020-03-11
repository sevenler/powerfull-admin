define('src/components/ContextMenu.tsx', function(require, exports, module) {

  "use strict";
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var theme_1 = require("src/theme.tsx");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var react_dom_1 = require("node_modules/react-dom/index");
  var helper_1 = require("src/utils/helper.ts");
  var Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  var dom_1 = require("src/utils/dom.tsx");
  var fadeStyles = (_a = {},
      _a[Transition_1.ENTERING] = 'in',
      _a[Transition_1.ENTERED] = 'in',
      _a[Transition_1.EXITING] = 'out',
      _a);
  var ContextMenu = /** @class */ (function (_super) {
      tslib_1.__extends(ContextMenu, _super);
      function ContextMenu() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.state = {
              isOpened: false,
              menus: [],
              x: -99999,
              y: -99999
          };
          _this.menuRef = react_1.default.createRef();
          return _this;
      }
      ContextMenu.getInstance = function () {
          if (!ContextMenu.instance) {
              var container = document.body;
              var div = document.createElement('div');
              container.appendChild(div);
              react_dom_1.render(react_1.default.createElement(exports.ThemedContextMenu, null), div);
          }
          return ContextMenu.instance;
      };
      ContextMenu.prototype.componentWillMount = function () {
          this.originInstance = ContextMenu.instance;
          ContextMenu.instance = this;
      };
      ContextMenu.prototype.componentDidMount = function () {
          // document.body.addEventListener('click', this.handleOutClick, true);
          document.addEventListener('keydown', this.handleKeyDown);
      };
      ContextMenu.prototype.componentWillUnmount = function () {
          ContextMenu.instance = this.originInstance;
          // document.body.removeEventListener('click', this.handleOutClick, true);
          document.removeEventListener('keydown', this.handleKeyDown);
          delete this.originInstance;
      };
      ContextMenu.prototype.openContextMenus = function (info, menus) {
          this.setState({
              isOpened: true,
              x: info.x,
              y: info.y,
              menus: menus
          });
      };
      ContextMenu.prototype.close = function () {
          this.setState({
              isOpened: false,
              x: -99999,
              y: -99999,
              menus: []
          });
      };
      // @autobind
      // handleOutClick(e: Event) {
      //   if (
      //     !e.target ||
      //     !this.menuRef.current ||
      //     this.menuRef.current.contains(e.target as HTMLElement)
      //   ) {
      //     return;
      //   }
      //   if (this.state.isOpened) {
      //     e.preventDefault();
      //     this.close();
      //   }
      // }
      ContextMenu.prototype.handleClick = function (item) {
          item.disabled ||
              (Array.isArray(item.children) && item.children.length) ||
              this.setState({
                  isOpened: false,
                  x: -99999,
                  y: -99999,
                  menus: []
              }, function () { return (item.onSelect ? item.onSelect(item.data) : null); });
      };
      ContextMenu.prototype.handleKeyDown = function (e) {
          if (e.keyCode === 27 && this.state.isOpened) {
              e.preventDefault();
              this.close();
          }
      };
      ContextMenu.prototype.handleMouseEnter = function (item) {
          item.disabled || !item.onHighlight || item.onHighlight(true, item.data);
      };
      ContextMenu.prototype.handleMouseLeave = function (item) {
          item.disabled || !item.onHighlight || item.onHighlight(false, item.data);
      };
      ContextMenu.prototype.handleEnter = function (menu) {
          // 智能定位，选择一个合适的对齐方式。
          var info = dom_1.calculatePosition('auto', menu.lastChild, menu.children[1], document.body);
          var align = info.positionLeft + 300 < window.innerWidth ? 'right' : 'left';
          this.setState({
              x: info.positionLeft,
              y: info.positionTop,
              align: align
          });
      };
      ContextMenu.prototype.handleOverlayContextMenu = function (e) {
          e.preventDefault();
          this.close();
      };
      ContextMenu.prototype.renderMenus = function (menus) {
          var _this = this;
          var cx = this.props.classnames;
          return menus.map(function (item, index) {
              if (item === '|') {
                  return react_1.default.createElement("li", { key: index, className: cx('ContextMenu-divider') });
              }
              var hasChildren = Array.isArray(item.children) && item.children.length;
              return (react_1.default.createElement("li", { key: item.label + "-" + index, className: cx('ContextMenu-item', {
                      'has-child': hasChildren,
                      'is-disabled': item.disabled
                  }) },
                  react_1.default.createElement("a", { onClick: _this.handleClick.bind(_this, item), onMouseEnter: _this.handleMouseEnter.bind(_this, item), onMouseLeave: _this.handleMouseLeave.bind(_this, item) },
                      item.icon ? (react_1.default.createElement("span", { className: cx('ContextMenu-itemIcon', item.icon) })) : null,
                      item.label),
                  hasChildren ? (react_1.default.createElement("ul", { className: cx('ContextMenu-subList') }, _this.renderMenus(item.children))) : null));
          });
      };
      ContextMenu.prototype.render = function () {
          var _this = this;
          var _a = this.props, className = _a.className, container = _a.container, cx = _a.classnames;
          return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, onEnter: this.handleEnter, in: this.state.isOpened, timeout: 500 }, function (status) { return (react_1.default.createElement("div", { ref: _this.menuRef, role: "contextmenu", className: cx('ContextMenu', {
                  'ContextMenu--left': _this.state.align === 'left'
              }, className) },
              react_1.default.createElement("div", { onContextMenu: _this.handleOverlayContextMenu, onClick: _this.close, className: cx("ContextMenu-overlay", fadeStyles[status]) }),
              react_1.default.createElement("div", { className: cx("ContextMenu-cursor"), style: { left: _this.state.x + "px", top: _this.state.y + "px" } }),
              react_1.default.createElement("div", { style: { left: _this.state.x + "px", top: _this.state.y + "px" }, className: cx("ContextMenu-menu", fadeStyles[status]) },
                  react_1.default.createElement("ul", { className: cx('ContextMenu-list') }, _this.renderMenus(_this.state.menus))))); }));
      };
      var _b, _c, _d, _e;
      ContextMenu.instance = null;
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "openContextMenus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof KeyboardEvent !== "undefined" && KeyboardEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleEnter", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _e : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleOverlayContextMenu", null);
      return ContextMenu;
  }(react_1.default.Component));
  exports.ContextMenu = ContextMenu;
  exports.ThemedContextMenu = theme_1.themeable(ContextMenu);
  exports.default = exports.ThemedContextMenu;
  function openContextMenus(info, menus) {
      return ContextMenu.getInstance().openContextMenus(info, menus);
  }
  exports.openContextMenus = openContextMenus;
  //# sourceMappingURL=/src/components/ContextMenu.js.map
  

});