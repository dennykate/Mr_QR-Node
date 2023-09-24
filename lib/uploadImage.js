import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Resvg } from "@resvg/resvg-js";

import { storage } from "../firebase/config.js";

export default async (svg) => {
  const opts = {
    background: "rgba(238, 235, 230, .9)",
    fitTo: {
      mode: "width",
      value: 500,
    },
  };

  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const storageRef = ref(storage, uuidv4() + ".jpg");

  return await uploadBytes(storageRef, pngBuffer, {
    // contentType: "application/octet-stream",
    contentType: "image/jpeg",
  }).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((url) => {
      return url;
    });
  });
};
