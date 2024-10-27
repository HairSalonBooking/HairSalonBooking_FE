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
                if (role === "R2") {
                    navigate("/service-management");
                } else if (role === "R1") {
                    navigate("/staff-management");
                } else if (role === "R3") {
                    navigate("/shift-stylist");
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
