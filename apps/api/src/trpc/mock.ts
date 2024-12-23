import { inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { http, HttpResponse } from 'msw';
import { type AppRouter } from './root';

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

type TRPCResponse<T> = [
  {
    result?: {
      data: T;
    };
    error?: {
      message: string;
      code: number;
      data: {
        code: string;
        httpStatus: number;
        stack: string;
        path: string;
      };
    };
  }
];

type MockRouterConfig<
  TRouter extends keyof RouterOutput,
  TProcedure extends keyof RouterOutput[TRouter]
> = {
  success?: boolean;
  data?: RouterOutput[TRouter][TProcedure];
  error?: {
    message: string;
    code: string;
    httpStatus?: number;
  };
};

type MockDataStore = {
  [TRouter in keyof RouterOutput]?: {
    [TProcedure in keyof RouterOutput[TRouter]]?: RouterOutput[TRouter][TProcedure];
  };
};

const mockDataStore: MockDataStore = {
  auth: {
    login: { token: 'mock-token' },
    register: { token: 'mock-token' },
  },
};

const getMockData = <
  TRouter extends keyof RouterOutput,
  TProcedure extends keyof RouterOutput[TRouter]
>(
  router: TRouter,
  procedure: TProcedure
): RouterOutput[TRouter][TProcedure] => {
  const mockData = mockDataStore[router]?.[procedure];
  if (!mockData) {
    throw new Error(
      `No mock data found for ${String(router)}.${String(
        procedure
      )}. Add mock data to mockDataStore or provide it in the config.`
    );
  }
  return mockData as RouterOutput[TRouter][TProcedure];
};

export const createTRPCMock = <
  TRouter extends keyof RouterOutput,
  TProcedure extends keyof RouterOutput[TRouter]
>(
  router: TRouter,
  procedure: TProcedure,
  config: MockRouterConfig<TRouter, TProcedure> = {}
): TRPCResponse<RouterOutput[TRouter][TProcedure]> => {
  const { success = true, data, error } = config;
  const path = `${router}.${String(procedure)}`;

  if (!success) {
    return [
      {
        error: {
          message: error?.message ?? 'An error occurred',
          code: -32001,
          data: {
            code: error?.code ?? 'INTERNAL_SERVER_ERROR',
            httpStatus: error?.httpStatus ?? 500,
            stack: `TRPCError: ${error?.message ?? 'An error occurred'}`,
            path,
          },
        },
      },
    ];
  }

  return [
    {
      result: {
        data: data ?? getMockData(router, procedure),
      },
    },
  ];
};

export const createMockHandler = <
  TRouter extends keyof RouterOutput,
  TProcedure extends keyof RouterOutput[TRouter]
>(
  router: TRouter,
  procedure: TProcedure,
  config: MockRouterConfig<TRouter, TProcedure> = {}
) =>
  http.post(`/api/trpc/${router}.${String(procedure)}?batch=1`, () => {
    const response = createTRPCMock(router, procedure, config);
    const status = config.success ? 200 : config.error?.httpStatus ?? 500;
    return HttpResponse.json(response, { status });
  });
