import service from "@/utils/request";

const api = {
  query: { url: "/category", method: "get" },
  create: { url: "/category", method: "post" },
  update: { url: "/category/:id", method: "put" },
  delete: { url: "/category/:id", method: "delete" },
};

export const getCategories = (data: any) => {
  return service({ ...api.query, data });
};

export const createCategory = (data: any) => {
  return service({ ...api.create, data });
};

export const updateCategory = (data: any) => {
  const params = { ...api.update, data };
  params.url = params.url.replace(":id", data.id);
  return service(params);
};

export const deleteCategory = (id: number) => {
  const params = { ...api.delete };
  params.url = params.url.replace(":id", id.toString());
  return service(params);
};
