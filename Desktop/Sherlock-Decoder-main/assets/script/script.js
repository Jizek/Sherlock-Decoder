const dictionary = {
    tr: { ops: "İŞLEMLER", proc: "Metin İşleme", rsa: "Asimetrik (RSA)", active: "Aktif:", gen: "Üret", enc: "Şifrele", dec: "Çöz", audio: "Mors Ses:", play: "OYNAT", stop: "DURDUR", chars: "Karakter", words: "Kelime", shSlogan: "Sen yaz, Sherlock bulsun!", shScanning: "Sherlock iz sürüyor...", shFound: "Buldum! Bu muhtemelen:", shNotFound: "İz bulunamadı..." },
    en: { ops: "OPERATIONS", proc: "Text Processing", rsa: "Asymmetric (RSA)", active: "Active:", gen: "Generate", enc: "Encrypt", dec: "Decrypt", audio: "Morse Audio:", play: "PLAY", stop: "STOP", chars: "Chars", words: "Words", shSlogan: "Type it, Sherlock will find it!", shScanning: "Sherlock is tracking...", shFound: "Found! This is likely:", shNotFound: "No traces found..." },
    de: { ops: "OPERATIONEN", proc: "Textverarbeitung", rsa: "RSA Asymmetrisch", active: "Aktiv:", gen: "Generieren", enc: "Verschlüsseln", dec: "Entschlüsseln", audio: "Morse Ton:", play: "SPIELEN", stop: "STOPP", chars: "Zeichen", words: "Wörter", shSlogan: "Schreib es, Sherlock wird es finden!", shScanning: "Sherlock spürt es auf...", shFound: "Gefunden! Wahrscheinlich:", shNotFound: "Keine Spuren..." },
    fr: { ops: "OPÉRATIONS", proc: "Traitement de Texte", rsa: "RSA Asymétrique", active: "Actif:", gen: "Générer", enc: "Crypter", dec: "Décrypter", audio: "Audio Morse:", play: "JOUER", stop: "ARRÊTER", chars: "Caractères", words: "Mots", shSlogan: "Écrivez, Sherlock trouvera !", shScanning: "Sherlock suit la trace...", shFound: "Trouvé ! C'est probablement :", shNotFound: "Aucune trace..." },
    es: { ops: "OPERACIONES", proc: "Procesamiento", rsa: "RSA Asimétrico", active: "Activo:", gen: "Generar", enc: "Cifrar", dec: "Descifrar", audio: "Audio Morse:", play: "REPRODUCIR", stop: "PARAR", chars: "Caracteres", words: "Palabras", shSlogan: "¡Escribe, Sherlock lo encontrará!", shScanning: "Sherlock está rastreando...", shFound: "¡Encontrado! Probablemente:", shNotFound: "Sin rastro..." },
    it: { ops: "OPERAZIONI", proc: "Elaborazione", rsa: "RSA Asimmetrico", active: "Attivo:", gen: "Genera", enc: "Cripta", dec: "Decripta", audio: "Audio Morse:", play: "RIPRODUCI", stop: "FERMA", chars: "Caratteri", words: "Parole", shSlogan: "Scrivi, Sherlock lo troverà!", shScanning: "Sherlock sta tracciando...", shFound: "Trovato! Probabilmente:", shNotFound: "Nessuna traccia..." },
    ru: { ops: "ОПЕРАЦИИ", proc: "Обработка текста", rsa: "RSA Шифр", active: "Активно:", gen: "Создать", enc: "Шифр", dec: "Расшифр", audio: "Морзе звук:", play: "ИГРАТЬ", stop: "СТОП", chars: "Симв.", words: "Слов", shSlogan: "Пишите, Шерлок найдет!", shScanning: "Шерлок выслеживает...", shFound: "Найдено! Вероятно:", shNotFound: "Следов нет..." },
    jp: { ops: "操作", proc: "テキスト処理", rsa: "RSA非対称", active: "有効:", gen: "生成", enc: "暗号化", dec: "復号化", audio: "モールス音:", play: "再生", stop: "停止", chars: "文字", words: "単語", shSlogan: "書けばシャーロックが見つける！", shScanning: "追跡中...", shFound: "発見！おそらく：", shNotFound: "形跡なし..." },
    zh: { ops: "操作", proc: "文本处理", rsa: "RSA加密", active: "状态:", gen: "生成", enc: "加密", dec: "解密", audio: "摩斯音:", play: "播放", stop: "停止", chars: "字符", words: "词数", shSlogan: "写下来，夏洛克会找到它！", shScanning: "追踪中...", shFound: "发现！可能是：", shNotFound: "未发现痕迹..." },
    ar: { ops: "عمليات", proc: "معalجة النصوص", rsa: "تشفير RSA", active: "نشط:", gen: "توليد", enc: "تشفير", dec: "فك", audio: "صوت مورس:", play: "تشغيل", stop: "إيقاف", chars: "حرف", words: "كلمة", shSlogan: "اكتب، وسيجده شرلوك!", shScanning: "شرلوك يتتبع الأثر...", shFound: "وجدت! ربما يكون:", shNotFound: "لا توجد آثار..." }
};

let currentOp = 'b64e';
let analysisTimeout;
let audioCtx = null;

const MORSE = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '  ' };
const BACON = { 'A': 'aaaaa', 'B': 'aaaab', 'C': 'aaaba', 'D': 'aaabb', 'E': 'aabaa', 'F': 'aabab', 'G': 'aabba', 'H': 'aabbb', 'I': 'abaaa', 'J': 'abaab', 'K': 'ababa', 'L': 'ababb', 'M': 'abbaa', 'N': 'abbab', 'O': 'abbba', 'P': 'abbbb', 'Q': 'baaaa', 'R': 'baaab', 'S': 'baaba', 'T': 'baabb', 'U': 'babaa', 'V': 'babab', 'W': 'babba', 'X': 'babbb', 'Y': 'bbaaa', 'Z': 'bbaab' };

window.onload = () => {
    document.getElementById("langSelect").value = "tr";
    changeLanguage();
};

function toggleTheme() { document.body.classList.toggle("light-mode"); }

function changeLanguage() {
    const l = document.getElementById("langSelect").value;
    const t = dictionary[l] || dictionary['tr'];

    document.getElementById("opsLabel").innerText = t.ops;
    document.getElementById("procTitle").innerText = t.proc;
    document.getElementById("rsaTitle").innerText = t.rsa;
    document.getElementById("activeText").innerText = t.active;
    document.getElementById("btnGen").innerText = t.gen;
    document.getElementById("btnEnc").innerText = t.enc;
    document.getElementById("btnDec").innerText = t.dec;
    document.getElementById("audioLabel").innerText = t.audio;

    const playBtn = document.querySelector("#morsePlayer button:first-of-type");
    const stopBtn = document.querySelector(".stop-btn");
    if (playBtn) playBtn.innerText = t.play;
    if (stopBtn) stopBtn.innerText = t.stop;

    const input = document.getElementById("inputText").value;
    if (!input || input.trim().length < 3) {
        document.getElementById("sherlockText").innerText = t.shSlogan;
    }

    document.body.className = (l === 'ar' ? 'dark-mode rtl' : 'dark-mode');
    updateActiveOp();
}

function updateActiveOp() {
    currentOp = document.getElementById("opDropdown").value;
    document.getElementById("currentOp").innerText = document.querySelector(`#opDropdown option[value="${currentOp}"]`).text;
    handleInput();
}

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
            { name: "URL Enc", regex: /%[0-9A-F]{2}/i },
            { name: "Base64", regex: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/ }
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

function runOperation(input) {
    const out = document.getElementById("outputText");
    try {
        switch (currentOp) {
            case 'b64e': out.value = btoa(unescape(encodeURIComponent(input))); break;
            case 'b64d': out.value = decodeURIComponent(escape(atob(input.trim()))); break;
            case 'b32e': out.value = base32(input, true); break;
            case 'b32d': out.value = base32(input.trim(), false); break;
            case 'b58e': out.value = b58(input, true); break;
            case 'b58d': out.value = b58(input.trim(), false); break;
            case 'hexE': out.value = Array.from(input).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '); break;
            case 'hexD': out.value = input.trim().split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join(''); break;
            case 'binE': out.value = Array.from(input).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '); break;
            case 'binD': out.value = input.trim().split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join(''); break;
            case 'urlE': out.value = encodeURIComponent(input); break;
            case 'urlD': out.value = decodeURIComponent(input); break;
            case 'atbash': out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c <= 'Z' ? 90 : 122) - (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97)))); break;
            case 'rot13': out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 13) % 26 + (c <= 'Z' ? 65 : 97))); break;
            case 'caesarE': out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 3) % 26 + (c <= 'Z' ? 65 : 97))); break;
            case 'caesarD': out.value = input.replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + 23) % 26 + (c <= 'Z' ? 65 : 97))); break;
            case 'vigenereE': { const k = prompt("Key:"); out.value = k ? vig(input, k, true) : "Key required!"; break; }
            case 'vigenereD': { const k = prompt("Key:"); out.value = k ? vig(input, k, false) : "Key required!"; break; }
            case 'xor': { const k = prompt("Key:"); out.value = k ? Array.from(input).map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ k.charCodeAt(i % k.length))).join('') : "Key required!"; break; }
            case 'bf': out.value = brain(input); break;
            case 'nato':
                const NATO = { A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet", K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee", Z: "Zulu" };
                out.value = input.toUpperCase().split('').map(c => NATO[c] || c).join(' ');
                break;
            case 'baconE': out.value = input.toUpperCase().replace(/[^A-Z]/g, '').split('').map(c => BACON[c] || '').join(' '); break;
            case 'baconD':
                const revBacon = Object.fromEntries(Object.entries(BACON).map(([k, v]) => [v, k]));
                out.value = input.toLowerCase().trim().split(/\s+/).map(c => revBacon[c] || '?').join('');
                break;
            case 'reverse': out.value = input.split('').reverse().join(''); break;
            case 'morseE':
                out.value = input.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
                document.getElementById("morsePlayer").style.display = "flex";
                break;
            case 'morseD':
                const revMorse = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));
                out.value = input.trim().split(/\s+/).map(c => revMorse[c] || c).join('');
                break;
        }
        if (currentOp !== 'morseE') document.getElementById("morsePlayer").style.display = "none";
    } catch (e) { out.value = "Error: Invalid Input"; }
}

function brain(c) {
    const code = c.replace(/[^+\-<>\[\].,]/g, '');
    let m = new Uint8Array(30000), p = 0, i = 0, r = "", stack = [], ops = 0;
    while (i < code.length && ops < 100000) {
        ops++; const s = code[i];
        if (s === '>') p = (p + 1) % 30000;
        else if (s === '<') p = (p - 1 + 30000) % 30000;
        else if (s === '+') m[p]++;
        else if (s === '-') m[p]--;
        else if (s === '.') r += String.fromCharCode(m[p]);
        else if (s === '[') { if (m[p] === 0) { let d = 1; while (d > 0) { i++; if (code[i] === '[') d++; if (code[i] === ']') d--; } } else stack.push(i); }
        else if (s === ']') { if (m[p] !== 0) i = stack[stack.length - 1]; else stack.pop(); }
        i++;
    }
    return r || "No output generated.";
}

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

function b58(t, e) {
    const B = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    if (e) {
        // Base58 Encode
        let n = BigInt('0x' + Array.from(new TextEncoder().encode(t)).map(b => b.toString(16).padStart(2, '0')).join('')), r = "";
        while (n > 0n) { r = B[Number(n % 58n)] + r; n /= 58n }
        // Handle leading zeros
        for (let i = 0; i < t.length && t.charCodeAt(i) === 0; i++) r = '1' + r;
        return r || '1';
    } else {
        // Base58 Decode
        try {
            let n = 0n;
            for (let i = 0; i < t.length; i++) {
                const c = B.indexOf(t[i]);
                if (c < 0) return "Invalid Base58 character!";
                n = n * 58n + BigInt(c);
            }
            let hex = n.toString(16);
            if (hex.length % 2) hex = '0' + hex;
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            // Handle leading '1's (zeros)
            for (let i = 0; i < t.length && t[i] === '1'; i++) {
                bytes.unshift(0);
            }
            return new TextDecoder().decode(new Uint8Array(bytes));
        } catch (e) {
            return "Base58 decode error!";
        }
    }
}

function vig(t, k, e) {
    k = k.toUpperCase().replace(/[^A-Z]/g, ''); if (!k) return t;
    let r = "", j = 0;
    for (let i = 0; i < t.length; i++) {
        let c = t[i].toUpperCase();
        if (c >= 'A' && c <= 'Z') {
            let s = k[j++ % k.length].charCodeAt(0) - 65;
            r += String.fromCharCode((c.charCodeAt(0) - 65 + (e ? s : 26 - s)) % 26 + 65);
        } else r += t[i];
    }
    return r;
}

let pubKeyObj, privKeyObj;
async function generateRSA() {
    const keys = await window.crypto.subtle.generateKey({ name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["encrypt", "decrypt"]);
    pubKeyObj = keys.publicKey; privKeyObj = keys.privateKey;
    const spki = await window.crypto.subtle.exportKey("spki", pubKeyObj);
    const pkcs8 = await window.crypto.subtle.exportKey("pkcs8", privKeyObj);
    document.getElementById("pubKey").value = btoa(String.fromCharCode(...new Uint8Array(spki)));
    document.getElementById("privKey").value = btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
}

async function rsaEncrypt() {
    try {
        const enc = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, pubKeyObj, new TextEncoder().encode(document.getElementById("inputText").value));
        document.getElementById("outputText").value = btoa(String.fromCharCode(...new Uint8Array(enc)));
    } catch (e) { alert("Generate keys first!"); }
}

async function rsaDecrypt() {
    try {
        const dec = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privKeyObj, new Uint8Array(atob(document.getElementById("inputText").value).split('').map(c => c.charCodeAt(0))));
        document.getElementById("outputText").value = new TextDecoder().decode(dec);
    } catch (e) { alert("Invalid RSA input!"); }
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const originalSVG = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="lightgreen"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        setTimeout(() => { btn.innerHTML = originalSVG; }, 1500);
    });
}

function playMorse() {
    const code = document.getElementById("outputText").value;
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

function stopMorse() { if (audioCtx) { audioCtx.close(); audioCtx = null; } }