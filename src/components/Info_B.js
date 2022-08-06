//import { useState } from "react";

function Info_B({ key, id, name }) {
  return (
    <div className={key}>
      <div className={id}>
        <h1 className={name}>{name}</h1>
      </div>
    </div>
  );
}

export default Info_B;
