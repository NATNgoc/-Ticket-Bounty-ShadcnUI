import { isUserLoggedIn } from "@/action/cookie";
import Paths from "@/constants/paths";
import { redirect } from "next/navigation";

export default async function TicketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLogined = await isUserLoggedIn();

  if (!isLogined) {
    redirect(Paths.LoginPath());
  }
  return <>{children}</>;
}
