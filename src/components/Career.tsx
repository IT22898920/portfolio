import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineering Student</h4>
                <h5>SLIIT</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Started my Software Engineering journey at Sri Lanka Institute of
              Information Technology (SLIIT). Building a strong foundation in
              programming, data structures, algorithms, and software development
              methodologies. Engaged in various academic projects and group
              collaborations.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer Intern</h4>
                <h5>Localseo (Pvt) Ltd</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed a 6-month internship gaining hands-on experience in
              full-stack development. Worked on real-world projects, learned
              industry best practices, and contributed to building scalable web
              applications using modern technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Localseo (Pvt) Ltd</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked as a permanent Full Stack Developer, building and
              maintaining web applications. Applied full-stack development
              skills with focus on both frontend and backend technologies,
              API development, and delivering high-quality solutions for clients.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & CEO</h4>
                <h5>
                  <a
                    href="https://nextgen.pasanjith.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NextGen Web Solutions
                  </a>
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Founded NextGen Web Solutions, a digital solutions agency
              delivering cutting-edge web development, mobile apps, and
              network solutions for businesses across Sri Lanka. Leading a
              team that builds modern applications using Next.js, React,
              Node.js, and cloud technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
