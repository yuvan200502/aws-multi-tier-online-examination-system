// src/security/AntiCheat.js

export function startAntiCheat(onAutoSubmit) {
  let violations = 0;
  let submitted = false;

  const warn = (msg) => {
    if (submitted) return;
    alert(`⚠️ Warning ${violations}/3\n${msg}`);
  };

  const handleViolation = (message) => {
    if (submitted) return;

    violations++;

    if (violations >= 3) {
      submitted = true;
      onAutoSubmit();
    } else {
      warn(message);
    }
  };

  const handleVisibility = () => {
    if (document.hidden) {
      handleViolation("Tab switch detected");
    }
  };

  const handleBlur = () => {
    // prevent double counting when tab switch already triggered
    if (!document.hidden) {
      handleViolation("Window lost focus");
    }
  };

  // ❌ DO NOT detect refresh / unload
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("blur", handleBlur);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("blur", handleBlur);
  };
}