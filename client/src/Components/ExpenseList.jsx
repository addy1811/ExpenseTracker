import { useState , useEffect} from "react";
import { ExpenseRow } from "./ExpenseRow";

export const ExpenseList = () => {
    const [expenses , setExpenses] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");
    const [editId , setEditId] = useState(null);

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

    const handleDelete = async(id) => {
        try{
            await fetch(`http://localhost:5000/api/expenses/${id}`,{
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

    if(loading) return <p>Loading...</p>
    if(error) return <p style={{color : "red"}}>{error}</p>
    if(!expenses.length) return <p>No expenses found.</p>
    
    return(
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
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
    )
}