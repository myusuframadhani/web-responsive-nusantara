import React from "react";
import Logo from "public/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center h-12 bg-blue-500 text-white px-10">
      <div className="flex flex-row">
        <Image src={Logo} width={40} height={40} alt={Logo} />
        <p className="font-bold text-xl ml-3">Yusuf Library</p>
      </div>
      <div>
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
}
