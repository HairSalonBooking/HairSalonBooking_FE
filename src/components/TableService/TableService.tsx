import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import ConfirmDelete from "../popup/ConfirmDelete/ConfirmDelete";
import { deleteService, getAllService } from "@/services/features/service/serviceSlice";

const TableService = () => {
    const dispatch = useAppDispatch(); // Khởi tạo dispatch
    const { services } = useAppSelector(state => state.services);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState<number | null>(null); // Thêm kiểu cho ID

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setServiceIdToDelete(null); // Reset ID khi đóng popup
    };

    const handleDeleteClick = (id: number) => {
        setServiceIdToDelete(id); // Lưu ID dịch vụ cần xóa
        setIsPopupOpen(true); // Mở popup xác nhận
    };

    const handleConfirmDelete = async () => {
        if (serviceIdToDelete !== null) {
            await dispatch(deleteService({ id: serviceIdToDelete })); // Gọi action xóa dịch vụ
            dispatch(getAllService()); // Lấy lại danh sách dịch vụ
            closePopup(); // Đóng popup sau khi thực hiện xóa
        }
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List Service Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={openPopup}
                >
                    Create Service
                </button>
            </div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Create At</TableHead>
                        <TableHead className="text-right">Update At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {services && services.length > 0 ? (
                        services.map(service => (
                            service && (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium w-[40vh]">
                                        {service.name || "No Name"}
                                    </TableCell>
                                    <TableCell className="w-[30vh]">
                                        {service.price ?? 0}
                                    </TableCell>
                                    <TableCell>
                                        {service.description
                                            ? (service.description.length > 30
                                                ? `${service.description.slice(0, 30)}...`
                                                : service.description)
                                            : "Empty"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(service.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatAnyDate(service.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <button className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold">Edit</button>
                                        <button
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2"
                                            onClick={() => handleDeleteClick(service.id)} // Gọi hàm xóa với ID dịch vụ
                                        >
                                            Delete
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No services available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Popup xác nhận xóa */}
            <ConfirmDelete
                isOpen={isPopupOpen}
                onClose={closePopup}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

export default TableService;
