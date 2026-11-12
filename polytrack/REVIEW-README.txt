POLYTRACK 0.6.3 — UNOFFICIAL OFFLINE REVIEW COPY

Based on your supplied PolyTrack-0.6.3-main.zip, not a verified official distribution. Original game by Kodub (https://www.kodub.com/). Official game: https://www.crazygames.com/game/polytrack . Not affiliated with, endorsed by, or sponsored by Kodub.com, CrazyGames, Poki or itch.io.

Changes:
- Removed the appended third-party promotional link/MutationObserver from main.bundle.js.
- Forced the existing unofficial-version check to identify this copy as unofficial. Original exact domain-check code is unavailable; the upstream uploader also forced a separate iframe check false. That change was not reconstructed. Do not treat this as a pristine or terms-verified build.
- Added documented reupload configuration and a best-effort WebRTC disable in review-config.js.
- Added CSP to index.html and Cloudflare Pages _headers restricting network requests to the game origin and local blob resources. Added noindex, referrer and permissions policies.
- Removed desktop-only electron folder, package.json and .gitattributes; retained game bundles, tracks, fonts, WASM, and assets.

This is an offline test build. External leaderboard, multiplayer, online track features will not work. The CSP is not a malware audit, and does not prevent every possible browser side channel. Never host this on the same origin as a site with private account data.

Before publishing: obtain a permitted clean web build from Kodub or confirm this modified copy complies with the developer's terms (https://www.kodub.com/terms/polytrack), including original notice and links, noncommercial use, no ads, and unofficial attribution. Do not deploy until confirmed.

Test locally in a separate browser profile with no LiveChat login. From the polytrack directory run python -m http.server 8000, then open http://localhost:8000/. Test racing, editor, saves and developer-console errors. Browser testing in the assistant environment was blocked by ERR_BLOCKED_BY_ADMINISTRATOR, so gameplay is not verified.

If confirmed for deployment, use Cloudflare Pages with the polytrack directory as output on a distinct origin (e.g. grinchtaffy-racing.pages.dev). Keep _headers. Do not add external proxy endpoints or remove the unofficial notice. Add its HTTPS URL to LiveChat's existing custom game menu only after testing. No Firebase or Worker update required.
