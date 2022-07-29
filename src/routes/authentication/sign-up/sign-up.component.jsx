import React, {Fragment, useContext, useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../../utils/firebase.util";
import FormInput from "../../../components/form-input/form-input.component";
import {handleChange as handleInputChange} from "../../../utils/handle-input-change.util";
import "./sign-up.styles.scss";
import Button from "../../../components/button/button.component";
import {Link} from "react-router-dom";
import {UserContext} from "../../../contexts/user.context";
import {Oval} from "react-loader-spinner";

function SignUp() {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {displayName, email, password, confirmPassword} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signUpUserHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(false);

    if (!password || password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const {user} = userCredential;
      await createUserDocFromAuth(user, {displayName});

      setLoading(false);
      resetFormFields();
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log("Error signing up, ", error.message);
    }
  };

  const handleChange = (event) => {
    handleInputChange(event, formFields, setFormFields);
  };

  return (
    <Fragment>
      <div className="sign-up-container">
        <h2>Create an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={signUpUserHandler}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
            minLength={6}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            required
            minLength={6}
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            error={error}
          />
        </form>

        {loading ? (
          <Oval
            color="#00BFFF"
            height={45}
            width={45}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        ) : (
          <>
            <Button
              buttonType="signUp"
              type="submit"
              onClick={signUpUserHandler}
            >
              Sign Up to Crown Clothing
            </Button>
            <p className="signin-redirect-text">
              {" "}
              Already have an account?{" "}
              <Link className="signin-redirect-link" to={"/auth"}>
                &nbsp;Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </Fragment>
  );
}
// }

export default SignUp;
