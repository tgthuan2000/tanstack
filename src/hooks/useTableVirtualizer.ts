import type { PartialKeys, VirtualizerOptions } from "@tanstack/react-virtual";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

type RowVirtualizer<TItemElement extends Element> = PartialKeys<
  VirtualizerOptions<Element, TItemElement>,
  "getScrollElement" | "observeElementRect" | "observeElementOffset" | "scrollToFn"
>;

function useTableVirtualizer<TItemElement extends Element>(
  params: Partial<RowVirtualizer<TItemElement>>
) {
  const tableContainerRef = useRef<TItemElement>(null);

  const {
    estimateSize = () => 52,
    getScrollElement = () => tableContainerRef.current,
    overscan = 5,
    count = 0,
    ...rest
  } = params;

  const reactRowVirtualizer = useVirtualizer({
    count,
    estimateSize,
    getScrollElement,
    overscan,
    ...rest,
  });

  return {
    tableContainerRef,
    rowVirtualizer: reactRowVirtualizer,
  };
}

export default useTableVirtualizer;
