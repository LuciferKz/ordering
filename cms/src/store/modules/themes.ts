const themeMap: any = {
  dark: {
    bg_color: '#242431',
    bg_1: '#242431',
    bg_2: '#292a38', // 数据内容底色1
    bg_3: '#323346', // 数据内容底色2
    primary_color: '#5A4DBE',
    name: '经典黑'
  },
  light: {
    bg_color: '#f9f9f9',
    bg_1: '#f9f9f9',
    bg_2: '#ffffff', // 数据内容底色1
    bg_3: '#f0f0f0', // 数据内容底色2
    primary_color: '#203864',
    name: '经典白'
  },
  'night-orange': {
    bg_color: '#1d1d1d',
    bg_1: '#252525',
    bg_2: '#1d1d1d', // 数据内容底色1
    bg_3: '#2b2b2b', // 数据内容底色2
    primary_color: '#d8890a',
    name: '暗夜-橙'
  }
}

let themeVal = localStorage.theme

if (!themeVal || !themeMap[themeVal]) {
  localStorage.theme = 'dark'
}

themeVal = localStorage.theme

const state = {
  theme: themeVal,
  themeData: themeMap[themeVal],
  themeList: themeMap
}
const mutations = {
  setTheme(state: any, theme: string) {
    if (theme) {
      state.theme = theme
      state.themeData = themeMap[theme]
      localStorage.theme = theme
    }
    document.body.classList.add('theme-transtion')
    document.body.setAttribute('data-theme', state.theme)
    setTimeout(() => {
      document.body.classList.remove('theme-transtion')
    }, 200)
  }
}
export default {
  state,
  mutations
}
