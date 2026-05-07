const bookingNowRadio = document.getElementById("booking-now");

if (bookingNowRadio) {
  const bookingLaterRadio = document.getElementById("booking-later");
  const dateRow = document.querySelector(".date-container");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  const passengersInput = document.getElementById("passengers");
  const luggageInput = document.getElementById("luggage");

  const bookingForm = document.querySelector("form");
  const originInput = document.getElementById("origin");
  const destinationInput = document.getElementById("destination");
  const originError = document.getElementById("origin-error");
  const destinationError = document.getElementById("destination-error");

  function twoDigits(value) {
    return String(value).padStart(2, "0");
  }

  function setMinDateToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = twoDigits(today.getMonth() + 1);
    const day = twoDigits(today.getDate());

    dateInput.min = `${year}-${month}-${day}`;
  }

  function setCurrentDateTime() {
    const today = new Date();

    const year = today.getFullYear();
    const month = twoDigits(today.getMonth() + 1);
    const day = twoDigits(today.getDate());

    const hours = twoDigits(today.getHours());
    const minutes = twoDigits(today.getMinutes());

    dateInput.value = `${year}-${month}-${day}`;
    timeInput.value = `${hours}:${minutes}`;
  }

  function updateDateRowVisibility() {
    const showDateRow = bookingLaterRadio.checked;

    dateRow.hidden = !showDateRow;
    dateInput.disabled = !showDateRow;
    timeInput.disabled = !showDateRow;

    if (showDateRow) {
      setCurrentDateTime();
      dateInput.setAttribute("required", "true");
      timeInput.setAttribute("required", "true");
    } else {
      dateInput.removeAttribute("required");
      timeInput.removeAttribute("required");
      document.getElementById("date-error").hidden = true;
      document.getElementById("time-error").hidden = true;
      dateInput.removeAttribute("aria-invalid");
      timeInput.removeAttribute("aria-invalid");
    }
  }

  function validateField(inputElement, errorElement) {
    const isValid = inputElement.value.trim() !== "";
    errorElement.hidden = isValid;

    if (isValid) {
      inputElement.removeAttribute("aria-invalid");
    } else {
      inputElement.setAttribute("aria-invalid", "true");
    }

    return isValid;
  }

  bookingNowRadio.addEventListener("change", updateDateRowVisibility);
  bookingLaterRadio.addEventListener("change", updateDateRowVisibility);

  passengersInput.min = "1";
  luggageInput.min = "0";

  passengersInput.addEventListener("change", () => {
    if (Number(passengersInput.value) < 1) {
      passengersInput.value = 1;
    }
  });

  luggageInput.addEventListener("change", () => {
    if (Number(luggageInput.value) < 0) {
      luggageInput.value = 0;
    }
  });

  originInput.addEventListener("input", () => {
    validateField(originInput, originError);
  });

  destinationInput.addEventListener("input", () => {
    validateField(destinationInput, destinationError);
  });

  bookingForm.addEventListener("submit", (event) => {
    const isOriginValid = validateField(originInput, originError);
    const isDestinationValid = validateField(destinationInput, destinationError);

    let isDateValid = true;
    let isTimeValid = true;

    if (bookingLaterRadio.checked) {
      isDateValid = dateInput.value !== "";
      isTimeValid = timeInput.value !== "";

      document.getElementById("date-error").hidden = isDateValid;
      dateInput.setAttribute("aria-invalid", !isDateValid);

      document.getElementById("time-error").hidden = isTimeValid;
      timeInput.setAttribute("aria-invalid", !isTimeValid);
    }

    if (!isOriginValid || !isDestinationValid || !isDateValid || !isTimeValid) {
      event.preventDefault();

      if (!isOriginValid) originInput.focus();
      else if (!isDestinationValid) destinationInput.focus();
      else if (!isDateValid) dateInput.focus();
      else if (!isTimeValid) timeInput.focus();
    }
    // Si todo es válido, el formulario continúa normalmente sin preventDefault
  });

  setMinDateToday();
  updateDateRowVisibility();

  const buttonOptions = document.getElementById("button-additional-options");
  const moreOptions = document.getElementById("booking-form-options-view");

  function toggleAdditionalOptions() {
    const isHidden = moreOptions.hasAttribute("hidden");

    if (isHidden) {
      moreOptions.removeAttribute("hidden");
      buttonOptions.setAttribute("aria-expanded", "true");
    } else {
      moreOptions.setAttribute("hidden", "");
      buttonOptions.setAttribute("aria-expanded", "false");
    }
  }

  if (buttonOptions && moreOptions) {
    buttonOptions.addEventListener("click", toggleAdditionalOptions);
  }
}