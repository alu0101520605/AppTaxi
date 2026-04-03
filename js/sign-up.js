document.addEventListener('DOMContentLoaded', () => {

    const formRegistro = document.getElementById('registration-form');

    if (formRegistro) {

        // Botones
        const btnToStep2 = document.getElementById('btn-to-step-2');
        const btnSubmit = document.getElementById('btn-submit-form');
        const inputOTP = document.getElementById('otp-code');

        // Transición a Pantalla 2
        btnToStep2.addEventListener('click', () => {
            const phone = document.getElementById('phone-number').value;
            const country = document.getElementById('country-code').value;
            const errorMsg = document.getElementById('step-1-error');

            if (phone.length < 9) { // Validación muy básica
            errorMsg.querySelector('span').textContent = "Por favor, introduce un número válido.";
            errorMsg.removeAttribute('hidden');
            return;
            }

            // Ocultar error si lo hubiera, mostrar teléfono en pantalla 2 y cambiar paso
            errorMsg.setAttribute('hidden', '');
            document.getElementById('display-phone').textContent = `${country} ${phone}`;
            
            // Aquí harías tu llamada a la API (fetch) para enviar el SMS/Whatsapp
            
            goToStep(1, 2);
        });

        // Lógica Auto-OTP en Pantalla 2 (Simulada)
        inputOTP.addEventListener('input', (e) => {
            const code = e.target.value;
            
            if (code.length === 6) {
            inputOTP.disabled = true; // Bloquea el input mientras verifica
            
            // Simular llamada al servidor
            setTimeout(() => {
                // SIMULACIÓN: Si el código es 123456 es válido, sino falla.
                if (code === "123456") {
                document.getElementById('otp-success').removeAttribute('hidden');
                setTimeout(() => {
                    goToStep(2, 3);
                }, 2000); // 2 segundos verde y avanza
                } else {
                document.getElementById('otp-error').removeAttribute('hidden');
                setTimeout(() => {
                    // Falla: Oculta error, limpia input, vuelve a pantalla 1
                    document.getElementById('otp-error').setAttribute('hidden', '');
                    inputOTP.value = '';
                    inputOTP.disabled = false;
                    
                    const errorStep1 = document.getElementById('step-1-error');
                    errorStep1.querySelector('span').textContent = "El código OTP es incorrecto. Vuelve a intentarlo.";
                    errorStep1.removeAttribute('hidden');
                    goToStep(2, 1);
                }, 2500); // 2.5 segundos rojo y retrocede
                }
            }, 1000); // Tarda 1 seg en responder
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
            }, 3000);
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