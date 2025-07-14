import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllCourses, searchProducts } from "../../api/coursesAPI";
import CourseCard from "../../components/courseCard/CourseCard";
import Filter from "../../components/filter/Filter";
import { cousers } from "../../types/course";
import Search from "../../components/search/Search";
import { useDebounce } from "../../utl/debounce";
import { useStore } from "../../hooks/zustand";
import SkeletonCard from "../../components/skeletons/SkeletonCard";
import { keepPreviousData } from "@tanstack/react-query";

function Courses() {
  const [filter, setFilter] = useState<cousers[]>([]);
  const [page, setPage] = useState(0);

  const tagSearch = useStore((state) => state.tagSearch);
  const setTagSearch = useStore((state) => state.setTagSearch);
  const debouncedSearchTerm = useDebounce(tagSearch);

  const queryClient = useQueryClient();

  // Paginated fetch
  const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["courses", page],
      queryFn: () => getAllCourses(page),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 5,
    });

  const { data: searchResults, isFetching: searching } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => searchProducts(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  // Prefetch next page
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["courses", page + 1],
        queryFn: () => getAllCourses(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  // Set data into filter
  useEffect(() => {
    if (debouncedSearchTerm && searchResults) {
      setFilter(searchResults);
    } else if (data?.courses) {
      setFilter(data.courses);
    }
  }, [data, searchResults, debouncedSearchTerm]);

  const handleFilterChange = (filteredCourses: cousers[]) => {
    setFilter(filteredCourses);
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Search onSearch={setTagSearch} />

      <div className="flex flex-col justify-center sm:flex-row pr-10 w-full items-start gap-5">
        <div className="border-4 h-fit m-5 lg:sticky w-full sm:w-fit top-0 sm:top-5">
          <Filter onFilterChange={handleFilterChange} courses={data?.courses} />
        </div>

        <div className="grid grid-cols-1 m-5 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center w-full gap-2">
          {(isLoading || searching) && <SkeletonCard card={20} />}

          {!isLoading && !searching && filter && filter.length > 0
            ? filter.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            : !isLoading && !searching && <div>No course data available</div>}
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 py-5">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page: {page + 1}</span>
        <button
          onClick={() => {
            if (data?.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next
        </button>
        {isFetching && !isPlaceholderData && <span> Loading...</span>}
      </div>
    </div>
  );
}

export default Courses;
