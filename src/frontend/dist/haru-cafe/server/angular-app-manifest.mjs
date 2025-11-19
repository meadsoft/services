
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 20578, hash: '0c86795b78e2bbd04fa43d02da8f0f8803d4e426b37fcd19679940471c1a97d3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 18252, hash: '6c299ac4151dbec4ad295ac96c738df56ca80d025889a6f783e860a0b5462806', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OBHWJLVW.css': {size: 26949, hash: 'J61KcFt+P0A', text: () => import('./assets-chunks/styles-OBHWJLVW_css.mjs').then(m => m.default)}
  },
};
