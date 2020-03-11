define('examples/components/Test.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  var TestComponent = /** @class */ (function (_super) {
      tslib_1.__extends(TestComponent, _super);
      function TestComponent() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      TestComponent.prototype.render = function () {
          return (react_1.default.createElement("div", { className: "wrapper" },
              react_1.default.createElement("div", { className: "m-b" },
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "primary", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "secondary", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "success", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "info", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "warning", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "danger", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "light", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", level: "dark", classPrefix: "cxd-" }, "\u6309\u94AE")),
              react_1.default.createElement("div", { className: "m-b" },
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", size: "xs", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", size: "sm", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", size: "md", classPrefix: "cxd-" }, "\u6309\u94AE"),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", size: "lg", classPrefix: "cxd-" }, "\u6309\u94AE")),
              react_1.default.createElement("div", { className: "m-b" },
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", classPrefix: "cxd-" },
                      react_1.default.createElement("i", { className: "fa fa-cloud" }),
                      react_1.default.createElement("span", null, "\u6309\u94AE")),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", classPrefix: "cxd-" },
                      react_1.default.createElement("span", null, "\u6309\u94AE"),
                      react_1.default.createElement("i", { className: "fa fa-cloud" })),
                  react_1.default.createElement(Button_1.default, { className: "m-r-xs", classPrefix: "cxd-", iconOnly: true },
                      react_1.default.createElement("i", { className: "fa fa-cloud" })))));
      };
      return TestComponent;
  }(react_1.default.Component));
  exports.default = TestComponent;
  //# sourceMappingURL=/examples/components/Test.js.map
  

});
