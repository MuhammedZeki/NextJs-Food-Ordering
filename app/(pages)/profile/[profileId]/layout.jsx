import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/login`);
  }

  // const res = await axios.get(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/users/user/${session.user.id}`
  // );
  // const userData = await res.data;

  return <>{children}</>;
}
