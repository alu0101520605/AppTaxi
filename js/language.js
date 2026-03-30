const languageSelector = document.getElementById("language");

export async function loadLanguage(language) {
  try {
    const response = await fetch(`/assets/language/${language}.json`);

    if (!response.ok) {
      throw new Error(`Could not load language: ${language}`);
    }

    const translations = await response.json();

    translatePage(translations);
    document.documentElement.lang = language;
    languageSelector.value = language;
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
      if (translatedText.includes('<')) {
            element.innerHTML = translatedText;
        } else {
            element.textContent = translatedText;
        }
    }
  });
}

if (languageSelector) {
    languageSelector.addEventListener("change", (event) => {
        loadLanguage(event.target.value);
    });
}
