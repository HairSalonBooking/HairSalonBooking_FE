import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/services/store/store";

const ServicePage = () => {
    const { services } = useAppSelector((state) => state.services);

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
                        <a href="/services" className="text-gray-400">
                            Dịch Vụ
                        </a>
                    </nav>
                    {/* Title */}
                    <h1 className="text-center text-4xl font-bold mb-5">Dịch Vụ</h1>

                    {/* Services Grid */}
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {services && services.map((service, index) => (
                            <Link to={`/services/${service.id}`} key={index}>
                                <div className="relative group cursor-pointer no-underline">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-2 left-2 text-white font-extrabold tracking-wide">
                                        <h3 className="shadow-md text-2xl">{service.name}</h3>
                                        <h3 className="shadow-md text-2xl">{service.price} $</h3>
                                        <h3 className="shadow-md">{service.description}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Booking Button */}
                    <div className="text-center mt-10">
                        <a href="/booking">
                            <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-all">
                                Đặt Lịch
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServicePage;
