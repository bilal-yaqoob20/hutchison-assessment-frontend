import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createDog, deleteDog, getDogs, updateDog } from "../services";
import { toast } from "react-toastify";
import type { IDog } from "../interface";

const LIMIT = 10;
const queryKey = "dogs";

export const useGetDogs = (search: string) => {
  return useInfiniteQuery({
    queryKey: [queryKey, search],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getDogs(LIMIT, pageParam, search),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length * LIMIT,
    retry: false,
  });
};

export const useDeleteDog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDog(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const queries = queryClient.getQueriesData({ queryKey: [queryKey] });

      queries.forEach(([key, old]: any) => {
        if (!old) return;
        queryClient.setQueryData(key, {
          ...old,
          pages: old.pages.map((page: IDog[]) =>
            page.filter((dog) => dog.id !== id)
          ),
        });
      });

      return { previousData: queries };
    },
    onSuccess: () => {
      toast.success("Breed deleted successfully");
    },
    onError: (error: any, _, context) => {
      context?.previousData?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });

      const message =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
};

export const useCreateDog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dog: IDog) => createDog(dog),
    onMutate: async (newDog: IDog) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      const queries = queryClient.getQueriesData<IDog[]>({
        queryKey: [queryKey],
      });

      queries.forEach(([queryKey, oldData]: any) => {
        if (!oldData) return;

        const newFirstPage = [newDog, ...oldData.pages[0]];
        const newPages = [newFirstPage, ...oldData.pages.slice(1)];

        queryClient.setQueryData(queryKey, {
          ...oldData,
          pages: newPages,
        });
      });

      return { previousData: queries };
    },

    onSuccess: (newDog) => {
      const queries = queryClient.getQueriesData<IDog[]>({
        queryKey: [queryKey],
      });
      queries.forEach(([queryKey, oldData]: any) => {
        if (!oldData) return;

        const updatedPages = oldData.pages.map((page: IDog[], index: number) =>
          index === 0
            ? [newDog, ...page.filter((dog) => dog.breed !== newDog.breed)]
            : page
        );
        queryClient.setQueryData(queryKey, {
          ...oldData,
          pages: updatedPages,
        });
      });

      toast.success("Breed created successfully");
    },

    onError: (error: any, _, context) => {
      context?.previousData?.forEach(([queryKey, data]: any) => {
        queryClient.setQueryData(queryKey, data);
      });

      const message =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
};

export const useEditDog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, subBreeds }: { id: string; subBreeds: string[] }) =>
      updateDog(id, subBreeds),

    onMutate: async ({ id, subBreeds }) => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const queries = queryClient.getQueriesData({ queryKey: [queryKey] });

      queries.forEach(([key, old]: any) => {
        if (!old) return;
        queryClient.setQueryData(key, {
          ...old,
          pages: old.pages.map((page: IDog[]) =>
            page.map((dog) => (dog.id === id ? { ...dog, subBreeds } : dog))
          ),
        });
      });

      return { previousData: queries };
    },
    onSuccess: () => {
      toast.success("Breed updated successfully");
    },
    onError: (error: any, _, context) => {
      context?.previousData?.forEach(([key, data]: any) => {
        queryClient.setQueryData(key, data);
      });

      const message =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
};
