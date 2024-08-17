function CommentList({ comment }: any) {
  console.log(comment, "ee");

  // Convert comment.date to a Date object if necessary
  const date = new Date(comment.date);

  // Check if the date is valid
  const formattedDate = !isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(date)
    : "Invalid date";

  return (
    <div className="bg-blue-100 w-[70%] flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src={`http://localhost:4000/uploads/users/${comment.givenUser.image}`}
          alt=""
        />
        <h1 className="font-bold">
          <span>{comment.givenUser.firstName} </span>
          {comment.givenUser.lastName} <span></span>
        </h1>
        <span className="font-light">{formattedDate}</span>
      </div>
      <p className=""> {comment.commentText} </p>
    </div>
  );
}

export default CommentList;
