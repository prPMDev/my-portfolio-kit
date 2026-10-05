/* =========================================================================
   My Portfolio Kit — proof demo
   Auto-plays through the passes and loops; the button advances one pass
   and restarts the timer.

   #demo-text is a STABLE node updated in place. Never remount it with a
   mount-keyframe (it would restart at opacity:0 forever); fade via a
   transition on this same node.
   ========================================================================= */
(function () {
  "use strict";

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

  var stageEl   = document.getElementById("demo-stage");
  var textEl    = document.getElementById("demo-text");
  var noteEl    = document.getElementById("demo-note");
  var counterEl = document.getElementById("demo-counter");
  var fillEl    = document.getElementById("demo-fill");
  var btnEl     = document.getElementById("demo-btn");

  var i = 0;
  var timer = null;

  function render(animate) {
    var cur = PASSES[i];

    stageEl.textContent = cur.stage;
    noteEl.textContent = cur.note;
    counterEl.textContent = "pass " + (i + 1) + " of " + PASSES.length;
    fillEl.style.width = Math.round(((i + 1) / PASSES.length) * 100) + "%";
    btnEl.textContent = i === PASSES.length - 1 ? "↺ Run it again" : "Run the next pass →";

    if (animate) {
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
    clearInterval(timer);
    timer = setInterval(advance, AUTO_MS);
  }

  btnEl.addEventListener("click", function () {
    advance();
    startAuto(); // restart so it doesn't immediately jump after a click
  });

  // pause auto-play when the tab isn't visible; resume when it returns
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { clearInterval(timer); } else { startAuto(); }
  });

  render(false);
  startAuto();
})();
