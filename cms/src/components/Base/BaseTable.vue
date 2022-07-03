<template>
  <div class="base-table">
    <el-table
      ref="refBaseTable"
      :data="tableData"
      v-bind="tableProps"
      v-on="tableEvents"
    >
      <el-table-column
        v-if="props.selection"
        type="selection"
        width="55"
      />
      <el-table-column
        v-else-if="!props.noRadio"
        width="55"
      >
        <template #default="scope">
          <el-radio
            v-model="currentRowKey"
            :label="scope.row[rowIndexKey]"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column, $index) in columns"
        :key="$index"
        :label="column.label"
        :width="column.width || tableProps.columnWidth"
        :prop="column.prop"
        v-bind="column.props"
      >
        <template
          v-if="column.tip"
          #header
        >
          <el-tooltip
            effect="dark"
            :content="column.tip"
            placement="top"
            :disabled="!column.tip"
          >
            <span>{{ column.label }}<i class="iconfont icon-bangzhu"></i></span>
          </el-tooltip>
        </template>
        <template
          v-if="column.render"
          #default="scope"
        >
          <base-custom
            :render="column.render"
            :scope="scope"
          ></base-custom>
        </template>
        <template
          v-else-if="column.formatter"
          #default="scope"
        >
          {{ column.formatter(scope, column) }}
        </template>
        <template
          v-else
          #default="scope"
        >
          {{ content(scope, column) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getValueByPath } from "@/utils/index";
import { ref, watch, computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    table: {
      type: Object,
      default: null,
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    currentRow: {
      type: Object,
      default: null,
    },
  },

  emits: ["update:table", "update:currentRow"],

  setup(props, { emit }) {
    const refBaseTable = ref(null);

    watch(refBaseTable, () => {
      emit("update:table", refBaseTable);
    });

    const content = computed(() => {
      return function (scope, column) {
        const _content = column.prop
          ? getValueByPath(scope.row, column.prop)
          : "";
        if (_content || typeof _content === "number") {
          return _content;
        } else if (column.props && column.props.emptyText) {
          return column.props.emptyText;
        } else {
          return "-";
        }
      };
    });

    return { refBaseTable, content };
  },

  data() {
    return {
      currentRowKey: 0,
    };
  },

  computed: {
    rowIndexKey() {
      return "$index";
    },
    tableData() {
      return this.data.map((d, idx) => ({ $index: idx, ...d }));
    },
    tableProps() {
      return {
        "highlight-current-row": true,
        ...this.props,
      };
    },
    tableEvents() {
      if (this.tableProps["highlight-current-row"]) {
        const _currentChange = this.events.currentChange;
        const currentChange = (row) => {
          if (row) {
            this.currentRowKey = row[this.rowIndexKey];
          } else if (!this.tableData[this.currentRowKey]) {
            this.currentRowKey = 0;
          }

          this.$emit("update:currentRow", row);

          const args = [].slice.call(arguments);
          args.push(this.currentRowKey);
          if (_currentChange) _currentChange.apply(this, args);
        };
        return { currentChange, ...this.events };
      } else {
        return this.events;
      }
    },
  },

  watch: {
    data() {
      this.setCurrentRow(this.currentRowKey);
    },
  },

  methods: {
    setCurrentRow(index) {
      const currentRow =
        index > this.tableData.length - 1
          ? this.tableData[0]
          : this.tableData[index];
      this.refBaseTable.setCurrentRow(currentRow);
    },
    toggleRowSelection() {
      const args = [].slice.call(arguments);

      this.refBaseTable.toggleRowSelection.apply(
        this.refBaseTable,
        args.map((idx) => {
          return this.tableData[idx];
        })
      );
    },
  },
});
</script>

<style>
.base-table {
  overflow: auto;
}
</style>
