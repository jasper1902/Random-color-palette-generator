"use client"
import { Card, CardHeader, CardBody, Button, Code } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [paletteColors, setPaletteColors] = useState<string[]>([]);

  useEffect(() => {
    generateRandomPalette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleKeyUp(e: { key: string }) {
      const key = e.key.toUpperCase();
      if (key === "C") {
        copyColorToClipboard(paletteColors.join(" "));
      }
    }

    function handleKeyDown(e: { key: string }) {
      if (e.key === " ") {
        generateRandomPalette();
      }
    }

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteColors]);

  function generateRandomPalette() {
    const colorsArray = Array.from({ length: 6 }, getRandomColorHex);
    setPaletteColors(colorsArray);
  }

  function getRandomColorHex() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    return `#${red}${green}${blue}`;
  }

  function copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color);
    toast.success(`Color ${color.toUpperCase()} copied to your clipboard`, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen mx-auto bg-slate-300 gap-8">
        <h1 className="text-center font-bold my-12 text-4xl">
          Color palette generator
        </h1>
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {paletteColors.map((color) => (
            <div key={color} onClick={() => copyColorToClipboard(color)}>
              <Card className="p-4 bg-slate-200 cursor-pointer transform transition duration-300 hover:scale-105">
                <CardHeader
                  className="flex-col items-start py-40 px-24 "
                  style={{ backgroundColor: color }}
                ></CardHeader>
                <CardBody className="overflow-visible py-2">
                  <p className="text-center font-medium">
                    {color.toUpperCase()}
                  </p>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 mx-auto">
          <Button
            onClick={generateRandomPalette}
            className="bg-indigo-500 text-slate-300 font-bold text-xl"
            size="lg"
          >
            Generate Palette
          </Button>
          <p>
            Or just press the &quot;Spacebar&quot; to generate new palettes.
          </p>
          <div
            onClick={() => copyColorToClipboard(paletteColors.join(" "))}
            className="cursor-pointer"
          >
            <Code color="secondary" className="text-center">
              Click to copy individual color ● Press &quot;C&quot; to copy
              palette
            </Code>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
