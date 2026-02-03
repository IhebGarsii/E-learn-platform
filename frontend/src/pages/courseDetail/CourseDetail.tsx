import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { coursePayment, getCourse } from "../../api/coursesAPI";
import { FaVideo, FaCloudDownloadAlt } from "react-icons/fa";
import { MdArticle, MdAccessTimeFilled } from "react-icons/md";
import CourseContent from "../../components/courseContent/CourseContent";
import DOMPurify from "dompurify";

import { addToCart } from "../../api/cartAPI";
import { useStore } from "../../hooks/zustand";
import { Products } from "../../types/products";
import Skeleton from "react-loading-skeleton";
import StudentsAlsoBought from "../../components/studentAlsoBought/StudentsAlsoBought";

function CourseDetail() {
  const { idCourse } = useParams();
  const navigate = useNavigate();
  const [desc, setDesc] = useState(false);

  const setTag = useStore((state) => state.setTagSearch);
  const setCourseId = useStore((state) => state.setCourseId);
  const currentCourseId = useStore((state) => state.courseId); // 👈 Get current value
  const setBoughtCourses = useStore((state) => state.setBoughtCourses);
  const courseId = useStore((state) => state.courseId); // 👈 Get courseId from store

  console.log("Current courseId from store:", currentCourseId);

  useEffect(() => {
    if (idCourse && idCourse !== currentCourseId) {
      setCourseId(idCourse); // ✅ Only set if changed
    }
  }, [idCourse, currentCourseId, setCourseId]);

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", idCourse], // Include idCourse in the queryKey
    queryFn: () => getCourse(idCourse!),
    enabled: !!idCourse, // Ensure query is only run if idCourse is available
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (idCourse) {
      localStorage.setItem("CourseId", idCourse);
    }
  }, []);

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

  const { mutate: paymentMutate } = useMutation({
    // mutationFn receives ONE object with both products and bo
    mutationFn: async ({
      products,
    }: {
      products: Products[];
      bo: string[];
    }) => {
      return coursePayment(products); // call your API with products
    },
    onSuccess: (data, variables) => {
      if (data.url) {
        // ✅ variables.bo is available here
        setBoughtCourses(variables.bo);
        console.log(variables.bo,"rrrrrrrrrrrrrrrrrrr");

        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.log("Payment error", error);
    },
  });

  const handlePayment = () => {
    const products: Products[] = [
      {
        title: course.title,
        quantity: 1,
        price: course.price,
        courseId: course._id || "",
      },
    ];

    // Build array of courseIds
    const bo = products.map((p) => p.courseId);

    console.log("Products for payment:", products);

    // ✅ Pass both products and bo together
    paymentMutate({ products, bo });
  };

  if (isLoading)
    return (
      <div className="mt-20 flex flex-col text-center ml-50 gap-2 ">
        <Skeleton height={150} width="70%" />
        <Skeleton count={5} width="70%" />
        <Skeleton height={150} width="70%" />
      </div>
    );
  if (error) return <div>Error loading course data.</div>;
  if (!course) return <div>No course found.</div>;
  const sanitizedHtml = DOMPurify.sanitize(course.description || "");
  const searchTag = (tag: string) => {
    setTag(tag);
    navigate("/courses");
  };
  return (
    <div className="flex min-h-full flex-col gap-6 lg:w-[90%] md:mt-9 md:flex-row  lg:justify-start md:items-start mt-12 mx-auto items-center md:gap-10 ">
      <div className="flex-1  w-full md:min-w-[70%] flex flex-col p-4">
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
        <StudentsAlsoBought category={course.headTags[0]} />
      </div>

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
          <button
            onClick={() => handlePayment()}
            className="w-full border border-black text-black text-lg rounded-md h-10"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold mb-2">This course includes:</h1>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2">
              <FaVideo /> {course.duration} hours on-demand video
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
        <button
          onClick={() => handlePayment()}
          className="bg-dark-blue text-white text-lg rounded-md h-10 px-6"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetail;
