import {
  ProfileCard,
  ExperienceSection,
  AwardsSection,
  ProjectsSection,
  EducationSection,
  CertificationsSection,
  SkillsSection,
} from '../components/Profile';
import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-page">
      <ProfileCard />
      <EducationSection />
      <ExperienceSection />
      <AwardsSection />
      <CertificationsSection />
      <ProjectsSection />
      <SkillsSection />
    </div>
  );
}
