const bookingNowRadio = document.getElementById("booking-now");
if (bookingNowRadio) {
    const bookingLaterRadio = document.getElementById("booking-later");

    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    const passengersInput = document.getElementById("passengers");
    const luggageInput = document.getElementById("luggage");

    function getInputText(input) {
        return input.value.trim() || "-";
    }

    function getDateTimeText() {
        if (dateInput.value && timeInput.value) {
            return `${dateInput.value} · ${timeInput.value}`;
        }
        if (dateInput.value) return dateInput.value;
        if (timeInput.value) return timeInput.value;
        return "";
    }

    function updateSummary() {
        // Los elementos del resumen viven dentro del Web Component <summary-taxi>,
        // que se carga de forma asíncrona. Los buscamos en cada llamada para
        // asegurarnos de que ya están en el DOM.
        const summaryDateTimeItem = document.getElementById("summary-date-time-item");
        if (!summaryDateTimeItem) return;

        const summaryDateTime = document.getElementById("summary-date-time");
        const summaryOrigin = document.getElementById("summary-origin");
        const summaryDestination = document.getElementById("summary-destination");
        const summaryPassengers = document.getElementById("summary-passengers");
        const summaryLuggage = document.getElementById("summary-luggage");

        const isScheduled = bookingLaterRadio.checked;
        summaryDateTimeItem.hidden = !isScheduled;

        summaryDateTime.textContent = getDateTimeText();
        summaryOrigin.textContent = getInputText(originInput);
        summaryDestination.textContent = getInputText(destinationInput);
        summaryPassengers.textContent = passengersInput.value || "1";
        summaryLuggage.textContent = luggageInput.value || "0";
    }

    // El Web Component <summary-taxi> hace un fetch() interno para cargar su HTML.
    // Esperamos a que termine antes de hacer el primer updateSummary y de
    // enganchar los listeners del formulario al resumen.
    function waitForSummaryAndInit() {
        const summaryEl = document.querySelector("summary-taxi");

        if (!summaryEl) {
            // El elemento custom aún no está en el DOM (raro pero posible).
            // Reintentamos en el siguiente frame.
            requestAnimationFrame(waitForSummaryAndInit);
            return;
        }

        // Observamos el interior del Web Component hasta que el fetch termine
        // y aparezca el nodo #summary-date-time-item.
        const observer = new MutationObserver(() => {
            if (document.getElementById("summary-date-time-item")) {
                observer.disconnect();
                attachListeners();
                updateSummary();
            }
        });

        observer.observe(summaryEl, { childList: true, subtree: true });

        // Por si el fetch ya terminó antes de que llegásemos aquí.
        if (document.getElementById("summary-date-time-item")) {
            observer.disconnect();
            attachListeners();
            updateSummary();
        }
    }

    function attachListeners() {
        bookingNowRadio.addEventListener("change", updateSummary);
        bookingLaterRadio.addEventListener("change", updateSummary);

        dateInput.addEventListener("input", updateSummary);
        timeInput.addEventListener("input", updateSummary);
        originInput.addEventListener("input", updateSummary);
        destinationInput.addEventListener("input", updateSummary);
        passengersInput.addEventListener("input", updateSummary);
        luggageInput.addEventListener("input", updateSummary);
    }

    waitForSummaryAndInit();
}