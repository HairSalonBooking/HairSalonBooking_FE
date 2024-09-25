import RegisterForm from '@/components/authentication/RegisForm'

const RegisterPage = () => {
    return (
        <>
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
        </>
    )
}

export default RegisterPage