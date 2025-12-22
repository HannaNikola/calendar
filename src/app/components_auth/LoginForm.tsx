'use client'
import { useRouter } from "next/navigation";
import { Button } from "../shared/ui/Button";

export function LoginForm() {
  const router = useRouter()
  return (
    <div className="w-[370px] p-2 ">
      <form className="w-full mb-4 mt-8">
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="mb-3 w-full p-2 h-[40px] border-2 rounded-md"
        />
        <label htmlFor="password"></label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          className="mb-3 w-full p-2 h-[40px] border-2 rounded-md"
        />
      </form>
      <div className="flex  justify-between ">
        <Button onClick={() => router.push("/calendar")} variant="default">Sign Up</Button>
        <Button onClick={() => router.push("/")} variant="default">Back</Button>

      </div>
    </div>
  );
}
export default LoginForm;
