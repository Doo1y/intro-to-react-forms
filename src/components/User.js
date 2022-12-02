import { useState, useEffect } from "react";
import './User.css'

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [subStatus, setSubStatus] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  


  useEffect(() => {
    const formE = {};
    if (!name.length) formE.name = (<span className="error">Invalid Name</span>);

    if (!email.includes("@")) formE.email = (<span className="error">Invalid Email</span>);

    if (!/^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/.exec(phone)) 
    formE.phone = (
      <span className="error">Invalid Phone Number</span>
    );

    if (!role.length) formE.role = (<span className="error">Invalid Role</span>);

    const bioStr = bio.replaceAll(/[^a-zA-Z0-9]*/g, "");

    if (bioStr.length < 140) formE.bio = (
      <span className="error">
      Invalid Character Count
      </span>
    );

    setFormErrors(formE);
  }, [name, email, phone, role, bio]);

  function onSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);

    const errorKeys = Object.keys(formErrors);

    if (errorKeys.length) return alert(`Invalid: ${errorKeys}`);

    const formData = {
      name,
      email,
      phone,
      phoneType,
      role,
      bio,
      subStatus,
      submittedOn: new Date(),
    };

    console.log(formData);
    alert("Form has been submitted!");

    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setRole("");
    setBio("");
    setSubStatus(false);
    setHasSubmitted(false);
    setFormErrors({})
  }

  return (
    <div>
      <form id="userRegistration" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {hasSubmitted && formErrors.name ? formErrors.name : null}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {hasSubmitted && formErrors.email ? formErrors.email : null}
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {hasSubmitted && formErrors.phone ? formErrors.phone : null}
        </div>
        <div>
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Please Select a Phone Type
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <fieldset form="userRegistration">
          <legend>Select Your Role:</legend>
          <input
            type="radio"
            id="instructor"
            form="userRegistration"
            name="role"
            checked={role === "instructor"}
            onClick={(e) => setRole(role === "instructor" ? "" : "instructor")}
            value={role}
          />
          <label htmlFor="instructor">Instuctor</label>
          <input
            type="radio"
            id="student"
            form="userRegistration"
            name="role"
            checked={role === "student"}
            onClick={() => setRole(role === "student" ? "" : "student")}
            value={role}
          />
          <label htmlFor="student">Student</label>
          {hasSubmitted && formErrors.role ? formErrors.role : null}
        </fieldset>
        <label htmlFor="bio">Bio: </label>
        <div>
          <textarea
            id="bio"
            name="bio"
            cols="33"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          {hasSubmitted && formErrors.bio ? formErrors.bio : null}
        </div>
        <div>
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            onClick={() => setSubStatus(!subStatus)}
          />
          <label htmlFor="subscribe">Sign up for email notifications</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
