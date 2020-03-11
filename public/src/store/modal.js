define('src/store/modal.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var service_1 = require("src/store/service.ts");
  var mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  var helper_1 = require("src/utils/helper.ts");
  exports.ModalStore = service_1.ServiceStore.named('ModalStore')
      .props({
      form: mobx_state_tree_1.types.frozen()
  })
      .views(function (self) {
      return {
          get formData() {
              return helper_1.createObject(self.data, self.form);
          }
      };
  })
      .actions(function (self) {
      return {
          setFormData: function (obj) {
              self.form = obj;
          }
      };
  });
  //# sourceMappingURL=/src/store/modal.js.map
  

});
