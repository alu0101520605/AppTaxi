import "./components.js";
import { loadLanguage } from "./language.js";

import "./carrousel.js";
import "./booking.js";
import "./summary.js";
import "./home.js";
import "./sign-up.js";
import "./login.js";

window.addEventListener("load", async () => {
  const savedLanguage = localStorage.getItem("language");
  const browserLanguage = navigator.language.startsWith("es") ? "es" : "en";
  const initialLanguage = savedLanguage || browserLanguage;

  await loadLanguage(initialLanguage);
});
