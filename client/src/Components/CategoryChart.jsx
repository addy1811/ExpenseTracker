import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from "recharts";
import { COLOR }from "../constants/color";


export const CategoryChart = ({expenses}) => {
    const data = expenses.reduce((acc , e) => {
        const exist = acc.find((i) => i.name === e.category);
        if(exist){
            exist.value += Number(e.amount);
        }
        else{
            acc.push({ name : e.category, 
            value : Number(e.amount),
            fill: COLOR[acc.length % COLOR.length],
            });
        }
        return acc;
    }, []);

    if(!data.length) return null;
    
    const isSmall = window.innerWidth < 480;
    const isMedium = window.innerWidth < 768;
    const outerR = isSmall ? 70 : isMedium ? 85 : 100;
    const innerR = isSmall ? 35 : isMedium ? 42 : 50;
    const chartHeight = isSmall ? 220 : isMedium ? 260 : 320;

    return(
        <div className="bg-navy-light rounded-xl border border-white/10 p-4 sm:p-5 mb-6">
            <p className="text-xs font-medium text-light/40 uppercase tracking-wide mb-4">Spend by category</p>
                <ResponsiveContainer width="100%" height={chartHeight}>
                <PieChart margin={{ top: 10, right: isSmall ? 20 : 60, bottom: 10, left: isSmall ? 20 : 60 }}>
                        <Pie data={data} 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={outerR} 
                            innerRadius={innerR} 
                            dataKey="value" 
                            paddingAngle={3}
                            label={isSmall 
                            ? false 
                            : ({name, percent}) => percent > 0.01 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                                }
                            labelLine={isSmall ? false : { stroke: "rgba(238,238,238,0.2)" }}
                        />
                    <Tooltip contentStyle={{
                            backgroundColor: "#222831",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            color: "#EEEEEE",
                            fontSize: "13px",
                        }}
                        formatter={(value) =>
                            Number(value).toLocaleString("en-IN", { style: "currency", currency: "INR" })
                        }
                    />
                    <Legend formatter={(value) => <span style={{color: "rgba(238,238,238,0.6)", fontSize: isSmall ? "11px" : "13px"}}>{value}</span>} />
                    </PieChart>
                </ResponsiveContainer>
        </div>
    );
};