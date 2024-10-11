import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { getServiceById } from "@/services/features/service/serviceSlice";
import { ClipLoader } from "react-spinners";  // Thêm react-spinners để hiển thị loading

const ServiceDetailPage = () => {
    const { id } = useParams();  // Lấy id từ URL
    const dispatch = useAppDispatch();
    const { service, loading } = useAppSelector((state) => state.services);

    useEffect(() => {
        if (id) {
            dispatch(getServiceById({ id: Number(id) }));  // Gọi API với id
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#FBBF24" size={60} />  {/* Loading spinner */}
            </div>
        );
    }

    if (!service) {
        return <div className="text-center text-white">Không tìm thấy dịch vụ.</div>;
    }

    return (
        <>
            <Header />
            <div className="bg-gray-900 text-white py-20 flex items-center justify-center" style={{ minHeight: '75vh' }}>
                <div className="container mx-auto px-4 lg:px-20">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-5 flex justify-center">
                        <a href="/home" className="text-white hover:text-yellow-500">
                            Trang chủ
                        </a>
                        <span className="mx-2 text-gray-400">/</span>
                        <a href="/services" className="text-gray-400">
                            Dịch Vụ
                        </a>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-yellow-500">{service.name}</span>
                    </nav>
                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex justify-center">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-5">{service.name}</h1>
                            <p className="text-xl mb-5">{service.description}</p>
                            <p className="text-2xl font-semibold text-yellow-500 mb-10">Price: {service.price} $</p>
                            <a href="/booking">
                                <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-all">
                                    Đặt Lịch
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceDetailPage;
