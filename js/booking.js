const bookingNowRadio = document.getElementById("booking-now");

if (bookingNowRadio) {
  const bookingLaterRadio = document.getElementById("booking-later");
  const dateRow = document.querySelector(".date-container");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  const passengersInput = document.getElementById("passengers");
  const luggageInput = document.getElementById("luggage");

  const bookingForm = document.querySelector("form");
  const originSelect = document.getElementById("origin");
  const destinationSelect = document.getElementById("destination");
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

  function validateSelect(selectElement, errorElement) {
    const isValid = selectElement.value !== "";
    errorElement.hidden = isValid;

    if (isValid) {
      selectElement.removeAttribute("aria-invalid");
    } else {
      selectElement.setAttribute("aria-invalid", "true");
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

  originSelect.addEventListener("change", () => {
    validateSelect(originSelect, originError);
  });

  destinationSelect.addEventListener("change", () => {
    validateSelect(destinationSelect, destinationError);
  });

  bookingForm.addEventListener("submit", (event) => {
    const isOriginValid = validateSelect(originSelect, originError);
    const isDestinationValid = validateSelect(
      destinationSelect,
      destinationError,
    );

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
        
      if (!isOriginValid) originSelect.focus();
      else if (!isDestinationValid) destinationSelect.focus();
      else if (!isDateValid) dateInput.focus();
      else if (!isTimeValid) timeInput.focus();
    }

    event.preventDefault(); // Bloqueo de salto de página por novalidate
    
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
