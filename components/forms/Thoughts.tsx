import { firebaseUserAtom, profileInfoAtom } from "@jotai/store";
import axios from "axios";
import { useAtom } from "jotai";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Thoughts: FC = ({}) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [profle, setProfile] = useAtom(profileInfoAtom);
  const [firebase] = useAtom(firebaseUserAtom);

  const router = useRouter();

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
          Do you think our fate is unchangeable.
        </label>
        <input
          required
          {...register("thoughts.fate", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>
        <label className="text-secondary text-lg font-semibold">
          What are the reasons to live?
        </label>
        <input
          required
          {...register("thoughts.reasons", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>
        <label className="text-secondary text-lg font-semibold">
          Is there a problem humanity can’t overcome?
        </label>
        <input
          required
          {...register("thoughts.problems", {
            required: true,
          })}
          className="border-b-4 border-secondary w-full focus:outline-none focus:border-b-2"
        ></input>

        <motion.button
          animate={{
            opacity: isLoading ? 0.65 : 1,
            scale: isLoading ? 0.9 : 1,
          }}
          type="submit"
          className={`w-full h-18 bg-secondary rounded-lg flex justify-center items-center py-3.5 gap-x-4 cursor-pointer mt-8`}
        >
          <h5 className="text-primary text-3xl font-bold">Answer</h5>
        </motion.button>
        <Link href="/menu/home">
          <a className="relative underline text-sm text-center">
            I do not wish to answer, please just sign me in.
          </a>
        </Link>
      </form>
    </>
  );
};

export default Thoughts;
