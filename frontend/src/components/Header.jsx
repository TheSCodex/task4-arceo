import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const decodedToken = jwtDecode(storedToken);
  let name = decodedToken.name;

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="bg-white border-b-2 border-blue-500 h-16 w-full flex justify-between p-4">
      <section>
        <h2 className="text-lg text-[#9e9e9e] font-sans font-semibold">
          Hello, {name}
        </h2>
      </section>
      <section>
        <div className="hover:cursor-pointer" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-logout-2"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#9e9e9e"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
            <path d="M15 12h-12l3 -3" />
            <path d="M6 15l-3 -3" />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Header;
