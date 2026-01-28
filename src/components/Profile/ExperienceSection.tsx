import { profileData } from '../../lib/data';
import './ExperienceSection.css';

export default function ExperienceSection() {
  const { experiences } = profileData;

  if (experiences.length === 0) return null;

  return (
    <section className="experience-section">
      <h2 className="section-header">EXPERIENCE</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="experience-card">
              <div className="experience-header">
                <div className="experience-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="experience-title-info">
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <span className={`experience-period ${exp.current ? 'current' : ''}`}>
                  {exp.period}
                </span>
              </div>
              <p className="experience-description">{exp.description}</p>
              {exp.tags && exp.tags.length > 0 && (
                <div className="experience-tags">
                  {exp.tags.map((tag, tagIndex) => (
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
