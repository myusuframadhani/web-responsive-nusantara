import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import React from "react";
import Logo from "public/logo.png";
import Image from "next/image";
import apiConnection from "@/apiConnection";

export default function Header() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== router.route) {
    }
    getUser();
  }, [router]);

  const token = getCookie("token");

  const getUser = async () => {
    try {
      await apiConnection
        .get(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await apiConnection
        .delete(`/api/user/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          deleteCookie("token");
          router.push("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center h-14 bg-blue-500 text-white px-10 shadow-lg">
      <div className="flex flex-row">
        <Image src={Logo} width={40} height={40} alt={Logo} />
        <p className="font-bold text-xl ml-3">Yusuf Library</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-white text-blue-500 px-3 py-2 rounded-lg font-semibold"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
