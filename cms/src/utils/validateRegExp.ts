// { required : true , message : '' , pattern : '' , validator( rule , value , callback ){ callback() ; callback(new Error(rule.message))} }
// import configI18n from '@/lang/i18n'

// const {
//   global: { t }
// } = configI18n()

const t = function (key: string) {
  return key;
};

// t = (str: string) => str

export default {
  // 必填项
  required() {
    return { required: true, message: t(`必填项`) };
  },
  // 整数
  int() {
    return { pattern: /^-?[0-9]\d*$/, message: t(`请输入整数`) };
  },
  // 正整数
  nInt() {
    return { pattern: /^[1-9]\d*$/, message: t(`请输入正整数`) };
  },
  // 正整数包括0
  nIntInc0() {
    return { pattern: /^[0-9]\d*$/, message: t(`请输入正整数`) };
  },
  // 负整数
  pInt() {
    return { pattern: /^-[1-9]*$/, message: t(`请输入负整数`) };
  },
  // 大于
  greater(n: number, isEqual: boolean) {
    return {
      validator(r: any, v: any, callback: any) {
        if (isEqual) {
          v >= n ? callback() : callback(new Error(t(`必须大于或等于 ${n}`)));
        } else {
          v > n ? callback() : callback(new Error(t(`必须大于 ${n}`)));
        }
      },
    };
  },
  // 小于
  less(n: any, isEqual: boolean) {
    return {
      validator(r: any, v: any, callback: any) {
        if (isEqual) {
          v <= n ? callback() : callback(new Error(t(`必须小于或等于 ${n}`)));
        } else {
          v < n ? callback() : callback(new Error(t(`必须小于 ${n}`)));
        }
      },
    };
  },
  min(min: number) {
    min *= 1;
    return {
      validator(r: any, v: any, callback: any) {
        v < min ? callback(new Error(t(`不可小于 ${min}`))) : callback();
      },
    };
  },
  max(max: number) {
    max *= 1;
    return {
      validator(r: any, v: any, callback: any) {
        v > max ? callback(new Error(t(`不可大于 ${max}`))) : callback();
      },
    };
  },
  // 范围  参数 最小值 最大值  是否允许相等
  range(min: number, max: number, isEqual: number) {
    return {
      validator(r: any, v: any, callback: any) {
        if (isEqual) {
          min <= v && v <= max
            ? callback()
            : callback(new Error(t(`取值范围 ${min} ~ ${max}`)));
        } else {
          min < v && v < max
            ? callback()
            : callback(new Error(t(`取值范围在${min} ~ ${max} 之间`)));
        }
      },
    };
  },
  // 任意数字验证
  number() {
    return { pattern: /^-?\d*[.]?\d*$/, message: t(`请输入数字`) };
  },
  // 小数 ( 默认 2 为  )( 精确 )
  amount() {
    return {
      pattern: new RegExp(/^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/),
      message: t(`请输入正确的金额`),
    };
  },
  // 小数 ( 默认 2 为  )( 精确 )
  float(len?: number) {
    len = len || 2;
    return {
      pattern: new RegExp(`^-?\\d*\\.[\\d]{${len}}$`),
      message: t(`请输入精确到 ${len} 位的小数`),
    };
  },
  // 最大小数位数
  maxFloat(len = 2) {
    return {
      pattern: new RegExp(
        `^-?(([1-9][0-9]*)|(([0]\\.\\d{1,2}|[1-9][0-9]*\\.\\d{1,${len}})))$`
      ),
      message: t(`请输入最多 ${len} 位的小数的数字`),
    };
  },
  // 最小长度限制
  minLength(min: number) {
    return {
      validator(r: any, v: any, c: any) {
        v += "";
        v.length < min ? c(new Error(t(`字符长度不可少于￥{min}`))) : c();
      },
    };
  },
  // 最大长度验证
  maxLength(max: number) {
    return {
      validator(r: any, v: any, c: any) {
        v += "";
        v.length > max ? c(new Error(t(`字符长度不可超过${max}`))) : c();
      },
    };
  },
  // 长度限制
  length(min: number, max: number) {
    return {
      validator(r: any, v: any, c: any) {
        v += "";
        v.length < min || v.length > max
          ? c(new Error(t(`字符区间${min}~${max}`)))
          : c();
      },
    };
  },

  // 非空验证
  notEmpty() {
    return { pattern: new RegExp("\\S+", "g"), message: t(`不可为空`) };
  },
  // 不包含特殊字符 | & # [ ]
  noSpecial() {
    return {
      pattern: /^((?![\|\&\#\[\]]).)*$/,
      message: t("不可包含特殊字符 | & # [ ]"),
    };
  },
  // 必须包含验证
  withIn(v: string) {
    return { pattern: new RegExp(v), message: t("字符中必须包含" + `${v}`) };
  },
  // 不可包含验证
  withOut(v: any) {
    return {
      pattern: new RegExp(`^((?!${v}).)*$`),
      message: t("字符中不可包含" + `${v === " " ? "空格" : v}`),
    };
  },
  // （字母，数字，下划线，减号）
  account() {
    const reg = new RegExp(`^[a-zA-Z0-9_-]*$`);
    return {
      pattern: reg,
      message: t(`只可包含 字母，数字，下划线，减号`),
      trigger: "blur",
    };
  },
  // （字母，数字，下划线）
  nCode() {
    const reg = new RegExp(`^[a-zA-Z0-9_]*$`);
    return {
      pattern: reg,
      message: t(`只可包含 字母，数字，下划线`),
      trigger: "blur",
    };
  },
  // (小写字母，下划线)
  lowercaseCode() {
    const reg = new RegExp(`^[a-z_]*$`);
    return {
      pattern: reg,
      message: t(`只可包含 小写字母，下划线`),
      trigger: "blur",
    };
  },
  // 只能是字母或则字母加数字(以字母开头)
  onlyLetter() {
    return {
      pattern: /^[a-zA-Z][a-zA-Z0-9]*$/,
      message: t(`只可包含 字母+数字或纯字母`),
    };
  },
  // 链接
  url() {
    return {
      pattern:
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
      message: t("链接格式有误"),
      trigger: "blur",
    };
  },
  // 身份证
  idCard() {
    return {
      pattern:
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      message: t("请输入正确身份证号码"),
      trigger: "blur",
    };
  },
  // 手机号
  mobile() {
    return {
      pattern: /^1[345789]\d{9}$/,
      message: t("请正确输入手机号码"),
      trigger: "blur",
    };
  },
  mobileName() {
    return {
      pattern: /^1[345789]\d{8,49}$/,
      message: t("请正确输入手机号码"),
      trigger: "blur",
    };
  },
  // 电话
  telephone() {
    return {
      pattern:
        /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7,8})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)/,
      message: t("请正确输入电话号码"),
      trigger: "blur",
    };
  },
  eMail() {
    return {
      pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      message: t("请正确输入邮箱地址"),
      trigger: "blur",
    };
  },
  // 不包含中文
  noCN() {
    return { pattern: /^[\x01-\x7f]*$/, message: t("不可包含中文") };
  },
  // 必须是大写字母
  isCapital() {
    return { pattern: /^[A-Z]+$/, message: t("只能包含大写字母") };
  },
  // 全局字段长度 ( 默认 30 )
  G_FieldLength() {
    return this.maxLength(30);
  },
  // 全局备注长度 ( 默认 300 )
  G_RemarkLength() {
    return this.maxLength(300);
  },
  // 全局邮箱地址长度 ( 50 )
  G_EMailLength() {
    return this.maxLength(50);
  },
  // 全局密码长度（ 6 - 16）
  G_PasswordLength() {
    return this.length(8, 16);
  },
};
