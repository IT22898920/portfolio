import { useEffect, useRef, useState } from "react";

import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!props.video || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [props.video]);

  const videoUrl = isInView && props.video ? `/videos/${props.video}` : "";

  return (
    <div className="work-image" ref={containerRef}>
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
          <video
            src={videoUrl}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            poster={props.image}
          />
        ) : (
          <img src={props.image} alt={props.alt} />
        )}
      </a>
    </div>
  );
};

export default WorkImage;
