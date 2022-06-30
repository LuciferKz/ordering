export interface IRoute {
  name: string
  path: string
  hide?: boolean
  active?: boolean
}

// BaseButtons

export interface ISimpleButton {
  key: string
  label: string
  code?: string
  props?: object
  hide?: boolean
}

interface IButtonsParam extends Array<string | ISimpleButton | IButtonsParam> {}

export interface IBaseButtonsParams {
  buttons: IButtonsParam
  props?: object
  events?: object
}

// BaseSearch
export interface IBaseSearchParams extends IBaseFormParams {
  events?: any
}

// ModuleForm
export interface IModuleFormParams {
  title?: string
  form?: object
  formItems: any
  props?: any
  rules?: object
  component?: object
}

// BaseDialog
export interface IBaseDialogBody {
  component?: any
  props?: object
}

export interface IBaseDialogFoot extends IBaseDialogBody {}

export interface IBaseDialogParams {
  name?: string
  body?: IBaseDialogBody | IBaseFormParams
  footer?: IBaseDialogFoot | IBaseButtonsParams
  props: any
}

// BaseTable
export interface IBaseTableParams {
  columns: object[]
  data: object[]
  props?: object
  events?: object
}

// BaseForm

export interface IFormItem {
  prop: string
  label?: string
  labelWidth?: string | number
  type?: string
  props?: any
  events?: object
  render?: Function
  rules?: any
  span?: any
}

export interface IBaseFormParams {
  form?: any
  formItems: Array<IFormItem>
  props?: object
  rules?: object
}

// BaseTree
export interface IBaseTreeParams {
  data: object[]
  props?: object
  events?: object
}

// TemplateTable
export interface ITemplateTableParams {
  baseSearch?: IBaseSearchParams
  baseButtons?: IBaseButtonsParams
  baseTable?: IBaseTableParams
  baseDialog?: IBaseDialogParams | Array<IBaseDialogParams>
  basePagination?: any
}

// TemplateTree
export interface ITemplateTreeContent {
  component?: string | object
  props?: object
  title?: string
  ref?: string
  baseButtons?: IBaseButtonsParams
  events?: object
}

export interface ITemplateTreeParams {
  baseTree: IBaseTreeParams
  baseButtons?: IBaseButtonsParams
  baseDialog?: IBaseDialogParams | Array<IBaseDialogParams>
  templateSidebar: object
  templateContent: ITemplateTreeContent
}
