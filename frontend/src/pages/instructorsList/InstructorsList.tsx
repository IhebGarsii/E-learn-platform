import { useEffect } from "react";
import socket from "../../socket";
import { useStore } from "../../hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getOnlineUsers } from "../../api/userAPI";
import { instructor } from "../../types/instructor";

function InstructorsList() {
  const onlineUsersId = useStore((state) => state.onlineUsersId);
  const setOnlineUsersId = useStore((state) => state.setOnlineUsersId);

  useEffect(() => {
    socket.on("update-online-users", (users) => {
      setOnlineUsersId(users);
      console.log("eeeeeeeeeeeee", users);
    });

    return () => {
      socket.off("update-online-users");
    };
  }, []);
  const { data: onlineUsers } = useQuery({
    queryKey: ["onlineUsers"],
    queryFn: () => getOnlineUsers(onlineUsersId? onlineUsersId : []),
  });
  return (
    <div className="bg-red-200 h-screen mt-10">
      <h3>Online Users</h3>
      <ul>
        {onlineUsers?.map((user: instructor) => (
          <li key={user._id}>
            <div className="flex items-center gap-2">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-10 h-10 rounded-full"
              />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <span className="text-sm text-gray-500">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstructorsList;
