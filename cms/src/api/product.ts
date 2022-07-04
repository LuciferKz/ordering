import service from "@/utils/request";

const api = {
  query: { url: "/product", method: "get" },
  create: { url: "/product", method: "post" },
  update: { url: "/product/:id", method: "put" },
  delete: { url: "/product/:id", method: "delete" },
};

export const getProducts = (data: any) => {
  return service({ ...api.query, params: data });
};

export const createProduct = (data: any) => {
  return service({ ...api.create, data });
};

export const updateProduct = (data: any) => {
  const params = { ...api.update, data };
  params.url = params.url.replace(":id", data.id);
  return service(params);
};

export const deleteProduct = (id: number) => {
  const params = { ...api.delete };
  params.url = params.url.replace(":id", id.toString());
  return service(params);
};
