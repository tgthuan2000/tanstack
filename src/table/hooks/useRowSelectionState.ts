import type { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";

const useRowSelectionState = (params?: RowSelectionState) => {
  return useState<RowSelectionState>({ ...params });
};

export default useRowSelectionState;
