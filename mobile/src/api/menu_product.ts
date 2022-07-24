import service from "@/utils/request";

const api = {
  query: { url: "/menu-product", method: "get" },
  create: { url: "/menu-product", method: "post" },
  update: { url: "/menu-product/:id", method: "put" },
  delete: { url: "/menu-product/:id", method: "delete" },
};

export const getMenuProducts = (data: any) => {
  return service({ ...api.query, params: data });
};

export const createMenuProduct = (data: any) => {
  return service({ ...api.create, data });
};

export const updateMenuProduct = (data: any) => {
  const params = { ...api.update, data };
  params.url = params.url.replace(":id", data.id);
  return service(params);
};

export const deleteMenuProduct = (id: number) => {
  const params = { ...api.delete };
  params.url = params.url.replace(":id", id.toString());
  return service(params);
};
