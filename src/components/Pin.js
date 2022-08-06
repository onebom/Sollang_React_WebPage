import PropTypes from "prop-types";
import styles from "./Pin.module.css";
//import { useState } from "react";
import classnames from "classnames";

function Pin({
  id,
  name,
  usableroom,
  maxroomnum,
  // pinX,
  // pinY,
  option,
  OptionChanger,
  // optStore,
  setOptStore
}) {
  //const [color, setColor] = useState("green");
  const onClick = () => {
    option = !option;
    OptionChanger(option);
    setOptStore(id);

    console.log(option, id);

    // optStore === id ? setColor("green") : setColor("red");

    // const btn = document.getElementById("room" + id);
    // btn.style.backgroundColor = color;
  };

  return (
    <div className={styles.buttonwrap} key={"pin" + id}>
      <button
        key={"room" + id}
        id={"styles.room" + id}
        onClick={onClick}
        //className={"styles.button styles." + id}
        className={[[styles.button, styles.room].join(" "), id].join("")}
      >
        {name}
        <div className={styles.left}>
          {usableroom} /{maxroomnum}
        </div>
      </button>
    </div>
  );
}

Pin.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  usableroom: PropTypes.number.isRequired,
  maxroomnum: PropTypes.number.isRequired
  //pinX : PropTypes.number.isRequired,
  //pinY : PropTypes.number.isRequired,
};

export default Pin;
