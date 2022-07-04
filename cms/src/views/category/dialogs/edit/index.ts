import r from "@/utils/validateRegExp";
export default function ({
  dialogname = "",
  form = {},
  handleCancel,
  handleConfirm,
}: any) {
  return {
    name: dialogname,
    props: {
      title: "添加类别",
      showClose: false,
    },
    body: {
      form,
      formItems: [{ label: "类别名称", prop: "name" }],
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
