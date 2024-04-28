import type { RowData, SortDirection } from "@tanstack/react-table";
import type { Dispatch, FC, SetStateAction } from "react";
import Body from "./body";
import Container from "./container";
import TableFooter from "./footer";
import Header from "./header";
import DefaultPaginate from "./pagination/default";
import VirtualInfinityPaginate from "./pagination/virtual-infinity";
import Table from "./table";
import type {
  BodyProps,
  ContainerProps,
  DefaultPaginateProps,
  FooterProps,
  HeaderProps,
  InfinityPaginateProps,
  TableProps,
  VirtualInfinityPaginateProps,
} from "./type";
import usePaginationState from "./hooks/usePaginationState";
import useRowSelectionState from "./hooks/useRowSelectionState";
import useTableVirtualizer from "../hooks/useTableVirtualizer";
import InfinityPaginate from "./pagination/infinity";

export type SortField<TData extends RowData = RowData> = Partial<
  Record<keyof TData, SortDirection | null>
>;

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData = RowData, TValue = unknown> {
    className?: string;
    manualSorting?: boolean;
  }
  interface TableMeta<TData extends RowData = RowData> {
    sorts?: SortField<TData>;
    setSorts?: Dispatch<SetStateAction<SortField<TData>>>;
  }
}

export function createTable<TData extends RowData = RowData, TContext = object>(): {
  Provider: FC<TableProps<TData, TContext>>;
  Container: FC<ContainerProps<TData, TContext>>;
  Header: FC<HeaderProps<TData, TContext>>;
  Body: FC<BodyProps<TData, TContext>>;
  Footer: FC<FooterProps<TData, TContext>>;
  Paginate: {
    Default: FC<DefaultPaginateProps<TData, TContext>>;
    VirtualInfinity: FC<VirtualInfinityPaginateProps<TData, TContext>>;
    Infinity: FC<InfinityPaginateProps<TData, TContext>>;
  };

  usePaginationState: typeof usePaginationState;
  useRowSelectionState: typeof useRowSelectionState;
  useVirtualizer: typeof useTableVirtualizer;
} {
  return {
    Provider: Table,
    Container,
    Header,
    Body,
    Footer: TableFooter,
    Paginate: {
      Default: DefaultPaginate,
      VirtualInfinity: VirtualInfinityPaginate,
      Infinity: InfinityPaginate,
    },

    usePaginationState,
    useRowSelectionState,
    useVirtualizer: useTableVirtualizer,
  };
}
