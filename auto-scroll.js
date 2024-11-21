// ==UserScript==
// @name         Auto Scroll Page neu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Scroll slowly down, then quickly jump back up on a page
// @author       You
// @match        https://keepthescore.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Zeitintervalle
    const waitTime = 5000; // Zeit zum Warten (5 Sekunden)
    const slowScrollInterval = 50; // Intervall für langsames Scrollen (Millisekunden)
    const slowScrollStep = 2; // Schrittgröße für langsames Scrollen (Pixel)

    let scrollingDown = false;

    // Funktion: Langsam nach unten scrollen
    function slowScrollDown() {
        return new Promise((resolve) => {
            scrollingDown = true;
            const interval = setInterval(() => {
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight || !scrollingDown) {
                    clearInterval(interval);
                    resolve(); // Scrollen beendet
                } else {
                    window.scrollBy(0, slowScrollStep);
                }
            }, slowScrollInterval);
        });
    }

    // Funktion: Schnell zum Anfang springen
    function quickScrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Hauptschleife
    async function main() {
        while (true) {
            await new Promise((r) => setTimeout(r, waitTime)); // Warten
            await slowScrollDown(); // Langsames Scrollen nach unten
            await new Promise((r) => setTimeout(r, 1000)); // Kleine Pause (optional)
            quickScrollToTop(); // Sprung nach oben
        }
    }

    main(); // Startet das Skript
})();
