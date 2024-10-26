import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

const ContactPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-8 flex justify-center">
                        <a href="/home" className="text-white hover:text-yellow-400 transition-colors duration-200">
                            Home
                        </a>
                        <span className="mx-2 text-gray-500">/</span>
                        <a href="/contact" className="text-gray-400">
                            Contact
                        </a>
                    </nav>

                    {/* Title */}
                    <h1 className="text-center text-5xl font-bold mb-12">Contact Us</h1>

                    {/* Contact Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        {/* Left Section with Google Map */}
                        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.304722550418!2d106.83606624690682!3d10.841183121427937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175217ea81fe691%3A0xf707ce3e53a1de06!2sT%C3%B2a%20S5.02%20-%20The%20Rainbow%20-%20Vinhomes%20Grand%20Park!5e0!3m2!1svi!2s!4v1727778149090!5m2!1svi!2s"
                                width="100%"
                                height="400"
                                allowFullScreen={true}
                                loading="lazy"
                                className="border-4 border-gray-700 rounded-lg shadow-2xl"
                                title="Google Map"
                            ></iframe>
                        </div>

                        {/* Right Section with Contact Information and Form */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h2 className="text-4xl font-semibold mb-6">Contact Information</h2>
                            <p className="text-lg mb-4">
                                <strong>Address:</strong> Tower S5.02 - The Rainbow - Vinhomes Grand Park
                            </p>
                            <p className="text-lg mb-4"><strong>Phone:</strong> 0367.988.177</p>
                            <p className="text-lg mb-4"><strong>Email:</strong> barbershop190283@gmail.com</p>

                            {/* Social Media Icons */}
                            <div className="flex justify-center md:justify-start mt-6">
                                <a
                                    href="#"
                                    className="mr-4 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                                <a
                                    href="#"
                                    className="ml-4 text-gray-500 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
