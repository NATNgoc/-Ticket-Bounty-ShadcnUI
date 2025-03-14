import CardCompact from "@/components/ui/card-compact";
import Paths from "@/constants/paths";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div
        className=" flex-row flex justify-center"
        style={{ flexBasis: "minmax(auto, 1000px)" }}
      >
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 max-w-[1000px] ">
          <CardCompact
            content={<LoginForm></LoginForm>}
            className="w-full h-full shadow-transparent drop-shadow-none border-transparent "
            footer={
              <span className="text-sm text-muted-foreground">
                You havent had acount yet?
                <Link
                  className="pl-2 underline underline-offset-4"
                  href={Paths.SignUpPath()}
                >
                  Sign up{" "}
                </Link>
                here
              </span>
            }
          ></CardCompact>
          <div className="hidden sm:block w-full h-full">
            <img
              src="/login-page-image.jpg"
              alt="Login page"
              className="rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
