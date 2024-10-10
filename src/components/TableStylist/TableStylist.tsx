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
import { useAppSelector } from "@/services/store/store";
import { formatAnyDate } from "@/utils";
import { IStylist } from "@/interfaces/Stylist";
import CreateStylistPopup from "../popup/CreateStylist/CreateStylistPopup";

const TableStylist = () => {
    const { stylists } = useAppSelector(state => state.stylists); // Lấy dữ liệu stylist từ store
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
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
                        <TableHead className="text-right">Created At</TableHead>
                        <TableHead className="text-right">Updated At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
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
                            <TableCell className="text-right">{formatAnyDate(stylist.createdAt)}</TableCell>
                            <TableCell className="text-right">{formatAnyDate(stylist.updatedAt)}</TableCell>
                            <TableCell className="text-right">
                                <button className="border border-slate-600 p-2 rounded-lg text-white bg-slate-800 font-bold">Edit</button>
                                <button className="border border-slate-600 p-2 rounded-lg text-white bg-red-600 font-bold ml-2">Delete</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Popup component */}
            <CreateStylistPopup isOpen={isPopupOpen} onClose={closePopup} />
        </>
    );
};

export default TableStylist;
