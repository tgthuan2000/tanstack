import type { RowData } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "@tgthuan/react";
import TableCell from "./cell";
import TableHead from "./head";
import TableRow from "./row";
import type { HeaderProps, TableContext } from "./type";
import { getTableCellCheckboxProps } from "./utils";

function Header<TData extends RowData = RowData, TContext = object>(
  props: HeaderProps<TData, TContext>
) {
  const { className } = props;

  const { table } = useContext<TableContext<TData, TContext>>();

  const { getHeaderGroups } = table;

  return (
    <TableHead className={className}>
      {getHeaderGroups().map((headerGroups) => (
        <TableRow key={headerGroups.id}>
          {headerGroups.headers.map((header) => (
            <TableCell
              key={header.id}
              style={{ width: header.getSize() }}
              colSpan={header.colSpan}
              rowSpan={header.rowSpan}
              {...getTableCellCheckboxProps(header.column.id)}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default Header;
