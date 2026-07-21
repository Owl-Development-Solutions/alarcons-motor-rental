"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/data/context/user-context";
import { getCurrentUser } from "@/data/actions/user";
import { updateProfile } from "@/data/actions/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminProfilePage() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(!user);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        middle_name: user.middle_name || "",
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
      });
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res?.user);
      } catch {
        toast.error("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user, setUser]);

  const handleChange =
    (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      const res = await updateProfile(formData);
      if (res.user) {
        setUser(res.user);
      }
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-white">
        You need to sign in to view this page.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white shadow-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Profile</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Edit your base profile details below.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-xl font-semibold text-white">
            {user.first_name.charAt(0).toUpperCase()}
            {user.last_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-slate-400">Account</p>
            <p className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">Personal Details</h2>
          <div className="mt-5 grid gap-4 text-sm text-slate-300">
            <div>
              <label className="mb-1 block text-slate-400">Username</label>
              <Input
                value={formData.username}
                onChange={handleChange("username")}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-400">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-slate-400">Address</label>
              <Input
                value={formData.address}
                onChange={handleChange("address")}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">Account Status</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Role</p>
              <p>{user.role}</p>
            </div>
            <div>
              <p className="text-slate-500">Verified</p>
              <p>{user.is_verified ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="text-slate-500">Active</p>
              <p>{user.is_active ? "Yes" : "No"}</p>
            </div>
            <div>
              <p className="text-slate-500">Joined</p>
              <p>{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-slate-500">Last updated</p>
              <p>{new Date(user.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
