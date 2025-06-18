import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllCourses, searchProducts } from "../../api/coursesAPI"; // adjust naming as needed
import CourseCard from "../../components/courseCard/CourseCard";
import Filter from "../../components/filter/Filter";
import { cousers } from "../../types/course";
import Search from "../../components/search/Search";
import { useDebounce } from "../../utl/debounce";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [filter, setFilter] = useState<cousers[]>([]);

  const {
    data: allCourses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  const { data: searchResults, isFetching: searching } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => searchProducts(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  // Set data to filter either from search or all
  useEffect(() => {
    if (debouncedSearchTerm && searchResults) {
      setFilter(searchResults);
    } else if (allCourses) {
      setFilter(allCourses);
    }
  }, [allCourses, searchResults, debouncedSearchTerm]);

  const handleFilterChange = (filteredCourses: cousers[]) => {
    setFilter(filteredCourses);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <Search onSearch={setSearchTerm} />

      <div className="flex flex-col justify-center sm:flex-row pr-10 w-full items-start gap-5">
        <div className="border-4 h-fit m-5 lg:sticky w-full sm:w-fit top-0 sm:top-5">
          <Filter onFilterChange={handleFilterChange} courses={allCourses} />
        </div>

        <div className="grid grid-cols-1 m-5 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center w-full gap-2">
          {searching && <p>Searching...</p>}
          {filter && filter.length > 0 ? (
            filter.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div>No course data available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
