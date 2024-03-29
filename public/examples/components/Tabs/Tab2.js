define('examples/components/Tabs/Tab2.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      type: 'page',
      title: '选项卡2页面',
      body: [
          '<p>也可以多个页面，利用导航<code>nav</code>渲染期模拟 tabs 的效果。</p>',
          {
              type: 'nav',
              links: [
                  {
                      label: '选项卡1',
                      icon: 'fa fa-cloud',
                      to: './tab1'
                  },
                  {
                      label: '选项卡2',
                      to: './tab2'
                  },
                  {
                      label: '选项卡3',
                      icon: 'fa fa-youtube',
                      to: './tab3'
                  }
              ]
          },
          {
              type: 'wrapper',
              className: 'wrapper bg-white b-l b-b b-r',
              body: '选项卡2的内容'
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Tabs/Tab2.js.map
  

});
