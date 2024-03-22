"use client";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [colors, setColors] = useState<string[]>([]);

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let hexR = r.toString(16).padStart(2, "0");
    let hexG = g.toString(16).padStart(2, "0");
    let hexB = b.toString(16).padStart(2, "0");

    let hexColor = "#" + hexR + hexG + hexB;

    return hexColor;
  }

  useEffect(() => {
    random();
    const handleKeyDown = (event: { code: string }) => {
      if (event.code === "Space") {
        random();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function random() {
    let colorsArray = [];
    for (let i = 0; i < 6; i++) {
      colorsArray.push(getRandomColor());
    }
    setColors(colorsArray);
  }

  function copyToClipboard(color: string) {
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
          {colors.map((color) => (
            <div key={color} onClick={() => copyToClipboard(color)}>
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
            onClick={random}
            className="bg-indigo-500 text-slate-300 font-bold text-xl"
            size="lg"
          >
            Generate Palette
          </Button>
          <p>
            Or just press the &quot;Spacebar&quot; to generate new palettes.
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
