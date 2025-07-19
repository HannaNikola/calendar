"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Test = () => {
  return (
    <section className="  w-full h-full items-center justify-center">
      <div className=" w-full h-full flex  flex-col items-center py-20">
        <h1 className="text-center text-2xl mb-6 ">
          Oops… This page isn’t ready yet
        </h1>
        <DotLottieReact
          src="https://lottie.host/ffc0444c-c99d-4337-b3c9-47b71cbd4033/s04ymTMzCO.lottie"
          loop
          autoplay
        />
      </div>
    </section>
  );
};
