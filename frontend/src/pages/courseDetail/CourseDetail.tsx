import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteCourse, getCourse } from "../../api/coursesAPI";
import { FaVideo, FaCloudDownloadAlt, FaRegEdit } from "react-icons/fa";
import { MdArticle, MdAccessTimeFilled } from "react-icons/md";
import CourseContent from "../../components/courseContent/CourseContent";
import DOMPurify from "dompurify";
import { MdDelete } from "react-icons/md";

import { addToCart } from "../../api/cartAPI";
import { cousers } from "../../types/course";
import { useStore } from "../../hooks/zustand";

function CourseDetail() {
  const { idCourse } = useParams();
  const navigate = useNavigate();
  const [desc, setDesc] = useState(false);
  const tag = useStore((state) => state.tagSearch);
  const setTag = useStore((state) => state.setTagSearch);
  console.log(tag, "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", idCourse], // Include idCourse in the queryKey
    queryFn: () => getCourse(idCourse!),
    enabled: !!idCourse, // Ensure query is only run if idCourse is available
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  if (idCourse) {
    localStorage.setItem("CourseId", idCourse);
  }

  const queryClient = useQueryClient();

  const { mutate: mutateCart } = useMutation({
    mutationFn: (data: string) =>
      addToCart(data, localStorage.getItem("idUser")!),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log("added to cart ", data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const handleAddToCart = () => {
    if (course) {
      mutateCart(course._id);
    }
  };
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (course: cousers) =>
      DeleteCourse(localStorage.getItem("idUser")!, course._id),
    onSuccess: (data) => {
      console.log(data, "ererere");
      navigate("/courses");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDelete = (course: cousers) => {
    mutateDelete(course);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>No course found.</div>;

  const sanitizedHtml = DOMPurify.sanitize(course.description || "");
  const searchTag = (tag: string) => {
    setTag(tag);
    navigate("/courses");
  };
  const isInstructor = localStorage.getItem("roles") == "instructor";
  return (
    <div className="flex min-h-full flex-col gap-6 lg:w-[90%] md:mt-9 md:flex-row lg:justify-start md:items-start mt-12 mx-auto items-center md:gap-10">
      {
        <div className="flex-1 w-full md:min-w-[70%] flex flex-col p-4">
          <div className="bg-[#2C3539] rounded-lg p-6">
            <h1 className="text-4xl text-white font-bold">{course.title}</h1>
            <h2 className="text-2xl text-white">{course.secondTitle}</h2>
            <div className="flex items-center gap-2 text-white mt-2">
              <span>{course.avgRate.rate}</span>
              <Rating
                className="text-xs"
                style={{ maxWidth: 250, width: 100 }}
                value={course.avgRate.rate}
                readOnly
              />
              <span className="whitespace-nowrap">
                ({course.avgRate.nbRate} ratings)
              </span>
            </div>
            <div className="flex flex-col gap-1 text-white mt-3">
              <span>{course.studentsId?.length} students</span>
              <span>Created By {course.instructorId}</span>
              <span>Last Updated {course.lastUpdated}</span>
            </div>
            {isInstructor && (
              <div className="flex justify-between items-center gap-4 mt-10">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(course)}
                >
                  <MdDelete />
                </button>
                <Link
                  to={`/updateCourse/${idCourse}`}
                  className="bg-blue-600 text-white px-4 py-2 justify-center rounded"
                >
                  <FaRegEdit />
                </Link>
              </div>
            )}
          </div>

          <div className="shadow-md border p-4 mt-4 rounded-md bg-white">
            <h1 className="text-lg font-bold mb-2">What you'll learn</h1>
            <div className="grid md:grid-cols-2 gap-2">
              {course.learnTarget.map((learn: string, index: number) => (
                <p key={index} className="text-sm">
                  &#10003; {learn}
                </p>
              ))}
            </div>
          </div>

          <CourseContent video={course.video.video} />

          <div className="mt-4">
            <h2 className="text-xl font-bold">Requirements:</h2>
            <p className="mt-1">{course.requirements}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Description:</h2>
            <div
              className={`${desc ? "text-sm h-fit" : "overflow-hidden max-h-40"} mt-1`}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
            <button
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => setDesc(!desc)}
            >
              {desc ? "see less" : "see more"}
            </button>
          </div>
        </div>
      }
      <div className="flex-1 lg:h-fit   md:w-[20%] shadow-md border rounded-md p-4 bg-white mb-32">
        <video className="w-full h-52 rounded-md" controls>
          <source
            src="https://www.youtube.com/watch?v=fQTsENCG7YU"
            type="video/mp4"
          />
        </video>
        <div className="flex flex-col gap-4 mt-4">
          <span className="text-4xl font-bold">${course.price}</span>
          <button
            onClick={handleAddToCart}
            className="w-full bg-dark-blue text-white text-lg rounded-md h-10"
          >
            Add to cart
          </button>
          <button className="w-full border border-black text-black text-lg rounded-md h-10">
            Buy Now
          </button>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold mb-2">This course includes:</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2">
              <FaVideo /> {course.duration} hours
              on-demand video
            </li>
            <li className="flex items-center gap-2">
              <MdArticle /> {course.articles} articles
            </li>
            <li className="flex items-center gap-2">
              <FaCloudDownloadAlt /> {course.downloadNb} downloadable resources
            </li>
            <li className="flex items-center gap-2">
              <MdAccessTimeFilled /> {course.timeAccess}
            </li>
          </ul>
        </div>

        <div className="flex gap-2 mt-6 flex-wrap">
          <h2 className="w-full font-semibold">Explore Related Topics</h2>
          {course.tags.map((tag: string, index: number) => (
            <span
              key={index}
              onClick={() => searchTag(tag)}
              className="cursor-pointer text-sm font-medium px-3 py-1 border border-black rounded-lg bg-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 bg-white w-full md:hidden flex justify-between px-4 py-3 shadow-md border-t">
        <span className="text-2xl font-bold">${course.price}</span>
        <button className="bg-dark-blue text-white text-lg rounded-md h-10 px-6">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetail;
