/* =========================================================================
   My Portfolio Kit — proof demo
   Same input, sharper output each pass. Auto-plays through the passes and
   loops; the manual button advances one pass and restarts the timer.

   Note (from the design handoff): the result bubble is a STABLE node whose
   text is updated in place — never a remounted node with a mount-keyframe,
   which would restart at opacity:0 forever. Fades use a transition on the
   stable node instead.
   ========================================================================= */
(function () {
  "use strict";

  var INPUT = "Responsible for leading cross-functional initiatives to improve onboarding and increase activation.";

  var PASSES = [
    {
      stage: "Pass 1 · specific",
      note: "Vague duty rewritten as a real thing you did.",
      text: "Onboarding took six weeks and people dropped off. I led the rebuild into a three-day self-serve flow."
    },
    {
      stage: "Pass 2 · sharp, in your voice",
      note: "Tighter, sharper — and it sounds like you.",
      text: "Six weeks to three days. I tore onboarding down to one self-serve flow — and activation climbed."
    }
  ];

  var AUTO_MS = 3400;

  var inputEl   = document.getElementById("demo-input");
  var stageEl   = document.getElementById("demo-stage");
  var textEl    = document.getElementById("demo-text");
  var noteEl    = document.getElementById("demo-note");
  var counterEl = document.getElementById("demo-counter");
  var fillEl    = document.getElementById("demo-fill");
  var btnEl     = document.getElementById("demo-btn");

  if (!textEl || !btnEl) { return; } // demo not on this page

  var i = 0;
  var timer = null;

  // static user paste — set once
  if (inputEl) { inputEl.textContent = INPUT; }

  function render(animate) {
    var cur = PASSES[i];
    var atEnd = i >= PASSES.length - 1;

    if (stageEl)   { stageEl.textContent = cur.stage; }
    if (noteEl)    { noteEl.textContent = cur.note; }
    if (counterEl) { counterEl.textContent = "pass " + (i + 1) + " of " + PASSES.length; }
    if (fillEl)    { fillEl.style.width = Math.round(((i + 1) / PASSES.length) * 100) + "%"; }
    btnEl.textContent = atEnd ? "↺ Run it again" : "Run the next pass →";

    if (animate) {
      // fade the new text in on the stable node (no remount, no mount-keyframe)
      textEl.style.transition = "none";
      textEl.style.opacity = "0";
      textEl.textContent = cur.text;
      requestAnimationFrame(function () {
        textEl.style.transition = "opacity .35s ease";
        textEl.style.opacity = "1";
      });
    } else {
      textEl.textContent = cur.text;
      textEl.style.opacity = "1";
    }
  }

  function advance() {
    i = (i + 1) % PASSES.length;
    render(true);
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(advance, AUTO_MS);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  btnEl.addEventListener("click", function () {
    advance();
    startAuto(); // restart so it doesn't immediately jump after a click
  });

  // pause auto-play when the tab isn't visible; resume when it returns
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { stopAuto(); } else { startAuto(); }
  });

  render(false);
  startAuto();
})();
