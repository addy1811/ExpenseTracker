export const ExportButton = ({expenses}) => {
    const expCSV = () => {
        if(!expenses.length) return;
    
        const headers = ["Title", "Amount", "Category", "Date"];
        const rows = expenses.map((e) => [
            e.title,
            e.amount,
            e.category,
            new Date(e.created_at).toLocaleDateString("en-IN"),
        ]);

        const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csv], {type : "text/csv"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "expenses.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return(
        <button onClick={expCSV}
                disabled={!expenses.length}
                className="text-sm border border-white/10 text-light/70 px-4 py-2 rounded-lg hover:bg-navy transition disabled:opacity-40 flex items-center gap-2"        
        >
            Export CSV
        </button>
    );
};