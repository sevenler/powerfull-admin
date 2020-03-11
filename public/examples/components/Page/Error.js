define('examples/components/Page/Error.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      type: 'page',
      title: '标题',
      remark: '提示 Tip',
      body: [
          "\n            <p>`initApi` \u62C9\u53D6\u5931\u8D25\u65F6\uFF0C\u9875\u9762\u5185\u5BB9\u533A\u4F1A\u663E\u793A\u5BF9\u5E94\u7684\u9519\u8BEF\u4FE1\u606F\u3002</p>\n\n            <p>\u5176\u4ED6\u63D0\u793A\u793A\u4F8B</p>\n        ",
          {
              type: 'alert',
              level: 'success',
              body: "\u6E29\u99A8\u63D0\u793A\uFF1A\u5BF9\u9875\u9762\u529F\u80FD\u7684\u63D0\u793A\u8BF4\u660E\uFF0C\u7EFF\u8272\u4E3A\u6B63\u5411\u7C7B\u7684\u6D88\u606F\u63D0\u793A"
          },
          {
              type: 'alert',
              level: 'warning',
              body: "\u60A8\u7684\u79C1\u6709\u7F51\u7EDC\u5DF2\u8FBE\u5230\u914D\u989D\uFF0C\u5982\u9700\u66F4\u591A\u79C1\u6709\u7F51\u7EDC\uFF0C\u53EF\u4EE5\u901A\u8FC7<a>\u5DE5\u5355</a>\u7533\u8BF7"
          }
      ],
      aside: '边栏',
      toolbar: '工具栏',
      initApi: '/api/mock2/page/initDataError'
  };
  //# sourceMappingURL=/examples/components/Page/Error.js.map
  

});
