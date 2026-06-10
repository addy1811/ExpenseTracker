import {useState} from "react";
import { CATEGORIES } from "../constants/categories";

export const EditExpense = ({expense , onUpdate , onCancel}) => {
        const [form , setForm] = useState({
            title : expense.title,
            amount : expense.amount,
            category : expense.category,
        });
        const [saving, setSaving] = useState(false);

        const handleChange = (e) => {
            setForm({...form , [e.target.name] : e.target.value});
        }

        const handleSave = async() => {
            setSaving(true);
        try{
            const res = await fetch(`http://localhost:5000/api/expenses/${expense.id}`,{
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({...form , amount : Number(form.amount) }),
            });
            const updated = await res.json();
            onUpdate(updated);
            }
        finally {
            setSaving(false);
            }
        };
    return(
        <tr className="bg-teal/5">
            <td className="px-4 py-2">
                <input type="text" name="title" value={form.title} onChange={handleChange}
                    className="bg-navy border border-white/10 text-light rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal" />
            </td>
            <td className="px-4 py-2">
                <input type="number" name="amount" min="0" value={form.amount} onChange={handleChange}
                    className="bg-navy border border-white/10 text-light rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal" />
            </td>
            <td className="px-4 py-2">
                <select name="category" value={form.category} onChange={handleChange}
                    className="bg-navy border border-white/10 text-light rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal">
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-2 text-light/40 text-sm">
                {new Date(expense.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric"
                })}
            </td>
            <td className="px-4 py-2 flex gap-2">
                <button onClick={handleSave} disabled={saving}
                    className="text-xs bg-teal text-navy px-3 py-1.5 rounded-lg hover:bg-teal/90 transition font-medium disabled:opacity-50">
                    {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={onCancel}
                    className="text-xs border border-white/10 text-light/50 px-3 py-1.5 rounded-lg hover:bg-navy transition font-medium">
                    Cancel
                </button>
            </td>
        </tr>
    )
};
