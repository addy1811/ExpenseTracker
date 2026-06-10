import { CATEGORIES } from "../constants/categories";

export const FilterExpense = ({ filters , onChange}) => {
    const handleChange = (e) =>{
        onChange({ ...filters , [e.target.name] : e.target.value});
    };
    const selectCls = "bg-navy border border-white/10 text-light rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal";
    const inputCls  = "bg-navy border border-white/10 text-light rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-teal";
    const labelCls  = "text-xs font-medium text-light/40 uppercase tracking-wide mb-1";
    
    return(
        <div className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1">
                <label className={labelCls}>Category</label>
                <select name="category" 
                        value = {filters.category}
                        onChange={handleChange}
                        className={selectCls}
                >
                    <option value="All">All</option> 
                    {CATEGORIES.map((cat) => (
                    <option key = {cat} value={cat}> {cat} </option>
                    ))}
                </select>
            </div>  
            <div className="flex flex-col gap-1">
                <label className={labelCls}>Period</label>
                <select name="dateRange"
                        value={filters.dateRange}
                        onChange={handleChange}
                        className={selectCls}
                >
                    <option value="all">All time</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
                {filters.dateRange === "custom" && (
                <>
                <div className="flex flex-col gap-1">
                    <label className={labelCls}>From</label>
                    <input type="date" 
                            name="startDate" 
                            value={filters.startDate} 
                            onChange={handleChange}
                            className={inputCls}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className={labelCls}>To</label>
                    <input type= "date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className={inputCls}
                    />  
                </div>
                </>
            )}
        </div>
    );
};