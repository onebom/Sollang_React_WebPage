import PropTypes from "prop-types";
import styles from "./Store.module.css";
import { useRef, useEffect, useState } from "react";

// 1. vw적용하기
const MAX_CANVAS_WIDTH = "270";
const MAX_CANVAS_HEIGHT = "180";

function Store({
  //id,
  name,
  address,
  //latitude,
  //longitude,
  storeimg,
  opentime,
  closetime,
  price,
  telephone,
  //rate1,
  //rate2,
  //rate3,
  maxroom,
  usableroom,
  crossSection = { storeimg },
  rooms
}) {
  // 개별 room 불러오는 변수들
  const [roomInfo, setRoomInfo] = useState(rooms.Room);
  const [roomLocationList, setRoomList] = useState();
  const [ratio, setRatio] = useState();

  //[ 220611 ] canvas참조 변수
  const canvasRef = useRef(null);

  //[ 220611 ] 마우스 좌표 획득 함수
  const getCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;

    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  //[ 220611 ] cavas Room 위치 참조 후 color 변환
  const changeColor = (info) => {
    // canvas 호출
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    var sx = 0;
    var sy = 0;
    var sh = 0;
    var sw = 0;

    // Room 양끝점 획득
    if (info.Xs[0] < info.Xs[1]) {
      sx = info.Xs[0];
      sw = info.Xs[1] - info.Xs[0];
    } else {
      sx = info.Xs[1];
      sw = info.Xs[0] - info.Xs[1];
    }

    if (info.Ys[0] < info.Ys[1]) {
      sy = info.Ys[0];
      sh = info.Ys[1] - info.Ys[0];
    } else {
      sy = info.Ys[1];
      sh = info.Ys[0] - info.Ys[1];
    }

    // Room 위치 픽셀 데이터 canvas에서 가져오기
    var imageData = context.getImageData(sx, sy, sw, sh);
    var data = imageData.data;

    // Room UseorUnuse에 따라 Room 색 정해주기
    const work =
      roomInfo[info.ID - 1].UseorUnuse === false ? "notusing" : "useing";

    var workidx = null;
    switch (work) {
      case "using":
        workidx = 0;
        break;
      case "notusing":
        workidx = 1;
        break;
      case "unusing":
        workidx = 2;
        break;
      default:
        workidx = null;
    }
    const color = [
      [0, 0, 255], //using
      [0, 255, 0], //notusing
      [124, 124, 124] //unusing
    ];

    for (var i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        if (data[i + 1] !== 0) {
          if (data[i + 2] !== 0) {
            data[i] = color[workidx][0];
            data[i + 1] = color[workidx][1];
            data[i + 2] = color[workidx][2];
          }
        }
      }
    }
    // 바뀐 색의 Room 이미지 넣어주기
    context.putImageData(imageData, sx, sy);
  };

  //[ 220611 ] Room들 위치 list 생성 함수
  const RoomLocation = (ratio2) => {
    let roomLocationList = [];
    roomInfo &&
      roomInfo.map((info) => {
        // console.log(info.RoomLocation);
        const xy = info.RoomLocation;
        const x = [];
        const y = [];

        // console.log(xy);
        console.log("3", ratio2);

        xy.map((emt) => {
          x.push(emt[0] * ratio);
          y.push(emt[1] * ratio);
        });
        // console.log(x);

        roomLocationList.push({
          ID: info.RoomID,
          Xs: x,
          Ys: y
        });
      });

    return setRoomList(roomLocationList);
  };

  // [ 220611 ] UseorUnuse 값 바꾸기
  const changeUse = (obj, idx) => {
    obj[idx].UseorUnuse = !obj[idx].UseorUnuse;
    return obj;
  };

  // [ 220611 ] mouseEvent 활성화의 경우 checker
  const checker = (event) => {
    // console.log("hi1");
    let mouse = getCoordinates(event);
    console.log(mouse.x, "||", mouse.y);
    // console.log(roomLocationList);

    roomLocationList &&
      roomLocationList.map((info) => {
        // console.log(info.ID, info.Xs, info.Ys);
        if (info.Xs[0] < mouse.x && mouse.x < info.Xs[1]) {
          if (info.Ys[0] < mouse.y && mouse.y < info.Ys[1]) {
            console.log(info.ID - 1, !roomInfo[info.ID - 1].UseorUnuse);
            setRoomInfo((current) => changeUse(current, info.ID - 1));
            return changeColor(info);
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
  };

  const getRatio = (src) => {
    const image = new Image();
    image.src = src;

    console.log(image.width);
    console.log(image.height);

    const rt =
      image.width < image.height
        ? MAX_CANVAS_HEIGHT / image.height
        : MAX_CANVAS_WIDTH / image.width;

    setRatio(rt);
    console.log("1", rt);
  };

  // [ 220612 ]Canvas 위에 StoreIMG 로드
  const onloadIMG = (ctx, src, leftTop_x, leftTop_y) => {
    const image = new Image();
    image.src = src;
    // console.log(src);

    image.onload = () => {
      const width =
        image.width > image.height
          ? MAX_CANVAS_WIDTH
          : (image.width * MAX_CANVAS_HEIGHT) / image.height;

      const height =
        image.width > image.height
          ? (image.height * MAX_CANVAS_WIDTH) / image.width
          : MAX_CANVAS_HEIGHT;

      ctx.drawImage(image, leftTop_x, leftTop_y, width, height);

      // console.log(leftTop_x, "||", leftTop_y);
    };
  };

  // [ 220611 ] UseorUnuse 값 Reset 함
  const onClick_R = (event) => {
    return setRoomInfo(rooms.room);
  };

  // [ 220611 ] 바뀐 UseorUnuse 값 디비에 올리기
  const onClick_S = (event) => {
    var count = 0;
    roomInfo &&
      roomInfo.map((info) => {
        if (info.UseorUnuse === "false") {
          console.log(info.ID);
          return (count = count + 1);
        }
      });
    // 디비에 roomInfo 그대로 올려버리
  };

  // ----_Redering_------
  useEffect(() => {
    setRoomInfo(rooms.Room);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    onloadIMG(context, storeimg, 0, 0);

    getRatio(storeimg);
    console.log("2", ratio);

    RoomLocation(ratio);
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.infos}>
        <h2>{name}</h2>
        <h2>
          사용 가능한 방 : {usableroom}/{maxroom}
        </h2>
        <h2>
          영업시간 : {opentime} ~ {closetime} 전화번호 : {telephone}
        </h2>
        <h3> {price} </h3>

        <h5>{address}</h5>
      </div>
      <div className={styles.control}>
        <canvas
          ref={canvasRef}
          className="canvas"
          height={MAX_CANVAS_WIDTH + "%"}
          wieght={MAX_CANVAS_HEIGHT + "%"}
          onMouseDown={checker}
        />
        <br />
        <button onCLick={onClick_R}>Reset</button>
        <button onCLick={onClick_S}>Submit</button>
      </div>
    </div>
  );
}

Store.propTypes = {
  //id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  //latitude: PropTypes.number.isRequired,
  //longitude: PropTypes.number.isRequired,
  storeimg: PropTypes.string.isRequired,
  opentime: PropTypes.string.isRequired,
  closetime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  //rate1: PropTypes.number.isRequired,
  //rate2: PropTypes.number.isRequired,
  //rate3: PropTypes.number.isRequired,
  maxroom: PropTypes.number.isRequired,
  usableroom: PropTypes.number.isRequired
};

export default Store;

// 0. canvas width, height 지정
