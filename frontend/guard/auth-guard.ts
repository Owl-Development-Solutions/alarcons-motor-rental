import { getCurrentUser } from "@/data/actions/user";
import { redirect } from "next/navigation";

export const requireRole = async (...roles: string[]) => {
  const session = await getCurrentUser();

  if (!roles.includes(session?.user.role ?? "")) {
    redirect("/unauthorized");
  }

  return session;
};
