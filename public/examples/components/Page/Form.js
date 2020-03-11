define('examples/components/Page/Form.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      type: 'page',
      title: '表单页面',
      body: {
          type: 'form',
          mode: 'horizontal',
          title: '',
          api: '/api/mock2/form/saveForm',
          controls: [
              {
                  label: 'Name',
                  type: 'text',
                  name: 'name'
              },
              {
                  label: 'Email',
                  type: 'email',
                  name: 'email'
              }
          ]
      }
  };
  //# sourceMappingURL=/examples/components/Page/Form.js.map
  

});
