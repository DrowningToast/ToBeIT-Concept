import { FC } from "react";

type EventDetail = {
  time: String;
  eventName: String;
};

type Day = {
  date: String;
  month: String;
  details?: EventDetail[];
};

interface iProps {
  days?: Day[];
}

const Agenda: FC<iProps> = ({ days }) => {
  return (
    <div className="flex justify-start flex-col text-primary">
      {days?.map((day, index) => {
        return (
          <>
            <h1
              key={`${day.date}-${day.month}-${index}-header`}
              className="uppercase text-4xl font-bold my-2"
            >
              {day.date} {day.month}
            </h1>
            <div
              key={`${day.date}-${day.month}-${index}-body`}
              style={{
                gridTemplateColumns: "0.2fr 0.8fr",
              }}
              className="w-full grid pl-6 mb-4"
            >
              {day?.details?.map((detail) => {
                return (
                  <>
                    <span key={`${detail.time}-${detail.eventName}`}>
                      {detail.time}
                    </span>
                    <span key={`${detail.eventName}-${detail.time}`}>
                      {detail.eventName}
                    </span>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Agenda;
