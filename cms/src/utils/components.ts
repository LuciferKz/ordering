import baseComponents from "@/components/Base";

const components: any = {
  ...baseComponents,
};

export default function (app: any) {
  for (const name in components) {
    app.component(name, components[name]);
  }
}
