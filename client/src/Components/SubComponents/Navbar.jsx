import { Link , useLocation } from "react-router-dom";

export const Navbar = () => {
    const { pathname } = useLocation();

    return(
        <nav className="bg-navy-light border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            <span className="text-base sm:text-lg font-semibold text-teal tracking-tight shrink-0">
                ExpenseTracker
            </span>
            <div className="flex gap-1 sm:gap-2">
                <Link to="/" className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition whitespace-nowrap ${
                            pathname === "/"
                            ? "bg-teal text-navy"
                            : "text-light/70 hover:bg-navy"
                            }`} 
                    >Expenses
                </Link>
                <Link to="/add" className={`text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition whitespace-nowrap ${
                            pathname === "/add"
                            ? "bg-teal text-navy"
                            : "text-light/70 hover:bg-navy"
                            }`}
                    >+ Add
                </Link>
            </div>
        </div>
    </nav>
    );
};