define('examples/components/DocSearch.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var SchemaRender_1 = tslib_1.__importDefault(require("examples/components/SchemaRender.jsx"));
  var FormComponent = SchemaRender_1.default({
      type: 'form',
      mode: 'inline',
      wrapWithPanel: false,
      className: 'pull-right m-t-sm m-r',
      controls: [
          {
              type: 'input-group',
              size: 'sm',
              controls: [
                  {
                      type: 'icon',
                      addOnclassName: 'no-bg',
                      className: 'text-sm',
                      icon: 'search',
                      vendor: 'iconfont'
                  },
                  {
                      type: 'text',
                      placeholder: '搜索文档',
                      inputClassName: 'b-l-none p-l-none',
                      name: 'docsearch'
                  }
              ]
          }
      ]
  });
  var DocSearch = /** @class */ (function (_super) {
      tslib_1.__extends(DocSearch, _super);
      function DocSearch() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      DocSearch.prototype.componentDidMount = function () {
          var inputSelector = 'input[name="docsearch"]';
          docsearch({
              appId: '3W0NHYOWPE',
              apiKey: '469f5cf3d54f9b86127970f913dc0725',
              indexName: 'gh_pages',
              inputSelector: inputSelector,
              debug: false
          });
      };
      DocSearch.prototype.render = function () {
          return react_1.default.createElement(FormComponent, { showCode: false, theme: this.props.theme });
      };
      return DocSearch;
  }(react_1.default.Component));
  exports.default = DocSearch;
  //# sourceMappingURL=/examples/components/DocSearch.js.map
  

});
