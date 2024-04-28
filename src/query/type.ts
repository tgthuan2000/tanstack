/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DataTag,
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";

export declare class QueryServiceClass<T, V> {
  constructor(options: QueryServiceOption<T, V>);
  getQueryKey(params?: QueryKey): QueryKey;
  getQueryOptions(
    payload: T,
    params?: QueryKey
  ): UseQueryOptions<V, Error, V, QueryKey> & {
    initialData?: undefined;
  } & {
    queryKey: DataTag<QueryKey, V>;
  };
  invalidate(params?: QueryKey): Promise<void>;
  ensureQueryData(payload: T, params?: QueryKey): Promise<V>;
  useQuery(
    payload: T,
    options?: { deps?: QueryKey } & Omit<UndefinedInitialDataOptions<V>, "queryKey" | "queryFn">
  ): UseQueryResult<V>;
  useEnumQuery(
    payload?: T,
    options?: Omit<UndefinedInitialDataOptions<V>, "queryKey" | "queryFn" | "staleTime">
  ): UseQueryResult<V>;
}

export declare class InfinityQueryServiceClass<T, V extends { totalRecord: number }> {
  constructor(options: InfinityQueryServiceOption<T, InfinityData<V>>);
  getQueryKey(params?: QueryKey): QueryKey;
  invalidate(params?: QueryKey): Promise<void>;
  useInfinityQuery(
    payload: T,
    options?: {
      deps?: QueryKey;
      pageSize?: number;
      initialPageParam?: number;
      enabledFn?: (payload: T) => boolean;
    } & Omit<
      UndefinedInitialDataInfiniteOptions<
        InfinityData<V>,
        Error,
        InfiniteData<InfinityData<V>, number>,
        QueryKey,
        number
      >,
      "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
    >
  ): UseInfiniteQueryResult<InfiniteData<InfinityData<V>, number>> & {
    getData: (pageIndex: number) => V[];
    origin: V[][];
    flat: InfinitePage<V>[];
    totalRecord: number;
  };
}

export type QueryServiceOption<T, V> = {
  queryKey: QueryKey;
  fetch: (params: QueryFunctionContext & { payload: T }) => Promise<V>;
};

export type InfinityQueryServiceOption<T, V extends { totalRecord: number }> = {
  queryKey: QueryKey;
  fetch: (
    params: QueryFunctionContext<QueryKey, number> & { payload: T; pageSize: number }
  ) => Promise<V>;
};

export type InfinityData<K> = { data: K[]; totalRecord: number };

export type InferInfinityQueryFn<T extends (...args: any[]) => Promise<InfinityData<unknown>>> =
  Awaited<ReturnType<T>>["data"][number];

export type InferQueryFn<T extends (...args: any[]) => Promise<unknown>> = Awaited<ReturnType<T>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type InferQueryService<T> = T extends QueryServiceClass<infer _, infer V> ? V : any;

export type InferTableColumn<T> = T extends ColumnDef<infer V>[] ? V : never;

export type InfinitePage<T> = T & { page: number };
