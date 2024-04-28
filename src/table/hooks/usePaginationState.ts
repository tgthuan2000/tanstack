import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { DEFAULT_PAGINATION } from "../utils";

const usePaginationState = (params?: Partial<PaginationState>) => {
  return useState<PaginationState>({
    ...DEFAULT_PAGINATION,
    ...params,
  });
};

export default usePaginationState;
