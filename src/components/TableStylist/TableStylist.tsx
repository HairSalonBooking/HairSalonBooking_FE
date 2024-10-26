import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import { IStylist } from "@/interfaces/Stylist";
import CreateStylistPopup from "../popup/CreateStylist/CreateStylistPopup";
import { getAllStylist, paidSalary } from "@/services/features/stylist/stylistSlice";
import useFormatCurrency from "@/utils/useFortmatCurrency";
import PopupConfirmAction from "../popup/ConfirmDelete/PopupConfirmAction";

const TableStylist = () => {
    const dispatch = useAppDispatch();
    const formatCurrency = useFormatCurrency();
    const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [stylistIdToPaidOn, setServiceIdToPaidOn] = useState<number | null>(null);

    const { stylists } = useAppSelector(state => state.stylists); // Lấy dữ liệu stylist từ store

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    useEffect(() => {
        dispatch(getAllStylist());
    }, [dispatch]);

    // handlePaidOnClick: Hàm xử lý khi nhấn vào nút "Pay" để chuyển khoản lương cho nhân viên
    const handlePaidOnClick = (id: number) => {
        setServiceIdToPaidOn(id);
        setIsPopupConfirmOpen(true);
    };
    const closeConfirmPopup = () => {
        setIsPopupConfirmOpen(false);
        setServiceIdToPaidOn(null);
    };
    const handleConfirmPaidOn = async () => {
        if (stylistIdToPaidOn !== null) {
            await dispatch(paidSalary({ id: stylistIdToPaidOn }));
            dispatch(getAllStylist());
            closeConfirmPopup();
        }
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List Stylist Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={openPopup}
                >
                    Create Stylist
                </button>
            </div>

            <Table>
                <TableCaption>A list of your stylists.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">First Name</TableHead>
                        <TableHead className="w-[150px]">Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="text-right">Base Salary</TableHead>
                        <TableHead className="text-right">Bonuses</TableHead>
                        <TableHead className="text-right">Total Salary</TableHead>
                        <TableHead className="text-right">Paid On</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stylists && stylists.map((stylist: IStylist) => (
                        <TableRow key={stylist.id}>
                            <TableCell className="font-medium">{stylist.firstName}</TableCell>
                            <TableCell>{stylist.lastName ?? "N/A"}</TableCell>
                            <TableCell>{stylist.email}</TableCell>
                            <TableCell>{stylist.phoneNumber ?? "N/A"}</TableCell>
                            <TableCell>{stylist.gender ?? "N/A"}</TableCell>
                            <TableCell className="text-right">{formatCurrency(stylist.salaryData?.BaseSalary)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(stylist.salaryData?.Bonuses)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(stylist.salaryData?.TotalSalary)}</TableCell>
                            <TableCell className="text-right">
                                {stylist.salaryData?.PaidOn ? (
                                    formatAnyDate(stylist.salaryData?.PaidOn)
                                ) : (
                                    <button
                                        onClick={() => handlePaidOnClick(stylist.salaryData.SalaryId)}
                                        className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold"
                                    >
                                        Pay
                                    </button>
                                )}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Popup component */}
            <CreateStylistPopup isOpen={isPopupOpen} onClose={closePopup} />

            {/* Popup xác nhận xóa */}
            <PopupConfirmAction
                title={"Confirm salary transfer for employee"}
                content={"Are you sure you want to transfer the salary for this employee?"}
                actionDelete={"Transfer"}
                actionCancel={"Cancel"}
                isOpen={isPopupConfirmOpen}
                onClose={closeConfirmPopup}
                onConfirm={handleConfirmPaidOn}
            />
        </>
    );
};

export default TableStylist;