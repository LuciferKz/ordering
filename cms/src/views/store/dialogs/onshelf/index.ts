import component from "./index.vue";
export default function ({
  dialogname = "",
  form = {},
  handleCancel,
  handleOnshelf,
}: any) {
  return {
    name: dialogname,
    props: {
      title: "上架餐品",
      showClose: false,
      width: 800,
    },
    body: {
      component,
      props: {
        height: 600,
      },
    },
    footer: {
      buttons: [
        "cancel",
        {
          key: "onshelf",
          label: "上架",
          props: {
            type: "primary",
          },
        },
      ],
      events: {
        cancel: handleCancel,
        onshelf: handleOnshelf,
      },
    },
  };
}
