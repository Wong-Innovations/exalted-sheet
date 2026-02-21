// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      script: [
        { src: "https://accounts.google.com/gsi/client" }, // TODO: need to async defer these
        { src: "https://apis.google.com/js/api.js" },
      ],
    },
  },
  devtools: { enabled: true },
});
