import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import CreateDialog from "../components/CreateRecordDialog";
import Loader from "../components/Loader";
import { useDogs } from "../hooks/useDogs";
import type { IDog } from "../interface";
import { useNavigate } from "react-router-dom";

const DogList: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useDogs();

  const dogs = (data?.pages.flat() ?? []) as IDog[];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  return (
    <>
      {isCreateDialogOpen && (
        <CreateDialog
          isOpen={isCreateDialogOpen}
          setIsOpen={setCreateDialogOpen}
        />
      )}
      <div className="sticky top-0 z-10 bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold">Dogs Breed List</div>
          <div className="flex items-center gap-3">
            <Button
              label="Add Breed"
              onClick={() => setCreateDialogOpen(true)}
              icon={Plus}
              variant="primary"
            />
            <Button label="Logout" onClick={handleLogout} />
          </div>
        </div>
      </div>
      <div className="xl:px-80 lg:px-50 py-5">
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
      </div>
    </>
  );
};

export default DogList;
