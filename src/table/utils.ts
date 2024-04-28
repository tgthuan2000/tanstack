import type { PaginationState, Row, SortDirection, Table } from "@tanstack/react-table";
import { PAGE_SIZE } from "../query/constants";

export const CHECKBOX_ID = "__checkbox";

export const COL_XS = 60;
export const COL_SM = 120;
export const COL_MD = 240;
export const COL_LG = 480;
export const COL_XL = 760;

export const getTableCellCheckboxProps = (id: string): any => {
  if (id !== CHECKBOX_ID) {
    return {};
  }

  return {
    role: "checkbox",
    padding: "checkbox",
    align: "center",
    className: "self-center",
  };
};

export function getCheckboxHeaderProps<T>(table: Table<T>): any {
  return {
    className: "[&_svg]:text-white",
    checked: table.getIsAllRowsSelected(),
    indeterminate: table.getIsSomeRowsSelected(),
    onChange: table.getToggleAllRowsSelectedHandler(),
  };
}

export function getCheckboxCellProps<T>(row: Row<T>): any {
  return {
    color: "default",
    checked: row.getIsSelected(),
    disabled: !row.getCanSelect(),
    indeterminate: row.getIsSomeSelected(),
    onChange: row.getToggleSelectedHandler(),
    // onClick: (e) => e.stopPropagation(),
  };
}

export function getPageIndex(pageIndex?: number) {
  return (pageIndex ?? 0) + 1;
}

export const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: PAGE_SIZE,
};

export const getSortedField = (field: SortDirection | undefined | null): SortDirection | null => {
  switch (field) {
    case "asc":
      return "desc";
    case "desc":
      return null;
    default:
      return "asc";
  }
};
