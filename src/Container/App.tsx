import React, { useEffect, createContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dasboard from "../Components/Pages/Dasboard";
import Home from "../Components/Auth/Home";
import { Apptype } from "../Interfaces/interfaces";

export const AppContext = createContext<Apptype | null>(null);

function App() {
  const showPreloader = () => {
    document.querySelector(".preloader")?.classList.remove("hidden");
    setTimeout(() => {
      document.querySelector(".preloader")?.classList.add("hidden");
    }, 1200);
  };

  useEffect(() => {
    showPreloader();
  }, []);

  return (
    <AppContext.Provider value={{ showPreloader }}>
      <div className="App" id="app">
        <div className="modalwrapper"></div>
        <div className="preloader bg-dark hidden">
          <div className="preloader-content">
            <p className="text-white text-5xl">
              {" "}
              <img
                className="preloaderimg"
                src={require("../Assets/d.png")}
                alt="Logo"
              />{" "}
            </p>
          </div>
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashBoard" element={<Dasboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
