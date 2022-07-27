import service from "@/utils/requestWx";

const api = {
  auth: { url: "/wxAuth", method: "get" },
};

export const auth = (data: any) => {
  return service({ ...api.auth, data });
};
