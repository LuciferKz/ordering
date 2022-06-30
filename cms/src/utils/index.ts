import $cookie from './cookie'
export const isType = function (o: any, type: string) {
  return (
    Object.prototype.toString.call(o) === `[object ${type.slice(0, 1).toUpperCase()}${type.slice(1).toLowerCase()}]`
  )
}

export const isObjectLike = function (o) {
  return typeof o === 'object' && o !== null
}

export const isPlainObject = function (o) {
  if (!isObjectLike(o) || !isType(o, 'Object')) {
    return false
  }
  if (Object.getPrototypeOf(o) === null) {
    return true
  }
  let proto = o
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(o) === proto
}

export const isArray = function (value: any) {
  return isType(value, 'Array')
}

export const isNumber = function (value: any) {
  return isType(value, 'Number')
}

export const isString = function (value: any) {
  return isType(value, 'String')
}

export const getValueByPath = function (target: {}, path: string) {
  const keys: Array<string> = path.split('.')
  const lastKey: string = keys.pop() || ''
  let context: any = target

  keys.some(k => {
    if (isType(context[k], 'object')) {
      context = context[k]
    } else {
      // console.error(
      //   `error in getValueByPath: could not find path (${path}) in target `,
      //   target,
      //   `wrong path ${k}`
      // )
    }
  })
  return context[lastKey]
}

function _mix(dist: any, obj: any) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key]
    }
  }
}

export const getBase64 = (file: any) => {
  return new Promise(function (resolve, reject) {
    const reader: any = new FileReader()
    var imgResult: string = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
      imgResult = reader.result
      resolve(imgResult)
    }
    reader.onerror = function (error: any) {
      reject(error)
    }
    // reader.onloadend = function () {
    //
    //   resolve(imgResult)
    // }
  })
}

export const mix = function (dist = {}, src1 = {}, src2 = {}, src3 = {}) {
  if (src1) _mix(dist, src1)
  if (src2) _mix(dist, src2)
  if (src3) _mix(dist, src3)
  return dist
}

// 替换的方式修改array的值，并保证响应式需求
export const setReactiveArray = function (target = [], value = []) {
  Array.prototype.splice.apply(target, [0, target.length, ...value])
}

export const setReactiveObject = function (target: any, value: any) {
  for (const k in target) {
    if (value[k] || isNumber(value[k])) {
      target[k] = value[k]
    }
  }
}

const MAX_MIX_LEVEL = 5

const _deepMix = function (dist: any, src: any, level?: any, maxLevel?: any) {
  level = level || 0
  maxLevel = maxLevel || MAX_MIX_LEVEL
  for (const key in src) {
    if (Object.prototype.hasOwnProperty.call(src, key)) {
      const value = src[key]
      if (value !== null && isPlainObject(value)) {
        if (!isPlainObject(dist[key])) {
          dist[key] = {}
        }
        if (level < maxLevel) {
          _deepMix(dist[key], value, level + 1, maxLevel)
        } else {
          dist[key] = src[key]
        }
      } else if (isArray(value)) {
        dist[key] = []
        dist[key] = dist[key].concat(value)
      } else if (value !== undefined) {
        dist[key] = value
      }
    }
  }
}

export const deepMix = function (v1: any, v2: any) {
  const args = new Array(arguments.length)
  const length = args.length
  for (let i = 0; i < length; i++) {
    args[i] = arguments[i]
  }
  const rst = args[0]
  for (let i = 1; i < length; i++) {
    _deepMix(rst, args[i])
  }
  return rst
}

export const clone = function (obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let rst: any
  if (isArray(obj)) {
    rst = []
    for (let i = 0, l = obj.length; i < l; i++) {
      if (typeof obj[i] === 'object' && obj[i] != null) {
        rst[i] = clone(obj[i])
      } else {
        rst[i] = obj[i]
      }
    }
  } else {
    if (!isPlainObject(obj)) return obj
    rst = {}
    for (const k in obj) {
      if (typeof obj[k] === 'object' && obj[k] != null) {
        rst[k] = clone(obj[k])
      } else {
        rst[k] = obj[k]
      }
    }
  }

  return rst
}

// 下载
export const openWindow = (url: any, params?: any) => {
  const p: any = {
    token: $cookie.get('token'),
    tenantCode: 'arvato',
    ...params
  }

  if (!/^(http|https)+/.test(url)) {
    url = import.meta.env.VITE_BASE_URL + '/' + url.replace(/^\/+/, '')
  }
  const paramStr: any = objectToQueryString(p)
  let urlStr: any = ''
  if (/\?/.test(url)) {
    if (/\?$/.test(url)) {
      urlStr = url + paramStr
    } else {
      urlStr = url + '&' + paramStr
    }
  } else {
    if (/\?/.test(paramStr)) {
      urlStr = url + paramStr
    } else {
      urlStr = url + '?' + paramStr
    }
  }

  window.open(urlStr)
}
const objectToQueryString = (params: any) => {
  let qs = ''
  if (params) {
    qs = Object.entries(params).reduce((queryString, [key, val], index) => {
      const symbol = queryString.length === 0 ? '?' : '&'
      queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : ''
      return queryString
    }, '')
  }
  return qs
}

export const formatDate = (date: any, patter: string) => {
  var now = new Date(date)

  var WeekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  var o: any = {
    'M+': now.getMonth() + 1, // month
    'd+': now.getDate(), // day
    'h+': now.getHours(), // hour
    'm+': now.getMinutes(), // minute
    's+': now.getSeconds(), // second
    'q+': Math.floor((now.getMonth() + 3) / 3), // quarter
    S: now.getMilliseconds(), // millisecond
    E: WeekArr[now.getDay()],
    'e+': now.getDay()
  }
  if (/(y+)/.test(patter)) {
    patter = patter.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(patter)) {
      patter = patter.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return patter
}

export function debounce(func: Function, wait = 0) {
  if (typeof func !== 'function') {
    throw new TypeError('need a function arguments')
  }

  let timeid: any = null
  let result: any

  return function () {
    const context = this
    const args = arguments

    if (timeid) {
      clearTimeout(timeid)
    }
    timeid = setTimeout(function () {
      result = func.apply(context, args)
    }, wait)
    return result
  }
}

export function throttle(fn: Function, interval = 1000 / 120) {
  let last = 0
  return function () {
    // let context =
    const args = arguments
    const now = +new Date()

    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}

export const getFilterData = (arr: any, val: string, key: string) => {
  return arr.filter((item: any) => {
    return item[key] === val
  })[0]
}

// 转义
export function HTMLEncode(str: string) {
  if (!isString(str)) return str
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/ /g, '&nbsp;')
}
// 反转义
export function HTMLDecode(str: string) {
  if (!isString(str)) return str
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
}

export const zTreeTransfer = (ztreeData = [], id = 'id', pid = 'pId') => {
  const treeData = ztreeData.map((o: any) => ({ ...o }))
  const res = treeData.reduce(function (tree, node) {
    // 如果节点拥有父级节点
    const pNode = treeData.find(n => {
      return n[id] === node[pid] && node[id] !== node[pid]
    })
    if (pNode) {
      pNode.children = pNode.children || []
      pNode.children.push(node)
    } else {
      // 如果没有父级节点则视为根节点
      tree.push(node)
    }
    return tree
  }, [])
  return res
}

export default clone
