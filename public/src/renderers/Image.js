define('src/renderers/Image.tsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var factory_1 = require("src/factory.tsx");
  var tpl_1 = require("src/utils/tpl.ts");
  var theme_1 = require("src/theme.tsx");
  var helper_1 = require("src/utils/helper.ts");
  var icons_1 = require("src/components/icons.tsx");
  var ImageThumb = /** @class */ (function (_super) {
      tslib_1.__extends(ImageThumb, _super);
      function ImageThumb() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ImageThumb.prototype.handleEnlarge = function () {
          var _a = this.props, onEnlarge = _a.onEnlarge, rest = tslib_1.__rest(_a, ["onEnlarge"]);
          onEnlarge && onEnlarge(rest);
      };
      ImageThumb.prototype.render = function () {
          var _a = this.props, cx = _a.classnames, className = _a.className, imageClassName = _a.imageClassName, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, src = _a.src, alt = _a.alt, title = _a.title, caption = _a.caption, onLoad = _a.onLoad, enlargeAble = _a.enlargeAble;
          return (react_1.default.createElement("div", { className: cx('Image', className) },
              react_1.default.createElement("div", { className: cx('Image-thumb', thumbMode ? "Image-thumb--" + thumbMode : '', thumbRatio ? "Image-thumb--" + thumbRatio.replace(/:/g, '-') : '') },
                  react_1.default.createElement("img", { onLoad: onLoad, className: cx(imageClassName), src: src, alt: alt }),
                  enlargeAble ? (react_1.default.createElement("div", { key: "overlay", className: cx('Image-overlay') },
                      react_1.default.createElement("a", { "data-tooltip": "\u67E5\u770B\u5927\u56FE", "data-position": "bottom", target: "_blank", onClick: this.handleEnlarge },
                          react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" })))) : null),
              title || caption ? (react_1.default.createElement("div", { key: "caption", className: cx('Image-info') },
                  title ? react_1.default.createElement("div", { className: cx('Image-title') }, title) : null,
                  caption ? (react_1.default.createElement("div", { className: cx('Image-caption') }, caption)) : null)) : null));
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageThumb.prototype, "handleEnlarge", null);
      return ImageThumb;
  }(react_1.default.Component));
  exports.ImageThumb = ImageThumb;
  var ThemedImageThumb = theme_1.themeable(ImageThumb);
  exports.default = ThemedImageThumb;
  var ImageField = /** @class */ (function (_super) {
      tslib_1.__extends(ImageField, _super);
      function ImageField() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ImageField.prototype.handleEnlarge = function (_a) {
          var src = _a.src, originalSrc = _a.originalSrc, title = _a.title, caption = _a.caption, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio;
          var _b = this.props, onImageEnlarge = _b.onImageEnlarge, enlargeTitle = _b.enlargeTitle, enlargeCaption = _b.enlargeCaption;
          onImageEnlarge &&
              onImageEnlarge({
                  src: src,
                  originalSrc: originalSrc || src,
                  title: enlargeTitle || title,
                  caption: enlargeCaption || caption,
                  thumbMode: thumbMode,
                  thumbRatio: thumbRatio
              }, this.props);
      };
      ImageField.prototype.render = function () {
          var _a = this.props, className = _a.className, defaultImage = _a.defaultImage, imageCaption = _a.imageCaption, title = _a.title, data = _a.data, imageClassName = _a.imageClassName, cx = _a.classnames, src = _a.src, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, placeholder = _a.placeholder, originalSrc = _a.originalSrc, enlargeAble = _a.enlargeAble, showDimensions = _a.showDimensions;
          var finnalSrc = src ? tpl_1.filter(src, data, '| raw') : '';
          var value = finnalSrc || this.props.value || defaultImage;
          return (react_1.default.createElement("div", { className: cx('ImageField', className) }, value ? (react_1.default.createElement(ThemedImageThumb, { imageClassName: imageClassName, src: value, title: tpl_1.filter(title, data), caption: tpl_1.filter(imageCaption, data), thumbMode: thumbMode, thumbRatio: thumbRatio, originalSrc: tpl_1.filter(originalSrc, data, '| raw'), enlargeAble: enlargeAble && value !== defaultImage, onEnlarge: this.handleEnlarge, showDimensions: showDimensions })) : (react_1.default.createElement("span", { className: "text-muted" }, placeholder))));
      };
      ImageField.defaultProps = {
          defaultImage: 'https://fex.bdstatic.com/n/static/amis/renderers/crud/field/placeholder_cfad9b1.png',
          thumbMode: 'contain',
          thumbRatio: '1:1',
          placeholder: '-'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageField.prototype, "handleEnlarge", null);
      return ImageField;
  }(react_1.default.Component));
  exports.ImageField = ImageField;
  var ImageFieldRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(ImageFieldRenderer, _super);
      function ImageFieldRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ImageFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)image$/,
              name: 'image'
          })
      ], ImageFieldRenderer);
      return ImageFieldRenderer;
  }(ImageField));
  exports.ImageFieldRenderer = ImageFieldRenderer;
  //# sourceMappingURL=/src/renderers/Image.js.map
  

});
