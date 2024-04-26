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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Mật khẩu không khớp",
//     });
//   }
// });

const customerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, {
      message: "Không thể để trống họ",
    })
    .max(30, {
      message: "Tối đa là 30 ký tự",
    }),

  lastName: z
    .string()
    .trim()
    .min(1, {
      message: "Không thể để trống tên",
    })
    .max(30, {
      message: "Tối đa là 30 ký tự",
    }),

  gender: z.number().int(),

  DoB: z.string(),

  phone: z.string().trim().min(10).max(10, {
    message: "Số điện thoại không hợp lệ",
  }),

  email: z.string().email().trim().min(1, {
    message: "Không thể để trống email",
  }),

  // Address info

  street: z.string().trim().min(1, {
    message: "Không thể để trống phố",
  }),

  city: z.string().trim().min(1, {
    message: "Không thể để trống thành phố",
  }),

  province: z.string().trim().min(1, {
    message: "Không thể để trống tỉnh thành",
  }),

  country: z.string().trim().min(1, {
    message: "Không thể để trống quốc gia",
  }),
});

const UserFields = ({ loginForm }: { loginForm: any | undefined }) => {
  return (
    <>
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
      />

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
      />
    </>
  );
};
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
        <UserFields loginForm={loginForm} />
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

export function RegisterForm() {
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });
  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    window.localStorage.setItem("stepNum", "1");
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)} className="mt-5">
        <UserFields loginForm={registerForm} />
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
              <FormDescription>
                Xác nhận lại mật khẩu bạn đã nhập ở trên
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-5 h-12 w-full"
          variant={"secondary"}
          type="submit"
        >
          Tiếp theo
        </Button>
      </form>
    </Form>
  );
}

export function CustomerForm() {
  const customerForm = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {},
  });
  function onSubmit(values: z.infer<typeof customerSchema>) {
    console.log(values);
  }
  return (
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={customerForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Họ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập họ"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={customerForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={customerForm.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập giới tính"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={customerForm.control}
          name="DoB"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập ngày sinh"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={customerForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập số điện thoại"
                  {...field}
                  style={{ color: "slategray", fontWeight: "bold" }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
