// import BaseForm from "@/components/Base/BaseForm/index.vue";
// import BaseCustom from "@/components/Base/BaseCustom.vue";

import baseComponents from "@/components/Base/index";
import templateTable from "@/layout/templates/TemplateTable.vue";

const components: any = {
  ...baseComponents,
  templateTable,
  // BaseForm,
  // BaseCustom,
};

export default function (app: any) {
  for (const name in components) {
    app.component(name, components[name]);
  }
}
