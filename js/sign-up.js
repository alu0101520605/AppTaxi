document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.getElementById('registration-form');

    if (formRegistro) {

        // Botones
        const btnToStep2 = document.getElementById('btn-to-step-2');
        const btnSubmit = document.getElementById('btn-submit-form');
        const inputOTP = document.getElementById('otp-code');

        // Transición a Pantalla 2
        btnToStep2.addEventListener('click', () => {
            const phoneInput = document.getElementById('phone-number');
            const phone = phoneInput.value;
            const country = document.getElementById('country-code').value;
            
            // Obtenemos los dos nuevos contenedores de error
            const phoneErrorMsg = document.getElementById('phone-error');
            const globalErrorMsg = document.getElementById('global-step-1-error');

            // Ocultar error global por si estaba visible de un intento anterior
            globalErrorMsg.setAttribute('hidden', '');

            if (phone.length < 9) { 
                // 1. Mostrar error ESPECÍFICO del teléfono
                phoneErrorMsg.querySelector('span').textContent = "Por favor, introduce un número válido.";
                phoneErrorMsg.removeAttribute('hidden');
                
                // 2. Accesibilidad: Marcar input como inválido y mover el foco
                phoneInput.setAttribute('aria-invalid', 'true');
                phoneInput.focus();
                return;
            }

            // Si todo está bien, limpiar errores de teléfono
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
                            
                            // Volvemos al paso 1, pero usamos el ERROR GLOBAL
                            const globalErrorMsg = document.getElementById('global-step-1-error');
                            globalErrorMsg.querySelector('span').textContent = "El código OTP es incorrecto o ha expirado. Vuelve a intentarlo.";
                            globalErrorMsg.removeAttribute('hidden');
                            
                            goToStep(2, 1);
                            
                            // Accesibilidad: Mover el foco al mensaje de error para que el lector lo lea inmediatamente
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
            
            // Aquí enviarías los datos (Nombre, apellido, etc) a tu base de datos
            
            goToStep(3, 4);

            // Simular carga de login
            setTimeout(() => {
            window.location.href = '/pages/login.html';
            }, 5000);
        });

        // Función auxiliar para cambiar de paso
        function goToStep(current, next) {
            document.getElementById(`step-${current}`).setAttribute('hidden', '');
            const nextStep = document.getElementById(`step-${next}`);
            nextStep.removeAttribute('hidden');
            
            // Accesibilidad: Mover el foco al título de la nueva pantalla
            const title = nextStep.querySelector('h1');
            if(title) title.focus();
        }
    }
});