import { useState , useEffect , useMemo} from "react";
import { ExpenseRow } from "./ExpenseRow";
import { FilterExpense } from "./FilterExpense";
import { SummaryPanel } from "./SummaryPanel";
import { CategoryChart } from "./CategoryChart";
import { ExportButton } from "./ExportButton";
import { Spinner } from "./SubComponents/Spinner";

const filtering = (expenses , filters) => {
    const now =  new Date();
    return expenses.filter((e) => {
        if(filters.category !== "All" && e.category !== filters.category) return false;

        const date = new Date(e.created_at);
        if(filters.dateRange === "thisMonth"){
            return date.getMonth() === now.getMonth() 
            && date.getFullYear() === now.getFullYear();
        }
        if(filters.dateRange === "lastMonth"){
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            return date.getMonth() === lastMonth.getMonth()
                && date.getFullYear() === lastMonth.getFullYear();
        }

        if(filters.dateRange === "custom"){
            const start = filters.startDate ? new Date(filters.startDate) : null;
            const end = filters.endDate ? new Date(filters.endDate) : null;
            if(start && date < start) return false;
            if(end && date > end) return false;
        }
        return true;
    });
};
export const ExpenseList = () => {
    const [expenses , setExpenses] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");
    const [editId , setEditId] = useState(null);
    const [filters , setFilters] = useState({
        category : "All",
        dateRange : "thisMonth",
        startDate : "",
        endDate : "",
    });
    useEffect( () => {
        const fetchExp = async() => {
            try{
                const res = await fetch("http://localhost:5000/api/expenses");
                const data = await res.json();
                setExpenses(data);
            }
            catch(err){
                setError("Failed to fetch expenses");
            }
            finally{
                setLoading(false);
            }
        };
        fetchExp();
    }, [])
    

    const filterExpense = useMemo(() => 
        filtering(expenses, filters), [expenses, filters]
    );
    const handleDelete = async(id) => {
        try{
            await fetch(`${import.meta.env.VITE_URL}/api/expenses/${id}`,{
                method : "DELETE",  
            });
            setExpenses((exp) => exp.filter((e) => e.id !== id));
        }
        catch(err){
            setError("Failed to delete expense");
        }
    };

    const handleUpdate = (updated) => {
        setExpenses((exp) => exp.map((e) => (e.id === updated.id ? updated : e)));
        setEditId(null);
    }

    if(loading) return <Spinner/>;
    if(error) return <p style={{color : "red"}}>{error}</p>
    if(!expenses.length) return<p className="text-center py-16 text-light/30 text-sm">No expenses found.</p>;
    
    return(
        <div>
            <SummaryPanel expenses={filterExpense} />
            <div className="bg-navy-light rounded-xl border border-white/10 p-3 sm:p-4 mb-6 flex flex-col gap-3">
                <FilterExpense  filters={filters} onChange={setFilters} />
            <div className="flex justify-end">
                <ExportButton expenses={filterExpense} />
            </div>
                
            </div>
        <CategoryChart expenses={filterExpense} />

        {!filterExpense.length ? (
            <div className="text-center py-16 text-light/30 text-sm">
                    No expenses found
                </div>
        ) : (
            <div className="bg-navy-light rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[320px]">
                    <thead className="bg-navy border-b border-white/10">
                        <tr>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-light/40 uppercase tracking-wide">Title</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-light/40 uppercase tracking-wide">Amount</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-light/40 uppercase tracking-wide">Category</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-light/40 uppercase tracking-wide hidden md:table-cell">Date</th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-light/40 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                                {filterExpense.map((expense) => (
                                    <ExpenseRow
                                        key={expense.id}
                                        expense={expense}
                                        isEditing={editId === expense.id}
                                        onEditClick={() => setEditId(expense.id)}
                                        onCancel={() => setEditId(null)}
                                        onDelete={handleDelete}
                                        onUpdate={handleUpdate}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}