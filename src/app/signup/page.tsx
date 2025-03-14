import CardCompact from "@/components/ui/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignupPage() {
  return (
    <div className="flex-1 ">
      <CardCompact
        description="Sign up to create an account"
        title="Sign Up"
        className="max-w-[450px] lg:max-w-[600px] mx-auto"
        content={<SignUpForm></SignUpForm>}
      ></CardCompact>
    </div>
  );
}
