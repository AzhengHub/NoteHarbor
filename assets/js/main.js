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
  /*! Font Awesome Free 6.7.2 by Fonticons, Inc. (CC BY 4.0, https://fontawesome.com/license/free). */
  const COPY_ICON = '<svg viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  const DONE_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="m3 8.5 3.3 3.3L13 5.2"/></svg>';
  document.querySelectorAll('.code-block').forEach(block => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'copy-code'; button.title = '复制代码'; button.setAttribute('aria-label', '复制代码'); button.innerHTML = COPY_ICON;
    (block.querySelector(':scope > .highlight') || block).append(button);
    button.addEventListener('click', async () => {
      const text = block.querySelector('pre')?.innerText || '';
      let input;
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
        else {
          input = document.createElement('textarea'); input.value = text; input.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(input); input.select(); if (!document.execCommand('copy')) throw Error('copy failed');
        }
        button.innerHTML = DONE_ICON; button.title = '已复制';
        setTimeout(() => { button.innerHTML = COPY_ICON; button.title = '复制代码'; }, 1600);
      } catch (_) {
        button.title = '复制失败';
        setTimeout(() => { button.title = '复制代码'; }, 1600);
      }
      finally { if (input) input.remove(); }
    });
  });
  const tocLinks = [...document.querySelectorAll('.toc nav a[href^="#"]')];
  // Jump straight to the heading instead of animating the scroll.
  for (const link of document.querySelectorAll('.toc a[href^="#"]')) {
    link.addEventListener('click', event => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      try { history.pushState(null, '', link.hash); } catch (_) {}
    });
  }
  const sections = tocLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.toggle('is-active', decodeURIComponent(link.hash.slice(1)) === entry.target.id));
      }
    }, { rootMargin: '-80px 0px -70% 0px' });
    sections.forEach(section => observer.observe(section));
  }
  // Keep sidebar sections open across page loads; the server only opens the
  // current path, so without this every navigation collapses the rest.
  const NAV_KEY = 'noteharbor-nav-open';
  let navState = {};
  try { navState = JSON.parse(localStorage.getItem(NAV_KEY) || '{}') || {}; } catch (_) {}
  const navGroups = [...document.querySelectorAll('.nav-group[data-nav-key]')];
  for (const group of navGroups) {
    const key = group.dataset.navKey;
    if (!group.querySelector('[aria-current="page"]') && key in navState) group.open = navState[key];
  }
  for (const group of navGroups) {
    const key = group.dataset.navKey;
    navState[key] = group.open;
    group.addEventListener('toggle', () => {
      navState[key] = group.open;
      try { localStorage.setItem(NAV_KEY, JSON.stringify(navState)); } catch (_) {}
    });
  }
  try { localStorage.setItem(NAV_KEY, JSON.stringify(navState)); } catch (_) {}
  // Bring the current page's nav entry into view, so deep sections do not leave
  // the reader staring at the top of a long sidebar after every click.
  const activeLink = sidebar && sidebar.querySelector('.nav-link.is-active');
  if (activeLink) {
    const box = sidebar.getBoundingClientRect();
    const link = activeLink.getBoundingClientRect();
    if (link.top < box.top + 8 || link.bottom > box.bottom - 8) {
      sidebar.scrollTop += link.top - box.top - (box.height - link.height) / 2;
    }
  }
  // Links to a section index (the terminal tree, the "文章目录" rows) would only
  // show another list of pages. Expand the matching sidebar group instead.
  const groupsByPath = new Map();
  for (const group of navGroups) {
    try { groupsByPath.set(new URL(group.dataset.navKey, location.origin).pathname.replace(/\/$/, ''), group); } catch (_) {}
  }
  function expandGroup(href) {
    if (!href || sidebar.offsetParent === null) return false;
    let url;
    try { url = new URL(href, location.href); } catch (_) { return false; }
    if (url.origin !== location.origin) return false;
    const group = groupsByPath.get(url.pathname.replace(/\/$/, ''));
    if (!group) return false;
    for (let parent = group.parentElement; parent; parent = parent.parentElement) {
      if (parent.classList && parent.classList.contains('nav-group')) parent.open = true;
    }
    group.open = true;
    const summary = group.querySelector('summary');
    const box = sidebar.getBoundingClientRect();
    const row = summary.getBoundingClientRect();
    sidebar.scrollTop += row.top - box.top - (box.height - row.height) / 2;
    group.classList.add('is-nav-flash');
    setTimeout(() => group.classList.remove('is-nav-flash'), 1200);
    return true;
  }
  document.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || !link.closest('.term-window, .article-list')) return;
    if (expandGroup(link.getAttribute('href'))) event.preventDefault();
  });
})();
