import Img from "next/image";

import { useEffect, useRef, useState } from "react";

export default function Image({ src, alt = "포스트 썸네일", ...rests }) {
  const initialMount = useRef(true);

  const [imgSrc, setImgSrc] = useState(src);

  function handleError() {
    const fallbackSrc =
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg";

    setImgSrc(fallbackSrc);
  }

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setImgSrc(src);
    }
  }, [src]);

  return <Img src={imgSrc} onError={handleError} {...rests} />;
}
