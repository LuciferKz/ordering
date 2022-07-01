import { reactive, computed, watch } from "vue";
// import { useI18n } from 'vue-i18n'
import { ISimpleButton, IBaseButtonsParams } from "@/utils/interface";
// import { useRoute } from 'vue-router'
import { useStore } from "vuex";
// import { queryButtons } from '@/api/auth/menu'
import baseButtonMaps from "@/utils/buttonMaps";

const baseButtonTemplates: ISimpleButton[] = [
  {
    key: "add",
    label: "创建",
    // props: {
    //   icon: 'el-icon-plus'
    // }
  },
  { key: "edit", label: "编辑" },
  {
    key: "delete",
    label: "删除",
    props: {
      type: "danger",
    },
  },
  { key: "copy", label: "复制" },
  { key: "export", label: "导出" },
  { key: "import", label: "导入" },
  { key: "cancel", label: "取消" },
  {
    key: "confirm",
    label: "确定",
    props: {
      type: "primary",
    },
  },
  { key: "detail", label: "详情" },
  {
    key: "save",
    label: "保存",
    props: {
      type: "primary",
    },
  },
  { label: "查看", key: "view" },
  { label: "同步", key: "sync" },
  { label: "返回", key: "back" },
];

// useBaseButtons(['add', 'edit', 'delete'])
// useBaseButtons(['add', { label: '导入人群' }])

// 根据key从utils里的按钮hash表中匹配对应按钮类型
const getButton = function (key: string | ISimpleButton) {
  let btn: any = {};
  if (typeof key === "string") {
    btn = baseButtonTemplates.find((btn) => btn.key === key) || {};
  } else if (typeof key === "object") {
    btn = key;
  }
  return btn;
};

// 获取按钮
const getButtons = function (buttons: any[]): any[] {
  return (buttons as ISimpleButton[]).map(function (key) {
    if (typeof key === "object" && key instanceof Array) {
      return getButtons(key);
    } else {
      return getButton(key);
    }
  });
};

export function useBaseButtons(
  { events = {}, props = {}, buttons }: IBaseButtonsParams,
  needAuth = false
) {
  // 初始化坐标数据
  const baseButtons: any = reactive({ data: [], map: {}, props, events });

  baseButtons.data = getButtons(buttons);

  return baseButtons;
}
