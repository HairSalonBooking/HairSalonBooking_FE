import { useState, useEffect } from "react";
import SideBar from "@/components/layout/Sidebar/Sidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/Overview";
import { RecentSales } from "@/components/dashboard/Recentsales";
import { useAppDispatch, useAppSelector } from "@/services/store/store";
import { getTotalBookings, getTotalFeedback, getTotalRevenue, getTotalUsers } from "@/services/features/dashboard/dashboardSlice";

export default function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useAppDispatch();

    // Select dashboard data from Redux store
    const { totalUsers, totalRevenue, totalBookings, totalFeedback, loading } = useAppSelector(
        (state) => state.dashboards
    );

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);
    };

    // Dispatch the API calls once when the component mounts
    useEffect(() => {
        dispatch(getTotalUsers());
        dispatch(getTotalRevenue());
        dispatch(getTotalBookings());
        dispatch(getTotalFeedback());
    }, [dispatch]);

    return (
        <div className="flex h-screen">
            <div className="fixed z-50">
                <SideBar onToggle={handleSidebarToggle} />
            </div>
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}>
                <div className="hidden flex-col md:flex">
                    <div className="border-b"></div>
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        </div>
                        <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {/* Total Revenue Card */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {loading ? "Loading..." : `$${totalRevenue}`}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Subscriptions Card */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {loading ? "Loading..." : totalUsers}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Booking Card */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Booking</CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                                <path d="M2 10h20" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {loading ? "Loading..." : totalBookings}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Feedback Card */}
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Feedback</CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {loading ? "Loading..." : totalFeedback}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Overview and Recent Sales Sections */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <Card className="col-span-4">
                                        <CardHeader>
                                            <CardTitle>Overview</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pl-2">
                                            <Overview />
                                        </CardContent>
                                    </Card>
                                    <Card className="col-span-3">
                                        <CardHeader>
                                            <CardTitle>Recent Sales</CardTitle>
                                            <CardDescription>You made 265 sales this month.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RecentSales />
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
