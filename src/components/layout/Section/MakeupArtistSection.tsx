import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "@/components/ui/Button/button";
const MakeupArtistSection = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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

                <Slider {...settings} className="mt-12">
                    {/* Các slide chứa thông tin về Makeup Artist */}
                    <div className="shadow-lg p-6 rounded-lg bg-white hover:bg-[#e7cbaa] transition-transform duration-300">
                        <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/460869808_3762001557399439_4877959658229225624_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG7ePPB6KZv4DwKgU2W3E-0XfZoyybNOQNd9mjLJs05A-LIsxdHXe-Aq0soB8TtVxPdzXyXVTwFUk_iGL7ZoN2R&_nc_ohc=mgjl8NOfvC8Q7kNvgHjC6Km&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=ASbBL-QNOE_MYmQdLsPCmnQ&oh=00_AYBbsx2POGoaMzuWFT8oGuNlL6j_sGoRjkIWMK4PhXpz8w&oe=66FA854F" alt="Danica Lewis" className="w-full h-80 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-bold text-black">Phan Văn Hùng</h3>
                        <p className="text-lg text-gray-600">Hair Stylist</p>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-white hover:bg-[#e7cbaa] transition-transform duration-300">
                        <img src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/456176310_1647612279422737_4364782612418564619_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeE5EpWh8yIfoHcFCcgBvL3JXjyroMrlSsNePKugyuVKw072K13kCPkB9FQNlkKoUex6DjVGcziELmhS0hkr-4Va&_nc_ohc=x4O_hFsDwKMQ7kNvgHrg3WV&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=ASaHVlfMhDsksYeA4MPAaU8&oh=00_AYACTeoVuZZEfnEqXWVZxyKsY43BDfMrHrOWdKsR5KYxmw&oe=66FA6BA2" alt="Nicole Simon" className="w-full h-80 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-bold text-black">Nguyễn Thành Tài</h3>
                        <p className="text-lg text-gray-600">Nail Master</p>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-white hover:bg-[#e7cbaa] transition-transform duration-300">
                        <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/186238741_955115198652876_1730874987415304007_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHJE17Sa1V-puh38aSaZKktDeX-iIa0t9sN5f6IhrS32_kwNg-cIKVS5wrxhr88CXpcLr9DPpp6_IN9JQJtC59J&_nc_ohc=oUDr5qXNutwQ7kNvgEIiRrQ&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=AvBYN0JP0lBQjmb4shLD7SC&oh=00_AYBPYrGmammeQBmvoKPFW4uADLoiIN0oaHghWkrvVgjiCg&oe=671C0F6E" alt="Cloe Meyer" className="w-full h-80 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-bold text-black">Cao Khắc Bảo</h3>
                        <p className="text-lg text-gray-600">Director</p>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-white hover:bg-[#e7cbaa] transition-transform duration-300">
                        <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t1.6435-9/82788211_2487531828179758_6297835117356253184_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeGIft2jRIg13AyY2jH3Pv4oQoCuQGTZkhNCgK5AZNmSE2aQibVTuJS45U4YPb52Eyeismk8Wy25Kz7wAiEYNwwP&_nc_ohc=1tgtTHGNXYIQ7kNvgG4rueG&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Ag1AlvvbuEaVlOTmAzUlDyx&oh=00_AYDSQJ0EHp8x0OKf6fB77g8syCKgU6rTdfAZVJkM8zyQOg&oe=671C0BF0" alt="Rachel Clinton" className="w-full h-80 object-cover rounded-lg mb-4" />
                        <h3 className="text-2xl font-bold text-black">Vũ Thành Đức</h3>
                        <p className="text-lg text-gray-600">Hair Stylist</p>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default MakeupArtistSection;
