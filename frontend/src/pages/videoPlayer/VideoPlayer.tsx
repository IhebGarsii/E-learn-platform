import { useParams } from "react-router-dom";
import Comment from "../../components/commentair/Comment";

function VideoPlayer() {
  const { idVideo } = useParams();

  return (
    <div className="mt-15  flex justify-center py-16">
      <video
        style={{ width: "70%", height: "100%" }}
        src={`http://localhost:4000/uploads/courses/${idVideo}`}
        controls
      ></video>
      <Comment idVideo={idVideo!} />
    </div>
  );
}

export default VideoPlayer;
