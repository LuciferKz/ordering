import service from "@/utils/request";

const api = {
  query: { url: "/order", method: "get" },
  create: { url: "/order", method: "post" },
  update: { url: "/order/:id", method: "put" },
};

export const getOrders = (data: any) => {
  return service({ ...api.query, params: data });
};

export const createOrder = (data: any) => {
  return service({ ...api.create, data });
}; 

export const updateOrder = (data: any) => {
  const params = { ...api.update, data };
  params.url = params.url.replace(":id", data.id);
  return service(params);
};