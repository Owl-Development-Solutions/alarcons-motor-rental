"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "@/data/actions/user";
import { AdminUser, AdminUserInput } from "@/data/models/user.model";
import { UserStatusBadge } from "@/components/shared/user-status-badge";
import ConfirmDeleteDialog from "@/components/shared/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-lg border px-3 py-2.5 text-sm border-gray-300 dark:border-slate-600 " +
  "bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 " +
  "dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 " +
  "transition-shadow";

const emptyForm: AdminUserInput = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone_number: "",
  address: "",
  role: "customer",
  is_active: true,
  password: "",
  password_confirmation: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<AdminUserInput>(emptyForm);
  const [isPending, startTransition] = useTransition();

  const loadCustomers = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      setCustomers(
        (await getAdminUsers(query)).data.filter(
          (user) => user.role === "customer",
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to load customers.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCustomers();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };
  const openEdit = (customer: AdminUser) => {
    setEditing(customer);
    setForm({
      ...customer,
      middle_name: customer.middle_name ?? "",
      password: "",
      password_confirmation: "",
    });
    setDialogOpen(true);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const payload = { ...form, role: "customer" as const };
      const result = editing
        ? await updateAdminUser(editing.id, payload)
        : await createAdminUser(payload);
      if (!result.success) {
        setError(result.message);
        return;
      }
      setDialogOpen(false);
      await loadCustomers(search);
    });
  };
  const remove = async (customer: AdminUser) => {
    const result = await deleteAdminUser(customer.id);
    if (!result.success) throw new Error(result.message);
    await loadCustomers(search);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer accounts.</p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Plus /> Add customer
        </Button>
      </div>
      <div className="rounded-xl border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-6">
          <h2 className="text-lg font-semibold">All customers</h2>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void loadCustomers(search);
            }}
          >
            <div className="relative">
              {/* <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" /> */}
              <Input
                className={cn(inputClass)}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customers..."
              />
            </div>
            <Button
              type="submit"
              className="bg-orange-200 text-orange-500 hover:bg-orange-300!  hover:text-orange-600!"
            >
              Search
            </Button>
          </form>
        </div>
        {loading ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Loading customers...
          </p>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              className="mt-3"
              variant="outline"
              onClick={() => void loadCustomers(search)}
            >
              Retry
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone_number}</TableCell>
                    <TableCell>
                      <UserStatusBadge isActive={customer.is_active} />
                    </TableCell>
                    <TableCell>
                      {new Date(customer.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{customer.bookings_count}</TableCell>
                    <TableCell className="space-x-1">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => openEdit(customer)}
                        aria-label={`Edit ${customer.name}`}
                      >
                        <Edit />
                      </Button>
                      <ConfirmDeleteDialog
                        itemLabel="customer"
                        itemName={customer.name}
                        onConfirm={() => remove(customer)}
                      >
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          className="text-destructive"
                          aria-label={`Delete ${customer.name}`}
                        >
                          <Trash2 />
                        </Button>
                      </ConfirmDeleteDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-white dark:bg-[#314158]">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit customer" : "Add customer"}
            </DialogTitle>
          </DialogHeader>
          <form className="grid gap-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name">
                <Input
                  required
                  value={form.first_name}
                  onChange={(event) =>
                    setForm({ ...form, first_name: event.target.value })
                  }
                  className={cn(inputClass)}
                />
              </Field>
              <Field label="Last name">
                <Input
                  required
                  value={form.last_name}
                  onChange={(event) =>
                    setForm({ ...form, last_name: event.target.value })
                  }
                  className={cn(inputClass)}
                />
              </Field>
            </div>
            <Field label="Username">
              <Input
                required
                value={form.username}
                onChange={(event) =>
                  setForm({ ...form, username: event.target.value })
                }
                className={cn(inputClass)}
              />
            </Field>
            <Field label="Email">
              <Input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </Field>
            <Field label="Phone">
              <Input
                required
                value={form.phone_number}
                onChange={(event) =>
                  setForm({ ...form, phone_number: event.target.value })
                }
                className={cn(inputClass)}
              />
            </Field>
            <Field label="Address">
              <Textarea
                required
                value={form.address}
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
                className={cn(inputClass)}
              />
            </Field>
            <Field label={editing ? "New password (optional)" : "Password"}>
              <Input
                required={!editing}
                minLength={8}
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                className={cn(inputClass)}
              />
            </Field>
            <Field label="Confirm password">
              <Input
                required={!editing || Boolean(form.password)}
                minLength={8}
                type="password"
                value={form.password_confirmation}
                onChange={(event) =>
                  setForm({
                    ...form,
                    password_confirmation: event.target.value,
                  })
                }
                className={cn(inputClass)}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) =>
                  setForm({ ...form, is_active: event.target.checked })
                }
              />{" "}
              Active account
            </label>
            <Button
              disabled={isPending}
              type="submit"
              className="h-12 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              {isPending ? "Saving..." : "Save customer"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}
