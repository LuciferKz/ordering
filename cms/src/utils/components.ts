// import BaseForm from "@/components/Base/BaseForm/index.vue";
// import BaseCustom from "@/components/Base/BaseCustom.vue";

import baseComponents from "@/components/Base/index";

const components: any = {
  ...baseComponents,
  // BaseForm,
  // BaseCustom,
};

export default function (app: any) {
  for (const name in components) {
    app.component(name, components[name]);
  }
}
