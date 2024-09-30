import { registerAcount, setError } from '@/services/features/auth/authSlice';
import { useAppDispatch } from '@/services/store/store';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type FormValue = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    success: boolean;
}

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const form = useForm<FormValue>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const { register, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Handlers for toggling password visibility
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass);
    };

    const onSubmit = (data: FormValue) => {
        dispatch(registerAcount(data))
            .unwrap()
            .then((response) => {
                if (response.success === true) {
                    navigate("/login")
                } else {
                    navigate("/register")
                }
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    const validateConfirmPassword = (value: string) => {
        const password = watch('password');
        return password === value || "Passwords do not match";
    };

    useEffect(() => {
        return () => {
            form.reset();
            dispatch(setError(null));
        };
    }, [dispatch, form]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-4">
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <label className="text-white" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                            id="firstName"
                            placeholder="John"
                            type="text"
                            {...register("firstName", { required: "Enter your first name" })}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">* {errors.firstName.message}</p>}

                        <label className="text-white" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                            id="lastName"
                            placeholder="Doe"
                            type="text"
                            {...register("lastName", { required: "Enter your last name" })}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">* {errors.lastName.message}</p>}

                        <label className="text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            {...register("email", { required: "Enter your email address", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" } })}
                        />
                        {errors.email && <p className="text-sm text-red-500">* {errors.email.message}</p>}

                        {/* Password Field */}
                        <label className="text-white" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                                {...register("password", { required: "Enter your password", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer text-lg"
                                onClick={handleShowPass}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">* {errors.password.message}</p>}

                        {/* Confirm Password Field */}
                        <label className="text-white" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                type={showConfirmPass ? "text" : "password"}
                                className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                                {...register("confirmPassword", { required: "Confirm your password", validate: validateConfirmPassword })}
                            />
                            <div
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer text-lg"
                                onClick={handleShowConfirmPass}
                            >
                                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-red-500">* {errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-600 text-white hover:bg-yellow-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="mt-4 text-center text-white">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
                    Sign In
                </a>
            </p>
        </>
    );
};

export default RegisterForm;
