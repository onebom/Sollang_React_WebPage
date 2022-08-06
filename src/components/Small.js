import PropTypes from "prop-types";
import styles from "./Store.module.css";
import { useRef, useEffect, useState } from "react";

function Small({
  id,
  name,
  UsableRoom,
  MaxRoomNum,
  opentime,
  closetime,
  opt,
  optchanger,
  optstorechanger
}) {
  const onClick = (id) => {
    // optchanger(!opt);
    // optstorechanger(id);
  };

  return (
    <div>
      <button onClick={onClick(id)} className={styles.basicsInfoBtn} key={id}>
        <div>
          <table border="0" width="100%">
            <tr>
              <td colspan="2" width="75%">
                <h2>{name}</h2>
              </td>
              <td rowspan="2">
                <h1>{UsableRoom}</h1>
              </td>
              <td rowspan="2">
                <h1>/ {MaxRoomNum}</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h3>
                  {opentime} ~ {closetime}
                </h3>
              </td>
            </tr>
          </table>
        </div>
      </button>
    </div>
  );
}

export default Small;
