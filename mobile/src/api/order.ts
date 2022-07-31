import service from "@/utils/request";

const api = {
  getOrders: { url: "/order", method: "get" },
  createOrder: { url: "/order", method: "post" },
  updateOrder: { url: "/order", method: "put" },
};

export const getOrders = (data: any) => {
  return service({ ...api.getOrders, params: data });
};

export const createOrder = (data: any) => {
  return service({ ...api.createOrder, data });
}; 

export const updateOrder = (data: any) => {
  return service({ ...api.updateOrder, data });
}; 