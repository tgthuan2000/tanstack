import type { ColumnDef, RowData, Table, TableOptions } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import type { Render } from "@tgthuan/utils";
import type { VariantProps } from "class-variance-authority";
import type { ForwardedRef, ReactNode } from "react";
import type { tableContainerVars } from "./container";

export type TableProps<TData extends RowData = RowData, TContext = object> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  options?: Omit<TableOptions<TData>, "data" | "columns" | "getCoreRowModel">;
  children?: ReactNode;
  fetching?: boolean;
  loading?: boolean;
  ctx?: TContext;
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>;
};

export type TableContext<TData extends RowData = RowData, TContext = object> = {
  table: Table<TData>;
  fetching?: boolean;
  loading?: boolean;
  ctx: TContext;
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>;
};

export type HeaderProps<TData extends RowData = RowData, TContext = object> = {
  className?: string;
};

export type FooterProps<TData extends RowData = RowData, TContext = object> = {
  className?: string;
};

export type ContainerProps<TData extends RowData = RowData, TContext = object> = VariantProps<
  typeof tableContainerVars
> & {
  wrapClassName?: string;
  className?: string;
  children?: ReactNode;
  wrapRef?: ForwardedRef<HTMLDivElement>;
};

export type BodyProps<TData extends RowData = RowData, TContext = object> = {
  stripe?: boolean;
  className?: Render<string, { isSelected: boolean }>;
  onClick?: (value: TData) => void;
};

export type VirtualInfinityPaginateProps<TData extends RowData = RowData, TContext = object> = {
  length?: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};

export type DefaultPaginateProps<TData extends RowData = RowData, TContext = object> = {
  className?: string;
  rowsPerPageOptions?: number[];
};

export type InfinityPaginateProps<TData extends RowData = RowData, TContext = object> = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
};
