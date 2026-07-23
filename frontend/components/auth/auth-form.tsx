"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import z from "zod";
import { signInFormSchema, signUpFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { loginUser, registerUser } from "@/data/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/data/context/user-context";

type AuthFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: Mode;
  showTrigger?: boolean;
};

const inputClasses =
  "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500";

const labelClasses = "text-gray-600 dark:text-gray-300";

type Mode = "Login" | "Register";

const styleSucces = {
  background: "#16a34a",
  color: "#fff",
  border: "1px solid #15803d",
  borderRadius: "8px",
  padding: "12px 16px",
};

const AuthForm = ({
  type,
  onOpenChange,
  open,
  showTrigger = true,
}: AuthFormProps) => {
  const [mode, setMode] = useState<Mode>(type);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const { setUser } = useUser();

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    try {
      const res = await loginUser(values);
      setUser(res.user);

      if (res.message) {
        toast.success(res.message, {
          position: "bottom-right",
          style: styleSucces,
        });
      }

      onOpenChange(false);

      if (res.user?.role === "admin") {
        router.push("/admin/dashboard");
      }
    } catch (error: unknown) {
      console.log(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please check your credentials.",
        { position: "bottom-right" },
      );
    }
  };

  const onRegisterSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      const res = await registerUser(values);

      if (res.message) {
        toast.success(res.message, {
          position: "bottom-right",
          style: styleSucces,
        });
      }

      onOpenChange(false);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to complete registration.",
        { position: "bottom-right" },
      );
    }
  };

  const onError = (errors: any) => {
    console.log("FORM ERRORS:", errors);
  };

  // reset the relevant form + go back to the trigger's original mode
  // whenever the dialog is closed, so it doesn't reopen mid-toggle
  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    signInForm.reset();
    signUpForm.reset();
    setMode("Login");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger ? (
        <DialogTrigger className="py-2 rounded-md w-20 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 ">
          <span>{type}</span>
        </DialogTrigger>
      ) : (
        <></>
      )}

      <DialogContent className="sm:max-w-120 max-h-screen  bg-[#111729] overflow-x-auto">
        {mode === "Login" ? (
          <React.Fragment key={mode}>
            <DialogHeader className="text-center">
              <DialogTitle className="text-center text-white">
                Welcome back
              </DialogTitle>
              <DialogDescription className={cn(labelClasses, "text-center")}>
                Sign in to your account to continue.
              </DialogDescription>
            </DialogHeader>

            <form
              id="login-form"
              onSubmit={signInForm.handleSubmit(onLoginSubmit, onError)}
            >
              <FieldGroup>
                <div>
                  <Controller
                    name="email"
                    control={signInForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>Email</FieldLabel>
                        <Input
                          type="email"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter email"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500!"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="password"
                    control={signInForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Password
                        </FieldLabel>
                        <Input
                          type="password"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter password"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500!"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm cursor-pointer">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked: any) =>
                        setRememberMe(checked === true)
                      }
                      className="border-gray-300 dark:border-slate-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() => console.log("forgot password")}
                    className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              </FieldGroup>
            </form>

            <DialogFooter className="sm:flex-col sm:items-stretch sm:gap-3">
              <Button
                type="submit"
                form="login-form"
                className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
                disabled={signInForm.formState.isSubmitting}
              >
                <span className="flex items-center gap-2">
                  {signInForm.formState.isSubmitting
                    ? "Signing in..."
                    : "Login"}
                </span>
              </Button>

              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("Register")}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </DialogFooter>
          </React.Fragment>
        ) : (
          <React.Fragment key={mode}>
            <DialogHeader className="text-center">
              <DialogTitle className="text-center text-white">
                Create an account
              </DialogTitle>
              <DialogDescription className={cn(labelClasses, "text-center")}>
                Fill in your details below to register.
              </DialogDescription>
            </DialogHeader>

            <form
              id="register-form"
              onSubmit={signUpForm.handleSubmit(onRegisterSubmit, onError)}
            >
              <FieldGroup>
                <div className="flex gap-5">
                  <Controller
                    name="first_name"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          First Name
                        </FieldLabel>
                        <Input
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter first name"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="last_name"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Last Name
                        </FieldLabel>
                        <Input
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter last name"
                          className={cn(inputClasses)}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <Controller
                    name="username"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Username
                        </FieldLabel>
                        <Input
                          type="text"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter user name"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="phone_number"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Phone Number
                        </FieldLabel>
                        <Input
                          type="number"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter user phone number"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="email"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>Email</FieldLabel>
                        <Input
                          type="email"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter email"
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    name="address"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Address
                        </FieldLabel>
                        <Input
                          type="text"
                          placeholder="Enter address"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <Controller
                    name="password"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Password
                        </FieldLabel>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password_confirmation"
                    control={signUpForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className={labelClasses}>
                          Confirm Password
                        </FieldLabel>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          className={cn(
                            inputClasses,
                            fieldState.invalid && "border-red-500!",
                          )}
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500"
                          />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </FieldGroup>
            </form>

            <DialogFooter className="sm:flex-col sm:items-stretch sm:gap-3">
              <Button
                type="submit"
                form="register-form"
                className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
                disabled={signUpForm.formState.isSubmitting}
              >
                <span className="flex items-center gap-2">
                  {signUpForm.formState.isSubmitting
                    ? "Submitting..."
                    : "Register"}
                </span>
              </Button>

              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("Login")}
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Login
                  </button>
                </p>
              </div>
            </DialogFooter>
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
