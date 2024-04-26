"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const eMsg = {
  excessLimit: "Vượt quá giới hạn ký tự (255).",
  tooShort: "Chim bạn ngắn bỏ mẹ, cút!",
  isInvalid: "thông tin không hợp lệ",
};

const userSchema = z.object({
  username: z
    .string()
    .max(255, eMsg.excessLimit)
    .min(6, eMsg.tooShort)
    .refine((value) => /[a-zA-Z][a-zA-Z0-9_.]/.test(value), {
      message: eMsg.isInvalid,
    }),
  password: z
    .string()
    .min(8, {
      message: "Mật khẩu phải ít nhất 8 ký tự",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Mật khẩu phải chứa ít nhất 1 ký tự chữ thường",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Mật khẩu phải chứa ít nhất 1 ký tự chữ hoa",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Mật khẩu phải chứa ít nhất 1 ký tự số",
    }),
});

const registerSchema = userSchema
  .merge(
    z.object({
      confirmPassword: z.string(),
    }),
  )
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
      });
    }
  });

export function LoginForm() {
  const loginForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { username: "", password: "" },
  });
  function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
  }
  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người dùng</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tên người dùng"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
              <FormDescription>
                Tên đăng nhập và hiển thị của bạn trong EnigmaWorkshop
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mật khẩu"
                  type="password"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
              <FormDescription>Mật khẩu sử dụng khi dăng nhập</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button
          className="mt-5 h-12 w-full"
          variant={"secondary"}
          type="submit"
        >
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
