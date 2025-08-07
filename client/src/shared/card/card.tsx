import type React from "react";

interface ISharedCard {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
}
const SharedCard = ({ children, title, extra }: ISharedCard) => {
  return (
    <div>
      {(title || extra) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {extra}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default SharedCard;
