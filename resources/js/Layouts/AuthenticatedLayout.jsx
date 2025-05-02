import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <div
                className={`w-64 bg-white border-r transition-all duration-300 flex flex-col ${
                    sidebarOpen ? "block" : "hidden"
                } sm:flex`}
            >
                {/* Top Logo */}
                <div className="h-16 flex items-center gap-2 p-4">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-gray-800" />
                    </Link>
                    <h1 className="text-2xl font-semibold">E D U X</h1>
                </div>

                {/* Main nav links */}
                <div className="flex flex-col gap-2 flex-1 p-4">
                    <p className="text-gray-600 font-normal">Overview</p>

                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                        className="w-full block text-left font-semibold"
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        href={route("classroom")}
                        active={route().current("classroom")}
                        className="w-full block text-left font-bold"
                    >
                        Class
                    </NavLink>
                </div>

                {/* Sticky Profile + Logout */}
                <div className="p-4 border-t bg-white sticky bottom-0">
                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                        className="w-full px-3 py-2 rounded-md text-sm font-medium text-gray-500"
                    >
                        Profile
                    </NavLink>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full px-3 py-2 text-left rounded-md text-sm font-medium text-red-500 hover:text-red-800"
                    >
                        Log Out
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col flex-1 min-h-screen">
                {/* Top Bar */}
                <header className="flex items-center h-16 bg-gray-100 px-4 sm:px-6 lg:px-8 gap-4">
                    {/* Sidebar Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="sm:hidden text-gray-600 hover:text-gray-800"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Search input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* User Name */}
                    <div className="text-gray-800 font-medium whitespace-nowrap">
                        {user.firstname}
                    </div>
                </header>

                {/* Content scrolls independently if needed */}
                <div className="flex-1 overflow-y-auto">
                    <main className="p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
