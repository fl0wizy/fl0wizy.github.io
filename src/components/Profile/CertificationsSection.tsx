import { profileData } from '../../lib/data';
import { useLang, useT } from '../../lib/i18n';
import './CertificationsSection.css';

export default function CertificationsSection() {
  const { L } = useLang();
  const t = useT();
  const { certifications } = profileData;

  if (certifications.length === 0) return null;

  return (
    <section className="certifications-section">
      <h2 className="section-header">{t('certifications')}</h2>
      <div className="cert-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="9" r="6" />
                <path d="M9 14.5 8 22l4-2 4 2-1-7.5" />
                <path d="M9.5 9l1.7 1.7L14.5 7.4" />
              </svg>
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{L(cert.title)}</h3>
              <p className="cert-issuer">{L(cert.issuer)}</p>
            </div>
            <span className="cert-date">{cert.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
