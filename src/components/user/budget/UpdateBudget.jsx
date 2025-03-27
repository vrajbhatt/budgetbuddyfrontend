
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateBudget = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset } = useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost:3000/budget/${id}`);
            return res.data.data;
        }
    });

    const submitHandler = async (data) => {
        try {
            await axios.put(`http://localhost:3000/budget/${id}`, data);
            alert("Budget updated successfully!");
            navigate("/user/budgetdashboard");
        } catch (error) {
            console.error("Error updating budget:", error);
        }
    };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">Update Budget</h2>
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
                        <label className="form-label">Start Date</label>
                        <input type="date" className="form-control" {...register("startDate")} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input type="date" className="form-control" {...register("endDate")} />
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

