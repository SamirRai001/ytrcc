// --------------- function to make captial first letter of each word ---------------
function initializeName() {
    const nameSelector = '.name-input';
    const nameInputs = document.querySelectorAll(nameSelector);
    nameInputs.forEach(inputField => {
        inputField.addEventListener('input', () => {
            let value = inputField.value;
            inputField.value = value.replace(/\b\w/g, char => char.toUpperCase());
        });
    });
}

// --------------- function to format phone input ---------------
function initializePhoneMask() {
    const phoneMaskSelector = '.js-phone-input';
    const phoneMaskInputs = document.querySelectorAll(phoneMaskSelector);
    phoneMaskInputs.forEach((input) => {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = input.selectionStart;
            if (pos < 4) event.preventDefault();
            const matrix = "+977 __________";
            let i = 0;
            const def = matrix.replace(/\D/g, "");
            const val = input.value.replace(/\D/g, "");
            let newValue = matrix.replace(/[_\d]/g, (a) => {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
            i = newValue.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 4);
                newValue = newValue.slice(0, i);
            }
            const reg = matrix
                .substr(0, input.value.length)
                .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
                .replace(/[+()]/g, "\\$&");
            if (
                !new RegExp(`^${reg}$`).test(input.value) ||
                input.value.length < 5 ||
                (keyCode > 47 && keyCode < 58)
            ) {
                input.value = newValue;
            }
            if (event.type === "blur") {
                if (input.value === "+977 ") {
                    input.value = "";
                }
            }
        }
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
        input.addEventListener("mouseup", (event) => {
            event.preventDefault();
            if (input.value.length < 4) {
                input.setSelectionRange(4, 4);
            } else {
                input.setSelectionRange(input.value.length, input.value.length);
            }
        });
        input.addEventListener("focus", () => {
            if (!input.value) {
                input.value = "+977 ";
            }
        });
    });
}

// --------------- function to format email input ---------------
function initializeEmailMask() {
    const emailMaskSelector = '.js-email-input';
    const emailMaskInputs = document.querySelectorAll(emailMaskSelector);
    const defaultDomain = '@gmail.com';
    emailMaskInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            if (!input.value) {
                input.value = '';
            }
        });
        input.addEventListener('input', () => {
            const atIndex = input.value.indexOf('@');
            if (atIndex !== -1 && !input.value.includes(defaultDomain)) {
                input.value = input.value.slice(0, atIndex + 1) + defaultDomain.slice(1);
                setCursorPosition(input, atIndex + 1);
            }
            const domainIndex = input.value.indexOf(defaultDomain.slice(1));
            if (domainIndex !== -1 && input.selectionStart > domainIndex) {
                setCursorPosition(input, domainIndex);
            }
        });
        input.addEventListener('blur', () => {
            if (input.value === defaultDomain || input.value === '@') {
                input.value = '';
            }
        });
    });
    emailMaskInputs.forEach((input) => {
        input.addEventListener('input', () => {
            const isValid = validateEmail(input.value);
            if (isValid) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });
    function setCursorPosition(input, position) {
        input.setSelectionRange(position, position);
    }
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}




