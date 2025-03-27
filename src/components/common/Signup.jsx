import axios from "axios";
// import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "admin-lte/dist/css/adminlte.css"; // Import AdminLTE CSS

export const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.roleId = "67c526e30ac03d03253d699a"; // Adjust role ID as per backend
  
    try {
      const res = await axios.post("http://localhost:3000/user", data);
      console.log(res); // Debugging
  
      if (res.status === 201) {
        toast.success("User created successfully!");
  
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("User creation failed!");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Error occurred while creating user!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100" style={{ paddingLeft: "560px" }}>
      <ToastContainer />
      <div className="card card-primary" style={{ width: "400px" }}>
        <div className="card-header text-center">
          <h3 className="card-title">Sign Up</h3>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="card-body">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="Enter First Name" {...register("firstName", { required: "First Name is required" })} />
              {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Enter Last Name" {...register("lastName", { required: "Last Name is required" })} />
              {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter Email" {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })} />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label>Age</label>
              <input type="number" className="form-control" placeholder="Enter Age" {...register("age", { required: "Age is required", min: { value: 18, message: "You must be at least 18 years old" } })} />
              {errors.age && <p className="text-danger">{errors.age.message}</p>}
            </div>

            <div className="form-group">
              <label>Role</label>
              <select className="form-control" {...register("role", { required: "Role is required" })}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="advisor">Financial Advisor</option>
              </select>
              {errors.role && <p className="text-danger">{errors.role.message}</p>}
            </div>
          </div>

          


          <div className="card-footer text-center">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};