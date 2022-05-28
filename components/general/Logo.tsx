import { FC } from "react";

interface iProps {
  className?: String;
}

const Logo: FC<iProps> = ({ className }: iProps) => {
  return (
    <div
      className={`uppercase ${className ?? "text-primary text-3xl font-bold"}`}
    >
      <div>ToBeIT</div>
      <div>2022</div>
    </div>
  );
};

export default Logo;
