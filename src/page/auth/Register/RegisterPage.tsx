import RegisterForm from '@/components/authentication/RegisForm'

const RegisterPage = () => {
    return (
        <>
            <div className="relative bg-gray-900 h-screen py-4">
                {/* Back to the website link */}
                <a className="absolute top-4 left-4 text-white" href="/">
                    <div className="flex items-center">
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

                {/* Sign Up Form */}
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="mx-auto w-full flex flex-col justify-center px-5 pt-0 md:max-w-[50%] lg:max-w-[50%] lg:px-6">
                        <div className="my-auto mb-auto flex flex-col w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:max-w-[450px]">
                            <p className="text-[32px] font-bold text-white text-center">Sign Up</p>
                            <div className="relative my-4 text-center">
                                <div className="relative flex items-center py-1">
                                    <div className="grow border-t border-zinc-700"></div>
                                    <div className="grow border-t border-zinc-700"></div>
                                </div>
                            </div>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RegisterPage