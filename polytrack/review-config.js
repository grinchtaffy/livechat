// The developer documents this setting for permitted reuploads.
window.polytrackModConfiguration = { unblocked: true };
// Offline review only: disable the standard WebRTC constructor as a best-effort precaution.
for (const name of ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection"]) {
  try { Object.defineProperty(window, name, { value: undefined, writable: false, configurable: false }); } catch (_) {}
}
