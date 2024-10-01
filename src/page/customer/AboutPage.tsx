import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const AboutPage = () => {
    return (
        <>
            <Header />
            <div className="bg-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-5 flex justify-center">
                        <a href="/home" className="text-white hover:text-yellow-500">
                            Trang chủ
                        </a>
                        <span className="mx-2 text-gray-400">/</span>
                        <a href="/about" className="text-gray-400">
                            Giới Thiệu
                        </a>
                    </nav>

                    {/* Title */}
                    <h1 className="text-center text-4xl font-bold mb-5">Giới Thiệu</h1>

                    {/* Section 1 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            HairCare Salon: Tôn Vinh Vẻ Đẹp Tự Nhiên Của Bạn
                        </h2>
                        <p className="text-lg mb-6">
                            Tại HairCare Salon, chúng tôi tin rằng mái tóc không chỉ là một phần của ngoại hình mà còn là nét độc đáo thể hiện cá tính của mỗi người. Được thành lập với sứ mệnh mang đến sự hoàn hảo trong từng chi tiết, HairCare Salon tự hào là nơi mang đến các dịch vụ chăm sóc tóc chuyên nghiệp, từ cắt tóc, tạo kiểu, đến các liệu pháp phục hồi tóc chuyên sâu.
                        </p>
                        <img
                            src="https://archello.s3.eu-central-1.amazonaws.com/images/2022/04/25/noke-architects-hair-salon-interiors-inspired-by-desert-landscape-wellness-centres-archello.1650910390.2929.jpg" // Replace with the correct image URL
                            alt="Xing Salon"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 2 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Xing Hair Salon: Làm Đẹp Tóc - Tạo Nên Cá Tính Riêng
                        </h2>
                        <p className="text-lg mb-6">
                            Với đội ngũ chuyên gia giàu kinh nghiệm và sự tận tâm trong từng thao tác,
                            chúng tôi cam kết mang lại cho khách hàng không chỉ là một diện mạo mới mà còn là
                            sự tự tin và hài lòng tuyệt đối. HairCare Salon luôn cập nhật các xu hướng thời
                            trang tóc mới nhất, sử dụng những sản phẩm chăm sóc tóc cao cấp để đảm bảo mái tóc
                            của bạn luôn được nuôi dưỡng và khỏe mạnh.
                        </p>
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/5e29bc191bc1146fbde14230/1633447847079-C597QL7C8T0C6T284ECU/salon+interior+design.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 3 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">Dịch Vụ Tại Xing Hair Salon</h2>
                        <p className="text-lg mb-6">
                            Tại salon, chúng tôi cung cấp các dịch vụ cắt, tạo kiểu, và chăm
                            sóc tóc đặc biệt dành riêng cho khách hàng. Bất kỳ nhu cầu nào về
                            tóc của bạn, chúng tôi luôn sẵn sàng cung cấp giải pháp tốt nhất.
                        </p>
                        <p className="text-lg mb-6">
                            Với không gian hiện đại, phong cách sang trọng, khách hàng khi đến
                            với chúng tôi không chỉ để làm đẹp mà còn để trải nghiệm không
                            gian thư giãn tuyệt vời. Mỗi dịch vụ của chúng tôi đều đi kèm với
                            các sản phẩm chăm sóc tóc cao cấp, cam kết mang lại sự hài lòng
                            tuyệt đối.
                        </p>
                        <img
                            src="https://www.takarahairdressing.co.uk/images/salon-design/step-2-left.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 4*/}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Chất Lượng Và Khách Hàng Là Trên Hết
                        </h2>
                        <p className="text-lg mb-6">
                            Không gian sang trọng và thoải mái của HairCare Salon
                            được thiết kế để mang đến cho bạn những phút giây thư giãn
                            trọn vẹn trong quá trình làm đẹp. Tại đây, khách hàng không
                            chỉ được tận hưởng dịch vụ chăm sóc tóc hoàn hảo mà còn được
                            phục vụ tận tình, chu đáo với tinh thần chuyên nghiệp.
                        </p>
                        <img
                            src="https://cdn.prod.website-files.com/65e78d77c85e6169e48b2f17/66331c087fcec9581f31394d_interior1%2520%25281%2529.jpeg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Section 5 */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Liên Hệ Với HairCare Salon Ngay Hôm Nay

                        </h2>
                        <p className="text-lg mb-6">
                            Nếu bạn đang tìm kiếm một salon chất lượng và đáng tin cậy để nhuộm tóc và làm đẹp tóc tại quận 9,
                            hãy đến với Xing Hair Salon địa chỉ Tòa S5.02 - The Rainbow - Vinhomes Grand Park.
                            Chúng tôi sẽ biến ước mơ về mái tóc hoàn hảo của bạn thành hiện thực.
                            Hãy để HairCare Salon giúp bạn tỏa sáng và thể hiện cá tính qua mái tóc của mình.
                        </p>
                        <img
                            src="https://img.freepik.com/premium-photo/industrial-hair-dressing-barbershop-hair-salon-interior-design-concept_861577-1497.jpg" // Replace with the correct image URL
                            alt="Xing Salon Interior"
                            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto mb-8 rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
