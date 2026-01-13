import { useEffect, useState } from "react";

import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (props.video) {
      setVideoUrl(`/videos/${props.video}`);
    }
  }, [props.video]);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {videoUrl ? (
          <video src={videoUrl} autoPlay muted playsInline loop />
        ) : (
          <img src={props.image} alt={props.alt} />
        )}
      </a>
    </div>
  );
};

export default WorkImage;
