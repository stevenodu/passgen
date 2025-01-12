function generatePasswords() {
    const length = document.getElementById('passwordLength').value;
    const quantity = document.getElementById('quantity').value;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const noSimilar = document.getElementById('noSimilar').checked;
    const noDuplicate = document.getElementById('noDuplicate').checked;
    const noSequential = document.getElementById('noSequential').checked;

    const similarChars = 'il1Lo0O';
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    let characterPool = '';

    if (includeNumbers) characterPool += numbers;
    if (includeLowercase) characterPool += lowercase;
    if (includeUppercase) characterPool += uppercase;
    if (includeSymbols) characterPool += symbols;

    if (noSimilar) {
        characterPool = characterPool.split('').filter(char => !similarChars.includes(char)).join('');
    }

    const passwords = [];
    for (let i = 0; i < quantity; i++) {
        let password = '';
        let usedChars = new Set();
        let lastChar = '';

        while (password.length < length) {
            const randomChar = characterPool.charAt(Math.floor(Math.random() * characterPool.length));
            
            if (noDuplicate && usedChars.has(randomChar)) continue;
            if (noSequential && randomChar.charCodeAt(0) === lastChar.charCodeAt(0) + 1) continue;

            password += randomChar;
            usedChars.add(randomChar);
            lastChar = randomChar;
        }
        passwords.push(password);
    }

    displayPasswords(passwords);
}

function displayPasswords(passwords) {
    const container = document.getElementById('passwordsContainer');
    container.innerHTML = passwords.map(password => `
        <div class="password-output">
            <span>${password}</span>
            <span class="copy-btn" onclick="copyToClipboard('${password}')">Copy</span>
        </div>
    `).join('');
}

function copyToClipboard(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy password.');
    });
}