import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateFinancialGoal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset } = useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost:3000/financial-goals/${id}`);
            return res.data.data;
        }
    });

    const submitHandler = async (data) => {
        try {
            await axios.put(`http://localhost:3000/financial-goals/${id}`, data);
            alert("Financial goal updated successfully!");
            navigate("/user/financialgoaldashboard");
        } catch (error) {
            console.error("Error updating financial goal:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Update Financial Goal</h2>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">Goal Name</label>
                                <input type="text" className="form-control" {...register("goalName")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Target Amount</label>
                                <input type="number" className="form-control" {...register("targetAmount")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Saved Amount</label>
                                <input type="number" className="form-control" {...register("savedAmount")} />
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
                                <label className="form-label">Status</label>
                                <select className="form-select" {...register("status")}>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Achieved">Achieved</option>
                                    <option value="Not Achieved">Not Achieved</option>
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
