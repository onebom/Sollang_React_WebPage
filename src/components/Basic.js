import { useEffect, useState } from "react";
import Info_B from "../components/Info_B";

function Basic() {
  const [infos, setInfos] = useState([]);
  const getInfos = async () => {
    const json = await fetch(
      `https://sollang-fcfbe-default-rtdb.asia-southeast1.firebasedatabase.app/.json`
    );
    setInfos(json.Store);
  };
  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div>
      {/* {infos &&
        infos.map((info) => (
          <Info_B key={info.id} id={info.id} name={info.name} />
        ))} */}
    </div>
  );
}

export default Basic;
