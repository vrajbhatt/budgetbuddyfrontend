import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddIncome = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate(); // Initialize navigation

    // Submit handler for adding income
    const submitHandler = async (data) => {
        try {
            const userId = localStorage.getItem("id");
            data.userId = userId;

            const res = await axios.post("http://localhost:3000/income", data);

            if (res.status === 201) {
                reset();
                alert("Income added successfully!");
                navigate("/user/displayincome"); // Redirect after successful addition
            }
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Add Income</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Income Form */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Enter Income Details</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="form-group">
                                    <label>Source</label>
                                    <input type="text" className="form-control" {...register("source")} required />
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
                                    <label>Category</label>
                                    <select className="form-control" {...register("category")} required>
                                        <option value="">Select Category</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Business">Business</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Investments">Investments</option>
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
