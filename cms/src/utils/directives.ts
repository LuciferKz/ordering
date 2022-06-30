// import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import store from '@/store'

const replaceNode = function (el: any, binding: any, vnode: any) {
  const comment = vnode.elm || document.createComment('you dont have permission to access this button')
  vnode.elm = comment
  const permissions = computed(() => store.state.user.permissions)
  if (!permissions.value[binding.value]) {
    el.parentNode && el.parentNode.replaceChild(comment, el)
  } else {
    comment.parentNode && comment.parentNode.replaceChild(el, comment)
  }
}
const directives: any = {
  collpase: {
    mounted(el: any, binding: any, vnode: any, oldVnode: any) {
      el.style.overflow = 'hidden'
      el.style.transition = 'all .3s linear'
      el.style.height = `${binding.value.expand ? binding.value.max || el.scrollHeight : binding.value.min || 0}px`
    },
    beforeUpdate(el: any, binding: any, vnode: any, oldVnode: any) {
      el.style.height = `${binding.value.expand ? binding.value.max || el.scrollHeight : binding.value.min || 0}px`
    }
  },
  permission: {
    beforeMount(el: any, binding: any, vnode: any, oldVnode: any) {},
    mounted(el: any, binding: any, vnode: any, oldVnode: any) {
      const permissions: any = computed(() => store.state.user.permissions)
      watch(
        () => permissions.value[binding.value],
        () => {
          replaceNode(el, binding, vnode)
        },
        { immediate: true }
      )
      // replaceNode(el, binding, vnode)
    },
    beforeUpdate(el: any, binding: any, vnode: any, oldVnode: any) {}
  }
}

export default function useDirectives(app: any) {
  for (const key in directives) {
    app.directive(key, directives[key])
  }
}
