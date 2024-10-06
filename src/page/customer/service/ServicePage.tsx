import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/services/store/store";

const ServicePage = () => {
    const { services } = useAppSelector((state) => state.services);
    // const services = [
    //     {
    //         name: "Nhuộm",
    //         image: "https://tiki.vn/blog/wp-content/uploads/2023/01/bang-mau-nhuom-toc-1-1.jpg",
    //     },
    //     {
    //         name: "Phục Hồi",
    //         image: "https://lavo.com.vn/wp-content/uploads/2021/07/hap-phuc-hoi-toc-2-1-min.jpg",
    //     },
    //     {
    //         name: "Duỗi",
    //         image: "https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/toc-duoi-tu-nhien/toc-duoi-thang-tu-nhien-la-nhu-the-nao.jpg",
    //     },
    //     {
    //         name: "Uốn",
    //         image: "https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/tin-tuc-onpage/kieu-toc-uon-dep/kieu-toc-uon-gon-song-nhe.jpg",
    //     },
    //     {
    //         name: "Nối Tóc",
    //         image: "https://www.allthingshair.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fzqgvoczt%2Fproduction%2F658ddb2e6c9029ece8a5a5482d2908ec93da5efa-1200x800.jpg%3Fq%3D85%26fit%3Dclip%26auto%3Dformat&w=3840&q=75",
    //     },
    //     {
    //         name: "Cắt",
    //         image: "https://i.pinimg.com/originals/33/33/43/3333433e712f28c122bd8e9cde8e1eac.png",
    //     },
    // ];

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
                            <Link to={`/services/${service.name.toLowerCase()}`} key={index}>
                                <a className="relative group cursor-pointer no-underline">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                                    />
                                    {/* Service Name on Image */}
                                    <div className="absolute bottom-2 left-2 text-white font-extrabold tracking-wide">
                                        <h3 className="shadow-md text-2xl">{service.name}</h3>
                                        <h3 className="shadow-md">{service.descriptionMarkdown}</h3>
                                    </div>
                                </a>
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
