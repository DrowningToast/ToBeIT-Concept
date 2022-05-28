import EditProfile from "@components/forms/EditProfile";
import Thoughts from "@components/forms/Thoughts";
import Footer from "@components/general/Footer";
import { firebaseReady, firebaseUserAtom, profileInfoAtom } from "@jotai/store";
import axios from "axios";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "../../components/general/Logo";
import { signinWithGooglePopUp } from "../../sys/firebase/auth";

const Login: NextPage = () => {
  const [accepted, setAccepted] = useState<Boolean>(false);

  const [firebase] = useAtom(firebaseUserAtom);
  const [fbReady] = useAtom(firebaseReady);

  const [profile] = useAtom(profileInfoAtom);
  const router = useRouter();

  useEffect(() => {
    console.log(profile);
    if (profile?.thoughts) router.push("/menu/home");
  }, [profile]);

  console.log(profile);

  return (
    <div
      style={{
        gridTemplateRows: "11.25fr 81.25fr 7.5fr",
      }}
      className="w-screen min-h-screen max-h-screen grid border-blue-800 border-2"
    >
      <header className="bg-secondary p-3 flex items-center">
        <Logo />
      </header>
      <section className="bg-primary px-5 py-8 flex flex-col justify-between items-center">
        {!firebase && firebaseReady && (
          <>
            <div>
              <h1 className="text-5xl font-bold text-secondary uppercase mb-4">
                Login
              </h1>
              <p className="leading-5">
                To continue and fully receive our service in our discord server.
                It’s necessary to sign in with your personal/school google
                account.
              </p>
              <br />
              <p className="leading-5">
                By verifying your account, we will able to identify you in the
                server.
              </p>
            </div>
            <div className="flex flex-col gap-y-2 px-3 w-full h-auto">
              <div className="flex gap-x-2 items-center">
                <input
                  type="checkbox"
                  onChange={(event) => {
                    setAccepted(event.target.checked);
                  }}
                  className="bg-secondary w-5 h-5 rounded-lg border-secondary border-2"
                />
                <h5 className="text-xs">
                  I understand and accept your privacy and policy
                </h5>
              </div>
              <motion.button
                onClick={async () => {
                  try {
                    if (!accepted) return;
                    const user = await signinWithGooglePopUp();
                    await axios.post(
                      `${process.env.NEXT_PUBLIC_backend_url}/user`,
                      {
                        ...user,
                      }
                    );
                  } catch (e) {
                    alert(e);
                  }
                }}
                animate={{
                  opacity: accepted ? 1 : 0.2,
                  scale: accepted ? 1 : 0.975,
                }}
                className={`w-full h-18 bg-secondary rounded-lg flex justify-center items-center py-3.5 gap-x-4 ${
                  accepted ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div className="w-10 h-10 relative">
                  <Image layout="fill" src="/assets/logo/google.png"></Image>
                </div>
                <h5 className="text-primary">Login with Google account</h5>
              </motion.button>
            </div>
          </>
        )}
        {firebase?.email && fbReady && !profile?.firstName && (
          <>
            <div>
              <h1 className="text-5xl font-bold text-secondary uppercase mb-4">
                First timer!
              </h1>
              <p className="leading-5">Tell us about yourself!</p>
              <br />
              <p className="leading-5">
                We also host onsite activities (at KMITL) for only elected
                passionate students. If you’re interested, we’d like to know
                about you more.
              </p>
            </div>
            <EditProfile firstTime />
          </>
        )}
        {firebase?.email && fbReady && profile?.firstName && (
          <>
            <div>
              <h1 className="text-5xl font-bold text-secondary uppercase mb-4">
                Your thoughts?
              </h1>

              <p className="leading-5 mb-8">
                Before we sign you in, it’s worth mentioning that we monitor
                your performance and assignments during the event. We would like
                you to gives some short answers before wraping up, is that okay?
              </p>
              <Thoughts />
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Login;
