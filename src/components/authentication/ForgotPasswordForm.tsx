import React, { useState } from 'react';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Email:', email);
        // Logic to send a password reset request (e.g., API call)
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 h-[100vh]">
            <div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
                <a className="mt-10 w-fit text-white" href="/">
                    <div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            className="mr-3 h-[13px] w-[8px] text-white"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                        </svg>
                        <p className="ml-0 text-sm text-white">Back to the website</p>
                    </div>
                </a>

                <div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                    <p className="text-[32px] font-bold text-white text-center">Forgot Your Password?</p>
                    <div className="relative my-4 text-center">
                        <div className="relative flex items-center py-1">
                            <div className="grow border-t border-zinc-700"></div>
                            <div className="grow border-t border-zinc-700"></div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-zinc-400">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="grid gap-2 mt-4">
                            <div className="grid gap-1">
                                <label className="text-white" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-700 bg-gray-800 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-400 focus:outline-0"
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-600 text-white hover:bg-yellow-500 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                                type="submit"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-white">
                        Remember your password?{" "}
                        <a href="/login" className="font-medium text-yellow-500 hover:text-yellow-400">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
