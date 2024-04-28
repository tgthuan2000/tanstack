import type { HTMLAttributes } from 'react';

const TableHead = (props: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead {...props} />;
};

export default TableHead;
