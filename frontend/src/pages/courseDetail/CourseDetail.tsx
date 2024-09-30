import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteCourse, getCourse } from "../../api/coursesAPI";
import { FaVideo, FaCloudDownloadAlt } from "react-icons/fa";
import { MdArticle, MdAccessTimeFilled } from "react-icons/md";
import CourseContent from "../../components/courseContent/CourseContent";
import DOMPurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/state";
import { addToCartRedux } from "../../redux/cartSlice/cartSlice";
import { addToCart } from "../../api/cartAPI";
import { cousers } from "../../types/course";

function CourseDetail() {
  const { idCourse } = useParams();
  const navigate = useNavigate();
  const [desc, setDesc] = useState(false);

  // Fetch course data using React Query
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["course", idCourse], // Include idCourse in the queryKey
    queryFn: () => getCourse(idCourse!),
    enabled: !!idCourse, // Ensure query is only run if idCourse is available
  });
  const queryClient = useQueryClient();

  const dispatch = useDispatch<AppDispatch>();
  const cartCourses = useSelector((state: RootState) => state.cart);

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
      dispatch(addToCartRedux({ idCourse: course._id, price: course.price }));

      mutateCart(course._id);
    }
  };
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (course: cousers) =>
      DeleteCourse(localStorage.getItem("idUser")!, course._id),
    onSuccess: (data) => {
      console.log(data,'ererere');
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

  return (
    <div className="flex min-h-full gap-0 flex-col lg:w-[90%] md:mt-9 md:flex-row lg:justify-start  md:items-start mt-12  mx-auto md:gap-10 items-center">
      <div className="flex-1  flex flex-col w-full md:max-w-[70%]  p-4">
        <div className="bg-[#2C3539] rounded-md p-5">
          <h1 className="text-4xl text-white">{course.title}</h1>
          <h1 className="text-2xl text-white">{course.secondTitle}</h1>
          <div className="text-white flex items-center gap-2 p-2">
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
          <div className="flex flex-col gap-2 px-4 text-white">
            <span>{course.studentsId.length} students</span>
            <span>Created By {course.instructorId}</span>
            <span>Last Updated {course.lastUpdated}</span>
          </div>
        </div>
        <div className="shadow-md border mb-2 p-2 mt-2 box-sizing-border-box">
          <h1 className="text-lg font-bold">What you'll learn</h1>
          <div className="md:grid md:grid-cols-2 gap-2">
            {course.learnTarget.map((learn: string, index: number) => (
              <p key={index} className="p-1 text-sm">
                &#10003; {learn}
              </p>
            ))}
          </div>
        </div>
        <CourseContent video={course.video.video} />
        <h1 className="text-xl font-bold">Requirements:</h1>
        <p>{course.requirements}</p>
        <h1 className="text-xl font-bold">Description:</h1>
        <div
          className={desc ? "text-sm h-fit" : "overflow-hidden max-h-40"}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
        <button
          className="mt-2 text-blue-500 hover:underline"
          onClick={() => setDesc(!desc)}
        >
          {desc ? "see less" : "see more"}
        </button>
      </div>

      <div className="flex-1 md:fixed md:right-0 md:w-[25%] shadow-md border mb-32 p-4">
        <div className="flex w-[100%] flex-col gap-5">
          <video className="w-full h-52" controls>
            <source
              src="https://www.youtube.com/watch?v=fQTsENCG7YU"
              type="video/mp4"
            />
          </video>
          <div className="flex flex-col">
            <div className="flex flex-col w-[100%] gap-4">
              <span className="text-4xl font-bold">${course.price}</span>
              <button
                onClick={handleAddToCart}
                className="w-[90%] md:w-[70%] bg-dark-blue text-white text-xl rounded h-10 mx-auto"
              >
                Add to cart
              </button>
              <button className="w-[90%] md:w-[70%] border-2 border-black text-black text-xl rounded h-10 mx-auto">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold pb-1">This course includes:</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-sm flex items-center pl-3 gap-4">
              <FaVideo /> {course.videoDuration} hours on-demand video
            </li>
            <li className="text-sm flex items-center gap-4 pl-3">
              <MdArticle /> {course.articles} articles
            </li>
            <li className="text-sm flex items-center gap-4 pl-3">
              <FaCloudDownloadAlt /> {course.downloadNb} downloadable resources
            </li>
            <li className="text-sm flex items-center gap-4 pl-3">
              <MdAccessTimeFilled /> {course.timeAccess}
            </li>
          </ul>
        </div>
        <div className="w-[100%]">
          <h2>Explore Related Topics</h2>
          <div className="flex gap-2">
            {course.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="flex items-center justify-center rounded-lg font-semibold w-fit min-h-10 bg-white border-2 border-black px-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-white w-[77%] flex justify-center py-3 md:hidden">
        <span className="text-2xl flex justify-center items-center px-2 font-bold">
          ${course.price}
        </span>
        <button className="bg-dark-blue text-white text-xl rounded h-12 w-[80%] mx-auto">
          Buy Now
        </button>
      </div>
      <div className="mt-32">
        <button className="bg-red-400" onClick={() => handleDelete(course)}>
          Delete
        </button>
        <button className="bg-blue-600">Edit</button>
      </div>
    </div>
  );
}

export default CourseDetail;
