import { profileData } from '../../lib/data';
import './SkillsSection.css';

const levelLabels = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
  expert: '전문가',
};

const levelColors = {
  beginner: 'blue',
  intermediate: 'yellow',
  advanced: 'purple',
  expert: 'green',
};

export default function SkillsSection() {
  const { skills } = profileData;

  if (skills.length === 0) return null;

  return (
    <section className="skills-section">
      <h2 className="section-header">SKILLS</h2>
      <div className="timeline">
        {skills.map((skill, index) => (
          <div key={index} className="timeline-item">
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="skill-title-info">
                  <h3 className="skill-title">{skill.name}</h3>
                  <p className="skill-category">{skill.category}</p>
                </div>
                <span className={`skill-level level-${levelColors[skill.level]}`}>
                  {levelLabels[skill.level]}
                </span>
              </div>
              <p className="skill-description">{skill.description}</p>
              {skill.tags && skill.tags.length > 0 && (
                <div className="skill-tags">
                  {skill.tags.map((tag, tagIndex) => (
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
