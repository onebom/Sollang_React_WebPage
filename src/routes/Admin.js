import { useState, useEffect } from "react";
import Store from "../components/Store";

function Admin() {
  const [infos, setInfos] = useState([]);
  const getInfos = async () => {
    const json = await (
      await fetch(
        "https://sollang-fcfbe-48e60.asia-southeast1.firebasedatabase.app/.json"
      )
    ).json();
    setInfos(json.Stores.Store);
  };
  useEffect(() => {
    getInfos();
  }, []);
  const [index, setIndex] = useState("0");
  const onSelect = (event) => {
    setIndex(event.target.value);
  };
  // console.log(infos[index]);
  return (
    <div>
      <select value={index} onChange={onSelect}>
        <option value="0">Choose Store</option>
        {infos &&
          infos.map((info) => (
            <option value={info.ID}>
              {info.name} ({info.UsableRoom}/{info.MaxRoomNum})
            </option>
          ))}
      </select>
      <hr />
      {index >= 1 ? (
        <Store
          key={infos[index - 1].ID}
          name={infos[index - 1].name}
          address={infos[index - 1].address}
          //latitude={infos[index - 1].latitude}
          //longitude={infos[index - 1].longitude}
          storeimg={infos[index - 1].StoreIMG}
          opentime={infos[index - 1].opentime}
          closetime={infos[index - 1].closetime}
          price={infos[index - 1].price}
          telephone={infos[index - 1].telephone}
          //rate1={infos[index - 1].rate1}
          //rate2={infos[index - 1].rate1}
          //rate3={infos[index - 1].rate1}
          storeimg={infos[index - 1].StoreIMG}
          maxroom={infos[index - 1].MaxRoomNum}
          usableroom={infos[index - 1].UsableRoom}
          rooms={infos[index - 1].Rooms}
        />
      ) : (
        <h2>Choose Store</h2>
      )}
    </div>
  );
}

export default Admin;
