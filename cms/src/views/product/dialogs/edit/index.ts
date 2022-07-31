import r from "@/utils/validateRegExp";
export default function ({
  dialogname = "",
  form = {},
  handleCancel,
  handleConfirm,
  categories,
}: any) {
  return {
    name: dialogname,
    props: {
      title: "添加商品",
      showClose: false,
    },
    body: {
      form,
      formItems: [
        { label: "餐品名称", prop: "name" },
        { label: "餐品价格", prop: "price", type: 'input-number', props: { precision: 0 } },
        {
          label: "餐品品类",
          prop: "category_id",
          type: "select",
          props: { options: categories, map: { label: "name", value: "id" } },
        },
        {
          label: "是否上架",
          prop: "on_shelf",
          type: "radio-group",
          props: {
            options: [
              { label: "是", value: 1 },
              { label: "否", value: 0 },
            ],
          },
        },
        // { label: "门店状态", prop: "status" },
      ],
      rules: {
        // roleCode: [{ required: true, message: '' }],
        name: [r.required(), r.G_FieldLength()],
      },
    },
    footer: {
      buttons: ["cancel", "confirm"],
      events: {
        cancel: handleCancel,
        confirm: handleConfirm,
      },
    },
  };
}
