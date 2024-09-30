
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BookingForm from "@/components/service/BookingForm";

const BookingPage = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-900"> {/* Sửa lỗi màu nền */}
                <Header />
                <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 xl:px-6 text-white">
                    <h1 className="text-4xl font-bold mb-8 text-center">Đặt lịch</h1>
                    <BookingForm />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default BookingPage;
