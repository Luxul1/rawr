const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#primary-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.innerHTML = open ? 'CLOSE <b>−</b>' : 'MENU <b>＋</b>';
    siteNav.classList.toggle('is-open', open);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.innerHTML = 'MENU <b>＋</b>';
      siteNav.classList.remove('is-open');
    });
  });
}

// The home-page scene is driven by scroll progress: the fruit leaves the tree,
// crosses the stage, and crossfades into the supplied logo artwork.
const story = document.querySelector('.signature-story');
if (story) {
  const tree = story.querySelector('.tree-art');
  const fallingApple = story.querySelector('.falling-apple');
  const logo = story.querySelector('.logo-reveal');
  const intro = story.querySelector('.story-copy');
  const skills = [...story.querySelectorAll('.orbit-skills span')];
  let pending = false;

  const clamp01 = (value) => Math.min(1, Math.max(0, value));
  const updateStory = () => {
    pending = false;
    const travel = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = clamp01((window.scrollY - story.offsetTop) / travel);
    const fall = clamp01((progress - 0.03) / 0.52);
    const reveal = clamp01((progress - 0.49) / 0.19);
    const fadeApple = clamp01((progress - 0.56) / 0.12);
    const treeFade = clamp01((progress - 0.05) / 0.37);
    const stage = story.querySelector('.story-sticky');
    const appleImageWidth = tree.offsetWidth * .28;
    const appleStartX = ((tree.offsetLeft + tree.offsetWidth * .493 + appleImageWidth * .09) / stage.clientWidth) * 100;
    const appleStartY = ((tree.offsetTop + tree.offsetHeight * .54 + appleImageWidth * .07) / stage.clientHeight) * 100;
    tree.style.opacity = String(1 - treeFade);
    tree.style.transform = `translateY(${-54 * treeFade}px) scale(${1 - .04 * treeFade})`;
    intro.style.opacity = String(1 - clamp01((progress - 0.12) / 0.2));
    fallingApple.style.left = `${appleStartX + (50 - appleStartX) * fall}%`;
    fallingApple.style.top = `${appleStartY + (67 - appleStartY) * fall}%`;
    fallingApple.style.width = `${appleImageWidth}px`;
    fallingApple.style.transform = `translate(-50%,-50%) rotate(${fall * 185}deg) scale(${1 - .22 * fadeApple})`;
    fallingApple.style.opacity = String(1 - fadeApple);
    logo.style.opacity = String(reveal);
    logo.style.top = `${67 - 16 * reveal}%`;
    logo.style.transform = `translate(-50%,-50%) scale(${.78 + .22 * reveal}) rotate(${-5 + 5 * reveal}deg)`;
    skills.forEach((skill, index) => {
      const shown = clamp01((progress - .64 - index * .025) / .12);
      skill.style.opacity = String(shown);
      skill.style.transform = `translateY(${12 * (1 - shown)}px) rotate(${index % 2 ? 3 : -3}deg)`;
    });
  };
  const requestStoryUpdate = () => {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(updateStory);
    }
  };
  window.addEventListener('scroll', requestStoryUpdate, { passive: true });
  window.addEventListener('resize', requestStoryUpdate);
  tree.addEventListener('load', requestStoryUpdate, { once: true });
  updateStory();
}

document.querySelectorAll('[data-dialog-open]').forEach((trigger) => {
  const dialog = document.getElementById(trigger.dataset.dialogOpen);
  if (!dialog) return;
  trigger.addEventListener('click', () => dialog.showModal());
  dialog.querySelectorAll('[data-dialog-close]').forEach((closeButton) => {
    closeButton.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const contactForm = document.querySelector('[data-recipient]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');
    const recipient = contactForm.dataset.recipient.trim();
    if (!recipient || recipient.includes('YOUR-EMAIL')) {
      status.textContent = 'Add your email address in the form’s data-recipient setting before using it.';
      return;
    }
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent(`From: ${data.get('name')} (${data.get('email')})\n\n${data.get('message')}`);
    status.textContent = 'Your email app should open with a draft. Review it there and send when you’re ready.';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
