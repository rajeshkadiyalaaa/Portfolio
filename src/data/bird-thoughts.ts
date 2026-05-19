/** Bird thought lines shown in the page bird speech bubble. */

export type BirdMood = 'roam' | 'land' | 'flee' | 'greeting';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

const TIME_GREETINGS: Record<TimeOfDay, string[]> = {
  morning: ['Good morning, early explorer.', 'Fresh day — let’s see what you build.'],
  afternoon: ['Good afternoon — still building?', 'Midday wander… plenty to explore here.'],
  evening: ['Good evening, night owl.', 'Golden hour on the page.'],
  night: ['Burning the midnight oil?', 'Quiet night. Good time to read projects.'],
};

/** Exploration / roaming */
const ROAM_THOUGHTS: string[] = [
  'Something interesting nearby…',
  'Just wandering…',
  'This place feels quiet.',
  'Another corner to explore.',
  "Maybe there's art here.",
  'Hmm…',
  'Soft winds tonight.',
  'Looking for stories.',
  'A peaceful place.',
  'Where does this lead?',
  'Tiny world. Big thoughts.',
  'Following the light.',
];

/** Calm ambient + poetic (roam pool) */
const AMBIENT_ROAM_THOUGHTS: string[] = [
  'The air feels soft.',
  'Everything is still.',
  'Quiet moments matter.',
  'Listening to the wind.',
  'Floating gently…',
  'Peaceful here.',
  'Nothing rushed.',
  'Breathing room.',
  'Some places feel like dreams.',
  'Soft light. Quiet thoughts.',
  'Memories hidden in pixels.',
  'Silence can be beautiful.',
  'Floating between moments.',
  'Even stillness moves.',
  'A gentle digital world.',
  'I definitely meant to land here.',
  'No crumbs detected.',
];

/** Flee / scared */
const FLEE_THOUGHTS: string[] = [
  'Too fast!',
  'Careful!',
  'Ah!',
  'Need space!',
  'That startled me.',
  'Not today.',
  'Retreating…',
];

const LAND_GENERIC: string[] = [
  'Nice spot to rest.',
  'Let me rest here.',
  'Taking a quiet break…',
];

const SECTION_LAND: Record<string, string[]> = {
  home: ['This feels familiar.', 'The journey starts here.', 'Warm landing.'],
  about: ['Who are you really?', 'A quiet introduction.'],
  projects: ['You made this?', 'Interesting details…'],
  background: ['Years in a few pages.', 'Important memories.'],
  contact: ['Should I say hello?', "Someone's listening here.", 'This feels human.'],
};

const HOVER_STYLE_LAND: { match: (el: HTMLElement) => boolean; thoughts: string[] }[] = [
  {
    match: (el) => el.classList.contains('rk-contact-submit'),
    thoughts: ['Can I touch this?', 'This seems important.'],
  },
  {
    match: (el) => el.classList.contains('rk-project-card-link'),
    thoughts: ['Tell me more.', "What's hidden here?"],
  },
  {
    match: (el) => el.classList.contains('rk-project-card') || !!el.closest('.rk-project-card'),
    thoughts: ["What's hidden here?", 'Nice composition.'],
  },
  {
    match: (el) => !!el.closest('.rk-nav-icons'),
    thoughts: ['Another world?'],
  },
  {
    match: (el) => el.classList.contains('rk-btn-resume') || el.classList.contains('rk-projects-cta'),
    thoughts: ['This seems important.'],
  },
  {
    match: (el) => el.classList.contains('rk-about-tag'),
    thoughts: ['Can I touch this?'],
  },
];

function sectionFromHref(href: string): string | null {
  if (!href.startsWith('#')) return null;
  return href.slice(1) || 'home';
}

function thoughtFromPerch(el: HTMLElement): string | null {
  const custom = el.getAttribute('data-bird-thought');
  if (custom) return custom;

  for (const { match, thoughts } of HOVER_STYLE_LAND) {
    if (match(el)) return pick(thoughts);
  }

  const href = el.getAttribute('href') ?? '';
  const sectionId = sectionFromHref(href);
  if (sectionId && SECTION_LAND[sectionId]) {
    return pick(SECTION_LAND[sectionId]);
  }

  const text = el.textContent?.trim();

  if (el.classList.contains('rk-btn-resume') || href.includes('.pdf')) {
    return pick(['This seems important.', 'Important paper energy.']);
  }

  if (el.classList.contains('rk-background-column-icon')) {
    return pick(SECTION_LAND.background);
  }

  if (text && text.length < 32) {
    return `${text} — interesting.`;
  }

  return null;
}

export function pickBirdThought(mood: BirdMood, perchEl?: HTMLElement | null): string {
  if (mood === 'greeting') {
    return pick(TIME_GREETINGS[getTimeOfDay()]);
  }

  if (mood === 'flee') {
    return pick(FLEE_THOUGHTS);
  }

  if (mood === 'land') {
    if (perchEl) {
      const perchThought = thoughtFromPerch(perchEl);
      if (perchThought) return perchThought;
    }
    return pick(LAND_GENERIC);
  }

  const pool = Math.random() < 0.55 ? ROAM_THOUGHTS : AMBIENT_ROAM_THOUGHTS;
  return pick(pool);
}
