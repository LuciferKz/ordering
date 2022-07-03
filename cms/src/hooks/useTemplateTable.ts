import {
  useBaseSearch,
  useBaseButtons,
  useBaseTable,
  useBaseDialog,
  useBasePagination,
} from ".";
import $cookie from "@/utils/cookie";

import { ITemplateTableParams } from "@/utils/interface";

export function useTemplateTable({
  baseSearch,
  baseButtons,
  baseTable,
  baseDialog,
  basePagination,
}: ITemplateTableParams) {
  const templateTable: any = {};
  templateTable.refs = {};
  if (baseSearch) {
    templateTable.baseSearch = useBaseSearch(baseSearch);
    if (templateTable.baseSearch?.events?.search) {
      const oriSearch = templateTable.baseSearch?.events?.search;
      templateTable.baseSearch.events.search = function (filter: any) {
        templateTable.basePagination.pagination.offset = 0;
        oriSearch(filter);
      };
    }
  }
  if (basePagination) {
    if (basePagination.events) {
      const oriEvents = { ...basePagination.events };
      basePagination.events.currentChange = function (page: number) {
        templateTable.refs.table.setCurrentRow(0);
        oriEvents.currentChange && oriEvents.currentChange(page);
      };
    }
  }

  if (baseButtons) {
    if ($cookie.get("login-type") === "platform") {
      templateTable.baseButtons = useBaseButtons(baseButtons, false);
    } else {
      templateTable.baseButtons = useBaseButtons(baseButtons, false);
    }
  }

  if (baseTable) {
    templateTable.baseTable = useBaseTable(baseTable);
    templateTable.basePagination = useBasePagination(basePagination);
  }

  if (baseDialog) {
    if (baseDialog instanceof Array) {
      templateTable.baseDialog = baseDialog.map((dialog) =>
        useBaseDialog(dialog)
      );
    } else {
      templateTable.baseDialog = [useBaseDialog(baseDialog)];
    }
  }

  return templateTable;
}
