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
import CreateSalaryStylist from "./CreateSalaryStylist";

const TableStylist = () => {
    const dispatch = useAppDispatch();
    const formatCurrency = useFormatCurrency();
    const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { stylists } = useAppSelector(state => state.stylists);
    const [isPopupCreateSalary, setIsPopupCreateSalary] = useState(false);
    const [chooseStylistId, setChooseStylistId] = useState<number | null>(null);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        dispatch(getAllStylist());
    }, [dispatch]);

    const handlePaidOnClick = (id: number) => {
        setChooseStylistId(id);
        setIsPopupConfirmOpen(true);
    };

    const closeConfirmPopup = () => {
        setIsPopupConfirmOpen(false);
        setChooseStylistId(null);
    };

    const handleConfirmPaidOn = async () => {
        if (chooseStylistId !== null) {
            await dispatch(paidSalary({ id: chooseStylistId }));
            dispatch(getAllStylist());
            closeConfirmPopup();
        }
    };

    const handleOpenCreateSalary = (id: number) => {
        setChooseStylistId(id);
        setIsPopupCreateSalary(true);
    };

    const closeCreateSalaryPopup = () => {
        setIsPopupCreateSalary(false);
        setChooseStylistId(null);
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
                        <TableHead className="text-right">New Salary</TableHead>
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
                                {stylist.salaryData?.SalaryId === null && (
                                    <button
                                        onClick={() => handleOpenCreateSalary(stylist.id)}
                                        className="border border-green-600 p-2 rounded-lg text-white bg-green-500 font-bold"
                                    >
                                        Create Salary
                                    </button>)}
                            </TableCell>

                            <TableCell className="text-right">
                                {stylist.salaryData?.SalaryId !== null && stylist.salaryData.PaidOn === null ? (
                                    <>
                                        <button
                                            onClick={() => handlePaidOnClick(stylist.salaryData.SalaryId)}
                                            className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold"
                                        >
                                            Pay
                                        </button>

                                    </>
                                ) : (
                                    stylist.salaryData?.PaidOn !== null && (
                                        <span className="text-xs block mt-2">
                                            {formatAnyDate(stylist.salaryData.PaidOn)}
                                        </span>
                                    )

                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <CreateStylistPopup isOpen={isPopupOpen} onClose={closePopup} />
            <CreateSalaryStylist
                isOpen={isPopupCreateSalary}
                onClose={closeCreateSalaryPopup}
                stylistId={chooseStylistId ?? undefined}
            />
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
