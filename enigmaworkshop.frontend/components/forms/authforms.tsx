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
import {
  getDistricts,
  getProvinces,
  getProvincesWithDetail,
  getWards,
} from "vietnam-provinces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/customCalendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { SetStateAction, useState } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { getReasonPhrase } from "http-status-codes";

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
    .date({
      required_error: "ngày sinh là bắt buộc",
    })
    .refine(
      (value) => new Date().getFullYear() - value.getFullYear() >= 13,
      "Bạn phải từ đủ 13 tuổi để tạo tài khoản",
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

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { username: "", password: "" },
  });
  async function onSubmit(values: z.infer<typeof userSchema>) {
    const resp = await axios
      .post(siteConfig.api + "Auth/login", values).then((resp) => {
        if (resp.status === 200) {
          sessionStorage.setItem("token", resp.data.token);
          sessionStorage.setItem("user", JSON.stringify(resp.data.user));
          sessionStorage.setItem("customer", JSON.stringify(resp.data.customer));
          router.push("/home");
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log('error', error)
          toast({
            title: error.response.data,
            description: getReasonPhrase(error.response.status),
            variant: "destructive",
          });
        }
      });
    // if (resp.status === 200) router.push("/home");
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
  const thisUserExist = async (username: string) => {
    const resp = await axios.get(
      siteConfig.api + "Auth/check-username/" + username,
    );
    return resp.data;
  };
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    if (await thisUserExist(values.username)) {
      registerForm.setError("username", {
        type: "custom",
        message: "Tên người dùng đã được sử dụng!",
      });
      return;
    }
    const user = {
      username: values.username,
      password: values.password,
    };
    window.localStorage.setItem("userRegData", JSON.stringify(user, null, 4));
    window.localStorage.setItem("stepNum", "1");
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="mt-5 w-1/2"
      >
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
  const router = useRouter();
  const customerForm = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: new Date(),
      phone: "",
      email: "",
      street: "",
      ward: "",
      district: "",
      province: "",
    },
  });
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");

  const handleProvinceChange = (selectedCode: SetStateAction<string>) => {
    setSelectedProvinceCode(selectedCode);
  };

  const handleDistrictChange = (selectedCode: SetStateAction<string>) => {
    setSelectedDistrictCode(selectedCode);
  };

  const getDistrictItems = () => {
    const districtItems = getDistricts(selectedProvinceCode);

    return districtItems.map((item) => (
      <SelectItem value={item.code} key={item.code}>
        {item.name}
      </SelectItem>
    ));
  };

  const getWardItems = () => {
    const wardItems = getWards(selectedDistrictCode);

    return wardItems.map((item) => (
      <SelectItem value={item.code} key={item.code}>
        {item.name}
      </SelectItem>
    ));
  };

  async function onSubmit(values: z.infer<typeof customerSchema>) {
    const req = {
      user: JSON.parse(window.localStorage.getItem("userRegData") || "{}"),
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        dob: values.dob,
        phone: values.phone,
        email: values.email,
        address: {
          street: values.street,
          ward: values.ward,
          district: values.district,
          province: values.province,
          formatedAddress: `${values.street}, ${values.ward} - ${values.district} - ${values.province}`,
        },
      },
    };
    if (Object.keys(req.user).length === 0)
      return alert("Trình duyệt của bạn không đáp ứng y/c bảo mật để đăng ký");
    const resp = await axios.post(siteConfig.api + "Auth/register", req);
    if (resp.status === 200) {
      window.localStorage.removeItem("userRegData");
      window.localStorage.removeItem("stepNum");
      window.dispatchEvent(new Event("storage"));
      const login = await axios.post(siteConfig.api + "Auth/login", req.user);
      if (login.status === 200) {
        sessionStorage.setItem("token", login.data.token);
        sessionStorage.setItem("user", JSON.stringify(login.data.user));
        router.push("/home");
      }
    }
  }
  return (
    <Form {...customerForm}>
      <form
        onSubmit={customerForm.handleSubmit(onSubmit)}
        className="mt-5 flex w-2/3 flex-col"
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
                    placeholder="Atreides"
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
                    placeholder="Paul Muad'dib"
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
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      style={{ color: "slategray", fontWeight: "bold" }}
                      className="w-full"
                    >
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
                <FormLabel className="mb-1">Ngày sinh</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        style={{ color: "slategray", fontWeight: "bold" }}
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-bold",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Chọn ngày sinh</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={2024}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-5">
          <FormField
            control={customerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0366677788"
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
            name="email"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paul@Atreides.com"
                    {...field}
                    style={{ color: "slategray", fontWeight: "bold" }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h1 className="mx-auto mt-5 font-semibold">
          Giới thiệu về bản thân bạn đi nào
        </h1>
        <hr className="mx-auto mt-1 w-1/2" />
        <div className="flex flex-row gap-5">
          <FormField
            control={customerForm.control}
            name="province"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Tỉnh thành</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleProvinceChange(value);
                    }}
                  >
                    <SelectTrigger
                      style={{ color: "slategray", fontWeight: "bold" }}
                      className="w-full"
                    >
                      <SelectValue {...field} placeholder="Chọn tỉnh thành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {getProvinces().map((province) => (
                          <SelectItem key={province.code} value={province.code}>
                            {province.name}
                          </SelectItem>
                        ))}
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
            name="district"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Quận huyện / Thị xã / Thành phố</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleDistrictChange(value);
                    }}
                  >
                    <SelectTrigger
                      style={{ color: "slategray", fontWeight: "bold" }}
                      className="w-full"
                    >
                      <SelectValue {...field} placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectedProvinceCode && getDistrictItems()}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-5">
          <FormField
            control={customerForm.control}
            name="ward"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Phường</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      style={{ color: "slategray", fontWeight: "bold" }}
                      className="w-full"
                    >
                      <SelectValue {...field} placeholder="Chọn Phường/Xã" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectedDistrictCode && getWardItems()}
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
            name="street"
            render={({ field }) => (
              <FormItem className="mt-3 w-1/2">
                <FormLabel>Số nhà, tên đường</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Số 22 đường abc"
                    {...field}
                    style={{ color: "slategray", fontWeight: "bold" }}
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
