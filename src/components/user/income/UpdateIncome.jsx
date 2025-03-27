import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateIncome = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize form with default values fetched from API
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset } = useForm({
        defaultValues: async () => {
            const res = await axios.get(`http://localhost:3000/income/${id}`);
            return res.data.data;
        }
    });

    const submitHandler = async (data) => {
        try {
            await axios.put(`http://localhost:3000/income/${id}`, data);
            alert("Income updated successfully!");
            navigate("/user/displayincome");
        } catch (error) {
            console.error("Error updating income:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">Update Income</h2>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className="form-label">Source</label>
                                <input type="text" className="form-control" {...register("source")} />
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
                                <label className="form-label">Category</label>
                                <select className="form-select" {...register("category")}>
                                    <option value="Salary">Salary</option>
                                    <option value="Business">Business</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Investments">Investments</option>
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
