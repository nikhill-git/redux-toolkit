import { useRef, useState } from "react";
import { validateData } from "./constants";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword} from "firebase/auth";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { toggleIsSignUp } from "./redux/features/isSignUpSlice";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch()

  const validateFormData = () => {
    const data = {
      name: name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
    };

    const msg = validateData(data);
    setErrorMsg(msg);
    if (msg) return;

    if (!isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed up
          
          const user = userCredential.user;
          dispatch(toggleIsSignUp(user.email))
          updateProfile(auth.currentUser, {
            displayName: name.current?.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...

            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("Credentials are correct")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage)
        });
    }
  };

  function hangleSignUp() {
    setIsSignUp(!isSignUp);
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center">
      <div className="w-full "><Header/></div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-gray-300 w-1/4 min-h-2/4 rounded mb-40 p-4 flex flex-col"
      >
        <p className=" font-semi-bold text-3xl m-4">
          {!isSignUp ? "Sign Up" : "Sign In"}
        </p>

        {!isSignUp && (
          <input
            ref={name}
            type="text"
            placeholder="user name"
            className="outline my-4  m-4 p-2 rounded"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="email"
          className="outline my-4  m-4 p-2 rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="outline  my-4 m-4 p-2 rounded"
        />
        <p className="text-red-600 font-semibold mx-4">{errorMsg}</p>
        <button
          onPointerDown={validateFormData}
          className=" my-4 m-4 p-2 rounded text-xl font-semibold bg-black text-white cursor-pointer"
        >
          {!isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <p onClick={hangleSignUp} className="m-4 cursor-pointer">
          {!isSignUp
            ? "Already Signed Up? Sign In now."
            : "New to Media-Search? Sign Up now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
