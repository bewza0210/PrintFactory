
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Dashboard from '../app/dash-board/page';
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div>
      <Dashboard/>
    </div>
  );
}
