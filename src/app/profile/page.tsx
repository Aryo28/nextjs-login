"use client";

import { userObject } from "@/types/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await axios.get("/api/users/profile");
      const { data } = userInfo;
      if (userInfo) {
        setCurrentUser(data.user.username);
      } else {
        setCurrentUser("BATMAN CHIAPANECO");
      }
    };
    getUser();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <h1>{currentUser ? `Welcome ${currentUser}` : "Who's there? . . ."}</h1>
      <button
        className="bg-white mt-4 hover:bg-gray-500 text-black font-bold py-2 px-3 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
