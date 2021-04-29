// import imageToRgbaMatrix from "image-to-rgba-matrix";
const PNG = require("png-js");
// imageToRgbaMatrix("./img.jpg").then((res) => console.log(res));
const replaceColor = require("replace-color");

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  //   console.log(view);
  return view;
}

replaceColor({
  image: "./img.png",
  colors: {
    type: "hex",
    targetColor: "#ff0006",
    replaceColor: "#000000",
  },
  deltaE: 20,
})
  .then((jimpObject) => {
    jimpObject.write("./output.jpg", (err) => {
      if (err) return console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });

PNG.decode("./img.png", function (pixels) {
  //   var buffer = Buffer.toString(pixels);

  var buffer = new Uint8Array(pixels);
  let total = buffer.length;
  let blacks = total - buffer.filter((res) => res !== 0).length;
  let whites = total - buffer.filter((res) => res === 0).length;
  const percentb = (total - blacks) / total;
  const percentw = (total - whites) / total;
  console.log("blacks=" + percentb * 100);
  console.log("white=" + percentw * 100);

  //   console.log(buffer.filter((res) => res !== 0));
  // pixels is a 1d array (in rgba order) of decoded pixel data
});
