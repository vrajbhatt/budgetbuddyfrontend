import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const AddFinancialGoal = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const userId = localStorage.getItem("id");
            data.userId = userId;

            const res = await axios.post("http://localhost:3000/financial-goals", data);

            if (res.status === 201) {
                reset();
                alert("Financial goal added successfully!");
                navigate("/user/financialgoaldashboard");
            }
        } catch (error) {
            console.error("Error adding financial goal:", error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Add Financial Goal</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Enter Financial Goal Details</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-group">
                                    <label>Goal Name</label>
                                    <input type="text" className="form-control" {...register("goalName")} required />
                                </div>
                                <div className="form-group">
                                    <label>Target Amount</label>
                                    <input type="number" className="form-control" {...register("targetAmount")} required />
                                </div>
                                <div className="form-group">
                                    <label>Saved Amount</label>
                                    <input type="number" className="form-control" {...register("savedAmount")} required />
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input type="date" className="form-control" {...register("startDate")} required />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input type="date" className="form-control" {...register("endDate")} required />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select className="form-control" {...register("status")} required>
                                        <option value="">Select Status</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Achieved">Achieved</option>
                                        <option value="Not Achieved">Not Achieved</option>
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
