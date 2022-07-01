import { reactive } from "vue";
// import { IBaseFormParams } from '@/utils/interface'

export function useBaseForm({ form = {}, formItems, props, rules }: any) {
  formItems.forEach((item: any) => {
    if (!(item.prop in form)) {
      form[item.prop] = "";
    }
  });

  return reactive({
    form,
    formItems,
    props,
    rules,
  });
}
