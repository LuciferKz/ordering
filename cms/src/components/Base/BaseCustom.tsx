import { h, defineComponent } from 'vue'

export default defineComponent({
  props: {
    render: {
      type: Function,
      default: null
    },
    scope: {
      type: [Array, Object],
      default: () => ({
        row: {}
      })
    }
  },

  setup(props) {
    const render = props.render

    if (render) {
      return () => render(h, props.scope)
    }
  }
})
