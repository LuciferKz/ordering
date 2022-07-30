import service from "@/utils/requestWx";

const api = {
  auth: { url: "/getCode", method: "get" },
  getAccessToken: { url: "/getAccessToken", method: "get" }
};

export const getWxAuth = (data: any) => {
  return service({ ...api.auth, params: data });
};

export const getAccessToken = (data: any) => {
  return service({ ...api.getAccessToken, params: data });
};