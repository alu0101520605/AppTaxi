export async function loadLanguage(language) {
  try {
    const response = await fetch(`/assets/language/${language}.json`);

    if (!response.ok) {
      throw new Error(`Could not load language: ${language}`);
    }

    const translations = await response.json();

    translatePage(translations);
    document.documentElement.lang = language;

    const languageSelector = document.getElementById("language");
    if (language.value) languageSelector.value = language;
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function getTranslation(translations, keyPath) {
  return keyPath
    .split(".")
    .reduce((currentValue, key) => currentValue?.[key], translations);
}

function translatePage(translations) {
  const translatableElements = document.querySelectorAll("[data-i18n]");

  translatableElements.forEach((element) => {
    const translationKey = element.getAttribute("data-i18n");
    const translatedText = getTranslation(translations, translationKey);

    if (translatedText !== undefined) {
      if (translatedText.includes("<")) {
        element.innerHTML = translatedText;
      } else {
        element.textContent = translatedText;
      }
    }
  });
}

document.addEventListener("change", (event) => {
  if (event.target && event.target.classList.contains("language-selector")) {
    const nuevoIdioma = event.target.value;

    loadLanguage(nuevoIdioma);

    document.querySelectorAll(".language-selector").forEach((select) => {
      select.value = nuevoIdioma;
    });
  }
});
