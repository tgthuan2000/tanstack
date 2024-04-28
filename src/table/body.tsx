import type { Cell, RowData } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "@tgthuan/react";
import { cn, render } from "@tgthuan/utils";
import { isEmpty } from "lodash";
import TableCell from "./cell";
import TableRow from "./row";
import type { BodyProps, TableContext } from "./type";
import { getTableCellCheckboxProps } from "./utils";

function Body<TData extends RowData = RowData, TContext = object>(
  props: BodyProps<TData, TContext>
) {
  const { rowVirtualizer } = useContext<TableContext<TData, TContext>>();

  const Content = rowVirtualizer ? TableContentVirtual : TableContent;

  return (
    <tbody
      className={cn("!grid", { relative: !!rowVirtualizer })}
      style={{
        ...(rowVirtualizer && { height: `${rowVirtualizer.getTotalSize()}px` }),
      }}
    >
      <TableLoader />
      <TableEmpty />

      <Content {...props} />
    </tbody>
  );
}

export default Body;

function TableContentVirtual<TData extends RowData = RowData, TContext = object>(
  props: BodyProps<TData, TContext>
) {
  const { stripe = true, className, onClick } = props;

  const { table, rowVirtualizer, loading } = useContext<TableContext<TData, TContext>>();

  if (!rowVirtualizer) {
    return;
  }

  const { rows } = table.getRowModel();

  const items = rowVirtualizer.getVirtualItems();

  if (loading || isEmpty(items) || isEmpty(rows)) {
    return null;
  }

  return (
    <>
      {items.map((item) => {
        const { id, original, getIsSelected, getVisibleCells } = rows[item.index];

        const isSelected = getIsSelected();
        const visibleCells = getVisibleCells();

        return (
          <TableRow
            data-index={item.index}
            // ref={(node) => rowVirtualizer.measureElement(node)}
            key={id}
            onClick={() => onClick?.(original)}
            className={cn(
              "absolute",
              { "cursor-pointer": !!onClick },
              render(className, { isSelected })
            )}
            style={{
              transform: `translateY(${item.start}px)`,
              ...(item.index % 2 && stripe && { background: "#333" }),
            }}
          >
            {visibleCells.map((cell) => (
              <TableVisibleCell key={cell.id} cell={cell} />
            ))}
          </TableRow>
        );
      })}
    </>
  );
}

function TableContent<TData extends RowData = RowData, TContext = object>(
  props: BodyProps<TData, TContext>
) {
  const { stripe = true, className, onClick } = props;

  const { table, loading } = useContext<TableContext<TData, TContext>>();

  const { getRowModel } = table;

  const { rows } = getRowModel();

  if (loading || isEmpty(rows)) {
    return null;
  }

  return (
    <>
      {rows.map((row) => {
        const { id, original, getIsSelected, getVisibleCells } = row;

        const isSelected = getIsSelected();
        const visibleCells = getVisibleCells();

        return (
          <TableRow
            key={id}
            onClick={() => onClick?.(original)}
            className={cn(
              { "cursor-pointer": !!onClick },
              stripe && { background: "#333" },
              render(className, { isSelected })
            )}
          >
            {visibleCells.map((cell) => (
              <TableVisibleCell key={cell.id} cell={cell} />
            ))}
          </TableRow>
        );
      })}
    </>
  );
}

function TableLoader<TData extends RowData = RowData, TContext = object>() {
  const { loading } = useContext<TableContext<TData, TContext>>();

  if (!loading) {
    return null;
  }

  return (
    <TableRow className="items-center justify-center">
      <TableCell>
        <div className="h-40">Đang tải...</div>
      </TableCell>
    </TableRow>
  );
}

function TableEmpty<TData extends RowData = RowData, TContext = object>() {
  const { loading, table } = useContext<TableContext<TData, TContext>>();

  const { rows } = table.getRowModel();

  const columns = table.getAllColumns();

  if (loading || rows.length) {
    return null;
  }

  return (
    <TableRow className="items-center justify-center">
      <TableCell colSpan={columns.length}>
        <div className="h-40">Không có dữ liệu</div>
      </TableCell>
    </TableRow>
  );
}

function TableVisibleCell<TData extends RowData = RowData>(props: { cell: Cell<TData, unknown> }) {
  const { cell } = props;

  const { column, getContext } = cell;

  const { getSize, columnDef } = column;

  const context = getContext();

  const size = getSize();

  const { meta, cell: columnDefCell } = columnDef;

  return (
    <TableCell
      style={{ width: size }}
      className={cn(meta?.className)}
      {...getTableCellCheckboxProps(cell.id)}
    >
      {flexRender(columnDefCell, context)}
    </TableCell>
  );
}
