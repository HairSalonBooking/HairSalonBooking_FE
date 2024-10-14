import { PaymentDetails } from '@/interfaces/Payment';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const PaymentSuccessPage: React.FC = () => {
    const location = useLocation();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

    // Extract query params from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token') || '';
        const stylistId = searchParams.get('stylistId') || '';
        const paymentId = searchParams.get('paymentId') || '';
        const payerId = searchParams.get('PayerID') || '';

        // Store the payment details in state
        setPaymentDetails({
            token,
            stylistId,
            paymentId,
            payerId,
        });
    }, [location.search]);

    if (!paymentDetails) {
        return <div>Loading payment details...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://img.icons8.com/?size=100&id=108637&format=png&color=000000"
                        alt="Success"
                        className="w-50 h-50"
                    />
                </div>
                <h1 className="text-2xl font-bold text-blue-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-500 mb-6">
                    Your payment has been successfully processed. Below are your payment details:
                </p>
                <div className="mb-6 space-y-4">
                    <div className="text-sm text-gray-600">
                        <strong>Stylist ID:</strong> {paymentDetails.stylistId}
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Payment ID:</strong> {paymentDetails.paymentId}
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>Payer ID:</strong> {paymentDetails.payerId}
                    </div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                    onClick={() => window.location.href = '/'}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
