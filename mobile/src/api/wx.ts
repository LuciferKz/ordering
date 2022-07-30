import service from "@/utils/requestWx";

const api = {
  auth: { url: "/getCode", method: "get" },
};

export const getWxAuth = (data: any) => {
  return service({ ...api.auth, data });
};
