import { signInFormSchema, signUpFormSchema } from "@/lib/validator";
import z from "zod";

export type RegisterUser = z.infer<typeof signUpFormSchema>;
export type LoginUser = z.infer<typeof signInFormSchema>;
