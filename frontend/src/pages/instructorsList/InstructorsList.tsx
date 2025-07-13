import { useEffect } from "react";
import socket from "../../socket";
import { useStore } from "../../hooks/zustand";
import { useQuery } from "@tanstack/react-query";
import { getOnlineUsers } from "../../api/userAPI";
import { instructor } from "../../types/instructor";
import { useUserState } from "../../state/user";

function InstructorsList() {
  const setOnlineUsersId = useStore((state) => state.setOnlineUsersId);
  const onlineUsersId = useStore((state) => state.onlineUsersId);
 
  
  useEffect(() => {
    const onUpdate = (onlineList: string[]) => {
      console.log("ee");
      setOnlineUsersId(onlineList);
      console.log("📡 update-online-users", onlineList);
    };
    
    socket.on("update-online-users", onUpdate);
    console.log("sssssssssssssssssssssssssss");

    return () => {
      console.log("🛑 Unsubscribing from update-online-users");
      
      socket.off("connect");
      socket.off("update-online-users", onUpdate);
    };
  }, []);

  // ✅ Listen for online user list updates

  // ✅ Fetch user data for online user IDs
  const { data: onlineUsers } = useQuery({
    queryKey: ["onlineUsers", onlineUsersId],
    queryFn: () => getOnlineUsers(onlineUsersId),
    enabled: onlineUsersId.length > 0,
  });

  return (
    <div className="bg-red-200 h-screen mt-10">
      <h3 className="text-xl font-semibold p-4">Online Users</h3>
      <ul className="space-y-4 px-4">
        {onlineUsers?.map((user: instructor) => (
          <li key={user._id} className="bg-white p-3 rounded shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:4000/uploads/users/${user?.image}`}
                alt={user.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstructorsList;
