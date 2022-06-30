import { ElMessage, ElMessageBox } from "element-plus";

export function useMessager() {
  const messager = function (opts: any) {
    ElMessage({ ...opts, message: opts.message });
  };

  messager.success = function (msg: string) {
    ElMessage.success(msg);
  };
  messager.error = function (msg: string) {
    ElMessage.error(msg);
  };
  messager.warning = function (msg: string) {
    ElMessage.warning(msg);
  };
  messager.confirm = function (msg: string, title: string, opts: any) {
    const newOpts = Object.assign({}, opts);
    newOpts.cancelButtonText = newOpts.cancelButtonText;
    newOpts.confirmButtonText = newOpts.confirmButtonText;
    return ElMessageBox.confirm(msg, title, opts);
  };
  return messager;
}
