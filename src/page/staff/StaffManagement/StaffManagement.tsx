import SideBarStaff from "@/components/layout/Sidebar/SidebarStaff";
import TableStaff from "@/components/TableStaff/TableStaff";
import { useState } from "react";

const StaffManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <SideBarStaff onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <TableStaff />
            </div>
        </div>
    );
};

export default StaffManagement;