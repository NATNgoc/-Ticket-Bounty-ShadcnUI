import { AccountTabs } from "@/app/(authenticated)/account/account-tabs";

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AccountTabs />
      {children}
    </div>
  );
}
