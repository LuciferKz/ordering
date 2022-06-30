export function renderContent(h: any, { data }: any) {
  if (data.type === 'file') {
    return (
      <>
        <div class='base-tree-item'>
          <span>{data.label}</span>
          <i class='iconfont icon-lajitongshanchu'></i>
        </div>
      </>
    )
  } else {
    return (
      <div class='base-tree-item'>
        <span>{data.label}</span>
        <i class='iconfont icon-lajitongshanchu'></i>
      </div>
    )
  }
}
