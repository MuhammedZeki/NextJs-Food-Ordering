"use server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/admin");
  }
  // const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   redirect("/admin");
  // }

  return <>{children}</>;
}
