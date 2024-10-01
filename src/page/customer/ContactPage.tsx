import ContactForm from "@/components/layout/Contact/ContactForm";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

const ContactPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-800 text-white py-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-5 flex justify-center">
                        <a href="/home" className="text-white hover:text-yellow-500">
                            Trang chủ
                        </a>
                        <span className="mx-2 text-gray-400">/</span>
                        <a href="/contact" className="text-gray-400">
                            Liên Hệ
                        </a>
                    </nav>

                    {/* Title */}
                    <h1 className="text-center text-4xl font-bold mb-5">Liên hệ</h1>

                    {/* Contact Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start">
                        {/* Left Section with Google Map */}
                        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.304722550418!2d106.83606624690682!3d10.841183121427937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175217ea81fe691%3A0xf707ce3e53a1de06!2sT%C3%B2a%20S5.02%20-%20The%20Rainbow%20-%20Vinhomes%20Grand%20Park!5e0!3m2!1svi!2s!4v1727778149090!5m2!1svi!2s"
                                width="100%"
                                height="400"
                                allowFullScreen={true}
                                loading="lazy"
                                className="border-2 border-gray-600 rounded-md shadow-lg"
                                title="Google Map"
                            ></iframe>
                        </div>

                        {/* Right Section with Contact Information and Form */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">Thông tin liên hệ</h2>
                            <p>
                                <strong>Địa chỉ:</strong> Tòa S5.02 - The Rainbow - Vinhomes Grand Park
                            </p>
                            <p><strong>Điện thoại:</strong> 0367.988.177</p>
                            <p><strong>Email:</strong> barbershop190283@gmail.com</p>

                            {/* Social Media Icons */}
                            <div className="my-4">
                                <a href="#" className="inline-block text-gray-600 hover:text-gray-400">
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                            </div>

                            {/* Contact Form */}
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactPage;
