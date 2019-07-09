import React from "react";
import "./Index.scss";

function Index() {
  return (
    <>
      <div className="display-3 text-center dark-purple pt-5">
        ASA PROJECT 3
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="">
            <form action="/dashboard">
              <div className="form-group grey-low">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group grey-low">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div className="d-flex flex-column align-items-center grey-low">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="check"
                    id="check"
                  />
                  <label htmlFor="check">Remember credentials</label>
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-dark grey-low"
                />
                <div className="grey-low">
                  <a href="/create-account">
                    <label>Don't have an account?</label>
                  </a>{" "}
                  |{" "}
                  <a href="/forgot">
                    <label>Forgot Account or Password?</label>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
