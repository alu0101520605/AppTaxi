//!SCRIPT TEMPORAL Posible modificación
const bookingLater = document.getElementById("booking-later").checked;
const bookingNowRadio = document.getElementById("booking-now");
const bookingLaterRadio = document.getElementById("booking-later");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const originSelect = document.getElementById("origin");
const destinationSelect = document.getElementById("destination");
const passengersInput = document.getElementById("passengers");
const luggageInput = document.getElementById("luggage");

const summaryDateTimeItem = document.getElementById("summary-date-time-item");
const summaryDateTime = document.getElementById("summary-date-time");
const summaryOrigin = document.getElementById("summary-origin");
const summaryDestination = document.getElementById("summary-destination");
const summaryPassengers = document.getElementById("summary-passengers");
const summaryLuggage = document.getElementById("summary-luggage");

function getSelectedText(select) {
  if (!select.value) {
    return "";
  }

  return select.options[select.selectedIndex].textContent;
}

function getDateTimeText() {
  if (dateInput.value && timeInput.value) {
    return `${dateInput.value} · ${timeInput.value}`;
  }

  if (dateInput.value) {
    return dateInput.value;
  }

  if (timeInput.value) {
    return timeInput.value;
  }

  return "";
}

function updateSummary() {
  const isScheduled = bookingLaterRadio.checked;

  summaryDateTimeItem.hidden = !isScheduled;

  summaryDateTime.textContent = getDateTimeText();
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
