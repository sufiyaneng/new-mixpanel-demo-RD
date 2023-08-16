import React, { useState, useEffect } from "react";
import "./styles.css";
import mixpanel from "mixpanel-browser";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    mobile: ""
  });

  useEffect(() => {
    mixpanel.init("7834bf371044106b71dbafd8f5d07851", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage"
    });
    mixpanel.track("page_view");
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    mixpanel.track(name, {
      InputName: name,
      Filled: value !== ""
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mixpanel.track("submit");
  };
  return (
    <div className="container mt-5">
      <h1>Enquiry Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <input
            type="text"
            className="form-control"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
