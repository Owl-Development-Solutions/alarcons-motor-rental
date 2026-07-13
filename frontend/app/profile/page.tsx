"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/data/context/user-context";
import { changePassword } from "@/data/actions/auth";
import { getCurrentUser } from "@/data/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeView, setActiveView] = useState<"profile" | "picture">("profile");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
      } catch {
        toast.error("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [setUser]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      toast.success(res.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.message || "Unable to change password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePicture = () => {
    if (!selectedImage) {
      toast.error("Please choose an image first.");
      return;
    }

    toast.success("Profile picture updated.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">My Profile</h1>
              <p className="mt-2 text-slate-400">
                Here you can view your registered details and update your password.
              </p>
            </div>
            <div className="flex gap-2 rounded-lg border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() => setActiveView("profile")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeView === "profile"
                    ? "bg-orange-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveView("picture")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeView === "picture"
                    ? "bg-orange-600 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Profile Picture
              </button>
            </div>
          </div>
        </div>

        {activeView === "profile" ? (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">First Name</p>
                  <p className="font-medium">{user.first_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Last Name</p>
                  <p className="font-medium">{user.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Username</p>
                  <p className="font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone Number</p>
                  <p className="font-medium">{user.phone_number}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <form className="mt-6 space-y-4" onSubmit={handlePasswordChange}>
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={submitting}
                >
                  {submitting ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-semibold">Profile Picture</h2>
            <p className="mt-2 text-slate-400">
              Upload a new profile image for your account.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-3xl font-semibold text-white">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    {user.first_name.charAt(0).toUpperCase()}
                    {user.last_name.charAt(0).toUpperCase()}
                  </>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer text-sm text-slate-300"
                onChange={handleImageSelect}
              />
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                onClick={handleSavePicture}
              >
                Save Picture
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
