import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./InfoBar.module.css";

function InfoBar({
  id,
  name,
  address,
  storeimg,
  opentime,
  closetime,
  price,
  telephone,
  maxroom,
  usableroom,
  rooms,
  option,
  OptionChanger
}) {
  const onClick = () => {
    option[id - 1] = !option[id - 1];
    OptionChanger(option);
  };

  return (
    <div className={styles.wrap}>
      <button onClick={onClick()} className={styles.basicsInfoBtn} key={id}>
        <div>
          <table border="0" width="100%">
            <tr>
              <td colspan="2" width="75%">
                <h2>{name}</h2>
              </td>
              <td rowspan="2">
                <h1>{usableroom}</h1>
              </td>
              <td rowspan="2">
                <h1>/ {maxroom}</h1>
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

export default InfoBar;
