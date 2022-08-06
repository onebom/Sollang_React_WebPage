import { useEffect, useState, useRef } from "react";

//import InfoBar from "../components/InfoBar";
import styles from "./Home.module.css";
import Pin from "../components/Pin";
import Small from "../components/Small";

const MAX_CANVAS_WIDTH = window.innerWidth;
const MAX_CANVAS_HEIGHT = window.innerHeight / 2;

function Home() {
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  const [infos, setInfos] = useState([]);
  const [map, setMap] = useState();

  const [opt, setOpt] = useState(false);
  const [optStore, setOptStore] = useState(0);

  const OnClick_B = (evnet) => {
    setOpt(false);
  };

  const getInfos = async () => {
    const json = await (
      await fetch(
        "https://sollang-fcfbe-48e60.asia-southeast1.firebasedatabase.app/.json"
      )
    ).json();
    setInfos(json.Stores.Store);
    setMap(json.MapIMG);
  };

  useEffect(() => {
    getInfos();

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const image = new Image();
    image.src = map;
    image.onload = () => {
      const width = (image.width * MAX_CANVAS_HEIGHT) / image.height;
      const forcenter = (MAX_CANVAS_WIDTH - width) / 2;
      const height = MAX_CANVAS_HEIGHT;

      // background image 대신 넣어야
      context.drawImage(image, forcenter * 0.4, 0, width * 0.4, height * 0.4);
    };
  });

  return (
    <div className={styles.app}>
      <div className={styles.wrap}>
        <div className={styles.map}>
          <canvas ref={canvasRef} className={styles.canvas} />

          <div className={styles.pins}>
            {infos.map((info) => (
              <Pin
                id={info.ID}
                name={info.name}
                usableroom={info.UsableRoom}
                maxroomnum={info.MaxRoomNum}
                pinX={info.pinX}
                pinY={info.pinY}
                option={opt}
                OptionChanger={setOpt}
                optStore={optStore}
                setOptStore={setOptStore}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <hr />
        {opt === false ? (
          infos.map((info) => (
            <Small
              id={info.ID}
              name={info.name}
              UseableRoom={info.UsableRoom}
              MaxRoomNum={info.MaxRoomNum}
              opentime={info.opentime}
              closetime={info.closetime}
              opt={opt}
              optchanger={setOpt}
              optstorechanger={setOptStore}
            />
          ))
        ) : (
          <div className={styles.screen}>
            <button onClick={OnClick_B} className={styles.back}>
              Back
            </button>
            <div className={styles.infos}>
              <h2>{infos[optStore - 1].name}</h2>
              <h2>
                사용 가능한 방 : {infos[optStore - 1].usableroom}/
                {infos[optStore - 1].maxroom}
              </h2>
              <h2>
                영업시간 : {infos[optStore - 1].opentime} ~{" "}
                {infos[optStore - 1].closetime} 전화번호 :{" "}
                {infos[optStore - 1].telephone}
              </h2>
              <h3> {infos[optStore - 1].price} </h3>
              <h5>{infos[optStore - 1].address}</h5>
            </div>
            <div className={styles.control}>
              <canvas
                ref={canvasRef2}
                className="canvas"
                height={MAX_CANVAS_WIDTH + "%"}
                wieght={MAX_CANVAS_HEIGHT + "%"}
              />
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

// 1. map 부분과 info 부분 나누기 <완료>
// 2. map 이미지와 버튼 올리기 <완>
// 3. opt1 info Store별 카테고리 만들기(small) <완>
// 4. opt2 info Store 하나 만들기(middle) <>
// 5. 버튼을 누르거나, small 버튼을 누르면 middle로 전환
// 6. middle에 버튼 하나 달고 small로 돌아가게 만들기
