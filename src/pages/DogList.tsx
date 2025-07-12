import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Button from "../components/Button";
import { Plus, Search } from "lucide-react";
import CreateDialog from "../components/CreateRecordDialog";
import Loader from "../components/Loader";
import { useGetDogs } from "../hooks/useDogs";
import type { IDog } from "../interface";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import debounce from "lodash/debounce";

const DogList: React.FC = () => {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useGetDogs(searchQuery);

  const dogs = (data?.pages.flat() ?? []) as IDog[];

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setSearchInputValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchInputValue("");
  };

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
        <div className="flex items-center gap-20">
          <div className="text-3xl font-bold whitespace-nowrap">
            Dogs Breed List
          </div>
          <div className="w-full">
            <InputField
              value={searchInputValue}
              startIcon={Search}
              onChange={handleSearchChange}
              placeholder="Search breeds..."
              clearField={handleClearSearch}
            />
          </div>
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
          <div className="text-red-500 font-semibold text-center text-2xl">
            Failed to load dogs: {(error as Error).message}
          </div>
        ) : dogs.length === 0 ? (
          <div className="font-semibold text-center text-2xl">
            No data found
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
