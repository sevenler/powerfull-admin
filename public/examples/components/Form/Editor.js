define('examples/components/Form/Editor.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      $schema: 'https://houtai.baidu.com/v2/schemas/page.json#',
      title: 'Editor',
      body: [
          {
              type: 'form',
              api: '/api/mock2/saveForm?waitSeconds=2',
              title: '',
              controls: [
                  {
                      name: 'javascript',
                      type: 'editor',
                      label: 'Javascript',
                      language: 'javascript',
                      value: 'console.log(1, 2, 3);'
                  },
                  {
                      name: 'html',
                      type: 'editor',
                      language: 'html',
                      label: 'Html',
                      value: '<html><head><title>Hello</title></head><body><p>world</p></body></html>'
                  },
                  {
                      name: 'css',
                      type: 'editor',
                      language: 'css',
                      label: 'CSS',
                      value: 'body {color: red;}'
                  },
                  {
                      name: 'json',
                      type: 'editor',
                      language: 'json',
                      label: 'JSON',
                      value: "{\"a\": 1, \"b\": 2}"
                  }
              ]
          }
      ]
  };
  //# sourceMappingURL=/examples/components/Form/Editor.js.map
  

});
