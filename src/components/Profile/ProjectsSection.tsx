import { profileData } from '../../lib/data';
import './ProjectsSection.css';

export default function ProjectsSection() {
  const { projects } = profileData;

  if (projects.length === 0) return null;

  return (
    <section className="projects-section">
      <h2 className="section-header">PROJECTS</h2>
      <div className="timeline">
        {projects.map((project, index) => (
          <div key={index} className="timeline-item">
            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                </div>
                <div className="project-title-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-type">{project.type}</p>
                </div>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-description">{project.description}</p>
              {project.tags && project.tags.length > 0 && (
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
