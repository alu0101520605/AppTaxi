document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.getElementById('registration-form');

    if (formRegistro) {

        // --- ELEMENTOS DEL TELÉFONO ---
        const phoneInput = document.getElementById('phone-number');
        const phoneErrorMsg = document.getElementById('phone-error');

        // Botones
        const btnToStep2 = document.getElementById('btn-to-step-2');
        const btnSubmit = document.getElementById('btn-submit-form');
        const inputOTP = document.getElementById('otp-code');

        // --- VALIDACIÓN SOLO AL PULSAR "CONTINUAR" ---
        btnToStep2.addEventListener('click', () => {
            const phone = phoneInput.value;
            const country = document.getElementById('country-code').value;
            const globalErrorMsg = document.getElementById('global-step-1-error');

            // Ocultar error global por si estaba visible
            globalErrorMsg.setAttribute('hidden', '');

            // Validación usando el pattern del input
            if (phoneInput.validity.patternMismatch || phoneInput.validity.valueMissing) {
                phoneErrorMsg.removeAttribute('hidden');
                phoneInput.setAttribute('aria-invalid', 'true');
                phoneInput.focus();
                return;
            }

            // Si todo está bien, limpiar errores
            phoneErrorMsg.setAttribute('hidden', '');
            phoneInput.removeAttribute('aria-invalid');

            document.getElementById('display-phone').textContent = `${country} ${phone}`;
            goToStep(1, 2);
        });

        // Lógica Auto-OTP en Pantalla 2 (Simulada)
        inputOTP.addEventListener('input', (e) => {
            const code = e.target.value;

            if (code.length === 6) {
                inputOTP.disabled = true;

                setTimeout(() => {
                    if (code === "123456") {
                        document.getElementById('otp-success').removeAttribute('hidden');
                        setTimeout(() => {
                            goToStep(2, 3);
                        }, 4000);
                    } else {
                        document.getElementById('otp-error').removeAttribute('hidden');
                        setTimeout(() => {
                            document.getElementById('otp-error').setAttribute('hidden', '');
                            inputOTP.value = '';
                            inputOTP.disabled = false;

                            const globalErrorMsg = document.getElementById('global-step-1-error');
                            globalErrorMsg.querySelector('span').textContent = "El código OTP es incorrecto o ha expirado. Vuelve a intentarlo.";
                            globalErrorMsg.removeAttribute('hidden');

                            goToStep(2, 1);

                            globalErrorMsg.setAttribute('tabindex', '-1');
                            globalErrorMsg.focus();
                        }, 4000);
                    }
                }, 1000);
            }
        });

        // Transición a Pantalla 4 (Final)
        btnSubmit.addEventListener('click', () => {
            const terms = document.getElementById('terms').checked;
            const privacy = document.getElementById('privacy').checked;
            const errorMsg = document.getElementById('step-3-error');

            if (!terms || !privacy) {
                errorMsg.removeAttribute('hidden');
                return;
            }

            errorMsg.setAttribute('hidden', '');

            goToStep(3, 4);

            setTimeout(() => {
                window.location.href = '/pages/login.html';
            }, 5000);
        });

        // Función auxiliar para cambiar de paso
        function goToStep(current, next) {
            document.getElementById(`step-${current}`).setAttribute('hidden', '');
            const nextStep = document.getElementById(`step-${next}`);
            nextStep.removeAttribute('hidden');

            const title = nextStep.querySelector('h1');
            if (title) title.focus();

            updateStepperUI(next);
        }

        function updateStepperUI(stepNumber) {
            const steps = document.querySelectorAll('#signup-stepper .step-item');
            
            steps.forEach((step, index) => {
                const stepIdx = index + 1;
                
                step.classList.remove('active', 'completed');
                step.removeAttribute('aria-current');

                if (stepIdx < stepNumber) {
                    step.classList.add('completed');
                } else if (stepIdx === stepNumber) {
                    step.classList.add('active');
                    step.setAttribute('aria-current', 'step');
                }

                // Resto de pasos
            });
        }
    }
});