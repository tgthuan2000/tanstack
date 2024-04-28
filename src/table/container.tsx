import type { RowData } from "@tanstack/react-table";
import { useContext } from "@tgthuan/react";
import { cn } from "@tgthuan/utils";
import { cva } from "class-variance-authority";
import type { ContainerProps, TableContext } from "./type";

// eslint-disable-next-line react-refresh/only-export-components
export const tableContainerVars = cva("", {
  variants: {
    mode: {
      default: "rounded-md border",
      responsive: "border-b border-l-0 border-r-0 border-t md:rounded md:border",
      roundedMd: "md:rounded-md",
    },
    maxHeight: {
      auto: "print:auto",
      xl: "max(calc(100vh - 120px),440px)",
      lg: "max(calc(100vh - 230px),440px)",
      md: "max(calc(100vh - 340px),440px)",
    },
  },
});

function Container<TData extends RowData = RowData, TContext = object>(
  props: ContainerProps<TData, TContext>
) {
  const { wrapClassName, className, children, mode = "default", maxHeight = "lg", wrapRef } = props;

  const { rowVirtualizer, fetching, loading } = useContext<TableContext<TData, TContext>>();

  return (
    <div className={wrapClassName}>
      {fetching && !loading && <div>Loading...</div>}
      <div className={cn("w-full overflow-hidden", tableContainerVars({ mode }), className)}>
        <div
          ref={wrapRef}
          className={cn({ "relative overflow-auto": !!rowVirtualizer })}
          style={{ [rowVirtualizer ? "height" : "maxHeight"]: tableContainerVars({ maxHeight }) }}
        >
          <table className="!grid">{children}</table>
        </div>
      </div>
    </div>
  );
}

export default Container;
