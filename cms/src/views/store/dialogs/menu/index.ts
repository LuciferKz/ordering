import component from "./index.vue";
export default function ({
  dialogname = "",
  form = {},
  handleCancel,
  handleConfirm,
}: any) {
  return {
    name: dialogname,
    props: {
      title: "门店菜单",
      showClose: false,
      width: 800,
    },
    body: {
      component,
    },
    footer: {
      // , "confirm"
      buttons: ["cancel"],
      events: {
        cancel: handleCancel,
        // confirm: handleConfirm,
      },
    },
  };
}
