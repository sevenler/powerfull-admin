define('examples/components/Sdk/Test.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var TitleBar_1 = tslib_1.__importDefault(require("src/components/TitleBar.tsx"));
  var index_1 = require("src/index.tsx");
  var SdkTest = /** @class */ (function (_super) {
      tslib_1.__extends(SdkTest, _super);
      function SdkTest() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.state = {
              data: {
                  name: 'Amis Renderer',
                  id: 1,
                  email: 'xxx@xxx.com'
              }
          };
          _this.handleClick = function () {
              _this.setState({
                  data: {
                      name: 'Amis Renderer',
                      id: Math.round(Math.random() * 1000),
                      email: 'xxx@xxx.com'
                  }
              });
          };
          return _this;
      }
      SdkTest.prototype.renderForm = function () {
          var _this = this;
          return index_1.render({
              title: '',
              type: 'form',
              controls: [
                  {
                      type: 'text',
                      name: 'name',
                      label: 'Name'
                  },
                  {
                      type: 'text',
                      name: 'id',
                      label: 'Id'
                  },
                  {
                      type: 'email',
                      name: 'email',
                      label: 'Email'
                  },
                  {
                      type: 'static',
                      label: '最后更新时间',
                      name: 'lastModified'
                  }
              ]
          }, {
              data: this.state.data,
              onFailed: function (reason, errors) {
                  console.log('Submit Failed', errors, '\n', reason);
              },
              onSubmit: function (values) {
                  console.log('Submit', values);
              },
              onChange: function (values, diff) {
                  _this.setState({
                      data: tslib_1.__assign(tslib_1.__assign({}, values), { lastModified: new Date() })
                  });
                  console.log('Diff', diff);
              }
          });
      };
      SdkTest.prototype.render = function () {
          return (react_1.default.createElement("div", null,
              react_1.default.createElement(TitleBar_1.default, { title: "API \u8C03\u7528 \u96C6\u6210\u5728\u4F60\u7684 React \u5E94\u7528\u4E2D" }),
              react_1.default.createElement("div", { className: "wrapper" },
                  this.renderForm(),
                  react_1.default.createElement("button", { onClick: this.handleClick }, "\u968F\u673A\u4FEE\u6539"),
                  react_1.default.createElement("h3", null, "\u5F53\u524D\u503C"),
                  react_1.default.createElement("pre", null,
                      react_1.default.createElement("code", null, JSON.stringify(this.state.data, null, 2))))));
      };
      return SdkTest;
  }(react_1.default.Component));
  exports.default = SdkTest;
  //# sourceMappingURL=/examples/components/Sdk/Test.js.map
  

});
