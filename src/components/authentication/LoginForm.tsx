import { useAppDispatch } from '@/services/store/store';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginAccount, setError } from '@/services/features/auth/authSlice';

type FormLoginValues = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormLoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormLoginValues) => {
        setIsLoading(true);
        dispatch(loginAccount(data))
            .unwrap()
            .then((response) => {

                const role = response.roleId;
                if (role === "Admin") {
                    navigate("/admin-dashboard");
                } else if (role === "Staff") {
                    navigate("/product-management");
                } else if (role === "R4") {
                    navigate("/home");
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data);
            })
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="text-white" htmlFor="email">
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-sm text-red-500">* {errors.email.message}</p>
                        )}
                        <input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            {...register('email', { required: "Email is required" })}
                            required
                        />
                        <label className="text-white mt-2" htmlFor="password">
                            Password
                        </label>
                        {errors.password && (
                            <p className="text-sm text-red-500">*{errors.password.message}</p>
                        )}
                        <input
                            id="password"
                            placeholder="Password"
                            type="password"
                            autoComplete="current-password"
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                            {...register('password', { required: "Password is required" })}
                            required
                        />
                    </div>
                    <p className="text-right">
                        <Link to="/forgot-password" className="font-medium text-white text-sm">
                            Forgot your password?
                        </Link>
                    </p>
                    <button
                        className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-600 text-white hover:bg-yellow-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                        type="submit"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </div>
            </form>

            <div className="relative my-4 text-center">
                <div className="relative flex items-center py-1">
                    <div className="grow border-t border-zinc-700"></div>
                    <span className="mx-2 text-white">OR</span>
                    <div className="grow border-t border-zinc-700"></div>
                </div>
            </div>

            <div className="mt-1">
                <form className="pb-2" action="/login/google" method="POST">
                    <input type="hidden" name="provider" value="google" />
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-gray-800 hover:bg-gray-700 h-10 px-4 w-full text-white py-6"
                        type="submit"
                    >
                        <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                        </span>
                        <span>Google</span>
                    </button>
                </form>
            </div>

            <p className="mt-4 text-center text-white">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-yellow-500 hover:text-yellow-400">
                    Sign Up
                </a>
            </p>
        </>
    );
};

export default LoginForm;
