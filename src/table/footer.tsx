import type { RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useContext } from '@tgthuan/react';
import TableCell from './cell';
import TableRow from './row';
import type { FooterProps, TableContext } from './type';

function TableFooter<TData extends RowData = RowData, TContext = object>(
  props: FooterProps<TData, TContext>
) {
  const { className } = props;

  const { table } = useContext<TableContext<TData, TContext>>();

  const { getFooterGroups } = table;

  return (
    <tfoot className={className}>
      {getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.footer, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tfoot>
  );
}

export default TableFooter;
