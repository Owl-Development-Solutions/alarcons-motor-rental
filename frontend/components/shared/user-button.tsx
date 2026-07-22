import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { User as UserModel } from "@/data/models/user.model";
import { logoutUser } from "@/data/actions/auth";
import { useUser } from "@/data/context/user-context";

function ListItem({
  title,
  icon: Icon,
  href,
  iconColor,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  iconColor: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex items-center gap-2 text-sm">
              <Icon
                className={cn(
                  iconColor ?? "text-muted-foreground",
                  "size-4 shrink-0",
                )}
              />
              <span className="line-clamp-2">{title}</span>
            </div>
          </Link>
        }
      />
    </li>
  );
}

const UserButton = ({ user }: { user: UserModel }) => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { setUser, refresh } = useUser();
  const firstInitial = user?.first_name?.charAt(0).toUpperCase() ?? "U";
  const secondIinitial = user?.last_name?.charAt(0).toUpperCase() ?? "S";

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      await logoutUser();
      setUser(null);
      toast.success("Signed out successfully.");
      // router.push("/");
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign out. Please try again.",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="flex h-8 w-8 mr-2 items-center justify-center rounded-full dark:bg-slate-600 text-white text-xs font-medium">
                {`${firstInitial} ${secondIinitial}`}
              </span>
              <span className="text-sm font-medium dark:text-gray-400">
                {user.first_name} {user.last_name}
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-slate-900 rounded-md">
              <ul className="w-40">
                <ListItem
                  href="/profile"
                  title="Profile"
                  icon={User}
                  iconColor="text-blue-900"
                />
                <Button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="bg-transparent w-full hover:bg-red-900"
                >
                  <div className="flex gap-2 text-center align-center w-full">
                    <LogOut className="text-red-400" />
                    <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                  </div>
                </Button>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default UserButton;
