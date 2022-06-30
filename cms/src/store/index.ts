import { createStore } from 'vuex'

import lang from './modules/lang'
import menu from './modules/menu'
import tab from './modules/tab'
import flow from './modules/flow'
import themes from './modules/themes'
import loading from './modules/loading'
import user from './modules/user'
import customer from './modules/customer'
import model from './modules/model'

export default createStore({
  modules: {
    lang,
    menu,
    tab,
    flow,
    themes,
    loading,
    user,
    customer,
    model
  }
}) as any
