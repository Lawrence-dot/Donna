import React, { createContext, useState } from "react";
import Login from "../../Components/Auth/Login";
import Register from "./Register";
import "./Home.css";
import { HomeType } from "../../Interfaces/interfaces";

export const HomeContext = createContext<HomeType | null>(null);

function Home() {
  const [login, setlogin] = useState<boolean>(true);

  return (
    <HomeContext.Provider value={{ login, setlogin }}>
      <div
        className={`Home flex lpage flex-col-reverse ${
          login ? "sm:flex-row" : "sm:flex-row-reverse"
        } `}
      >
        <div className={`loginForm transition-all sm:w-1/2 `}>
          {login ? <Login /> : <Register />}
        </div>

        <div className={`loginImage  transition-all w-1/2 `}></div>
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
