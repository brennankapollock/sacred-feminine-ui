import { useContext } from "react";
import { TokyoContext } from "../Context";

const SectionContainer = ({ name, children }) => {
  const { nav, animation } = useContext(TokyoContext);
  return (
    <div
      id={name}
      className={`tokyo_tm_section ${
        name == nav ? `animated active ${animation}` : ""
      }`}
    >
      {children}
    </div>
  );
};
export default SectionContainer;
