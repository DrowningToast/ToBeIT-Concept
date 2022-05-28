import Agenda from "@components/general/Agenda";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      {/* Mobile */}
      <div className="py-4 pb-6 grid place-items-center">
        <h1 className="uppercase text-5xl text-primary font-bold">Agenda</h1>
      </div>
      <div className="px-6">
        <Agenda
          days={[
            {
              date: "04",
              month: "June",
              details: [
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
              ],
            },
            {
              date: "04",
              month: "June",
              details: [
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
                {
                  eventName: "Placeholder Event Name",
                  time: "09:00",
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};
export default Home;
