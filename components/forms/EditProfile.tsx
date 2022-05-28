import { firebaseUserAtom, profileInfoAtom } from "@jotai/store";
import axios from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect } from "react";

const EditProfile: FC<{
  firstTime?: boolean;
  onCancel?: any;
}> = ({ firstTime, onCancel }) => {
  const { register, handleSubmit, reset } = useForm();
  const [firebase] = useAtom(firebaseUserAtom);
  const [profile, setProfile] = useAtom(profileInfoAtom);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // const newDate = new Date(profile?.birth?.toString()).toDateString()
    reset(
      {
        ...profile,
        // birth: `${profile?.birth?.getFullYear()}-${profile?.birth?.getMonth()}-${profile?.birth?.getDay()}`,
      } ?? {}
    );
  }, [profile]);

  const onSubmit = async (data: any) => {
    try {
      if (isLoading) return;
      setLoading(true);
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_backend_url}/user`,
        data
      );
      const { data: details } = await axios.get(
        `${process.env.NEXT_PUBLIC_backend_url}/user/${firebase?.email}`
      );
      setProfile(details);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-secondary text-lg font-semibold ">
          First name
        </label>
        <input
          required
          {...register("firstName", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>
        <label className="text-secondary text-lg font-semibold">
          Last name
        </label>
        <input
          required
          {...register("lastName", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>
        <label className="text-secondary text-lg font-semibold">School</label>
        <input
          required
          {...register("school", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>
        <label className="text-secondary text-lg font-semibold">
          Age of Birth
        </label>
        <input
          required
          {...register("birth", {
            required: true,
          })}
          type="date"
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2 mb-4"
        ></input>
        {firstTime && (
          <>
            <motion.button
              animate={{
                opacity: isLoading ? 0.65 : 1,
                scale: isLoading ? 0.9 : 1,
              }}
              type="submit"
              className={`w-full h-18 bg-secondary rounded-lg flex justify-center items-center py-3.5 gap-x-4 cursor-pointer`}
            >
              <h5 className="text-primary text-3xl font-bold">Sign me in</h5>
            </motion.button>
            <Link href="/menu/home">
              <a className="relative underline text-sm text-center">
                I’m not planning to participate in onsite activities
              </a>
            </Link>
          </>
        )}
        {!firstTime && (
          <>
            <motion.button
              animate={{
                opacity: isLoading ? 0.65 : 1,
                scale: isLoading ? 0.9 : 1,
              }}
              type="submit"
              className={`w-full h-18 bg-secondary rounded-lg flex justify-center items-center py-3.5 gap-x-4 cursor-pointer mt-20`}
            >
              <h5 className="text-primary text-xl font-medium">Edit</h5>
            </motion.button>
            <motion.div
              onClick={() => {
                onCancel(false);
              }}
              animate={{
                opacity: isLoading ? 0.65 : 1,
                scale: isLoading ? 0.9 : 1,
              }}
              className={`w-full h-18 border-secondary border-2 rounded-lg flex justify-center items-center py-3.5 gap-x-4 cursor-pointer`}
            >
              <h5 className="text-secondary text-xl font-medium">Cancel</h5>
            </motion.div>
          </>
        )}
      </form>
    </>
  );
};

export default EditProfile;
