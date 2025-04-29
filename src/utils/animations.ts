export const scrollFadeIn = (element: Element) => {
  element.classList.add('opacity-100', 'translate-y-0');
};

export const setupIntersectionObserver = (
  selector: string, 
  callback: (element: Element) => void,
  options = { threshold: 0.1, rootMargin: '50px' }
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => observer.observe(el));
  
  return () => {
    elements.forEach((el) => observer.unobserve(el));
  };
};

export const initScrollAnimations = () => {
  const animationClasses = [
    'scroll-fade-in',
    'scroll-slide-up',
    'scroll-slide-down',
    'scroll-slide-left',
    'scroll-slide-right',
    'scroll-scale'
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '50px'
    }
  );

  animationClasses.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(element => {
      observer.observe(element);
    });
  });

  return observer;
};

export const animate = {
  fadeIn: 'scroll-fade-in',
  slideUp: 'scroll-slide-up',
  slideDown: 'scroll-slide-down',
  slideLeft: 'scroll-slide-left',
  slideRight: 'scroll-slide-right',
  scale: 'scroll-scale',
};

export const stagger = {
  1: 'stagger-1',
  2: 'stagger-2',
  3: 'stagger-3',
  4: 'stagger-4',
  5: 'stagger-5',
};

export const transition = {
  fast: 'transition-all duration-300',
  medium: 'transition-all duration-500',
  slow: 'transition-all duration-700',
};