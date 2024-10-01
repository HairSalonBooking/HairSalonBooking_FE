import { resetPassword, setError } from '@/services/features/auth/authSlice';
import { useAppDispatch } from '@/services/store/store';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

type FormResetPasswordValues = {
    newPassword: string;
    confirmPassword: string;
};

const ResetPasswordForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useParams<{ token: string }>(); // Lấy token từ URL

    const form = useForm<FormResetPasswordValues>({
        defaultValues: {
            newPassword: '',
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

    const onSubmit = (data: FormResetPasswordValues) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        dispatch(resetPassword({ token: token!, newPassword: data.newPassword }))
            .unwrap()
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const validateConfirmPassword = (value: string) => {
        const password = watch('newPassword');
        return password === value || "Passwords do not match";
    };

    useEffect(() => {
        return () => {
            form.reset();
            dispatch(setError(null));
        };
    }, [dispatch, form]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-center text-2xl font-bold text-white mb-6">Reset Your Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        {/* Password Field */}
                        <div className="grid gap-1">
                            <label className="text-white" htmlFor="newPassword">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    placeholder="Enter new password"
                                    type={showPassword ? "text" : "password"}
                                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                                    {...register("newPassword", { required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                />
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer text-lg"
                                    onClick={handleShowPass}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.newPassword && (
                                <p className="text-sm text-red-500">* {errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="grid gap-1">
                            <label className="text-white" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    type={showConfirmPass ? "text" : "password"}
                                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                                    {...register("confirmPassword", { required: "Please confirm your new password", validate: validateConfirmPassword })}
                                />
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer text-lg"
                                    onClick={handleShowConfirmPass}
                                >
                                    {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">* {errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-600 text-white hover:bg-yellow-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
