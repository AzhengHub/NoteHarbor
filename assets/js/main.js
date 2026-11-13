(function () {
  'use strict';
  const sidebar = document.getElementById('sidebar');
  const menu = document.querySelector('.mobile-menu');
  const backdrop = document.querySelector('.sidebar-backdrop');
  function setMenu(open) {
    sidebar.classList.toggle('is-open', open);
    backdrop.hidden = !open;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  }
  menu.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
  backdrop.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && sidebar.classList.contains('is-open')) { setMenu(false); menu.focus(); } });
  document.querySelector('.theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('noteharbor-theme', theme); } catch (_) {}
  });
  document.querySelectorAll('.code-block').forEach(block => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'copy-code'; button.setAttribute('aria-label', '复制代码'); button.textContent = '复制';
    block.prepend(button);
    button.addEventListener('click', async () => {
      const text = block.querySelector('pre')?.innerText || '';
      let input;
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
        else {
          input = document.createElement('textarea'); input.value = text; input.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(input); input.select(); if (!document.execCommand('copy')) throw Error('copy failed');
        }
        button.textContent = '已复制'; setTimeout(() => { button.textContent = '复制'; }, 2000);
      } catch (_) { button.textContent = '复制失败'; }
      finally { if (input) input.remove(); }
    });
  });
  const tocLinks = [...document.querySelectorAll('.toc nav a[href^="#"]')];
  const sections = tocLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.toggle('is-active', decodeURIComponent(link.hash.slice(1)) === entry.target.id));
      }
    }, { rootMargin: '-80px 0px -70% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
