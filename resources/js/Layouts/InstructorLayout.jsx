import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Menu, X, LayoutDashboard, User, LogOut, Settings } from "lucide-react";

export default function InstructorLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-red-100 flex">
            <aside
                className={`bg-white border-r w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
            >
                <div className="flex items-center justify-between mb-6">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto text-indigo-600" />
                    </Link>
                    <button
                        className="md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <nav className="flex flex-col gap-2">
                    <NavLink
                        href={route("instructor.dashboard")}
                        active={route().current("instructor.dashboard")}
                        className="flex items-center gap-2"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("instructor.classList")}
                        active={route().current("instructor.classList")}
                        className="flex items-center gap-2"
                    >
                        Class
                    </NavLink>
                    <NavLink
                        href={route("instructor.create")}
                        active={route().current("instructor.crease")}
                        className="flex items-center gap-2"
                    >
                        Manage Classroom
                    </NavLink>
                    <NavLink
                        href={route("admin.profile")}
                        active={route().current("admin.profile")}
                        className="flex items-center gap-2"
                    >
                        <User className="w-5 h-5" />
                        Profile
                    </NavLink>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm h-16 px-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        {header && (
                            <h2 className="text-lg font-semibold text-gray-700">
                                {header}
                            </h2>
                        )}
                    </div>
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-700 px-3 py-2 rounded-md">
                                    <span>{user.firstname}</span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("admin.profile")}>
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </div>
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <div className="flex items-center gap-2">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </div>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
