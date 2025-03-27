import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const AddExpense = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const userId = localStorage.getItem("id");
            data.userId = userId;

            const res = await axios.post("http://localhost:3000/expense", data);

            if (res.status === 201) {
                reset();
                alert("Expense added successfully!");
                navigate("/user/expensedashboard");
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Add Expense</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Enter Expense Details</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select className="form-control" {...register("category")} required>
                                        <option value="">Select Category</option>
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
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input type="number" className="form-control" {...register("amount")} required />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" className="form-control" {...register("date")} required />
                                </div>
                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <select className="form-control" {...register("paymentMethod")} required>
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Debit Card">Debit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea className="form-control" {...register("notes")}></textarea>
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
