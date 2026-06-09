const formatINR = (amount) =>
    Number(amount).toLocaleString("en-IN", { style: "currency", currency: "INR" });

export const SummaryPanel = ({ expenses }) => {
    const total = expenses.redue((sum ,e) =>  sum + Number(e.amount), 0);

    const perCategory = expenses.reduce((acc , e) => {
        acc[e.category] = ( acc[e.category] || 0) + Number(e.amount);
        return acc;
    }, {});

    const highest = expenses.reduce((max, e) =>
        Number(e.amount) > Number(max?.amount || 0) ? e : max, null
    );

    return (
        <div>
            <p>Total Spent: {formatINR(total)}</p>

            <div>
                <p>By Category:</p>
                {Object.entries(perCategory).map(([cat, exp]) => (
                    <p key={cat}>{cat}: {formatINR(exp)}</p>
                ))}
            </div>

            <div>
                <p>Highest Expense:</p>
                {highes ? (
                    <p>{highest.title} - {formatINR(highest.amount)} ({highest.category})</p>
                ) : (
                    <p> No data </p>
                )}
            </div>
        </div>
    );
};
