import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyValue, bigKey, disabled }) => {
  const {
    onDelete,
    onEnter,
    onSelectLetter,
  } = useContext(AppContext);

  const selectLetter = () => {
    if (keyValue === "ENTER") {
      onEnter();
    } else if (keyValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyValue);
    }
  };

  return (
    <div className="key" id={bigKey ? "big" : (disabled ? "disabled" : undefined)} onClick={selectLetter}>
      {keyValue}
    </div>
  );
};

export default Key;
