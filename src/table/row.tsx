import { cn } from "@tgthuan/utils";
import type { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLTableRowElement>;

const TableRow: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return <tr tabIndex={-1} className={cn("!flex w-full", className)} {...rest} />;
};

export default TableRow;
