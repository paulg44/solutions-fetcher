import { Button } from "antd";
import type { ISharedButton } from "./button.interface";

const SharedButton = ({ labelKey, onClick, children }: ISharedButton) => {
  return (
    <Button onClick={onClick}>
      {labelKey}
      {children}
    </Button>
  );
};

export default SharedButton;
