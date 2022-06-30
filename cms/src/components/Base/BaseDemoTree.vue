<template>
  <template-tree v-bind="templateTree"></template-tree>
</template>

<script lang="tsx">
import { useTemplateTree } from '@/hooks/index'
import { reactive, defineComponent } from 'vue'
import { renderContent } from './BaseTreeItem'

export default defineComponent({
  setup() {
    const form = reactive({ name: 123 })
    const templateTree = useTemplateTree({
      baseTree: {
        data: [
          {
            id: 1,
            label: 'Level one 1',
            type: 'file',
            children: [
              {
                id: 4,
                label: 'Level two 1-1',
                children: [
                  {
                    id: 9,
                    label: 'Level three 1-1-1'
                  },
                  {
                    id: 10,
                    label: 'Level three 1-1-2'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: 'Level one 2',
            children: [
              {
                id: 5,
                label: 'Level two 2-1'
              },
              {
                id: 6,
                label: 'Level two 2-2'
              }
            ]
          },
          {
            id: 3,
            label: 'Level one 3',
            children: [
              {
                id: 7,
                label: 'Level two 3-1'
              },
              {
                id: 8,
                label: 'Level two 3-2'
              }
            ]
          }
        ],
        props: {
          renderContent
        }
      },
      baseButtons: {
        buttons: [['cancel', 'confirm'], { label: '人群', key: 'refrechCowrd' }],
        // buttons: ['cancel', 'confirm'],
        props: {
          align: 'space-between'
        },
        events: {
          confirm() {}
        }
      },
      templateSidebar: {
        title: '人群管理'
      },
      templateContent: {
        title: '创建人群',
        ref: 'refBaseForm',
        component: 'BaseForm',
        props: {
          form,
          formItems: [
            {
              label: '姓名',
              prop: 'name'
            }
          ]
        }
      }
    })

    return {
      templateTree
    }
  }
})
</script>

<style lang="scss">
</style>
