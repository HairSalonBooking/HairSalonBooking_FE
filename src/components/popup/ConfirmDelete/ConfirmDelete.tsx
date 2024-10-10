import { FC } from 'react';

type ConfirmDeleteProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ConfirmDelete: FC<ConfirmDeleteProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Không hiển thị popup nếu không mở

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
                <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Xóa
                    </button>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
