import PropTypes from "prop-types";
import { useEffect } from "react";

function Room({ ctx, R_info, value }) {
  const ratio = 0.08;
  const startX_ratio = 15;
  const startY_ratio = 35;

  const changeColor = () => {
    console.log("??????", ctx);

    //   var imageData = ctx.getImageData(
    //     R_info.LTX,
    //     R_info.LTY,
    //     R_info.RBX,
    //     R_info.RBY
    //   );

    //   var data = imageData.data;
    //   const work = value === false ? "notusing" : "useing";
    //   // console.log(work);

    //   var workidx = null;
    //   switch (work) {
    //     case "using":
    //       workidx = 0;
    //       break;
    //     case "notusing":
    //       workidx = 1;
    //       break;
    //     case "unusing":
    //       workidx = 2;
    //       break;
    //     default:
    //       workidx = null;
    //   }

    //   const color = [
    //     [0, 0, 255], //using
    //     [0, 255, 0], //notusing
    //     [124, 124, 124] //unusing
    //   ];

    //   for (var i = 0; i < data.length; i += 4) {
    //     if (data[i] !== 0) {
    //       if (data[i + 1] !== 0) {
    //         if (data[i + 2] !== 0) {
    //           data[i] = color[workidx][0];
    //           data[i + 1] = color[workidx][1];
    //           data[i + 2] = color[workidx][2];
    //         }
    //       }
    //     }
    //   }
    //   ctx.putImageData(imageData, R_info.LTX, R_info.LTY, R_info.RBX, R_info.RBY);
  };

  const onloadIMG = (ctx, src, leftTop_x, leftTop_y) => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      // Room image
      const width = image.width * ratio;
      const height = image.height * ratio;
      ctx.drawImage(
        image,
        leftTop_x * startX_ratio,
        leftTop_y * startY_ratio,
        width,
        height
      );
    };
  };

  useEffect(() => {
    const roomimg = R_info.RoomIMG;
    const roomX = R_info.RoomX;
    const roomY = R_info.RoomY;

    onloadIMG(ctx, roomimg, roomX, roomY);
  }, []);

  useEffect(() => {
    changeColor(ctx, value);
  }, [value]);

  return {};
}

Room.propTypes = {};

export default Room;
