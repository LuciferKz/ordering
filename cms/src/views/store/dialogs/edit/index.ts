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
      title: "添加角色",
      showClose: false,
    },
    body: {
      form,
      formItems: [
        { label: "门店名称", prop: "name" },
        {
          label: "营业时间",
          prop: "opening_time",
          type: "time-picker",
          props: {
            isRange: true,
            startPlaceholder: "开始时间",
            endPlaceholder: "结束时间",
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
          },
        },
        { label: "桌位数量", prop: "table_count", type: "inputNumber" },
        {
          label: "是否开启手机点餐",
          prop: "open_mobile_ordering",
          type: "radio-group",
          props: {
            options: [
              { label: "启用", value: 1 },
              { label: "禁用", value: 0 },
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
