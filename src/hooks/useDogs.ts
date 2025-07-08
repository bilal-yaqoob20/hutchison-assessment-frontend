import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createDog, deleteDog, getDogs, updateDog } from "../services";
import { toast } from "react-toastify";
import type { IDog } from "../interface";

const LIMIT = 10;

export const useDogs = () => {
  return useInfiniteQuery({
    queryKey: ["dogs"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getDogs(LIMIT, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length * LIMIT,
    staleTime: 1000 * 60,
  });
};

export const useDeleteDog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDog(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["dogs"] });

      const previousData = queryClient.getQueryData(["dogs"]);

      queryClient.setQueryData(["dogs"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: IDog[]) =>
            page.filter((dog) => dog.id !== id)
          ),
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      toast.success("Breed deleted successfully");
    },
    onError: (error: any, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["dogs"], context.previousData);
      }
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
      await queryClient.cancelQueries({ queryKey: ["dogs"] });
      const previousData = queryClient.getQueryData(["dogs"]);

      queryClient.setQueryData(["dogs"], (old: any) => {
        if (!old) return old;

        const newFirstPage = [newDog, ...old.pages[0]];
        const newPages = [newFirstPage, ...old.pages.slice(1)];

        return { ...old, pages: newPages };
      });

      return { previousData };
    },
    onSuccess: (newDog) => {
      queryClient.setQueryData(["dogs"], (old: any) => {
        if (!old) return old;
        const updatedPages = old.pages.map((page: IDog[], index: number) =>
          index === 0
            ? [newDog, ...page.filter((dog) => dog.breed !== newDog.breed)]
            : page
        );
        return { ...old, pages: updatedPages };
      });
      toast.success("Breed created successfully");
    },
    onError: (error: any, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["dogs"], context.previousData);
      }
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
      await queryClient.cancelQueries({ queryKey: ["dogs"] });
      const previousData = queryClient.getQueryData(["dogs"]);
      queryClient.setQueryData(["dogs"], (old: any) => {
        if (!old) return old;
        const updatedPages = old.pages.map((page: IDog[]) =>
          page.map((dog) => (dog.id === id ? { ...dog, subBreeds } : dog))
        );
        return { ...old, pages: updatedPages };
      });
      return { previousData };
    },
    onSuccess: () => {
      toast.success("Breed updated successfully");
    },
    onError: (error: any, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["dogs"], context.previousData);
      }
      const message =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });
};
