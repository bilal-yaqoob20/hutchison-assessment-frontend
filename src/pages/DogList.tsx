import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import CreateDialog from "../components/CreateRecordDialog";
import Loader from "../components/Loader";
import { useDogs } from "../hooks/useDogs";
import type { IDog } from "../interface";

const DogList: React.FC = () => {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useDogs();

  const dogs = (data?.pages.flat() ?? []) as IDog[];

  return (
    <div className="px-90 py-5">
      {isCreateDialogOpen && (
        <CreateDialog
          isOpen={isCreateDialogOpen}
          setIsOpen={setCreateDialogOpen}
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <div className="text-5xl font-bold">Dogs Breed List</div>
        <Button
          label="Add Breed"
          onClick={() => setCreateDialogOpen(true)}
          icon={Plus}
          variant="primary"
        />
      </div>
      <>
        {isLoading ? (
          [1, 2, 3, 4].map((_, index) => <Loader key={index} />)
        ) : isError ? (
          <div className="text-red-500 font-semibold">
            Failed to load dogs: {(error as Error).message}
          </div>
        ) : (
          <InfiniteScroll
            dataLength={dogs.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={[1, 2].map((_, index) => (
              <Loader key={index} />
            ))}
          >
            {dogs.map((dog) => (
              <Card key={dog.id} dog={dog} />
            ))}
          </InfiniteScroll>
        )}
      </>
    </div>
  );
};

export default DogList;
