import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "@/components/ui/Button/button";
import { useAppSelector } from "@/services/store/store";
const MakeupArtistSection = () => {
    const { stylists } = useAppSelector((state) => state.stylists);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />, // Sử dụng nút tùy chỉnh
        prevArrow: <PrevArrow />, // Sử dụng nút tùy chỉnh
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
                            <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/460869808_3762001557399439_4877959658229225624_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG7ePPB6KZv4DwKgU2W3E-0XfZoyybNOQNd9mjLJs05A-LIsxdHXe-Aq0soB8TtVxPdzXyXVTwFUk_iGL7ZoN2R&_nc_ohc=mgjl8NOfvC8Q7kNvgHjC6Km&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=ASbBL-QNOE_MYmQdLsPCmnQ&oh=00_AYBbsx2POGoaMzuWFT8oGuNlL6j_sGoRjkIWMK4PhXpz8w&oe=66FA854F" alt="Danica Lewis" className="w-full h-80 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-bold text-black">{stylist.firstName} {stylist.lastName}</h3>
                            <p className="text-lg text-gray-600">{stylist.positionId} </p>
                        </div>))}
                </Slider>
            </div>
        </section>
    );
};

export default MakeupArtistSection;
