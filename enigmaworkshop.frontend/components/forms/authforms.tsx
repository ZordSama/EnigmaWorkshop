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
import { getDistricts, getProvinces, getWards } from "vietnam-provinces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const eMsg = {
  excessLimit: "Vượt quá giới hạn ký tự (255).",
  tooShort: "Mục này tối thiểu 6 ký tự",
  isInvalid: "thông tin không hợp lệ",
  isEmpty: "Không được để trống mục này",
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
  firstName: z.string().trim().min(1, eMsg.isEmpty).max(30, {
    message: "Tối đa là 30 ký tự",
  }),

  lastName: z.string().trim().min(1, eMsg.isEmpty).max(30, {
    message: "Tối đa là 30 ký tự",
  }),

  gender: z.string().refine((value) => value != "", "phải chọn ở mục này"),

  dob: z
    .string()
    .refine(
      (value) =>
        /(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/.test(
          value,
        ),
      {
        message: "Ngày sinh không đúng định dạng",
      },
    ),

  phone: z
    .string()
    .trim()
    .refine(
      (value) => /(84|0[3|5|7|8|9])+([0-9]{8})/.test(value),
      "số điện thoại phải là số điện thoại Việt Nam hợp lệ!",
    ),

  email: z.string().email("Email không hợp lệ!").trim().min(1, eMsg.isEmpty),

  // Address info

  street: z.string().trim().min(1, eMsg.isEmpty),

  ward: z.string().trim().min(1, eMsg.isEmpty),

  district: z.string().trim().min(1, eMsg.isEmpty),

  province: z.string().trim().min(1, eMsg.isEmpty),
});

const UserFields = ({ currentForm }: { currentForm: any | undefined }) => {
  return (
    <>
      <FormField
        control={currentForm.control}
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
        control={currentForm.control}
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
        <UserFields currentForm={loginForm} />
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
    window.localStorage.setItem("userReg", JSON.stringify(values, null, 4));
    window.localStorage.setItem("stepNum", "1");
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="mt-5 w-1/2"
      >
        <UserFields currentForm={registerForm} />
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
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      email: "",
      street: "",
      ward: "",
      district: "",
      province: "",
    },
  });
  function onSubmit(values: z.infer<typeof customerSchema>) {
    const req = {
      user: JSON.parse(window.localStorage.getItem("userReg") || "{}"),
      customer: values,
    };
  }
  return (
    <Form {...customerForm}>
      <form
        onSubmit={customerForm.handleSubmit(onSubmit)}
        className="mt-5 flex flex-col"
      >
        <div className="flex flex-row gap-5">
          <FormField
            control={customerForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Họ"
                    {...field}
                    style={{ color: "slategray", fontWeight: "bold" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={customerForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tên"
                    {...field}
                    style={{ color: "slategray", fontWeight: "bold" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-5">
          <FormField
            control={customerForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem
                style={{ color: "slategray", fontWeight: "bold" }}
                className="mt-3 w-1/2"
              >
                <FormLabel className="text-white">Giới tính</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue {...field} placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Nam</SelectItem>
                        <SelectItem value="1">Nữ</SelectItem>
                        <SelectItem value="2">Khác</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={customerForm.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mt-5 h-12 w-full"
          variant={"secondary"}
          type="submit"
        >
          Hoàn tất đăng ký
        </Button>
      </form>
    </Form>
  );
}
