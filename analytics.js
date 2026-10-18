// Activa solo después de configurar este dominio en tu cuenta de Plausible.
window.ANALYTICS_CONFIG = { enabled: false, domain: 'magnificent-empanada-bff6dc.netlify.app' };
window.trackLearningEvent = function(name, props = {}) {
  if (window.ANALYTICS_CONFIG.enabled && typeof window.plausible === 'function') window.plausible(name, { props });
};
if (window.ANALYTICS_CONFIG.enabled) {
  window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments); };
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = window.ANALYTICS_CONFIG.domain;
  script.src = 'https://plausible.io/js/script.hash.outbound-links.js';
  document.head.append(script);
}
