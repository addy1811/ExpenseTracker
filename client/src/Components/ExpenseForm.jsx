import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
import { Spinner } from "./SubComponents/Spinner";

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
            await fetch(`${import.meta.env.VITE_URL}/api/expenses`, {
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
        <div className="w-full max-w-md mx-auto bg-navy-light rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8">
            <h2 className="text-xl font-semibold text-light mb-6">Add Expense</h2>
                {error && (
                    <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                    {error}
                </div>
                )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-light/40 uppercase tracking-wide">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        className="bg-navy border border-white/10 text-light placeholder-light/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-light/40 uppercase tracking-wide">Amount (₹)</label>
                    <input 
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        min="0"
                        value={form.amount}
                        onChange={handleChange}
                        className="bg-navy border border-white/10 text-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-light/40 uppercase tracking-wide">Category</label>
                    <select 
                        name="category" 
                        value={form.category} 
                        onChange={handleChange}
                        className="bg-navy border border-white/10 text-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                <option key = {cat} value = {cat}>{cat}</option>
                        ))}
                    </select>
            </div> 
            <div className="flex gap-3 pt-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 bg-teal text-navy font-semibold py-2.5 rounded-lg text-sm hover:bg-teal/90 transition disabled:opacity-60"
                >
                {loading ? <Spinner/> : "Add Expense"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex-1 border border-white/10 text-light/70 py-2.5 rounded-lg text-sm hover:bg-navy transition"
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
        );

    };
