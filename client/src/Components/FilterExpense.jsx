import { CATEGORIES } from "../constants/categories";

export const FilterExpense = ({ data , onChange}) => {
    const handleChange = (e) =>{
        onChange({ ...data , [e.target.name] : e.target.value});
    };

    return(
        <div>
            <select name="category" 
            value = {data.category}
            onChange={handleChange}>
                {CATEGORIES.map((cat) => (
                    <option key = {cat} value={cat}> {cat} </option>
                ))}
            </select>

            <select name="dateRange"
            value={data.dataRange}
            onChange={handleChange}>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom</option>
            </select>
            {data.dataRange === "custom" && (
                <>
                <input type="date" 
                name="startDate" 
                value={data.startDate} 
                onChange={handleChange}
                />
                <input type= "date"
                name="endDate"
                value={data.endDate}
                onChange={handleChange}
                />
                </>
            )}
        </div>
    );
};