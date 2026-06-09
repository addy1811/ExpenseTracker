import {useState} from "react";
import { CATEGORIES } from "../constants/categories";

export const EditExpense = ({expense , onUpdate , onCancel}) => {
        const [form , setForm] = useState({
            title : expense.title,
            amount : expense.amount,
            category : expense.category,
        });

        const handleChange = (e) => {
            setForm({...form , [e.target.name] : e.target.value});
        }

        const handleSave = async() => {
            const res = await fetch(`http://localhost:5000/api/expenses/${expense.id}`,{
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({...form , amount : Number(form.amount) }),
            });
            const updated = await res.json();
            onUpdate(updated);
        };
    return(
        <tr>
            <td>
                <input type= "text"  
                name="title" 
                value={form.title} 
                onChange={handleChange}>
                </input>
            </td>
            <td>
                <input type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}>
                </input>
            </td>
            <td>
                <select name="category"
                value={form.category}
                onChange={handleChange}>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}> {cat} </option>
                    ))}
                </select>
            </td>
            <td>{new Date(expense.created_at).toLocaleDateString("en-IN")}</td>
            <td>
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </td>
        </tr>
    )
};
