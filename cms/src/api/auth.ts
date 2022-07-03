import service from "@/utils/request";

const api = {
  login: { url: "/auth/login", method: "post" },
};

export const login = (data: any) => {
  return service({ ...api.login, data });
};
