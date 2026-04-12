import {
  ProfileCard,
  ExperienceSection,
  AwardsSection,
  ProjectsSection,
  EducationSection,
  SkillsSection,
} from '../components/Profile';
import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-page">
      <ProfileCard />
      <ExperienceSection />
      <AwardsSection />
      <ProjectsSection />
      <EducationSection />
      <SkillsSection />
    </div>
  );
}
