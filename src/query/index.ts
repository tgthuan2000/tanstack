import type {
  InfiniteData,
  QueryClient,
  QueryFunction,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import {
  queryOptions,
  useInfiniteQuery,
  useQuery,
  type QueryFunctionContext,
  type QueryKey,
} from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { PAGE_SIZE } from "./constants";
import type {
  InfinitePage,
  InfinityData,
  InfinityQueryServiceClass,
  InfinityQueryServiceOption,
  QueryServiceClass,
  QueryServiceOption,
} from "./type";

export function createQueryService(queryClient: QueryClient): typeof QueryServiceClass {
  return class QueryService<T, V> {
    private queryKey: QueryKey;
    private queryFn: QueryServiceOption<T, V>["fetch"];

    constructor(options: QueryServiceOption<T, V>) {
      const { queryKey, fetch } = options;

      this.queryKey = queryKey;
      this.queryFn = fetch;
    }

    private getQueryFn = (payload: T) => {
      return (ctx: QueryFunctionContext) => {
        return this.queryFn({ ...ctx, payload });
      };
    };

    getQueryKey = (params?: QueryKey) => {
      return params ? [...this.queryKey, ...params] : this.queryKey;
    };

    getQueryOptions = (payload: T, params?: QueryKey) => {
      return queryOptions({
        queryKey: this.getQueryKey(params),
        queryFn: this.getQueryFn(payload),
      });
    };

    invalidate = (params?: QueryKey) => {
      return queryClient.invalidateQueries({
        type: "all",
        queryKey: this.getQueryKey(params),
      });
    };

    ensureQueryData = async (payload: T, params?: QueryKey) => {
      return await queryClient.ensureQueryData<V>(this.getQueryOptions(payload, params));
    };

    useQuery = (
      payload: T,
      options?: { deps?: QueryKey } & Omit<UndefinedInitialDataOptions<V>, "queryKey" | "queryFn">
    ) => {
      const { deps, ...rest } = options ?? {};

      return useQuery({
        queryKey: this.getQueryKey(deps),
        queryFn: this.getQueryFn(payload),
        ...rest,
      });
    };

    useEnumQuery = (
      payload: T = undefined as T,
      options?: Omit<UndefinedInitialDataOptions<V>, "queryKey" | "queryFn" | "staleTime">
    ) => {
      return useQuery({
        queryKey: this.getQueryKey(),
        queryFn: this.getQueryFn(payload),
        staleTime: Infinity,
        ...options,
      });
    };
  };
}

export function createInfinityQueryService(
  queryClient: QueryClient
): typeof InfinityQueryServiceClass {
  return class InfinityQueryService<T, V> {
    private queryKey: QueryKey;
    private queryFn: InfinityQueryServiceOption<T, InfinityData<V>>["fetch"];

    constructor(options: InfinityQueryServiceOption<T, InfinityData<V>>) {
      const { queryKey, fetch } = options;

      this.queryKey = queryKey;
      this.queryFn = fetch;
    }

    private getQueryFn = (
      pageSize: number,
      payload: T
    ): QueryFunction<InfinityData<V>, QueryKey, number> => {
      return (ctx) => {
        return this.queryFn({ ...ctx, pageSize, payload });
      };
    };

    getQueryKey = (params?: QueryKey) => {
      return params ? [...this.queryKey, ...params] : this.queryKey;
    };

    invalidate = (params?: QueryKey) => {
      return queryClient.invalidateQueries({
        type: "all",
        queryKey: this.getQueryKey(params),
      });
    };

    useInfinityQuery = (
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
    ) => {
      const {
        deps,
        initialPageParam = 1,
        pageSize = PAGE_SIZE,
        enabledFn,
        enabled,
        ...rest
      } = options ?? {};

      const infinityData = useInfiniteQuery({
        initialPageParam,
        queryKey: this.getQueryKey(deps),
        queryFn: this.getQueryFn(pageSize, payload),
        getNextPageParam: (lastPage, allPages) => {
          const totalPage = lastPage.totalRecord / pageSize;
          const currentPage = allPages.length;

          return currentPage < totalPage ? currentPage + 1 : undefined;
        },
        enabled: enabledFn ? enabledFn(payload) : enabled,
        ...rest,
      });

      const { data } = infinityData;

      const getData = useCallback<(pageIndex: number) => InfinityData<V>["data"]>(
        (pageIndex: number) => {
          return data?.pages?.[pageIndex]?.data ?? [];
        },
        [data?.pages]
      );

      const originData = useMemo<InfinityData<V>["data"][]>(() => {
        return data?.pages.map((p) => p.data) ?? [];
      }, [data?.pages]);

      const flatData = useMemo<InfinitePage<InfinityData<V>["data"][number]>[]>(() => {
        return (
          data?.pages.flatMap(
            (p, index) => p.data?.map((item) => ({ ...item, page: index })) ?? []
          ) ?? []
        );
      }, [data?.pages]);

      return {
        ...infinityData,
        getData,
        origin: originData,
        flat: flatData,
        totalRecord: data?.pages.at(-1)?.totalRecord ?? 0,
      };
    };
  };
}

export * from "./constants";
export * from "./type";
