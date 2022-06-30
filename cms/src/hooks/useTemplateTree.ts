import { ITemplateTreeParams } from '@/utils/interface'
import { useBaseTree, useBaseButtons, useBaseDialog } from '.'

export function useTemplateTree({
  baseTree,
  baseDialog,
  baseButtons,
  templateSidebar,
  templateContent
}: ITemplateTreeParams) {
  const templateTree: any = {
    refs: {},
    baseTree: useBaseTree(baseTree),
    templateSidebar,
    templateContent
  }

  if (baseButtons) {
    // templateTree.baseButtons = useBaseButtons(baseButtons, true)
    templateTree.baseButtons = useBaseButtons(baseButtons)
  }

  if (baseDialog) {
    if (baseDialog instanceof Array) {
      templateTree.baseDialog = baseDialog.map(dialog => useBaseDialog(dialog))
    } else {
      templateTree.baseDialog = [useBaseDialog(baseDialog)]
    }
    templateTree.dialogs = {}
  }

  return templateTree
}
