import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface QueryParams {
    token?: string;
    stylistId?: string;
    paymentId?: string;
    PayerID?: string;
}

const PaymentSuccessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { search } = location;
    const queryParams: QueryParams = queryString.parse(search) as QueryParams;

    // Lấy các tham số cần thiết từ URL
    const stylistId = queryParams.stylistId;
    const paymentId = queryParams.paymentId;
    const payerID = queryParams.PayerID;

    const transactionStatus = '00'; // Giả lập thành công cho mẫu này

    const [countdown, setCountdown] = useState<number>(5); // Thời gian đếm ngược

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home'); // Chuyển hướng về trang chủ sau khi đếm ngược kết thúc
        }, countdown * 1000); // Sau số giây countdown

        const interval = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1); // Giảm thời gian đếm ngược mỗi giây
        }, 1000); // Đếm ngược mỗi giây

        // Xóa timer và interval khi component unmount
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [countdown, navigate]);

    return (
        <div className="container mx-auto py-12">
            {transactionStatus === '00' ? (
                <>
                    <div className="text-center mb-8">
                        <FontAwesomeIcon icon={faCheckCircle} size="4x" className="text-green-500" />
                        <h2 className="text-3xl font-semibold mt-4">Payment Successful!</h2>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                        <p><strong>Payment ID: </strong>{paymentId}</p>
                        <p><strong>Stylist ID: </strong>{stylistId}</p>
                        <p><strong>Payer ID: </strong>{payerID}</p>
                        <p className="mt-4">Thank you for choosing our service. We hope you had a safe and enjoyable experience.</p>
                        <p className="mt-4">You will be redirected to the home page in {countdown} seconds...</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-center mb-8">
                        <FontAwesomeIcon icon={faTimesCircle} size="4x" className="text-red-500" />
                        <h2 className="text-3xl font-semibold mt-4">Payment Failed!</h2>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                        <p>Unfortunately, your payment was not successful. Please try again or contact support if you continue to experience issues.</p>
                        <p className="mt-4">You will be redirected to the home page in {countdown} seconds...</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentSuccessPage;
