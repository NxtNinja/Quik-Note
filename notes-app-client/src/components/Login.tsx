import { Divider, Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardCommandKey } from "react-icons/md";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const loginUser: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const login = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email: data.email,
          hash: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (login.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center justify-center">
          <MdKeyboardCommandKey size={40} />

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <h4 className="text-center mt-2">
            Enter you email and password to login to your account
          </h4>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginUser)}>
          <div className="rounded-md shadow-sm ">
            <div>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "This filed is required",
                  },
                  minLength: {
                    value: 3,
                    message: "At least 3 characters needed",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter valid email",
                  },
                })}
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "This filed is required",
                  },
                  minLength: {
                    value: 3,
                    message: "At least 3 characters needed",
                  },

                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "One Capital letter, one special character and one number is required",
                  },
                })}
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <p className="text-sm font-bold">
            *Password should contain One Capital letter, one special character
            and one number
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div>
            {isSubmitting ? (
              <button
                disabled
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Spinner color="current" size="sm" />
              </button>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            )}
          </div>
        </form>
        <Divider />
        <div className="flex justify-center items-center gap-2">
          <p className="">Don't have account? </p>
          <Link href={"/auth/register"} className="text-blue-600">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
