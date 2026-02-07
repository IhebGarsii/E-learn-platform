import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
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
  const queryClient = useQueryClient();

  const [desc, setDesc] = useState(false);
  const [paying, setPaying] = useState(false);

  const setTag = useStore((state) => state.setTagSearch);
  const setCourseId = useStore((state) => state.setCourseId);
  const currentCourseId = useStore((state) => state.courseId);
  const setBoughtCourses = useStore((state) => state.setBoughtCourses);

  const userId = localStorage.getItem("idUser");

  // ✅ Sync courseId to store
  useEffect(() => {
    if (idCourse && idCourse !== currentCourseId) {
      setCourseId(idCourse);
    }
  }, [idCourse, currentCourseId, setCourseId]);

  // ✅ Fetch course
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", idCourse],
    queryFn: () => getCourse(idCourse!),
    enabled: !!idCourse,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Save courseId to localStorage
  useEffect(() => {
    if (idCourse) localStorage.setItem("CourseId", idCourse);
  }, [idCourse]);

  // ✅ Add to cart mutation
  const { mutate: mutateCart } = useMutation({
    mutationFn: (courseId: string) => addToCart(courseId, userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
    onError: console.error,
  });

  const handleAddToCart = () => {
    if (course) mutateCart(course._id);
  };

  // ✅ Payment mutation
  const { mutate: paymentMutate } = useMutation({
    mutationFn: ({ products }: { products: Products[] }) =>
      coursePayment(products),
    onSuccess: (data, variables) => {
      if (data?.url) {
        const courseIds = variables.products.map((p) => p.courseId);
        setBoughtCourses(courseIds); // ⚠️ still temporary (Stripe webhook is correct way)
        window.location.href = data.url;
      }
    },
    onError: console.error,
  });

  const handlePayment = () => {
    if (!course || paying) return;
    setPaying(true);

    const products: Products[] = [
      {
        title: course.title,
        quantity: 1,
        price: course.price,
        courseId: course._id,
      },
    ];

    paymentMutate({ products });
  };

  // ✅ Sanitize description only when it changes
  const sanitizedHtml = useMemo(
    () => DOMPurify.sanitize(course?.description || ""),
    [course?.description]
  );

  const searchTag = (tag: string) => {
    setTag(tag);
    navigate("/courses");
  };

  // ================= UI =================

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

  return (
    <div className="flex min-h-full flex-col gap-6 lg:w-[90%] md:mt-9 md:flex-row lg:justify-start md:items-start mt-12 mx-auto items-center md:gap-10">
      {/* LEFT CONTENT */}
      <div className="flex-1 w-full md:min-w-[70%] flex flex-col p-4">
        <div className="bg-[#2C3539] rounded-lg p-6">
          <h1 className="text-4xl text-white font-bold">{course.title}</h1>
          <h2 className="text-2xl text-white">{course.secondTitle}</h2>

          <div className="flex items-center gap-2 text-white mt-2">
            <span>{course.avgRate?.rate}</span>
            <Rating
              style={{ maxWidth: 100 }}
              value={course.avgRate?.rate || 0}
              readOnly
            />
            <span>({course.avgRate?.nbRate} ratings)</span>
          </div>

          <div className="flex flex-col gap-1 text-white mt-3">
            <span>{course.studentsId?.length} students</span>
            <span>
              Created By {course.instructorId?.name || course.instructorId}
            </span>
            <span>Last Updated {course.lastUpdated}</span>
          </div>
        </div>

        {/* Learn targets */}
        <div className="shadow-md border p-4 mt-4 rounded-md bg-white">
          <h1 className="text-lg font-bold mb-2">What you'll learn</h1>
          <div className="grid md:grid-cols-2 gap-2">
            {course.learnTarget?.map((learn: string, i: number) => (
              <p key={i}>✔ {learn}</p>
            ))}
          </div>
        </div>

        <CourseContent video={course.video?.video} />

        {/* Description */}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Description:</h2>
          <div
            className={`${desc ? "" : "overflow-hidden max-h-40"} mt-1`}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
          <button onClick={() => setDesc(!desc)} className="mt-2 text-blue-600">
            {desc ? "see less" : "see more"}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 md:w-[20%] shadow-md border rounded-md p-4 bg-white mb-32">
        {/* ❌ YouTube URL cannot be used in <video> */}
        <iframe
          className="w-full h-52 rounded-md"
          src={course.previewVideo}
          allowFullScreen
        />

        <div className="flex flex-col gap-4 mt-4">
          <span className="text-4xl font-bold">${course.price}</span>

          <button
            onClick={handleAddToCart}
            className="w-full bg-dark-blue text-white rounded-md h-10"
          >
            Add to cart
          </button>

          <button
            disabled={paying}
            onClick={handlePayment}
            className="w-full border border-black rounded-md h-10"
          >
            {paying ? "Processing..." : "Buy Now"}
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-6 flex-wrap">
          <h2 className="w-full font-semibold">Explore Related Topics</h2>
          {course.tags?.map((tag: string, i: number) => (
            <span
              key={i}
              onClick={() => searchTag(tag)}
              className="cursor-pointer px-3 py-1 border rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Buy Bar */}
      <div className="fixed bottom-0 bg-white w-full md:hidden flex justify-between px-4 py-3 shadow-md border-t">
        <span className="text-2xl font-bold">${course.price}</span>
        <button
          onClick={handlePayment}
          className="bg-dark-blue text-white h-10 px-6"
        >
          Buy Now
        </button>
      </div>

      {/* Safe StudentsAlsoBought */}
      {course.headTags?.[0] && (
        <StudentsAlsoBought category={course.headTags[0]} />
      )}
    </div>
  );
}

export default CourseDetail;
