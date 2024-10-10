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
import ConfirmDelete from "../popup/ConfirmDelete/ConfirmDelete"; // Import ConfirmDelete component
import { deleteService, getAllService } from "@/services/features/service/serviceSlice";
import CreateServicePopup from "../popup/CreateService/CreateServicePopup";

const TableService = () => {
    const dispatch = useAppDispatch(); // Khởi tạo dispatch
    const { services } = useAppSelector(state => state.services);

    // State for delete confirmation popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState<number | null>(null);

    // State for create service popup
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    // Close delete confirmation popup
    const closeDeletePopup = () => {
        setIsPopupOpen(false);
        setServiceIdToDelete(null); // Reset ID when popup is closed
    };

    // Handle delete button click
    const handleDeleteClick = (id: number) => {
        setServiceIdToDelete(id); // Store the service ID to delete
        setIsPopupOpen(true); // Open the delete confirmation popup
    };

    // Confirm and execute service deletion
    const handleConfirmDelete = async () => {
        if (serviceIdToDelete !== null) {
            await dispatch(deleteService({ id: serviceIdToDelete }));
            dispatch(getAllService()); // Refresh the list of services after deletion
            closeDeletePopup(); // Close the popup
        }
    };

    // Open create service popup
    const openCreatePopup = () => {
        setIsCreatePopupOpen(true);
    };

    // Close create service popup
    const closeCreatePopup = () => {
        setIsCreatePopupOpen(false);
    };

    return (
        <>
            <div className="my-6 flex flex-row justify-between items-center">
                <h2 className="font-bold text-xl">List Service Management</h2>
                <button
                    className="border border-slate-600 p-2 rounded-lg text-white bg-green-600 font-bold"
                    onClick={openCreatePopup} // Open create service form
                >
                    Create Service
                </button>
            </div>

            <Table>
                <TableCaption>A list of your recent services.</TableCaption>
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
                                            onClick={() => handleDeleteClick(service.id)} // Trigger delete
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

            {/* Confirm Delete Popup */}
            <ConfirmDelete
                isOpen={isPopupOpen}
                onClose={closeDeletePopup}
                onConfirm={handleConfirmDelete}
            />

            {/* Create Service Popup */}
            <CreateServicePopup
                isOpen={isCreatePopupOpen}
                onClose={closeCreatePopup}
            />
        </>
    );
};

export default TableService;
