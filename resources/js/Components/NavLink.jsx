import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none " +
                (active ? "text-red-500" : "text-gray-600 hover:bg-gray-100") +
                " " +
                className
            }
        >
            {children}
        </Link>
    );
}
