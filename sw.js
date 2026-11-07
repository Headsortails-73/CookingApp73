"use strict";

const CACHE_NAME = "cuisine-v9";
const APP_SHELL = [
  "./",
  "./index.html",
  "./recipes.js",
  "./scale.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(APP_SHELL);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys
          .filter(function (key) {
            return key.startsWith("cuisine-") && key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          }));
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(request).then(function (cached) {
        if (cached) return cached;
        return fetch(request).catch(function (error) {
          if (request.mode === "navigate") {
            return cache.match("./index.html").then(function (shell) {
              if (shell) return shell;
              throw error;
            });
          }
          throw error;
        });
      });
    })
  );
});
