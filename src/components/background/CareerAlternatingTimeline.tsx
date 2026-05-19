import { CAREER_MILESTONES, type CareerMilestone } from '../../data/background';
import { ScrollReveal } from '../ui/scroll-reveal';

type MilestoneCardProps = {
  milestone: CareerMilestone;
};

const MilestoneCard = ({ milestone }: MilestoneCardProps) => {
  const Icon = milestone.icon;
  return (
    <div className="rk-career-milestone__card">
      <span className="rk-career-milestone__icon" aria-hidden data-bird-perch>
        <Icon size={28} strokeWidth={1.5} />
      </span>
      <h3 className="rk-career-milestone__title">{milestone.title}</h3>
      <p className="rk-career-milestone__org">{milestone.organization}</p>
      <p className="rk-career-milestone__desc">{milestone.description}</p>
    </div>
  );
};

const CareerAlternatingTimeline = () => {
  return (
    <div className="rk-career-timeline" role="list" aria-label="Education and experience timeline">
      <div className="rk-career-timeline__track-bar" aria-hidden />

      <div className="rk-career-timeline__cols">
        {CAREER_MILESTONES.map((milestone, index) => {
          const isTop = index % 2 === 0;
          return (
            <ScrollReveal
              key={milestone.period}
              as="article"
              variant="up"
              delay={280 + index * 100}
              className={`rk-career-milestone${isTop ? ' rk-career-milestone--top' : ' rk-career-milestone--bottom'}`}
              role="listitem"
            >
              <time className="rk-career-milestone__period" dateTime={milestone.period}>
                {milestone.period}
              </time>

              <div className="rk-career-milestone__body">
                <span className="rk-career-milestone__connector" aria-hidden />
                <MilestoneCard milestone={milestone} />
              </div>

              <div className="rk-career-milestone__axis" aria-hidden>
                <span className="rk-career-milestone__node" />
                <span className="rk-career-timeline__track-label">{milestone.trackLabel}</span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default CareerAlternatingTimeline;
