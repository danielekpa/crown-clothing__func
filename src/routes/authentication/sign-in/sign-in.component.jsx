import React, {Fragment, useContext, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../../components/button/button.component";
import {Oval} from "react-loader-spinner";
import FormInput from "../../../components/form-input/form-input.component";
import {handleChange as handleInputChange} from "../../../utils/handle-input-change.util";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  checkIfUSerExists,
  signInAuthUserWithEmailAndPassword,
  deleteAuthUser,
} from "../../../utils/firebase.util";
import "./sign-in.styles.scss";

export default function SignIn() {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user);
    await createUserDocFromAuth(user);
    // setCurrentUser(user);
  };

  const logUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    try {
      console.log(email, password);
      const userCredential = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const {user} = userCredential;
      const userDocRef = await checkIfUSerExists(user);
      setLoading(false);
      if (!userDocRef.exists()) {
        await deleteAuthUser(user);
        return alert("User does not exist");
      }
      resetFormFields();
    } catch (error) {
      const errorCode = error.code;
      console.log("Error code", errorCode);
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    handleInputChange(event, formFields, setFormFields);
  };

  return (
    <Fragment>
      <div className="sign-in-container">
        <h2>Sign in to your account</h2>
        <form className="sign-in-form" onSubmit={logUser}>
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
            error={error}
          />
          {/* <ErrorLabel errorLabel={errorMessage} /> */}
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
            <div className="signIn-button-container">
              <Button type="submit" onClick={logUser}>
                Sign In
              </Button>
              <Button type="button" buttonType="google" onClick={logGoogleUser}>
                Sign in with Google
              </Button>
            </div>

            <p className="signup-redirect-text">
              {" "}
              Don't have an account?{" "}
              <Link
                className="signup-redirect-link"
                to={"/auth"}
                state={{id: "signup"}}
              >
                &nbsp;Sign Up
              </Link>
            </p>
          </>
        )}
      </div>
    </Fragment>
  );
}

/* useEffect(() => {
  (async () => {
    const response = await getRedirectResult(auth);
    console.log(response);
  })();

}, []); */
