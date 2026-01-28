import { profileData } from '../../lib/data';
import './EducationSection.css';

export default function EducationSection() {
  const { education } = profileData;

  if (education.length === 0) return null;

  return (
    <section className="education-section">
      <h2 className="section-header">EDUCATION</h2>
      <div className="timeline">
        {education.map((edu, index) => (
          <div key={index} className="timeline-item">
            <div className="education-card">
              <div className="education-header">
                <div className="education-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                  </svg>
                </div>
                <div className="education-title-info">
                  <h3 className="education-title">{edu.title}</h3>
                  <p className="education-institution">
                    {edu.institution}
                    {edu.subInfo && <span className="education-subinfo"> ({edu.subInfo})</span>}
                  </p>
                </div>
                <span className={`education-period ${edu.current ? 'current' : ''}`}>
                  {edu.period}
                </span>
              </div>
              <p className="education-description">{edu.description}</p>
              {edu.tags && edu.tags.length > 0 && (
                <div className="education-tags">
                  {edu.tags.map((tag, tagIndex) => (
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
