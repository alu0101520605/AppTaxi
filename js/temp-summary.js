//!SCRIPT TEMPORAL Posible modificación y cambio de nombre
const bookingLater = document.getElementById("booking-later").checked;
const bookingNowRadio = document.getElementById("booking-now");
const bookingLaterRadio = document.getElementById("booking-later");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
const passengersInput = document.getElementById("passengers");
const luggageInput = document.getElementById("luggage");

const summaryDateItem = document.getElementById("summary-date-item");
const summaryDate = document.getElementById("summary-date");
const summaryTime = document.getElementById("summary-time");
const summaryOrigin = document.getElementById("summary-origin");
const summaryDestination = document.getElementById("summary-destination");
const summaryPassengers = document.getElementById("summary-passengers");
const summaryLuggage = document.getElementById("summary-luggage");

//! NONE_TEMP ES UN VALOR TEMPORAL
function getSelectedText(select) {
  if (!select.value) {
    return "NONE_TEMP";
  }

  return select.options[select.selectedIndex].textContent;
}

function updateSummary() {
  const isScheduled = bookingLaterRadio.checked;

  summaryDateItem.hidden = !isScheduled;

  summaryDate.textContent = dateInput.value || "NONE_TEMP";
  summaryTime.textContent = timeInput.value || "NONE_TEMP";
  summaryOrigin.textContent = getSelectedText(originSelect);
  summaryDestination.textContent = getSelectedText(destinationSelect);
  summaryPassengers.textContent = passengersInput.value || "1";
  summaryLuggage.textContent = luggageInput.value || "0";
}

bookingNowRadio.addEventListener("change", updateSummary);
bookingLaterRadio.addEventListener("change", updateSummary);

dateInput.addEventListener("input", updateSummary);
timeInput.addEventListener("input", updateSummary);
originSelect.addEventListener("change", updateSummary);
destinationSelect.addEventListener("change", updateSummary);
passengersInput.addEventListener("input", updateSummary);
luggageInput.addEventListener("input", updateSummary);

updateSummary();
