import type { RowData } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ContextProvider } from "@tgthuan/react";
import type { TableContext, TableProps } from "./type";

export default function Table<TData extends RowData = RowData, TContext = object>(
  props: TableProps<TData, TContext>
) {
  const {
    ctx = {} as TContext,
    data,
    columns,
    options,
    children,
    fetching,
    loading,
    rowVirtualizer,
  } = props;

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });

  const ctxValue: TableContext<TData, TContext> = {
    table,
    fetching,
    loading,
    rowVirtualizer,
    ctx,
  };

  return <ContextProvider value={ctxValue}>{children}</ContextProvider>;
}
