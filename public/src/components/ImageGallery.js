define('src/components/ImageGallery.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var theme_1 = require("src/theme.tsx");
  var helper_1 = require("src/utils/helper.ts");
  var Modal_1 = tslib_1.__importDefault(require("src/components/Modal.tsx"));
  var icons_1 = require("src/components/icons.tsx");
  var ImageGallery = /** @class */ (function (_super) {
      tslib_1.__extends(ImageGallery, _super);
      function ImageGallery() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.state = {
              isOpened: false,
              index: -1,
              items: []
          };
          return _this;
      }
      ImageGallery.prototype.handleImageEnlarge = function (info) {
          this.setState({
              isOpened: true,
              items: info.list ? info.list : [info],
              index: info.index || 0
          });
      };
      ImageGallery.prototype.close = function () {
          this.setState({
              isOpened: false
          });
      };
      ImageGallery.prototype.prev = function () {
          var index = this.state.index;
          this.setState({
              index: index - 1
          });
      };
      ImageGallery.prototype.next = function () {
          var index = this.state.index;
          this.setState({
              index: index + 1
          });
      };
      ImageGallery.prototype.handleItemClick = function (e) {
          var index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          this.setState({
              index: index
          });
      };
      ImageGallery.prototype.render = function () {
          var _this = this;
          var _a = this.props, children = _a.children, cx = _a.classnames;
          var _b = this.state, index = _b.index, items = _b.items;
          return (react_1.default.createElement(react_1.default.Fragment, null,
              react_1.default.cloneElement(children, {
                  onImageEnlarge: this.handleImageEnlarge
              }),
              react_1.default.createElement(Modal_1.default, { closeOnEsc: true, size: "full", onHide: this.close, show: this.state.isOpened, contentClassName: cx('ImageGallery') },
                  react_1.default.createElement("a", { "data-tooltip": "\u5173\u95ED", "data-position": "left", className: cx('ImageGallery-close'), onClick: this.close },
                      react_1.default.createElement(icons_1.Icon, { icon: "close" })),
                  ~index && items[index] ? (react_1.default.createElement(react_1.default.Fragment, null,
                      react_1.default.createElement("div", { className: cx('ImageGallery-title') }, items[index].title),
                      react_1.default.createElement("div", { className: cx('ImageGallery-main') },
                          react_1.default.createElement("img", { src: items[index].originalSrc }),
                          items.length > 1 ? (react_1.default.createElement(react_1.default.Fragment, null,
                              react_1.default.createElement("a", { className: cx('ImageGallery-prevBtn', index <= 0 ? 'is-disabled' : ''), onClick: this.prev },
                                  react_1.default.createElement(icons_1.Icon, { icon: "prev" })),
                              react_1.default.createElement("a", { className: cx('ImageGallery-nextBtn', index >= items.length - 1 ? 'is-disabled' : ''), onClick: this.next },
                                  react_1.default.createElement(icons_1.Icon, { icon: "next" })))) : null))) : null,
                  items.length > 1 ? (react_1.default.createElement("div", { className: cx('ImageGallery-footer') },
                      react_1.default.createElement("a", { className: cx('ImageGallery-prevList is-disabled') },
                          react_1.default.createElement(icons_1.Icon, { icon: "prev" })),
                      react_1.default.createElement("div", { className: cx('ImageGallery-itemsWrap') },
                          react_1.default.createElement("div", { className: cx('ImageGallery-items') }, items.map(function (item, i) { return (react_1.default.createElement("div", { key: i, "data-index": i, onClick: _this.handleItemClick, className: cx('ImageGallery-item', i === index ? 'is-active' : '') },
                              react_1.default.createElement("img", { src: item.src }))); }))),
                      react_1.default.createElement("a", { className: cx('ImageGallery-nextList is-disabled') },
                          react_1.default.createElement(icons_1.Icon, { icon: "next" })))) : null)));
      };
      var _a;
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "handleImageEnlarge", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "prev", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "next", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "handleItemClick", null);
      return ImageGallery;
  }(react_1.default.Component));
  exports.ImageGallery = ImageGallery;
  exports.default = theme_1.themeable(ImageGallery);
  //# sourceMappingURL=/src/components/ImageGallery.js.map
  

});