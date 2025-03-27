// eslint-disable-next-line no-unused-vars
import React from "react";

const LandingPage = () => {
  return (
    <div className="hold-transition layout-top-nav">
      <div className="wrapper">
        {/* Simple Navbar - Full Width */}
        <nav className="navbar navbar-expand navbar-light bg-white">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">
              <span className="text-primary font-weight-bold">Budget Buddy</span>
            </a>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#features" className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a href="#users" className="nav-link">Users</a>
              </li>
              <li className="nav-item">
                <a href="#testimonials" className="nav-link">Testimonials</a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link">Login</a>
              </li>
              <li className="nav-item">
                <a href="/signup" className="btn btn-primary">Sign Up</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="content-wrapper bg-white">
          {/* Hero Section */}
          <div className="content-header py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  <h1 className="display-4 font-weight-bold">Smart Money</h1>
                  <h1 className="display-4 font-weight-bold">Management Made Simple</h1>
                  <p className="lead text-muted mt-3">Take control of your finances with our all-in-one personal budgeting solution</p>
                  <div className="mt-4">
                    <a href="/register" className="btn btn-lg btn-outline-dark">
                      Get Started Free
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Empty space for potential image */}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="content py-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body d-flex align-items-center">
                      <div className="bg-info p-3" style={{ width: "64px", height: "64px" }}></div>
                      <div className="ml-4">
                        <h5 className="mb-0">Happy Users</h5>
                        <h3 className="mb-0">10,000+</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body d-flex align-items-center">
                      <div className="bg-success p-3" style={{ width: "64px", height: "64px" }}></div>
                      <div className="ml-4">
                        <h5 className="mb-0">Money Saved</h5>
                        <h3 className="mb-0">$2.5M+</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body d-flex align-items-center">
                      <div className="bg-warning p-3" style={{ width: "64px", height: "64px" }}></div>
                      <div className="ml-4">
                        <h5 className="mb-0">Goals Achieved</h5>
                        <h3 className="mb-0">25,000+</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="content py-5">
            <div className="container-fluid">
              <div className="text-center mb-5">
                <h2 className="text-primary">Powerful Features</h2>
                <p className="lead text-muted">Everything you need to manage your finances in one place</p>
              </div>
              <div className="row">
                {[
                  { 
                    title: "Expense Tracking", 
                    desc: "Automatically categorize and track all your expenses in real-time.",
                    icon: "fas fa-receipt"
                  },
                  { 
                    title: "Smart Budgeting", 
                    desc: "Create custom budgets with intelligent recommendations based on your spending patterns.",
                    icon: "fas fa-calculator"
                  },
                  { 
                    title: "Financial Goals", 
                    desc: "Set and track progress towards your savings and investment goals.",
                    icon: "fas fa-bullseye"
                  },
                  { 
                    title: "Detailed Analytics", 
                    desc: "Visualize your financial data with interactive charts and reports.",
                    icon: "fas fa-chart-pie"
                  },
                  { 
                    title: "Bill Reminders", 
                    desc: "Never miss a payment with customizable notifications and alerts.",
                    icon: "fas fa-bell"
                  },
                  { 
                    title: "Secure Sync", 
                    desc: "Safely sync your data across all your devices with bank-level encryption.",
                    icon: "fas fa-lock"
                  }
                ].map((feature, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm h-100 border-0">
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <i className={`${feature.icon} fa-2x text-primary`}></i>
                        </div>
                        <h5 className="card-title text-center">{feature.title}</h5>
                        <p className="card-text text-muted">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* User Types Section */}
          <section id="users" className="content py-5 bg-light">
            <div className="container-fluid">
              <div className="text-center mb-5">
                <h2 className="text-primary">Who Can Benefit</h2>
                <p className="lead text-muted">Budget Buddy is designed for everyone</p>
              </div>
              <div className="row">
                {[
                  { 
                    title: "Individuals", 
                    desc: "Take control of your personal finances, track expenses, and achieve your financial goals.",
                    icon: "fas fa-user"
                  },
                  { 
                    title: "Families", 
                    desc: "Manage household budgets together and plan for your family's financial future.",
                    icon: "fas fa-home"
                  },
                  { 
                    title: "Financial Advisors", 
                    desc: "Provide better guidance to clients with comprehensive financial insights and reports.",
                    icon: "fas fa-briefcase"
                  }
                ].map((user, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body text-center p-4">
                        <div className="mb-3">
                          <i className={`${user.icon} fa-2x text-primary`}></i>
                        </div>
                        <h5 className="card-title">{user.title}</h5>
                        <p className="text-muted">{user.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="content py-5">
            <div className="container-fluid">
              <div className="text-center mb-5">
                <h2 className="text-primary">What Our Users Say</h2>
                <p className="lead text-muted">Success stories from people like you</p>
              </div>
              <div className="row">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Small Business Owner",
                    text: "Budget Buddy helped me separate my business and personal finances. I've saved over $5,000 in the last year alone!",
                  },
                  {
                    name: "Mark Thompson",
                    role: "Freelance Developer",
                    text: "As someone with irregular income, Budget Buddy has been a game-changer for planning my finances and saving for taxes.",
                  },
                  {
                    name: "Jessica Lee",
                    role: "Family Financial Planner",
                    text: "I recommend Budget Buddy to all my clients. The intuitive interface makes financial planning accessible to everyone.",
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <p className="card-text">{testimonial.text}</p>
                        <div className="d-flex align-items-center mt-3">
                          <div className="mr-3">
                            <img src={`/api/placeholder/50/50`} className="rounded-circle" alt="User" />
                          </div>
                          <div>
                            <h6 className="mb-0">{testimonial.name}</h6>
                            <small className="text-muted">{testimonial.role}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="content-header bg-primary text-white py-5 text-center">
            <div className="container-fluid">
              <h2 className="mb-3">Ready to take control of your finances?</h2>
              <p className="lead mb-4">Join thousands of users who have improved their financial health with Budget Buddy</p>
              <div>
                <a href="/register" className="btn btn-lg btn-light">
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="main-footer bg-white pt-5 pb-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <h5 className="text-primary">Budget Buddy</h5>
                  <p className="text-muted">Your personal finance companion for a brighter financial future.</p>
                  <div className="social-icons">
                    <a href="#" className="mr-3"><i className="fab fa-facebook fa-lg"></i></a>
                    <a href="#" className="mr-3"><i className="fab fa-twitter fa-lg"></i></a>
                    <a href="#" className="mr-3"><i className="fab fa-instagram fa-lg"></i></a>
                  </div>
                </div>
                <div className="col-md-2 mb-4">
                  <h5 className="text-primary">Company</h5>
                  <ul className="list-unstyled">
                    <li><a href="/about" className="text-muted">About Us</a></li>
                    <li><a href="/team" className="text-muted">Our Team</a></li>
                    <li><a href="/careers" className="text-muted">Careers</a></li>
                    <li><a href="/contact" className="text-muted">Contact</a></li>
                  </ul>
                </div>
                <div className="col-md-2 mb-4">
                  <h5 className="text-primary">Resources</h5>
                  <ul className="list-unstyled">
                    <li><a href="/blog" className="text-muted">Blog</a></li>
                    <li><a href="/guides" className="text-muted">Guides</a></li>
                    <li><a href="/help" className="text-muted">Help Center</a></li>
                    <li><a href="/api" className="text-muted">API</a></li>
                  </ul>
                </div>
                <div className="col-md-4 mb-4">
                  <h5 className="text-primary">Stay Updated</h5>
                  <p className="text-muted">Subscribe to our newsletter for tips and updates</p>
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Your email" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 border-top pt-3">
                <div className="col-12 text-center text-muted">
                  <p>© 2025 Budget Buddy. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;