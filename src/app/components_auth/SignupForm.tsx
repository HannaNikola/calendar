"use client";
import { useRouter } from "next/navigation";
import { Button } from "../shared/ui/Button";

export function SignupForm() {
  const router = useRouter();
  return (
    <div className="w-[370px] p-2 ">
      <form className="w-full mb-4 mt-8">
        <label htmlFor="name"></label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="mb-3 w-full p-2 h-[40px] border-1 rounded-md "
        />

        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 w-full p-2 h-[40px] border-1 rounded-md"
        />

        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          className="mb-3 w-full p-2 h-[40px] border-1 rounded-md"
        />
      </form>
      <div className="flex  justify-between ">
        <Button onClick={() => router.push("/calendar")} variant="default">
          Login
        </Button>
        <Button onClick={() => router.push("/")} variant="default">
          Back
        </Button>
      </div>
    </div>
  );
}
export default SignupForm;
