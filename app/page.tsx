import { caller } from "@/server/server";

export default async function Home() {
  const { count } = await caller.usersCount();
  return <div className="text-5xl font-bold">{count} users</div>;
}
