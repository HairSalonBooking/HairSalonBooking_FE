import SideBarStylist from "@/components/layout/Sidebar/SidebarStylist";
import TableShiftForStylist from "@/components/TableStylist/TableShiftForStylist";
import { useState } from "react";

const ShiftManagementOfStylist = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <SideBarStylist onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <TableShiftForStylist />
            </div>
        </div>
    );
};

export default ShiftManagementOfStylist;
