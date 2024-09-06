"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

const initialCode = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
};

const initCode = () => ({ ...initialCode });

export default function Home() {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(initCode());

  const firstCodeRef = useRef<HTMLInputElement | null>(null);

  const handleOnChangeCode =
    (field: keyof typeof code) => (e: ChangeEvent<HTMLInputElement>) => {
      const newCode = { ...code };
      newCode[field] = e.target.value;
      setCode(newCode);
    };

  const handleSubmitForm = async () => {
    try {
      setIsLoading(true);
      const formatedCode = Object.values(code).join("-");
      if (formatedCode.length != 31 || !review) {
        setIsLoading(false);
        return alert("Error recognizing code!");
      }
      setIsLoading(false);
      await fetch("/api/automate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: formatedCode, review }),
      });
      initCode();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!firstCodeRef.current) return;
    firstCodeRef.current.focus();
  }, [firstCodeRef.current]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="flex flex-col gap-1">
        <input
          ref={firstCodeRef}
          className="text-black"
          onChange={handleOnChangeCode(1)}
        />
        <input className="text-black" onChange={handleOnChangeCode(2)} />
        <input className="text-black" onChange={handleOnChangeCode(3)} />
        <input className="text-black" onChange={handleOnChangeCode(4)} />
        <input className="text-black" onChange={handleOnChangeCode(5)} />
        <input className="text-black" onChange={handleOnChangeCode(6)} />
      </div>
      <textarea
        className="border-2 w-[400px] text-black font-semibold"
        rows={10}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        className="border-2 px-3 py-2 rounded-md"
        onClick={handleSubmitForm}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </main>
  );
}
