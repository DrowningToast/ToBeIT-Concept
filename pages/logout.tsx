import { NextPage } from "next";
import { SignOutFC } from "../sys/firebase/auth";

const Logout: NextPage = () => {
  return <SignOutFC />;
};

export default Logout;
