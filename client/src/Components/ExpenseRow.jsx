import { EditExpense } from "./EditExpense";

export const ExpenseRow = ({expense, isEditing, onEditClick, onUpdate, onCancel, onDelete}) => {
    const formatINR = (amount) => 
        Number(amount).toLocaleString("en-IN" , {style : "currency" , currency: "INR"});

    const CATEGORY_COLORS = {
        Food: "bg-green-500/20 text-green-400",
        Transport: "bg-blue-500/20 text-blue-400",
        Bills: "bg-red-500/20 text-red-400",
        Entertainment: "bg-purple-500/20 text-purple-400",
        Other: "bg-light/10 text-light/50",
    };

    if(isEditing){
        return(
            <EditExpense 
            expense={expense} 
            onUpdate={onUpdate} 
            onCancel={onCancel}
            /> 
        );
    }
    return(
    <tr className="hover:bg-navy/50 transition">
        <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-light text-xs sm:text-sm max-w-[100px] sm:max-w-none truncate">{expense.title}</td>
        <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-teal font-semibold text-xs sm:text-sm whitespace-nowrap">{formatINR(expense.amount)}</td>
        <td className="px-3 sm:px-4 py-2.5 sm:py-3">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${CATEGORY_COLORS[expense.category] || "bg-light/10 text-light/50"}`}>
                {expense.category}
            </span>
        </td>
        <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-light/40 text-xs sm:text-sm hidden md:table-cell whitespace-nowrap">
            {new Date(expense.created_at).toLocaleDateString("en-IN", {
                day: "2-digit", month: "short", year: "numeric"
            })}
        </td>
        <td className="px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex gap-1 sm:gap-2">
                <button onClick={onEditClick}
                    className="text-xs bg-teal/20 text-teal px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-teal/30 transition font-medium">
                    Edit
                </button>
                <button onClick={() => onDelete(expense.id)}
                    className="text-xs bg-red-500/20 text-red-400 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-red-500/30 transition font-medium">
                    Del
                </button>
            </div>
        </td>
    </tr>
    );  
};