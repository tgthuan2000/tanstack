import type { TdHTMLAttributes } from 'react';

type Props = TdHTMLAttributes<HTMLTableCellElement>;

const TableCell = ({ children, ...props }: Props) => {
  return <td {...props}>{children}</td>;
};

export default TableCell;
