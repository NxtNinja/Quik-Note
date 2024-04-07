import { Divider, Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardCommandKey } from "react-icons/md";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const RegisterUser: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      await axios.post(
        "http://localhost:4000/auth/signup",
        {
          name: data.name,
          email: data.email,
          hash: data.password,
        },
        {
          withCredentials: true,
        }
      );

      router.push("/auth/login");
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
            Create your account
          </h2>
          <h4 className="text-center mt-2">
            Enter your name, email and password to create your account
          </h4>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(RegisterUser)}>
          <div className="rounded-md shadow-sm ">
            <div>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "This filed is required",
                  },
                  minLength: {
                    value: 3,
                    message: "At least 3 characters needed",
                  },
                  pattern: {
                    value: /^[a-z ,.'-]+$/i,
                    message: "Please enter valid name",
                  },
                })}
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                Register
              </button>
            )}
          </div>
        </form>
        <Divider />
        <div className="flex justify-center items-center gap-2">
          <p className="">Have account? </p>
          <Link href={"/auth/login"} className="text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
