export async function loadLanguage(language) {
  try {
    console.log("Cargando idioma:", language);

    const response = await fetch(`/assets/language/${language}.json`);

    if (!response.ok) {
      throw new Error(`Could not load language: ${language}`);
    }

    const translations = await response.json();

    translatePage(translations);
    document.documentElement.lang = language;

    console.log(
      "document.documentElement.lang =",
      document.documentElement.lang,
    );

    document.querySelectorAll(".language-selector").forEach((select) => {
      select.value = language;
      console.log("Selector actualizado a:", select.value);
    });
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function getTranslation(translations, keyPath) {
  return keyPath
    .split(".")
    .reduce((currentValue, key) => currentValue?.[key], translations);
}

function translateAttribute(
  translations,
  selector,
  attributeName,
  dataKeyName,
) {
  document.querySelectorAll(selector).forEach((element) => {
    const translationKey = element.getAttribute(dataKeyName);
    const translatedText = getTranslation(translations, translationKey);

    if (typeof translatedText === "string") {
      element.setAttribute(attributeName, translatedText);
    } else {
      console.warn(`Falta traducción para: ${translationKey}`);
    }
  });
}

function translatePage(translations) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    const translatedText = getTranslation(translations, translationKey);

    if (typeof translatedText === "string") {
      element.textContent = translatedText;
    } else {
      console.warn(`Falta traducción para: ${translationKey}`);
    }
  });

  translateAttribute(
    translations,
    "[data-i18n-placeholder]",
    "placeholder",
    "data-i18n-placeholder",
  );

  translateAttribute(
    translations,
    "[data-i18n-aria-label]",
    "aria-label",
    "data-i18n-aria-label",
  );

  translateAttribute(translations, "[data-i18n-alt]", "alt", "data-i18n-alt");

  console.log("Página traducida");
}

document.addEventListener("change", async (event) => {
  if (event.target && event.target.classList.contains("language-selector")) {
    const newLanguage = event.target.value;

    console.log("Cambio detectado en selector:", newLanguage);

    localStorage.setItem("language", newLanguage);
    console.log(
      "Idioma guardado en localStorage:",
      localStorage.getItem("language"),
    );

    await loadLanguage(newLanguage);
  }
});
