const formatINR = (amount) =>
    Number(amount).toLocaleString("en-IN", { style: "currency", currency: "INR" });

export const SummaryPanel = ({ expenses }) => {
    const total = expenses.reduce((sum ,e) =>  sum + Number(e.amount), 0);

    const perCategory = expenses.reduce((acc , e) => {
        acc[e.category] = ( acc[e.category] || 0) + Number(e.amount);
        return acc;
    }, {});

    const highest = expenses.reduce((max, e) =>
        Number(e.amount) > Number(max?.amount || 0) ? e : max, null
    );

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 mb-4 sm:mb-6">
            <div className="bg-navy-light rounded-xl border border-white/10 p-4 sm:p-5">
                <p className="text-xs font-medium text-light/40 uppercase tracking-wide mb-1">Total Spent</p>
                <p className="text-xl sm:text-2xl font-semibold text-teal">{formatINR(total)}</p>
                <p className="text-xs text-light/30 mt-1">{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="bg-navy-light rounded-xl border border-white/10 p-4 sm:p-5">
                <p className="text-xs font-medium text-light/40 uppercase tracking-wide mb-2">By Category</p>
                {Object.entries(perCategory).length === 0 ? (
                    <p className="text-sm text-light/30">No data</p>
                ) : (
                    Object.entries(perCategory).map(([cat, amt]) => (
                        <div key={cat} className="flex justify-between text-xs sm:text-sm py-0.5 gap-2">
                            <span className="text-light/50 truncate">{cat}</span>
                            <span className="font-medium text-light shrink-0">{formatINR(amt)}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="bg-navy-light rounded-xl border border-white/10 p-4 sm:p-5 xs:col-span-2 lg:col-span-1">
                <p className="text-xs font-medium text-light/40 uppercase tracking-wide mb-1">Highest Expense</p>
                {highest ? (
                    <>
                        <p className="text-lg sm:text-xl font-semibold text-red-400">{formatINR(highest.amount)}</p>
                        <p className="text-sm text-light/50 mt-1 truncate">{highest.title}</p>
                        <span className="inline-block mt-1 text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">
                            {highest.category}
                        </span>
                    </>
                ) : (
                    <p className="text-sm text-light/30">No data</p>
                )}
            </div>
        </div>
    );
};
