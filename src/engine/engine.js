import validate from "./validation";
import applicableActions from "./applicableActions";
import { isDevelopment } from "../utils";

export default class PredicatesEngine {
  constructor(rules, schema, uiSchema) {
    this.schema = schema;
    this.uiSchema = uiSchema;
    this.rules = rules;

    if (isDevelopment()) {
      validate(rules.map(({ conditions }) => conditions), schema);
    }
  }

  run = formData => {
    let self = this;
    return new Promise(function(resolve) {
      resolve(applicableActions(self.rules, formData));
    });
  };
}
