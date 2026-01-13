import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./styles/ProjectModal.css";

interface Project {
  name: string;
  category: string;
  description: string;
  tech: string;
  video: string;
  image: string;
  link?: string;
  github?: string;
}

interface Props {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [isOpen, project]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div
      className={`project-modal-overlay ${isOpen ? "active" : ""}`}
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="project-modal">
        <button className="modal-close" onClick={onClose}>
          <IoClose />
        </button>

        <div className="modal-content">
          <div className="modal-video-container">
            <video
              ref={videoRef}
              src={`/videos/${project.video}`}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>

          <div className="modal-info">
            <div className="modal-header">
              <div>
                <h2>{project.name}</h2>
                <span className="modal-category">{project.category}</span>
              </div>
              <div className="modal-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>

            <p className="modal-description">{project.description}</p>

            <div className="modal-tech">
              <h4>Tech Stack</h4>
              <div className="tech-tags">
                {project.tech.split(", ").map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
