import type { RowData } from "@tanstack/react-table";
import { useContext } from "@tgthuan/react";
import { type ChangeEvent } from "react";
import type { DefaultPaginateProps, TableContext } from "../type";

function DefaultPaginate<TData extends RowData = RowData, TContext = object>(
  props: DefaultPaginateProps<TData, TContext>
) {
  const { className, rowsPerPageOptions = [20, 50, 100] } = props;

  const { table, loading, fetching } = useContext<TableContext<TData, TContext>>();

  const { getRowCount, setPageSize, getState, previousPage, nextPage } = table;

  const { pagination } = getState();

  const { pageIndex: page, pageSize: rowsPerPage } = pagination;

  const count = getRowCount();

  const handleChangePage = async (newPage: number) => {
    try {
      if (newPage === page) {
        return;
      }

      newPage > page ? nextPage() : previousPage();
    } catch (error) {
      console.log("🚀 ~ handleChangePage ~ error:", { error });
    }
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(event.target.value, 10);
      setPageSize(value);
    } catch (error) {
      console.log("🚀 ~ handleChangeRowsPerPage ~ error:", { error });
    }
  };

  return null;
}

export default DefaultPaginate;
