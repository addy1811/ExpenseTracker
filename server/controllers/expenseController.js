import db from "../config/db.js";
export const getExpenses = async( req , res ) => {
    const { rows } = await db.query("SELECT * FROM expenses ORDER BY created_at DESC")
    res.status(200).json(rows);
};

export const addExpense = async( req , res )=> {
    const { title , amount , category } = req.body;

    const { rows } = await db.query("INSERT INTO expenses (title, amount, category) VALUES ($1 , $2 , $3) RETURNING *",
        [title , amount , category]
    );
    res.status(201).json(rows[0]);
};

export const updateExpense = async( req , res) => {
    const { title , amount , category } = req.body;

    const { rows } = await db.query(
        "UPDATE expenses SET title=$1, amount=$2, category=$3 WHERE id=$4 RETURNING *",
    [title, amount, category, req.params.id] 
); 
    if(!rows.length){
        return res.status(404).json({
            message : "Record of expense not found",
        });
    }
    res.status(200).json(rows[0]);
};

export const deleteExpense = async( req , res) => {
    const { rows } = await db.query("DELETE FROM expenses WHERE id=$1 RETURNING *",
        [req.params.id]
    );
    if(!rows.length){
        return res.status(404).json({
            message : "Record of expense not found",
        });
    }

    res.status(200).json({
        message : "Record of expense deleted successfully",
    });
};