import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";

export const ExpenseForm = () => {
    const navigate = useNavigate();
    const [form , setForm] = useState({ title: "" , amount: "" , category: ""});
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);


    const handleChange = (e) => {
        setForm({...form , [e.target.name] : e.target.value});
    }
    
    const validate = () =>{
        if(!form.title) return "Title is required"; 
        if(!form.amount || Number(form.amount) <= 0) return "Amount must be positive";
        if(!form.category) return "Category is required";
        return null;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const validateError = validate();
        if(validateError) return setError(validateError);

        setLoading(true);
        try{
            await fetch("http://localhost:5000/api/expenses", {
                method : "POST",
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify({...form , amount : Number(form.amount) }),
        });
            navigate("/");
        }
        catch(err){
            setError("Failed to add an Expense");
        }
        finally{
            setLoading(false);
        }
            
        }

        return(
            <form onSubmit={handleSubmit}> 
            <h2>Expense Management</h2>
            {error && <p style={{color : "red"}}>{error}</p>}

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                />
            <input 
                type="number"
                name="amount"
                placeholder="Amount"
                min="0"
                value={form.amount}
                onChange={handleChange}
                />
            <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
                <option key = {cat} value = {cat}>{cat}</option>
            ))}
            </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Expenses"}
                </button>
            </form>
        );

    };
