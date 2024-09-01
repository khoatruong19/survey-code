"use client";

import Image from "next/image";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const processImage = async () =>
    Tesseract.recognize(file, "eng", {
      logger: (m) => {},
    })
      .then(({ data: { text } }) => {
        const regex = /\b\d{5}-\d{5}-\d{5}-\d{5}-\d{5}-\d{1}\b/;
        const match = text.match(regex) || [];
        return match[0];
      })
      .catch((e) => {
        return undefined;
      });

  const handleSubmitForm = async () => {
    try {
      const code = await processImage();
      if (code === undefined) {
        return alert("Error recognizing code!");
      }
      await fetch("/api/automate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      // setMessage(data.message || "Form submitted successfully");
    } catch (error) {
      console.log(error);
      // setMessage("An error occurred");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      {file && (
        <Image
          alt="image"
          src={URL.createObjectURL(file) ?? ""}
          width={300}
          height={400}
        />
      )}
      <input type="file" onChange={onFileChange} />
      <button
        className="border-2 px-3 py-2 rounded-md hover:bg-slate-500"
        onClick={handleSubmitForm}
      >
        Submit
      </button>
    </main>
  );
}
