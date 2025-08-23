import { Button } from "antd";
import type { ISharedButton } from "./button.interface";

const SharedButton = ({ labelKey, onClick }: ISharedButton) => {
  return <Button onClick={onClick}>{labelKey}</Button>;
};

export default SharedButton;
