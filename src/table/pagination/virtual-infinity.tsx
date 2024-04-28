import type { RowData } from "@tanstack/react-table";
import { useEffect } from "react";
import type { TableContext, VirtualInfinityPaginateProps } from "../type";
import { useContext } from "@tgthuan/react";

function VirtualInfinityPaginate<TData extends RowData = RowData, TContext = object>(
  props: VirtualInfinityPaginateProps<TData, TContext>
) {
  const { length = 0, isFetchingNextPage, hasNextPage, fetchNextPage } = props;
  const { rowVirtualizer } = useContext<TableContext<TData, TContext>>();

  const lastItem = rowVirtualizer?.getVirtualItems().at(-1);

  useEffect(() => {
    if (!lastItem) {
      return;
    }

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, length, isFetchingNextPage, lastItem]);

  return null;
}

export default VirtualInfinityPaginate;
