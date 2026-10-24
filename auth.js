/* Glow Muse + Amazon Cognito authentication
   Uses Cognito Managed Login with Authorization Code + PKCE.
*/
const COGNITO_AUTH = {
  authority: 'https://ap-south-1fysutifot.auth.ap-south-1.amazoncognito.com',
  clientId: '61e2haf5cbv2lb3ke1hhv8ip7d',
  redirectUri: 'https://drd9ol7m1usnb.cloudfront.net/',
  logoutUri: 'https://drd9ol7m1usnb.cloudfront.net/',
  scope: 'openid email'
};

const AUTH_KEYS = {
  verifier: 'glowMuse.pkceVerifier',
  state: 'glowMuse.oauthState',
  tokens: 'glowMuse.tokens'
};

function base64Url(bytes) {
  let binary = '';
  bytes.forEach(b => binary += String.fromCharCode(b));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomString(length = 64) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function sha256Base64Url(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return base64Url(new Uint8Array(digest));
}

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(decodeURIComponent(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    ));
  } catch {
    return {};
  }
}

function getTokens() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_KEYS.tokens) || 'null');
  } catch {
    return null;
  }
}

function getUserEmail() {
  const tokens = getTokens();
  if (!tokens?.id_token) return null;
  const claims = parseJwt(tokens.id_token);
  return claims.email || claims.username || null;
}

function setAuthButton() {
  const button = document.getElementById('authBtn');
  if (!button) return;
  const email = getUserEmail();
  if (email) {
    button.textContent = email;
    button.title = 'Signed in as ' + email;
  } else {
    button.textContent = 'Sign in';
    button.title = 'Sign in to Glow Muse';
  }
}

async function signIn() {
  const verifier = randomString(64);
  const state = randomString(32);
  const challenge = await sha256Base64Url(verifier);
  sessionStorage.setItem(AUTH_KEYS.verifier, verifier);
  sessionStorage.setItem(AUTH_KEYS.state, state);

  const url = new URL(COGNITO_AUTH.authority + '/oauth2/authorize');
  url.searchParams.set('client_id', COGNITO_AUTH.clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', COGNITO_AUTH.scope);
  url.searchParams.set('redirect_uri', COGNITO_AUTH.redirectUri);
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('code_challenge', challenge);
  window.location.assign(url.toString());
}

async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  if (error) {
    console.error('Cognito sign-in error:', error, params.get('error_description'));
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  if (!code) return;

  const savedState = sessionStorage.getItem(AUTH_KEYS.state);
  const verifier = sessionStorage.getItem(AUTH_KEYS.verifier);

  if (!savedState || !verifier || state !== savedState) {
    console.error('Cognito sign-in failed: invalid OAuth state.');
    return;
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: COGNITO_AUTH.clientId,
    code,
    redirect_uri: COGNITO_AUTH.redirectUri,
    code_verifier: verifier
  });

  try {
    const response = await fetch(COGNITO_AUTH.authority + '/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });

    if (!response.ok) {
      throw new Error('Token exchange failed: HTTP ' + response.status);
    }

    const tokens = await response.json();
    sessionStorage.setItem(AUTH_KEYS.tokens, JSON.stringify(tokens));
    sessionStorage.removeItem(AUTH_KEYS.state);
    sessionStorage.removeItem(AUTH_KEYS.verifier);
    window.history.replaceState({}, document.title, window.location.pathname);
    setAuthButton();
    if (typeof window.toast === 'function') window.toast('Signed in successfully');
  } catch (err) {
    console.error(err);
    alert('Sign-in could not be completed. Please try again.');
  }
}

function signOut() {
  sessionStorage.removeItem(AUTH_KEYS.tokens);
  sessionStorage.removeItem(AUTH_KEYS.state);
  sessionStorage.removeItem(AUTH_KEYS.verifier);

  const url = new URL(COGNITO_AUTH.authority + '/logout');
  url.searchParams.set('client_id', COGNITO_AUTH.clientId);
  url.searchParams.set('logout_uri', COGNITO_AUTH.logoutUri);
  window.location.assign(url.toString());
}

document.addEventListener('DOMContentLoaded', async () => {
  await handleCallback();
  const button = document.getElementById('authBtn');
  if (button) {
    button.addEventListener('click', () => {
      if (getUserEmail()) signOut();
      else signIn();
    });
  }
  setAuthButton();
});
