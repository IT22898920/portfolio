import { useState, useRef } from "react";
import WorkImage from "./WorkImage";
import ProjectModal from "./ProjectModal";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

const projects: Project[] = [
  {
    name: "Fashion Fiesta",
    category: "Full-Stack E-Commerce",
    description:
      "A comprehensive fashion e-commerce platform with an integrated customer support ticket management system. Features product browsing, cart & checkout system, customer support tickets with real-time replies, multi-role authentication (Customer, Staff, Admin), admin dashboard with order & user management, file attachment support, and a fully responsive glassmorphism UI design.",
    tech: "React 18, Tailwind CSS, Node.js, Express, MongoDB, JWT",
    video: "Fashion_Fiesta.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "WorkPulse",
    category: "Hospital Management System",
    description:
      "A full-stack MERN application designed for hospital workforce management. Features role-based dashboards (Admin, HR, Employee), QR code attendance tracking, leave management with approval workflows, salary processing with EPF/ETF calculations, and shift scheduling for efficient hospital operations.",
    tech: "React 19, Node.js, Express, MongoDB, Tailwind CSS",
    video: "WorkPulse.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "TranslaterHUB",
    category: "Translation Platform",
    description:
      "A full-stack language translation and learning platform featuring real-time translation across 100+ languages, Text-to-Speech, Speech-to-Text, keyword extraction using NLP, English quizzes with difficulty levels, and an admin dashboard. Integrated Firebase authentication with Google OAuth support.",
    tech: "MERN Stack, Python Flask, Firebase, Google OAuth",
    video: "translater.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "Interior Furniture",
    category: "Business Management",
    description:
      "A full-stack MERN application for furniture business management featuring e-commerce functionality, inventory tracking, supplier coordination, and multi-role dashboards. Streamlines operations from product listing to delivery management.",
    tech: "React, Node.js, MongoDB, Tailwind CSS",
    video: "Furniture_Hub.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "BMS",
    category: "Enterprise Application",
    description:
      "A full-stack Business Management System handling KYC/BRA compliance workflows with features like multi-level approvals, document management, role-based permissions, and automated notifications. Built for enterprise-grade compliance and workflow automation.",
    tech: "React, Node.js, MongoDB",
    video: "BMS_New.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "Coconut Health AI",
    category: "Research Project",
    description:
      "A SLIIT research project leveraging AI and deep learning to help Sri Lankan coconut farmers. Features multi-pest detection (91-96% accuracy), disease detection (98.69% accuracy), leaf health analysis with treatment recommendations, branch health monitoring (99.63% accuracy), yield prediction using YOLOv8, and an AI chatbot with multi-language support (English, Sinhala, Tamil).",
    tech: "React Native, TensorFlow, EfficientNetB0, YOLOv8, Firebase",
    video: "Coconut.mp4",
    image: "/images/placeholder.webp",
  },
  {
    name: "FitZone Pro",
    category: "Gym Management System",
    description:
      "A comprehensive full-stack gym management platform with 5 user roles (Admin, Gym Owner, Instructor, Receptionist, Customer), real-time WebRTC voice/video calls, instant messaging via Socket.io, GPS-based gym discovery using MongoDB geospatial queries, and dual payment system with Stripe integration. Includes 73+ pages and 123+ API endpoints.",
    tech: "MERN Stack, WebRTC, Socket.io, Stripe, Firebase",
    video: "gym.mp4",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useGSAP(() => {
    // Check if screen is wide enough for horizontal scroll
    const isDesktop = window.innerWidth > 1024;

    if (!isDesktop || !flexRef.current || !sectionRef.current) {
      return;
    }

    const workFlex = flexRef.current;
    const workSection = sectionRef.current;
    const boxes = workFlex.querySelectorAll(".work-box");

    // Calculate total width of all boxes
    const boxWidth = boxes[0]?.getBoundingClientRect().width || 600;
    const totalBoxesWidth = boxWidth * boxes.length;
    const scrollAmount = totalBoxesWidth - window.innerWidth + 200;

    gsap.to(workFlex, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: workSection,
        start: "top top",
        end: `+=${scrollAmount}`,
        scrub: 1,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    // Refresh after content loads
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    // Clean up
    return () => {
      clearTimeout(refreshTimer);
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={flexRef}>
          {projects.map((project, index) => (
            <div
              className="work-box"
              key={index}
              onClick={() => openModal(project)}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Tech</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                video={project.video}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Work;
