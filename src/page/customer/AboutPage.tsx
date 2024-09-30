import React from "react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const AboutPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <section className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold mb-4">Giới Thiệu Về HairSalon</h1>
                        <p className="text-lg max-w-2xl mx-auto">
                            Chúng tôi tự hào là một trong những salon hàng đầu, mang đến những dịch vụ chăm sóc tóc chuyên nghiệp và thời thượng.
                            Với đội ngũ nhân viên tận tâm và chuyên nghiệp, chúng tôi luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-3xl font-semibold mb-4">Sứ Mệnh của Chúng Tôi</h2>
                                <p className="mb-4">
                                    HairSalon luôn hướng tới mục tiêu trở thành người bạn đồng hành đáng tin cậy của khách hàng. Chúng tôi cam kết
                                    mang đến những trải nghiệm tốt nhất, sử dụng các sản phẩm chất lượng cao và kỹ thuật tiên tiến để làm đẹp cho mái tóc của bạn.
                                </p>
                                <p>
                                    Đến với HairSalon, mỗi khách hàng sẽ được tận hưởng dịch vụ chăm sóc tóc toàn diện từ tư vấn, tạo kiểu, đến chăm sóc da đầu. Chúng tôi không chỉ cung cấp dịch vụ mà còn tạo ra giá trị về cái đẹp cho cuộc sống của bạn.
                                </p>
                            </div>
                            <div>
                                <img
                                    src="https://hourglasslex.com/wp-content/uploads/2023/08/The-Importance-of-Consultations-in-Hair-Salon-Services-min-scaled.jpeg" // Đặt đường dẫn hình ảnh ở đây
                                    alt="HairSalon"
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-900 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-semibold text-center mb-8">Tại Sao Chọn Chúng Tôi?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Dịch Vụ Chuyên Nghiệp</h3>
                                <p>
                                    Đội ngũ chuyên viên với nhiều năm kinh nghiệm, không ngừng học hỏi và cập nhật xu hướng mới nhất để phục vụ khách hàng tốt nhất.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Sản Phẩm Chất Lượng</h3>
                                <p>
                                    Chúng tôi chỉ sử dụng các sản phẩm chăm sóc tóc cao cấp từ những thương hiệu nổi tiếng để đảm bảo sức khỏe cho mái tóc của bạn.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Không Gian Sang Trọng</h3>
                                <p>
                                    Không gian salon được thiết kế hiện đại, tạo cảm giác thư giãn và thoải mái cho khách hàng khi đến trải nghiệm dịch vụ.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
