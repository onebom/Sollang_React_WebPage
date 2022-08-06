import { useState } from "react";
import Basic from "../components/Basic";
//import Info_B from "../components/Info_B";
//import Info_F from "../components/Info_F";

function Basics() {
  const [basics, setBasics] = useState([]);
  setBasics([]);
  return (
    <div>
      {basics.map((basics) => (
        <Basic name={basics.name} id={basics.id} />
      ))}
    </div>
  );
}

export default Basics;
