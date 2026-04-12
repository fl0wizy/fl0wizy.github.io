import { profileData } from '../../lib/data';
import './AwardsSection.css';

export default function AwardsSection() {
  const { awards } = profileData;

  if (awards.length === 0) return null;

  return (
    <section className="awards-section">
      <h2 className="section-header">AWARDS</h2>
      <div className="timeline">
        {awards.map((award, index) => (
          <div key={index} className="timeline-item">
            <div className="award-card">
              <div className="award-header">
                <div className="award-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
                    <circle cx="12" cy="8" r="7" />
                  </svg>
                </div>
                <div className="award-title-info">
                  <h3 className="award-title">{award.title}</h3>
                  <p className="award-organizer">{award.organizer}</p>
                </div>
                <span className="award-period">{award.period}</span>
              </div>
              <p className="award-description">{award.description}</p>
              {award.tags && award.tags.length > 0 && (
                <div className="award-tags">
                  {award.tags.map((tag, tagIndex) => (
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
