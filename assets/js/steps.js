/**
 * Turn ordered lists whose items start with a bold "title:" into the step
 * component: circled numbers joined by a dotted line.
 *
 * Recognises both **Title:** text and **Title**：text. Lists that were split by
 * code blocks or paragraphs are regrouped, stopping at headings and rules.
 */
(function () {
  'use strict';

  function firstMeaningful(el) {
    var n = el.firstChild;
    while (n && n.nodeType === 3 && !n.textContent.trim()) n = n.nextSibling;
    return n;
  }

  function findStrong(li) {
    if (li.tagName !== 'LI') return null;
    var scope = li;
    var first = firstMeaningful(li);
    if (first && first.nodeType === 1 && first.tagName === 'P') {
      scope = first;
      first = firstMeaningful(scope);
    }
    if (!first || first.nodeType !== 1 || first.tagName !== 'STRONG') return null;
    if (/[:：]\s*$/.test(first.textContent)) return { scope: scope, strong: first };

    // The colon may sit just outside the emphasis: **Title**：text
    var next = first.nextSibling;
    if (next && next.nodeType === 3 && /^\s*[:：]/.test(next.textContent)) {
      next.textContent = next.textContent.replace(/^\s*[:：]\s*/, ' ');
      return { scope: scope, strong: first };
    }
    return null;
  }

  function isStepList(el) {
    if (!el || el.tagName !== 'OL') return false;
    var lis = el.children;
    if (!lis.length) return false;
    for (var i = 0; i < lis.length; i++) {
      if (!findStrong(lis[i])) return false;
    }
    return true;
  }

  function isTerminator(el) {
    return /^(H[1-6]|HR|HEADER|FOOTER|SECTION|NAV|ASIDE)$/.test(el.tagName);
  }

  function trimTrailingPunct(el) {
    var last = el.lastChild;
    if (last && last.nodeType === 3) {
      last.textContent = last.textContent.replace(/[.。]\s*$/, '');
      if (!last.textContent) el.removeChild(last);
    }
  }

  function buildStep(li) {
    var hit = findStrong(li);
    var scope = hit.scope;
    var strong = hit.strong;

    var root = document.createElement('div');
    root.className = 'steps-step';

    var title = document.createElement('div');
    title.className = 'steps-step__title';
    title.innerHTML = strong.innerHTML.replace(/[:：]\s*$/, '');
    root.appendChild(title);

    var subtitle = document.createElement('div');
    subtitle.className = 'steps-step__subtitle';
    var content = document.createElement('div');
    content.className = 'steps-step__content';

    var restP = null;
    var node = strong.nextSibling;
    while (node) {
      var next = node.nextSibling;
      if (node.nodeType === 3 && node.textContent.indexOf('\n') !== -1) {
        var text = node.textContent;
        var cut = text.indexOf('\n');
        if (text.slice(0, cut).trim()) {
          subtitle.appendChild(document.createTextNode(text.slice(0, cut)));
        }
        restP = document.createElement('p');
        var after = text.slice(cut + 1);
        if (after.trim()) restP.appendChild(document.createTextNode(after));
        while (next) {
          var n2 = next.nextSibling;
          restP.appendChild(next);
          next = n2;
        }
        break;
      }
      subtitle.appendChild(node);
      node = next;
    }
    trimTrailingPunct(subtitle);
    if (subtitle.textContent.trim()) root.appendChild(subtitle);
    root.appendChild(content);

    if (restP && (restP.textContent.trim() || restP.firstElementChild)) content.appendChild(restP);
    if (scope !== li) {
      var sib = scope.nextSibling;
      while (sib) {
        var s2 = sib.nextSibling;
        content.appendChild(sib);
        sib = s2;
      }
    }
    return { root: root, content: content };
  }

  function transform(container) {
    var i = 0;
    while (i < container.children.length) {
      var el = container.children[i];
      if (!isStepList(el)) { i++; continue; }

      var members = [];
      var stepCount = 0;
      var j = i;
      while (j < container.children.length) {
        var n = container.children[j];
        if (isStepList(n)) {
          var start = parseInt(n.getAttribute('start') || '1', 10);
          if (stepCount > 0 && start <= 1) break;
          members.push({ ol: n });
          stepCount += n.children.length;
          j++;
        } else if (isTerminator(n) || n.tagName === 'P') {
          break;
        } else {
          members.push({ el: n });
          j++;
        }
      }
      if (stepCount < 2) { i = j; continue; }

      var wrap = document.createElement('div');
      wrap.className = 'steps';
      var current = null;
      members.forEach(function (m) {
        if (m.ol) {
          Array.prototype.slice.call(m.ol.children).forEach(function (li) {
            current = buildStep(li);
            wrap.appendChild(current.root);
          });
        } else if (current) {
          current.content.appendChild(m.el);
        }
      });
      container.insertBefore(wrap, el);
      members.forEach(function (m) { if (m.ol) m.ol.remove(); });

      var after = wrap.nextElementSibling;
      if (after && after.tagName === 'HR') after.remove();

      i = Array.prototype.indexOf.call(container.children, wrap) + 1;
    }
  }

  function run() {
    document.querySelectorAll('.prose').forEach(function (container) {
      if (!container.closest('.term-window')) transform(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
