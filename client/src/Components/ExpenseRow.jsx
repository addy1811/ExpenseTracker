import { EditExpense } from "./EditExpense";

const formatINR = (amount) => {
    Number(amount).toLocaleString("en-IN" , {style : "currency" , currency: "INR"});
}
export const ExpenseRow = (expense, isEditing, onEditClick, onUpdate, onCancel, onDelete) => {
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
        <tr>
            <td>{expense.title}</td>
            <td>{formatINR(expense.amount)}</td>
            <td>{expense.category}</td>
            <td>{new Date(expense.created_at).toLocaleDateString("en-IN")}</td>
            <td>
                <button onClick={onEditClick}>Edit</button>
                <button onClick={() => onDelete(expense.id)}>Delete</button>
            </td>
        </tr>
    );  
};