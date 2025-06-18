import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../api/coursesAPI";
import CourseCard from "../../components/courseCard/CourseCard";
import Filter from "../../components/filter/Filter";

import { cousers } from "../../types/course";
import Search from "../../components/search/Search";

function Courses() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["courses"], queryFn: getAllCourses });

  const [filter, setFilter] = useState<cousers[]>([]);

  useEffect(() => {
    setFilter(courses);
  }, [courses]);

  const handleFilterChange = (filteredCourses: cousers[]) => {
    setFilter(filteredCourses);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <Search />
      <div className="flex flex-col  justify-center sm:flex-row  pr-10 w-full items-start gap-5">
        <div className="border-4 h-fit m-5 lg:sticky w-full sm:w-fit top-0 sm:top-5">
          <Filter onFilterChange={handleFilterChange} courses={courses} />
        </div>
        <div className="grid grid-cols-1 m-5 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center w-full gap-2">
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
