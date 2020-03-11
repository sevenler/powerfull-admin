define('examples/components/Form/Schem.jsx', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var tslib_1 = require("node_modules/tslib/tslib");
  var react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  var TitleBar_1 = tslib_1.__importDefault(require("src/components/TitleBar.tsx"));
  var index_1 = require("src/index.tsx");
  var Schema = {
      title: 'Person',
      type: 'object',
      properties: {
          firstName: {
              title: 'First Name',
              type: 'string'
          },
          lastName: {
              type: 'string'
          },
          age: {
              description: 'Age in years',
              type: 'integer',
              minimum: 0
          },
          tag: {
              type: 'array',
              description: 'Tags',
              default: ['IT'],
              items: {
                  type: 'text'
              }
          },
          clients: {
              type: 'array',
              description: 'Tags',
              items: {
                  type: 'object',
                  properties: {
                      firstName: {
                          title: 'First Name',
                          type: 'string'
                      },
                      lastName: {
                          type: 'string'
                      }
                  }
              }
          }
      },
      required: ['firstName', 'lastName']
  };
  function property2control(property, key, schema) {
      var requiredList = schema.required || [];
      var rest = {};
      var validations = {};
      var type = 'text';
      if (property.type === 'integer') {
          type = 'number';
          typeof property.minimum === 'number' && (rest.min = property.minimum);
          // property.max
      }
      else if (property.type === 'array') {
          type = 'combo';
          var items = property.items;
          if (items.type === 'object') {
              rest.controls = makeControls(items.properties, items);
              rest.multiLine = true;
          }
          else {
              type = 'array';
              rest.inline = true;
              rest.items = property2control(items, 'item', property);
          }
      }
      if (typeof property.minimum === 'number') {
          validations.minimum = property.minimum;
      }
      return tslib_1.__assign({ name: key, type: type, required: !!~requiredList.indexOf(key), label: property.title || property.description, desc: property.title && property.description, value: property.default, validations: validations }, rest);
  }
  function makeControls(properties, schema) {
      var keys = Object.keys(properties);
      return keys.map(function (key) { return property2control(properties[key], key, schema); });
  }
  function JSONSchme2AMisSchema(schema) {
      if (schema.type !== 'object') {
          throw new Error('JSONSchme2AMisSchema 只支持 object 转换');
      }
      return {
          title: schema.title,
          type: 'form',
          mode: 'horizontal',
          controls: makeControls(schema.properties, schema)
      };
  }
  var amisFormSchema = JSONSchme2AMisSchema(Schema);
  var JSONSchemaForm = /** @class */ (function (_super) {
      tslib_1.__extends(JSONSchemaForm, _super);
      function JSONSchemaForm() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.state = {
              data: {}
          };
          return _this;
      }
      JSONSchemaForm.prototype.renderForm = function () {
          var _this = this;
          return index_1.render({
              type: 'page',
              title: '',
              body: tslib_1.__assign(tslib_1.__assign({}, amisFormSchema), { onChange: function (values) {
                      return _this.setState({
                          data: tslib_1.__assign({}, values)
                      });
                  } })
          });
      };
      JSONSchemaForm.prototype.render = function () {
          return (react_1.default.createElement("div", null,
              react_1.default.createElement(TitleBar_1.default, { title: "JSON Schema Form" }),
              react_1.default.createElement("div", { className: "wrapper" },
                  react_1.default.createElement("div", null,
                      react_1.default.createElement("h3", null, "Schema"),
                      react_1.default.createElement("pre", null,
                          react_1.default.createElement("code", null, JSON.stringify(Schema, null, 2)))),
                  react_1.default.createElement("div", null,
                      react_1.default.createElement("h3", null, "Form"),
                      this.renderForm()),
                  react_1.default.createElement("div", null,
                      react_1.default.createElement("h3", null, "Data"),
                      react_1.default.createElement("pre", null,
                          react_1.default.createElement("code", null, JSON.stringify(this.state.data, null, 2)))))));
      };
      return JSONSchemaForm;
  }(react_1.default.Component));
  exports.default = JSONSchemaForm;
  //# sourceMappingURL=/examples/components/Form/Schem.js.map
  

});
