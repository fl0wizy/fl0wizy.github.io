import {
  ProfileCard,
  ExperienceSection,
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
      <ProjectsSection />
      <EducationSection />
      <SkillsSection />
    </div>
  );
}
