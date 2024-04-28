import type { RowData } from "@tanstack/react-table";
import { Waypoint, useContext } from "@tgthuan/react";
import TableCell from "../cell";
import TableRow from "../row";
import type { InfinityPaginateProps, TableContext } from "../type";

function InfinityPaginate<TData extends RowData = RowData, TContext = object>(
  props: InfinityPaginateProps<TData, TContext>
) {
  const { isFetchingNextPage, hasNextPage, fetchNextPage } = props;

  const { table } = useContext<TableContext<TData, TContext>>();

  const colSpan = table.getAllColumns().length;

  if (!hasNextPage) {
    return;
  }

  return (
    <tfoot>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <Waypoint
            trigger
            className="my-0"
            isFetching={isFetchingNextPage}
            fetchFnc={() => fetchNextPage()}
          />
        </TableCell>
      </TableRow>
    </tfoot>
  );
}

export default InfinityPaginate;
