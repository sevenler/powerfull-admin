define('examples/components/Form/Custom.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var index_1 = require("src/index.tsx");
  var MyFormItem = /** @class */ (function (_super) {
      tslib_1.__extends(MyFormItem, _super);
      function MyFormItem() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      MyFormItem.prototype.render = function () {
          var _a = this.props, value = _a.value, onChange = _a.onChange;
          return (react_1.default.createElement("div", null,
              react_1.default.createElement("p", null, "\u8FD9\u4E2A\u662F\u4E2A\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u3002\u901A\u8FC7\u6CE8\u518C\u6E32\u67D3\u5668\u7684\u65B9\u5F0F\u5B9E\u73B0\u3002"),
              react_1.default.createElement("p", null,
                  "\u5F53\u524D\u503C\uFF1A",
                  value),
              react_1.default.createElement("a", { className: "btn btn-default", onClick: function () { return onChange(Math.round(Math.random() * 10000)); } }, "\u968F\u673A\u4FEE\u6539")));
      };
      MyFormItem = tslib_1.__decorate([
          index_1.FormItem({
              type: 'custom'
          })
      ], MyFormItem);
      return MyFormItem;
  }(react_1.default.Component));
  var CustomRenderer = /** @class */ (function (_super) {
      tslib_1.__extends(CustomRenderer, _super);
      function CustomRenderer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      CustomRenderer.prototype.render = function () {
          var tip = this.props.tip;
          return (react_1.default.createElement("div", null, tip || '非 FormItem 类型的渲染器注册， 这种不能修改 form'));
      };
      CustomRenderer = tslib_1.__decorate([
          index_1.Renderer({
              test: /(^|\/)my\-renderer$/
          })
      ], CustomRenderer);
      return CustomRenderer;
  }(react_1.default.Component));
  exports.default = {
      $schema: 'https://houtai.baidu.com/v2/schemas/page.json#',
      title: '自定义组件示例',
      body: [
          {
              type: 'form',
              mode: 'horizontal',
              api: '/api/mock2/form/saveForm?waitSeconds=2',
              actions: [
                  {
                      type: 'submit',
                      label: '提交',
                      primary: true
                  }
              ],
              controls: [
                  {
                      name: 'a',
                      children: function (_a) {
                          var value = _a.value, onChange = _a.onChange;
                          return (react_1.default.createElement("div", null,
                              react_1.default.createElement("p", null, "\u8FD9\u4E2A\u662F\u4E2A\u81EA\u5B9A\u4E49\u7EC4\u4EF6\u3002\u6700\u7B80\u5355\u76F4\u63A5\u7684\u65B9\u5F0F\uFF0C\u4E0D\u7528\u6CE8\u518C\u76F4\u63A5\u4F7F\u7528\u3002"),
                              react_1.default.createElement("p", null,
                                  "\u5F53\u524D\u503C\uFF1A",
                                  value),
                              react_1.default.createElement("a", { className: "btn btn-default", onClick: function () { return onChange(Math.round(Math.random() * 10000)); } }, "\u968F\u673A\u4FEE\u6539")));
                      }
                  },
                  {
                      type: 'divider'
                  },
                  {
                      name: 'b',
                      type: 'custom',
                      label: '自定义FormItem'
                  },
                  {
                      type: 'divider'
                  },
                  {
                      type: 'my-renderer'
                  }
              ]
          },
          {
              type: 'my-renderer',
              tip: '他能放 controls 里面，也能放外面。'
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Form/Custom.js.map
  

});
