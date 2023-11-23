// ==UserScript==
// @name         Auto Scroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically scrolls down and up on a specified URL
// @author       Your namea
// @match        https://keepthescore.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const scrollDownSpeed = 5; // Geschwindigkeit des Scrollens in Millisekunden
    const scrollUpSpeed = 300;
    const scrollDownTime = 6000; // Zeit in Millisekunden, die gewartet wird, bevor das Scrollen beginnt

    function scrollToBottom() {
        return new Promise((resolve) => {
            const scrollInterval = setInterval(() => {
                window.scrollBy(0, scrollDownSpeed);
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    clearInterval(scrollInterval);
                    resolve();
                }
            }, scrollDownSpeed);
        });
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async function autoScroll() {
        while (true) {
            await wait(scrollDownTime);
            await scrollToBottom();
            await scrollToTop();
        }
    }

    // Starte das automatische Scrollen
    autoScroll();
})();