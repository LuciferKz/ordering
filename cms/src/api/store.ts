import service from "@/utils/request";

const api = {
  query: { url: "/store", method: "get" },
  create: { url: "/store", method: "post" },
  update: { url: "/store/:id", method: "put" },
  delete: { url: "/store/:id", method: "delete" },
  qrcode: {
    url: "/store/qrcode/:id",
    method: "post",
    responseType: "blob",
  },
};

export const getStores = (data: any) => {
  return service({ ...api.query, data });
};

export const createStore = (data: any) => {
  return service({ ...api.create, data });
};

export const updateStore = (data: any) => {
  const params = { ...api.update, data };
  params.url = params.url.replace(":id", data.id);
  return service(params);
};

export const deleteStore = (id: number) => {
  const params = { ...api.delete };
  params.url = params.url.replace(":id", id.toString());
  return service(params);
};

export const exportQrcode = (id: number) => {
  const params = { ...api.qrcode };
  params.url = params.url.replace(":id", id.toString());
  return service(params);
};
