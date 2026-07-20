const links = [...document.querySelectorAll('[data-chapter-link]')];
const stages = [...document.querySelectorAll('[data-chapter]')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((link) => {
        link.classList.toggle('active', link.dataset.chapterLink === entry.target.dataset.chapter);
      });
    }
  }, { rootMargin: '-34% 0px -52% 0px', threshold: 0 });

  stages.forEach((stage) => observer.observe(stage));
}
