import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset } = useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost:3000/expense/${id}`);
            return res.data.data;
        }
    });

    const submitHandler = async (data) => {
        try {
            await axios.put(`http://localhost:3000/expense/${id}`, data);
            alert("Expense updated successfully!");
            navigate("/user/expensedashboard");
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Update Expense</h2>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" {...register("category")}> 
                                    <option value="Groceries">Groceries</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Health">Health</option>
                                    <option value="Debt Payment">Debt Payment</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input type="number" className="form-control" {...register("amount")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" {...register("date")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Payment Method</label>
                                <select className="form-select" {...register("paymentMethod")}> 
                                    <option value="Cash">Cash</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Notes</label>
                                <textarea className="form-control" {...register("notes")}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
