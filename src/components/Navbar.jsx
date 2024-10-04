import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-lime-400 flex justify-between items-center h-14 px-20">
      <div className="logo flex flex-col items-center font-bold text-white">
        <div>Safe</div>
        <div className="text-gray-700 rotate-180 font-thin">PASS</div>
      </div>
      <ul>
        <li className="flex gap-4">
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
