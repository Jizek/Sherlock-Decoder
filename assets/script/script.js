// Sherlock Decoder Core Logic

const dictionary = {
    tr: { ops: "İŞLEMLER", proc: "Metin İşleme", rsa: "Asimetrik (RSA)", active: "Aktif:", gen: "Üret", enc: "Şifrele", dec: "Çöz", audio: "Mors Ses:", play: "OYNAT", stop: "DURDUR", chars: "Karakter", words: "Kelime", shSlogan: "Sen yaz, Sherlock bulsun!", shScanning: "Sherlock iz sürüyor...", shFound: "Buldum! Bu muhtemelen:", shNotFound: "İz bulunamadı...", keyLabel: "ANAHTAR" },
    en: { ops: "OPERATIONS", proc: "Text Processing", rsa: "Asymmetric (RSA)", active: "Active:", gen: "Generate", enc: "Encrypt", dec: "Decrypt", audio: "Morse Audio:", play: "PLAY", stop: "STOP", chars: "Chars", words: "Words", shSlogan: "Type it, Sherlock will find it!", shScanning: "Sherlock is tracking...", shFound: "Found! This is likely:", shNotFound: "No traces found...", keyLabel: "KEY" },
    de: { ops: "OPERATIONEN", proc: "Textverarbeitung", rsa: "RSA Asymmetrisch", active: "Aktiv:", gen: "Generieren", enc: "Verschlüsseln", dec: "Entschlüsseln", audio: "Morse Ton:", play: "SPIELEN", stop: "STOPP", chars: "Zeichen", words: "Wörter", shSlogan: "Schreib es, Sherlock wird es finden!", shScanning: "Sherlock spürt es auf...", shFound: "Gefunden! Wahrscheinlich:", shNotFound: "Keine Spuren...", keyLabel: "SCHLÜSSEL" },
    fr: { ops: "OPÉRATIONS", proc: "Traitement de Texte", rsa: "RSA Asymétrique", active: "Actif:", gen: "Générer", enc: "Crypter", dec: "Décrypter", audio: "Audio Morse:", play: "JOUER", stop: "ARRÊTER", chars: "Caractères", words: "Mots", shSlogan: "Écrivez, Sherlock trouvera !", shScanning: "Sherlock suit la trace...", shFound: "Trouvé ! C'est probablement :", shNotFound: "Aucune trace...", keyLabel: "CLÉ" },
    es: { ops: "OPERACIONES", proc: "Procesamiento", rsa: "RSA Asimétrico", active: "Activo:", gen: "Generar", enc: "Cifrar", dec: "Descifrar", audio: "Audio Morse:", play: "REPRODUCIR", stop: "PARAR", chars: "Caracteres", words: "Palabras", shSlogan: "¡Escribe, Sherlock lo encontrará!", shScanning: "Sherlock está rastreando...", shFound: "¡Encontrado! Probablemente:", shNotFound: "Sin rastro...", keyLabel: "CLAVE" },
    it: { ops: "OPERAZIONI", proc: "Elaborazione", rsa: "RSA Asimmetrico", active: "Attivo:", gen: "Genera", enc: "Cripta", dec: "Decripta", audio: "Audio Morse:", play: "RIPRODUCI", stop: "FERMA", chars: "Caratteri", words: "Parole", shSlogan: "Scrivi, Sherlock lo troverà!", shScanning: "Sherlock sta tracciando...", shFound: "Trovato! Probabilmente:", shNotFound: "Nessuna traccia...", keyLabel: "CHIAVE" },
    ru: { ops: "ОПЕРАЦИИ", proc: "Обработка текста", rsa: "RSA Шифр", active: "Активно:", gen: "Создать", enc: "Шифр", dec: "Расшифр", audio: "Морзе звук:", play: "ИГРАТЬ", stop: "СТОП", chars: "Симв.", words: "Слов", shSlogan: "Пишите, Шерлок найдет!", shScanning: "Шерлок выслеживает...", shFound: "Найдено! Вероятно:", shNotFound: "Следов нет...", keyLabel: "КЛЮЧ" },
    jp: { ops: "操作", proc: "テキスト処理", rsa: "RSA非対称", active: "有効:", gen: "生成", enc: "暗号化", dec: "復号化", audio: "モールス音:", play: "再生", stop: "停止", chars: "文字", words: "単語", shSlogan: "書けばシャーロックが見つける！", shScanning: "追跡中...", shFound: "発見！おそらく：", shNotFound: "形跡なし...", keyLabel: "キー" },
    zh: { ops: "操作", proc: "文本处理", rsa: "RSA加密", active: "状态:", gen: "生成", enc: "加密", dec: "解密", audio: "摩斯音:", play: "播放", stop: "停止", chars: "字符", words: "词数", shSlogan: "写下来，夏洛克会找到它！", shScanning: "追踪中...", shFound: "发现！可能是：", shNotFound: "未发现痕迹...", keyLabel: "密钥" },
    ar: { ops: "عمليات", proc: "معالجة النصوص", rsa: "تشفير RSA", active: "نشط:", gen: "توليد", enc: "تشفير", dec: "فك", audio: "صوت مورس:", play: "تشغيل", stop: "إيقاف", chars: "حرف", words: "كلمة", shSlogan: "اكتب، وسيجده شرلوك!", shScanning: "شرلوك يتتبع الأثر...", shFound: "وجدت! ربما يكون:", shNotFound: "لا توجد آثار...", keyLabel: "المفتاح" }
};

let currentOp = 'b64e';
let analysisTimeout;
let audioCtx = null;
let currentTheme = 'dark-mode'; // Active theme state

const MORSE = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '  ' };
const BACON = { 'A': 'aaaaa', 'B': 'aaaab', 'C': 'aaaba', 'D': 'aaabb', 'E': 'aabaa', 'F': 'aabab', 'G': 'aabba', 'H': 'aabbb', 'I': 'abaaa', 'J': 'abaab', 'K': 'ababa', 'L': 'ababb', 'M': 'abbaa', 'N': 'abbab', 'O': 'abbba', 'P': 'abbbb', 'Q': 'baaaa', 'R': 'baaab', 'S': 'baaba', 'T': 'baabb', 'U': 'babaa', 'V': 'babab', 'W': 'babba', 'X': 'babbb', 'Y': 'bbaaa', 'Z': 'bbaab' };

// Polybius Square (5x5, I/J merged)
const POLYBIUS_GRID = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
];

// Key-dependent operations list
const KEY_OPS = ['vigenereE', 'vigenereD', 'xor', 'aesE', 'aesD', 'railfenceE', 'railfenceD'];

// Page Initialization

window.onload = () => {
    // Load saved theme state
    const savedTheme = localStorage.getItem('sherlockTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
    }

    // Load saved language state
    const savedLang = localStorage.getItem('sherlockLang');
    if (savedLang) {
        document.getElementById("langSelect").value = savedLang;
    } else {
        document.getElementById("langSelect").value = "tr";
    }

    applyTheme();
    changeLanguage();

    // Dynamic footer year
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
};

// Theme management and local storage persistence

function toggleTheme() {
    currentTheme = (currentTheme === 'dark-mode') ? 'light-mode' : 'dark-mode';
    localStorage.setItem('sherlockTheme', currentTheme);
    applyTheme();
}

function applyTheme() {
    const lang = document.getElementById("langSelect").value;
    // Apply classes for theme and RTL support
    let classes = currentTheme;
    if (lang === 'ar') classes += ' rtl';
    document.body.className = classes;
}

// Language selection translation

function changeLanguage() {
    const l = document.getElementById("langSelect").value;
    const t = dictionary[l] || dictionary['tr'];

    // Save language preference state
    localStorage.setItem('sherlockLang', l);

    document.getElementById("opsLabel").innerText = t.ops;
    document.getElementById("procTitle").innerText = t.proc;
    document.getElementById("rsaTitle").innerText = t.rsa;
    document.getElementById("activeText").innerText = t.active;
    document.getElementById("btnGen").innerText = t.gen;
    document.getElementById("btnEnc").innerText = t.enc;
    document.getElementById("btnDec").innerText = t.dec;
    document.getElementById("audioLabel").innerText = t.audio;

    const keyLabelEl = document.getElementById("keyLabel");
    if (keyLabelEl) keyLabelEl.innerText = t.keyLabel;

    const playBtn = document.querySelector("#morsePlayer button:first-of-type");
    const stopBtn = document.querySelector(".stop-btn");
    if (playBtn) playBtn.innerText = t.play;
    if (stopBtn) stopBtn.innerText = t.stop;

    const input = document.getElementById("inputText").value;
    if (!input || input.trim().length < 3) {
        document.getElementById("sherlockText").innerText = t.shSlogan;
    }

    // Update language-specific direction without changing theme
    applyTheme();
    updateActiveOp();
}

// Operation selection and input display state

function updateActiveOp() {
    currentOp = document.getElementById("opDropdown").value;
    const optionEl = document.querySelector(`#opDropdown option[value="${currentOp}"]`);
    document.getElementById("currentOp").innerText = optionEl ? optionEl.text : currentOp;

    // Show/hide key input area based on operation
    const keyArea = document.getElementById("keyInputArea");
    if (keyArea) {
        if (KEY_OPS.includes(currentOp)) {
            keyArea.classList.add('visible');
            // Set appropriate placeholder
            const keyInput = document.getElementById("keyInput");
            if (currentOp === 'railfenceE' || currentOp === 'railfenceD') {
                keyInput.placeholder = "Rails (2-10)";
                keyInput.type = "number";
                keyInput.min = "2";
                keyInput.max = "10";
            } else {
                keyInput.placeholder = "Enter key...";
                keyInput.type = "text";
                keyInput.removeAttribute("min");
                keyInput.removeAttribute("max");
            }
        } else {
            keyArea.classList.remove('visible');
        }
    }

    handleInput();
}

// Main input text event handler

function handleInput() {
    const input = document.getElementById("inputText").value;
    const out = document.getElementById("outputText");
    const l = document.getElementById("langSelect").value;
    const t = dictionary[l] || dictionary['tr'];

    const chars = input.length;
    const words = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
    document.getElementById("charCount").innerText = `${t.chars}: ${chars} | ${t.words}: ${words}`;

    sherlockAnalyze(input, t);

    if (!input) {
        out.value = "";
        document.getElementById("morsePlayer").style.display = "none";
        return;
    }
    runOperation(input);
}

// Automatic cipher type detection algorithm

function sherlockAnalyze(input, t) {
    const panel = document.getElementById("sherlockPanel");
    const icon = document.getElementById("sherlockIcon");
    const text = document.getElementById("sherlockText");

    if (!input || input.trim().length < 3) {
        icon.innerText = "🕵️";
        text.innerText = t.shSlogan;
        icon.style.animation = "none";
        panel.style.borderColor = "var(--border)";
        return;
    }

    clearTimeout(analysisTimeout);
    panel.style.display = "flex";
    text.innerText = t.shScanning;
    icon.innerText = "🔍";
    icon.style.animation = "spin 1s linear infinite";

    analysisTimeout = setTimeout(() => {
        let prediction = "";
        const cleanInput = input.trim();

        const rules = [
            { name: "RSA", test: (s) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(s) && s.length > 150 },
            { name: "Morse", regex: /^[.\-\s\/]+$/ },
            { name: "Binary", regex: /^[01\s]+$/ },
            { name: "Hex", regex: /^[0-9A-Fa-f\s]+$/ },
            { name: "Brainf*ck", regex: /[+\-<>\[\]\.]{4,}/ },
            { name: "Bacon", regex: /^[ab\s]{10,}$/i },
            { name: "Polybius", regex: /^[1-5]{2}(\s[1-5]{2})*$/ },
            { name: "Tap Code", regex: /^(\.\s*){1,5}(\s+(\.\s*){1,5})+$/ },
            { name: "URL Enc", regex: /%[0-9A-F]{2}/i },
            { name: "Base64", regex: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/ },
            { name: "AES-GCM", test: (s) => { try { const obj = JSON.parse(s); return obj.iv && obj.ct; } catch(e) { return false; } } },
            { name: "SHA/MD5 Hash", regex: /^[a-f0-9]{32}$|^[a-f0-9]{64}$|^[a-f0-9]{128}$/i }
        ];

        for (let r of rules) {
            const match = r.test ? r.test(cleanInput) : r.regex.test(cleanInput);
            if (match) {
                if (r.name === "Morse" && !cleanInput.includes('.') && !cleanInput.includes('-')) continue;
                if (r.name === "Binary" && cleanInput.length < 8) continue;
                if (r.name === "Base64" && cleanInput.length > 150) continue;
                prediction = r.name; break;
            }
        }

        icon.style.animation = "none";
        if (prediction) {
            icon.innerText = "🔎";
            text.innerText = `${t.shFound} ${prediction}`;
            panel.style.borderColor = "var(--accent)";
        } else {
            icon.innerText = "🧐";
            text.innerText = t.shNotFound;
            panel.style.borderColor = "var(--border)";
        }
    }, 600);
}

// Main router for redirecting inputs to selected ciphers

function runOperation(input) {
    const out = document.getElementById("outputText");
    const keyInput = document.getElementById("keyInput");
    const key = keyInput ? keyInput.value : '';

    try {
        switch (currentOp) {
            // Base Encoding methods
            case 'b64e':
                out.value = base64Encode(input);
                break;
            case 'b64d':
                out.value = base64Decode(input.trim());
                break;
            case 'b32e':
                out.value = base32(input, true);
                break;
            case 'b32d':
                out.value = base32(input.trim(), false);
                break;
            case 'b58e':
                out.value = b58(input, true);
                break;
            case 'b58d':
                out.value = b58(input.trim(), false);
                break;

            // Classical and modern ciphers
            case 'vigenereE':
                if (!key) { out.value = "⚠ Key required! Enter key in sidebar."; return; }
                out.value = vig(input, key, true);
                break;
            case 'vigenereD':
                if (!key) { out.value = "⚠ Key required! Enter key in sidebar."; return; }
                out.value = vig(input, key, false);
                break;
            case 'xor':
                if (!key) { out.value = "⚠ Key required! Enter key in sidebar."; return; }
                out.value = xorCipher(input, key);
                break;
            case 'atbash':
                out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c <= 'Z' ? 90 : 122) - (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97))));
                break;
            case 'rot13':
                out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 13) % 26 + (c <= 'Z' ? 65 : 97)));
                break;
            case 'caesarE':
                out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 3) % 26 + (c <= 'Z' ? 65 : 97)));
                break;
            case 'caesarD':
                out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 23) % 26 + (c <= 'Z' ? 65 : 97)));
                break;
            case 'railfenceE':
                if (!key || parseInt(key) < 2) { out.value = "⚠ Enter number of rails (2-10) in sidebar."; return; }
                out.value = railFenceEncrypt(input, parseInt(key));
                break;
            case 'railfenceD':
                if (!key || parseInt(key) < 2) { out.value = "⚠ Enter number of rails (2-10) in sidebar."; return; }
                out.value = railFenceDecrypt(input, parseInt(key));
                break;

            // Technical encoding methods
            case 'hexE':
                out.value = Array.from(input).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
                break;
            case 'hexD':
                out.value = hexDecode(input.trim());
                break;
            case 'binE':
                out.value = Array.from(input).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
                break;
            case 'binD':
                out.value = binDecode(input.trim());
                break;
            case 'urlE':
                out.value = encodeURIComponent(input);
                break;
            case 'urlD':
                out.value = decodeURIComponent(input);
                break;
            case 'bf':
                out.value = brain(input);
                break;

            // Hash algorithms
            case 'sha256':
                computeHash('SHA-256', input).then(h => { out.value = h; });
                out.value = "Computing...";
                break;
            case 'sha512':
                computeHash('SHA-512', input).then(h => { out.value = h; });
                out.value = "Computing...";
                break;
            case 'md5':
                out.value = md5(input);
                break;

            // Symmetric ciphers
            case 'aesE':
                if (!key) { out.value = "⚠ Key required! Enter key in sidebar."; return; }
                aesEncrypt(input, key).then(result => { out.value = result; });
                out.value = "Encrypting...";
                break;
            case 'aesD':
                if (!key) { out.value = "⚠ Key required! Enter key in sidebar."; return; }
                aesDecrypt(input.trim(), key).then(result => { out.value = result; });
                out.value = "Decrypting...";
                break;

            // Miscellaneous methods
            case 'nato':
                const NATO = { A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet", K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee", Z: "Zulu" };
                out.value = input.toUpperCase().split('').map(c => NATO[c] || c).join(' ');
                break;
            case 'baconE':
                out.value = input.toUpperCase().replace(/[^A-Z]/g, '').split('').map(c => BACON[c] || '').join(' ');
                break;
            case 'baconD':
                const revBacon = Object.fromEntries(Object.entries(BACON).map(([k, v]) => [v, k]));
                out.value = input.toLowerCase().trim().split(/\s+/).map(c => revBacon[c] || '?').join('');
                break;
            case 'reverse':
                out.value = input.split('').reverse().join('');
                break;
            case 'morseE':
                out.value = input.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
                document.getElementById("morsePlayer").style.display = "flex";
                break;
            case 'morseD':
                const revMorse = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));
                out.value = input.trim().split('   ').map(word =>
                    word.split(' ').map(c => revMorse[c] || c).join('')
                ).join(' ');
                break;

            // Polybius Square encoder/decoder
            case 'polybiusE':
                out.value = polybiusEncode(input);
                break;
            case 'polybiusD':
                out.value = polybiusDecode(input);
                break;

            // Tap Code encoder/decoder
            case 'tapE':
                out.value = tapCodeEncode(input);
                break;
            case 'tapD':
                out.value = tapCodeDecode(input);
                break;
        }
        if (currentOp !== 'morseE') document.getElementById("morsePlayer").style.display = "none";
    } catch (e) {
        out.value = "Error: " + (e.message || "Invalid Input");
    }
}

// Base64 encoding/decoding with UTF-8 support

function base64Encode(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}

function base64Decode(str) {
    try {
        const binary = atob(str);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new TextDecoder().decode(bytes);
    } catch (e) {
        return "Error: Invalid Base64 input";
    }
}

// Base32 RFC 4648 implementation

function base32(s, e) {
    const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    if (e) {
        let b = ""; for (let i = 0; i < s.length; i++) b += s.charCodeAt(i).toString(2).padStart(8, '0');
        let r = ""; for (let i = 0; i < b.length; i += 5) r += a[parseInt(b.substr(i, 5).padEnd(5, '0'), 2)];
        return r;
    } else {
        let b = ""; for (let i = 0; i < s.length; i++) { let v = a.indexOf(s[i].toUpperCase()); if (v >= 0) b += v.toString(2).padStart(5, '0') }
        let r = ""; for (let i = 0; i < b.length; i += 8) { let byte = b.substr(i, 8); if (byte.length === 8) r += String.fromCharCode(parseInt(byte, 2)) }
        return r;
    }
}

// Base58 Bitcoin style encoding/decoding

function b58(t, e) {
    const B = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    if (e) {
        const bytes = new TextEncoder().encode(t);
        let hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        if (hex.length === 0) return '1';
        let n = BigInt('0x' + hex), r = "";
        while (n > 0n) { r = B[Number(n % 58n)] + r; n /= 58n }
        for (let i = 0; i < t.length && t.charCodeAt(i) === 0; i++) r = '1' + r;
        return r || '1';
    } else {
        try {
            let n = 0n;
            for (let i = 0; i < t.length; i++) {
                const c = B.indexOf(t[i]);
                if (c < 0) return "Error: Invalid Base58 character '" + t[i] + "'";
                n = n * 58n + BigInt(c);
            }
            let hex = n.toString(16);
            if (hex.length % 2) hex = '0' + hex;
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            for (let i = 0; i < t.length && t[i] === '1'; i++) {
                bytes.unshift(0);
            }
            return new TextDecoder().decode(new Uint8Array(bytes));
        } catch (e) {
            return "Error: Base58 decode failed";
        }
    }
}

// Hexadecimal decoding

function hexDecode(input) {
    const hexParts = input.split(/\s+/).filter(h => h.length > 0);
    const result = [];
    for (const h of hexParts) {
        const val = parseInt(h, 16);
        if (isNaN(val)) return "Error: Invalid hex value '" + h + "'";
        result.push(String.fromCharCode(val));
    }
    return result.join('');
}

// Binary decoding

function binDecode(input) {
    const binParts = input.split(/\s+/).filter(b => b.length > 0);
    const result = [];
    for (const b of binParts) {
        if (!/^[01]+$/.test(b)) return "Error: Invalid binary value '" + b + "'";
        result.push(String.fromCharCode(parseInt(b, 2)));
    }
    return result.join('');
}

// Vigenere cipher implementation

function vig(t, k, e) {
    k = k.toUpperCase().replace(/[^A-Z]/g, '');
    if (!k) return "Error: Key must contain letters (A-Z)";
    let r = "", j = 0;
    for (let i = 0; i < t.length; i++) {
        const c = t[i];
        const upper = c.toUpperCase();
        if (upper >= 'A' && upper <= 'Z') {
            const s = k[j++ % k.length].charCodeAt(0) - 65;
            const shifted = (upper.charCodeAt(0) - 65 + (e ? s : 26 - s)) % 26 + 65;
            // BUG FIX: Preserve original case
            r += (c === upper) ? String.fromCharCode(shifted) : String.fromCharCode(shifted + 32);
        } else {
            r += c;
        }
    }
    return r;
}

// Standard XOR cipher logic

function xorCipher(input, key) {
    if (!key) return "Error: Key required";
    return Array.from(input).map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join('');
}

// Brainfuck interpreter with safety limits and validation

function brain(c) {
    const code = c.replace(/[^+\-<>\[\].,]/g, '');
    if (!code) return "No valid Brainf*ck instructions found.";

    // Validate bracket pairs match before starting parsing execution loop
    let balance = 0;
    for (let k = 0; k < code.length; k++) {
        if (code[k] === '[') balance++;
        if (code[k] === ']') balance--;
        if (balance < 0) return "Error: Unmatched ']' at position " + k;
    }
    if (balance !== 0) return "Error: Unmatched '[' — " + balance + " bracket(s) not closed";

    let m = new Uint8Array(30000), p = 0, i = 0, r = "", stack = [], ops = 0;
    while (i < code.length && ops < 100000) {
        ops++; const s = code[i];
        if (s === '>') p = (p + 1) % 30000;
        else if (s === '<') p = (p - 1 + 30000) % 30000;
        else if (s === '+') m[p]++;
        else if (s === '-') m[p]--;
        else if (s === '.') r += String.fromCharCode(m[p]);
        else if (s === ',') m[p] = 0; // input not supported in web, set to 0
        else if (s === '[') {
            if (m[p] === 0) {
                let d = 1;
                while (d > 0 && i < code.length - 1) {
                    i++;
                    if (code[i] === '[') d++;
                    if (code[i] === ']') d--;
                }
            } else {
                stack.push(i);
            }
        }
        else if (s === ']') {
            if (stack.length === 0) return "Error: Unmatched ']' during execution";
            if (m[p] !== 0) i = stack[stack.length - 1];
            else stack.pop();
        }
        i++;
    }
    if (ops >= 100000) return r + "\n[⚠ Execution limit reached: 100,000 operations]";
    return r || "No output generated.";
}

// SHA-256 and SHA-512 cryptographic hash functions

async function computeHash(algorithm, text) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById("outputText").value = hashHex;
        return hashHex;
    } catch (e) {
        const errMsg = "Error: Hash computation failed — " + e.message;
        document.getElementById("outputText").value = errMsg;
        return errMsg;
    }
}

// MD5 hash function implementation

function md5(string) {
    function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }

    function md5blk(s) {
        const md5blks = [];
        for (let i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    function rhex(n) {
        const hex_chr = '0123456789abcdef';
        let s = '';
        for (let j = 0; j < 4; j++)
            s += hex_chr.charAt((n >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((n >> (j * 8)) & 0x0F);
        return s;
    }

    function hex(x) {
        for (let i = 0; i < x.length; i++) x[i] = rhex(x[i]);
        return x.join('');
    }

    // Convert to UTF-8 first
    let s = unescape(encodeURIComponent(string));
    const n = s.length;
    let state = [1732584193, -271733879, -1732584194, 271733878];
    let i;

    for (i = 64; i <= n; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
    }

    s = s.substring(i - 64);
    const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    }
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);

    if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return hex(state);
}

// Symmetric AES-GCM encryption/decryption

async function deriveAESKey(password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("sherlock-decoder-salt"), iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

async function aesEncrypt(plaintext, password) {
    try {
        const key = await deriveAESKey(password);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const enc = new TextEncoder();
        const ciphertext = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            enc.encode(plaintext)
        );
        const result = {
            iv: btoa(String.fromCharCode(...iv)),
            ct: btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
        };
        document.getElementById("outputText").value = JSON.stringify(result);
        return JSON.stringify(result);
    } catch (e) {
        const errMsg = "Error: AES encryption failed — " + e.message;
        document.getElementById("outputText").value = errMsg;
        return errMsg;
    }
}

async function aesDecrypt(ciphertextJSON, password) {
    try {
        const data = JSON.parse(ciphertextJSON);
        if (!data.iv || !data.ct) throw new Error("Invalid AES-GCM format. Expected {iv, ct}");

        const key = await deriveAESKey(password);
        const iv = new Uint8Array(atob(data.iv).split('').map(c => c.charCodeAt(0)));
        const ct = new Uint8Array(atob(data.ct).split('').map(c => c.charCodeAt(0)));

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            ct
        );
        const result = new TextDecoder().decode(decrypted);
        document.getElementById("outputText").value = result;
        return result;
    } catch (e) {
        let errMsg;
        if (e instanceof SyntaxError) {
            errMsg = "Error: Input must be valid JSON format from AES-GCM Encrypt output";
        } else if (e.message.includes("Invalid AES-GCM")) {
            errMsg = "Error: " + e.message;
        } else {
            errMsg = "Error: Decryption failed — wrong key or corrupted data";
        }
        document.getElementById("outputText").value = errMsg;
        return errMsg;
    }
}

// Rail Fence transposition cipher

function railFenceEncrypt(text, rails) {
    if (rails < 2) return "Error: Rails must be >= 2";
    if (rails >= text.length) return text;

    const fence = Array.from({ length: rails }, () => []);
    let rail = 0, direction = 1;

    for (let i = 0; i < text.length; i++) {
        fence[rail].push(text[i]);
        if (rail === 0) direction = 1;
        else if (rail === rails - 1) direction = -1;
        rail += direction;
    }

    return fence.flat().join('');
}

function railFenceDecrypt(text, rails) {
    if (rails < 2) return "Error: Rails must be >= 2";
    if (rails >= text.length) return text;

    const n = text.length;
    const pattern = Array(n);
    let rail = 0, direction = 1;

    // Determine which rail each position belongs to
    for (let i = 0; i < n; i++) {
        pattern[i] = rail;
        if (rail === 0) direction = 1;
        else if (rail === rails - 1) direction = -1;
        rail += direction;
    }

    // Count chars per rail
    const railCounts = Array(rails).fill(0);
    for (let i = 0; i < n; i++) railCounts[pattern[i]]++;

    // Split ciphertext into rails
    const railTexts = [];
    let offset = 0;
    for (let r = 0; r < rails; r++) {
        railTexts.push(text.substr(offset, railCounts[r]));
        offset += railCounts[r];
    }

    // Read back in original order
    const railIndex = Array(rails).fill(0);
    let result = '';
    for (let i = 0; i < n; i++) {
        const r = pattern[i];
        result += railTexts[r][railIndex[r]];
        railIndex[r]++;
    }

    return result;
}

// Polybius Square cipher

function polybiusEncode(text) {
    const upper = text.toUpperCase().replace(/J/g, 'I');
    let result = [];
    for (const ch of upper) {
        let found = false;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (POLYBIUS_GRID[row][col] === ch) {
                    result.push(`${row + 1}${col + 1}`);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        if (!found) {
            if (ch === ' ') result.push(' ');
            // Skip non-alpha characters
        }
    }
    return result.join(' ');
}

function polybiusDecode(text) {
    const pairs = text.trim().split(/\s+/);
    let result = '';
    for (const pair of pairs) {
        if (pair.length === 2 && /^[1-5]{2}$/.test(pair)) {
            const row = parseInt(pair[0]) - 1;
            const col = parseInt(pair[1]) - 1;
            result += POLYBIUS_GRID[row][col];
        } else if (pair === '') {
            result += ' ';
        } else {
            result += '?';
        }
    }
    return result;
}

// Tap Code (5x5 grid tap pattern)

function tapCodeEncode(text) {
    const upper = text.toUpperCase().replace(/K/g, 'C');
    const tapAlpha = 'ABCDEFGHIJLMNOPQRSTUVWXYZ'; // No K
    let result = [];

    for (const ch of upper) {
        const idx = tapAlpha.indexOf(ch);
        if (idx >= 0) {
            const row = Math.floor(idx / 5) + 1;
            const col = (idx % 5) + 1;
            result.push('.'.repeat(row) + ' ' + '.'.repeat(col));
        } else if (ch === ' ') {
            result.push('/');
        }
    }
    return result.join('   ');
}

function tapCodeDecode(text) {
    const tapAlpha = 'ABCDEFGHIJLMNOPQRSTUVWXYZ'; // No K
    const groups = text.trim().split(/\s{2,}/);
    let result = '';

    for (const group of groups) {
        if (group === '/' || group === '') {
            result += ' ';
            continue;
        }
        const parts = group.trim().split(/\s+/);
        if (parts.length === 2) {
            const row = (parts[0].match(/\./g) || []).length;
            const col = (parts[1].match(/\./g) || []).length;
            if (row >= 1 && row <= 5 && col >= 1 && col <= 5) {
                const idx = (row - 1) * 5 + (col - 1);
                if (idx < tapAlpha.length) {
                    result += tapAlpha[idx];
                }
            }
        }
    }
    return result;
}

// Asymmetric RSA-OAEP encryption/decryption

let pubKeyObj, privKeyObj;
let lastRsaEncrypted = null; // Cache the last encrypted output
let lastRsaOriginal = null;  // Cache the original plaintext value

async function generateRSA() {
    try {
        const keys = await window.crypto.subtle.generateKey(
            { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
            true, ["encrypt", "decrypt"]
        );
        pubKeyObj = keys.publicKey;
        privKeyObj = keys.privateKey;
        const spki = await window.crypto.subtle.exportKey("spki", pubKeyObj);
        const pkcs8 = await window.crypto.subtle.exportKey("pkcs8", privKeyObj);
        document.getElementById("pubKey").value = btoa(String.fromCharCode(...new Uint8Array(spki)));
        document.getElementById("privKey").value = btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
        lastRsaEncrypted = null;
        lastRsaOriginal = null;
    } catch (e) {
        alert("RSA key generation failed: " + e.message);
    }
}

async function rsaEncrypt() {
    if (!pubKeyObj) { alert("Generate keys first!"); return; }
    try {
        const inputText = document.getElementById("inputText").value;
        if (!inputText) { alert("Enter text to encrypt!"); return; }
        const enc = await window.crypto.subtle.encrypt(
            { name: "RSA-OAEP" }, pubKeyObj, new TextEncoder().encode(inputText)
        );
        const encrypted = btoa(String.fromCharCode(...new Uint8Array(enc)));
        document.getElementById("outputText").value = encrypted;
        // Store for easy one-click decrypt
        lastRsaEncrypted = encrypted;
        lastRsaOriginal = inputText;
    } catch (e) {
        alert("RSA encryption failed: " + e.message);
    }
}

async function rsaDecrypt() {
    if (!privKeyObj) { alert("Generate keys first!"); return; }
    try {
        const inputText = document.getElementById("inputText").value;
        let textToDecrypt = inputText;

        // If input text hasn't changed, decrypt cached value
        // automatically for seamless user flow
        if (lastRsaEncrypted && (inputText === lastRsaOriginal || !inputText.trim())) {
            textToDecrypt = lastRsaEncrypted;
        }

        if (!textToDecrypt) { alert("Enter encrypted text to decrypt!"); return; }

        const dec = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" }, privKeyObj,
            new Uint8Array(atob(textToDecrypt).split('').map(c => c.charCodeAt(0)))
        );
        document.getElementById("outputText").value = new TextDecoder().decode(dec);
    } catch (e) {
        alert("RSA decryption failed — Invalid input or wrong key");
    }
}

// Copy to clipboard utility

function copyToClipboard(elementId, btn) {
    const text = document.getElementById(elementId).value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const originalSVG = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="lightgreen"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        setTimeout(() => { btn.innerHTML = originalSVG; }, 1500);
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.getElementById(elementId);
        textarea.select();
        document.execCommand('copy');
    });
}

// Web Audio API Morse code audio generator

function playMorse() {
    const code = document.getElementById("outputText").value;
    if (!code) return;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let time = audioCtx.currentTime;
    code.split('').forEach(c => {
        if (c === '.' || c === '-') {
            const d = (c === '.') ? 0.1 : 0.3;
            const osc = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            osc.connect(g); g.connect(audioCtx.destination);
            osc.frequency.value = 600;
            g.gain.setValueAtTime(0, time);
            g.gain.linearRampToValueAtTime(0.5, time + 0.01);
            g.gain.linearRampToValueAtTime(0, time + d);
            osc.start(time); osc.stop(time + d);
            time += d + 0.1;
        } else if (c === ' ' || c === '/') { time += 0.2; }
    });
}

function stopMorse() {
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
}