
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { getAccessToken, getUserInfo } from "@/api"
import $cookie from "@/utils/cookie";

const handleGetUserInfo = function (access_token, openId) {
  const store = useStore();
  getUserInfo({
    access_token,
    openId
  }).then((res) => {
    store.dispatch('changeUser', JSON.parse(res.result))
  })
}

export function useWxAuth () {
  const router = useRouter();
  const route = useRoute();

  const code = route.query.code || $cookie.get('code');
  const token = $cookie.get('token');
  const openid = $cookie.get('openId');
  if (token && openid) {
    handleGetUserInfo(token, openid)
    router.push("/menu");
  } else {
    if (code) {
      getAccessToken({
        code
      }).then((res) => {
        const { accessToken, openid } = res.result
        $cookie.set('token', accessToken)
        $cookie.set('openId', openid)
        handleGetUserInfo(accessToken, openid)
        router.push("/menu");
      })
    } else {
      router.push("/menu");
    }
  }
}