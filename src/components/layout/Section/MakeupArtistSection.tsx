import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "@/components/ui/Button/button";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { useEffect } from "react";
import { getAllStylist } from "@/services/features/stylist/stylistSlice";

const MakeupArtistSection = () => {
    const dispatch = useAppDispatch();
    const { stylists } = useAppSelector((state) => state.stylists);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />, // Sử dụng nút tùy chỉnh
        prevArrow: <PrevArrow />, // Sử dụng nút tùy chỉnh
    };

    useEffect(() => {
        dispatch(getAllStylist());
    }, [dispatch]);

    // Hàm chuyển đổi positionId thành tên vị trí
    const getPositionName = (positionId: string) => {
        switch (positionId) {
            case "P0":
                return "Apprentice Barber";
            case "P1":
                return "Barber";
            case "P2":
                return "Master Barber";
            default:
                return "Apprentice Barber";
        }
    };

    return (
        <section className="py-16 bg-[#f7f3e9]">
            <div className="container mx-auto relative">
                <p className="text-center text-sm font-semibold tracking-wide text-[#c49b66] uppercase mb-2">
                    Artistic Director
                </p>
                <h2 className="text-center text-5xl font-extrabold text-black">
                    Makeup Artist
                </h2>
                <p className="mt-4 text-center text-xl font-medium text-gray-600">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
                </p>

                <Slider {...settings} className="mt-12 mx-6">
                    {/* Các slide chứa thông tin về Makeup Artist */}
                    {stylists && stylists.map((stylist, index) => (
                        <div
                            key={index}
                            className="shadow-lg p-6 gap-8 rounded-lg bg-white hover:bg-[#e7cbaa] transition-transform duration-300">
                            <img
                                src={stylist?.image}
                                alt="Makeup Artist"
                                className="w-full h-80 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold text-black">{stylist.firstName} {stylist.lastName}</h3>
                            {/* Hiển thị tên vị trí dựa trên positionId */}
                            <p className="text-lg text-gray-600">{getPositionName(stylist.positionId ?? "Apprentice Barber")}</p>
                        </div>))}
                </Slider>
            </div>
        </section>
    );
};

export default MakeupArtistSection;
