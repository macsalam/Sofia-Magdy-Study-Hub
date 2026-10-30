import { handleState } from './state.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/state') return handleState(request, env, ctx);
    return env.ASSETS.fetch(request);
  },
};
