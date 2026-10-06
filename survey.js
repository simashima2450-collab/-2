'use strict';
const raw = window.SURVEY_CONFIG?.formUrl?.trim();
const link = document.getElementById('form-link');
const status = document.getElementById('form-status');
if (raw) {
  try {
    const url = new URL(raw);
    const validHost = ['docs.google.com', 'forms.gle'].includes(url.hostname);
    const validPath = url.hostname === 'forms.gle' || /^\/forms\//.test(url.pathname);
    if (url.protocol !== 'https:' || !validHost || !validPath || /\/edit\/?$/.test(url.pathname)) throw new Error('Invalid responder URL');
    link.href = url.href;
    link.hidden = false;
    status.hidden = true;
  } catch (_) {
    status.textContent = '回答フォームは準備中です。';
  }
}
