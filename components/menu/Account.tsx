import EditProfile from "@components/forms/EditProfile";
import { profileInfoAtom } from "@jotai/store";
import { Profile } from "@jotai/type";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { FC } from "react";

const Account: FC = () => {
  const [profile, setProfile] = useAtom(profileInfoAtom);
  const [editing, setEditing] = useState(false);

  const router = useRouter();

  return (
    <>
      {/* Mobile */}
      <div
        style={{
          gridTemplateRows: "11.25fr 81.25fr 7.5fr",
        }}
        className="grid p-4 relative"
      >
        <div className="row-span-2 flex flex-col gap-y-6 ">
          <div>
            <h3 className="uppercase text-primary font-bold">Email</h3>
            <h4 className="font-medium text-primary">{profile?.email}</h4>
          </div>
          <div>
            <h3 className="uppercase text-primary font-bold">Fullname</h3>
            <h4 className="font-medium text-primary">
              {profile?.firstName} {profile?.lastName}
            </h4>
          </div>
          <div>
            <h3 className="uppercase text-primary font-bold">School</h3>
            <h4 className="font-medium text-primary">{profile?.school}</h4>
          </div>
          <div>
            <h3 className="uppercase text-primary font-bold">Date of Birth</h3>
            <h4 className="font-medium text-primary">
              {profile?.birth && new Date(profile?.birth).toDateString()}
            </h4>
          </div>
          <div>
            <h3 className="uppercase text-primary font-bold">Discord ID</h3>
            <h4 className="font-medium text-primary">
              {profile?.discordUserId ?? "Unlinked"}
            </h4>
          </div>
          <div>
            <h3 className="uppercase text-primary font-bold">Link Token</h3>
            <h4 className="font-medium text-primary">
              {profile?.linkToken ?? "None"}
            </h4>
          </div>
          <div
            onClick={async () => {
              if (
                confirm(
                  "Are you sure? This will unlink your discord and overwrite the old token."
                ) === false
              )
                return;
              const linkToken = await axios.get<String>(
                `${process.env.NEXT_PUBLIC_backend_url}/user/token/new`
              );
              let _profile = { ...profile } as Profile;
              _profile.linkToken = linkToken.data;
              setProfile(_profile);
            }}
            className="text-primary underline"
          >
            <h5>Click here to generate a new token</h5>
          </div>
          <div
            onClick={() => setEditing(true)}
            className="cursor-pointer bg-primary rounded-lg text-center px-4 py-1 text-lg font-extrabold"
          >
            Edit my profile
          </div>
          <div
            onClick={() => router.push("/logout")}
            className="cursor-pointer border-2 border-primary rounded-lg text-center text-primary px-4 py-1 text-lg font-extrabold"
          >
            Logout
          </div>
          {editing && (
            <div className="bg-primary px-5 py-8 flex flex-col justify-between items-center absolute inset-0 left-0">
              <EditProfile onCancel={() => setEditing(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
