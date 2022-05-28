import { firebaseReady, firebaseUserAtom } from "@jotai/store";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import app from "./app";

export const auth = getAuth(app);

// A function which takes a string and return a promise | Resolve the given string if the string doesn't contain any forbidden char and reject if does
export const sanitizeInput = (unknown, type = typeof "a") => {
  return new Promise((resolve, reject) => {
    if (typeof unknown === typeof "a") {
      if (
        unknown.includes(">") ||
        unknown.includes("<") ||
        unknown.includes("'") ||
        unknown.includes('""') ||
        unknown.includes("/") ||
        unknown.includes("\\") ||
        unknown.includes(" ")
      ) {
        reject("Invalid Char");
        return;
      }
      resolve(unknown);
    }
  });
};

// A function which takes a email string and return a promise | Resolve if the given string is in valid email format and reject if not
export const validateEmail = (unknown) => {
  return new Promise((resolve, reject) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(String(unknown).toLowerCase());
    if (result) {
      resolve(unknown);
    } else {
      reject("Invalid Email");
    }
  });
};

export const handleLoginWithEmail = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "") throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validEmail = await validateEmail(email);
      const response = await signinEmail(validEmail, validPass);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const handleRegisterWithEmail = async (email, password, username) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (email == "" || password == "") throw "Empty email or password";
      await sanitizeInput(email);
      const validPass = await sanitizeInput(password);
      const validUsername = await sanitizeInput(username);
      const validEmail = await validateEmail(email);
      const response = await signupEmail(validEmail, validPass);
      console.log(response);
      updateProfile(auth.currentUser, {
        displayName: validUsername,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

// Async function which returns a promise | takes email and password to login the user in
export const signinEmail = async (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      let response = signInWithEmailAndPassword(auth, email, password);
      resolve(response); // let authOnStateChange handle updating redux state
    } catch (reject) {
      reject("An error has occured while trying to sign you in : " + reject);
    }
  });
};

// Async function which returns promise | takes email and password to sign up the user
export const signupEmail = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = createUserWithEmailAndPassword(auth, email, password);
      resolve(response);
    } catch (err) {
      reject(
        "An error has occurred while trying to creating a new user : " + err
      );
    }
  });
};

export const SignOutFC = () => {
  const router = useRouter();

  useEffect(() => {
    const cb = async () => {
      try {
        console.log("Signing out");
        await signOut(auth);
        alert("Sucessfully signed out");
        router.push("/");
      } catch (e) {
        console.error("An error has occured");
        console.log(e);
      }
    };
    cb();
  }, []);

  return <></>;
};

/**
 * @param {Object} props
 * @param { (user : User | null , ready : boolean) => boolean} props.cb
 * @param {String} props.path
 */
export const ConditionalRedirect = ({ cb, path }) => {
  const [fbProfile] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  const router = useRouter();

  useEffect(() => {
    if (cb(fbProfile, ready)) {
      router.push(path);
    }
  }, [fbProfile, ready]);

  return <></>;
};

export const getFirebaseToken = async () => {
  return new Promise(async (resolve, reject) => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser);
      resolve(token);
    } else {
      reject("Not signed in");
    }
  });
};

export const getNewIdToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (auth.currentUser) {
        const token = await getIdToken(auth.currentUser, true);
        resolve(token);
      } else {
        reject("Not signed in");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let googleProvider = null;

export const signinWithGooglePopUp = () => {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }
  return new Promise(async (resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
