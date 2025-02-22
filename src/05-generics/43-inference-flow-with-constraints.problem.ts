import { createUser } from "fake-external-lib";
import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

type Mutation<TParams extends any[], TReturn> = (...args: TParams) => Promise<TReturn>;

interface UseMutationReturn<TParams extends any[], TReturn> {
  mutate: Mutation<TParams, TReturn>;
  isLoading: boolean;
}

interface UseMutationOptions<TParams extends any[], TReturn> {
  mutation: Mutation<TParams, TReturn>;
}

export const useMutation = <TParams extends any[], TReturn>(
  opts: UseMutationOptions<TParams, TReturn>
): UseMutationReturn<TParams, TReturn> => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: async (...args) => {
      setIsLoading(true);

      try {
        const result = await opts.mutation(...args);
        return result;
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    isLoading,
  };
};

const mutation = useMutation({
  mutation: createUser,
});

mutation.mutate({ name: "John Doe", email: "john@doe.com" });

// @ts-expect-error email missing!
mutation.mutate({ name: "John Doe" });

mutation.mutate(
  {
    name: "John Doe",
    email: "john@doe.com",
  },
  {
    throwOnError: true,
    // @ts-expect-error extra prop
    extra: "oh dear",
  }
);

type test = [
  Expect<Equal<typeof mutation.isLoading, boolean>>,
  Expect<
    Equal<
      typeof mutation.mutate,
      (
        user: { name: string; email: string },
        opts?: {
          throwOnError?: boolean;
        }
      ) => Promise<{
        id: string;
        name: string;
        email: string;
      }>
    >
  >
];
