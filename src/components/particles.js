import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Particles } from "./ui/particles-ui";
import ifblack from "../Photos/IF black (1).png";
import ifwhite from "../Photos/IF White (1).png";
import Footer from "./footer";

import Button from "./button";
export function ParticlesDemo() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // Update particle color based on theme
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      style={{ margin: 0, padding: 0 }}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center 
                     overflow-hidden  bg-background md:shadow-xl 
                     ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
    >

      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 sm:top-10 sm:right-10 md:top-0 md:right-4 px-3 py-1 md:px-4 md:py-2 rounded
  ${
    theme === "dark"
      ? "bg-gray-600 text-white hover:bg-gray-700"
      : "bg-gray-300 text-black hover:bg-gray-400"
  } transition-colors text-sm md:text-base z-50`}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="max-w-7xl relative mx-auto py-0 md:py-0 px-4 w-full left-0 top-0 flex flex-col items-center">
        {/* Switch the logo based on theme */}
        <img
          src={theme === "dark" ? ifwhite : ifblack}
          alt="Event Logo"
          className="w-full max-w-[1000px] h-auto object-contain mb-6 mt-40"
          loading="lazy"
        />
      </div>

      <span
        className={`pointer-events-none whitespace-pre-wrap 
                    bg-gradient-to-b ${
                      theme === "dark"
                        ? "from-white to-slate-900/10"
                        : "from-black to-gray-300/80"
                    } bg-clip-text text-center text-4xl md:text-8xl font-semibold 
                    leading-none text-transparent p-4`}
      >
        Welcome to the Internship Fair Portal
      </span>

      <span
        className={`pointer-events-none whitespace-pre-wrap 
                    bg-gradient-to-b ${
                      theme === "dark"
                        ? "from-white to-slate-900/10"
                        : "from-black to-gray-300/80"
                    } bg-clip-text text-center text-xl md:text-5xl font-semibold 
                    leading-snug md:leading-none text-transparent p-4`}
      >
        Submit your resume, find internship opportunities, and connect with top
        companies
      </span>
      {/* <Button
        theme="dark"
        size="xl"
        onClick={() => navigate("/submit-page")}
        className="mt-10"
      >
        Submit Resume
      </Button> */}
      {/* <Button theme="dark" size="xl" onClick={() => alert("Button clicked!")}>
                Click Me
            </Button> */}

      <Footer theme={theme} />

      {/* <div className="space-y-4"> */}
      {/* Basic usage */}
      {/* <Button>Click me</Button> */}

      {/* With variants */}
      {/* <Button variant="destructive">Delete</Button> */}
      {/* <Button variant="outline">Settings</Button> */}

      {/* With different sizes */}
      {/* <Button size="sm">Small</Button> */}
      {/* <Button size="lg">Large</Button> */}

      {/* With loading state */}
      {/* <Button isLoading>Processing</Button> */}

      {/* </div> */}
      {/* <Button
                onClick={toggleTheme}
                variant={theme === "dark" ? "secondary" : "default"}
                size="sm"
                className="absolute top-4 right-4"
            >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button> */}

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh={false}
        staticity={50}
        size={0.8}
      />
    </div>
  );
}

export default ParticlesDemo;
