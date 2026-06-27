# 🤝 Katkıda Bulunma Rehberi

Sherlock Decoder projesine katkıda bulunmak istediğiniz için teşekkür ederiz! 🎉

## 📋 Katkı Süreci

### 1. Fork ve Clone

```bash
# Projeyi fork edin (GitHub'da Fork butonuna tıklayın)
# Sonra kendi fork'unuzu klonlayın:
git clone https://github.com/YOURUSERNAME/Sherlock-Decoder-main.git
cd Sherlock-Decoder-main
```

### 2. Branch Oluşturun

```bash
# Yeni bir feature branch oluşturun
git checkout -b feature/amazing-feature

# veya bir bug fix için
git checkout -b fix/bug-description
```

### 3. Değişikliklerinizi Yapın

- Kod yazarken mevcut kod stiline uyun
- Anlamlı commit mesajları yazın
- Değişikliklerinizi test edin

### 4. Commit ve Push

```bash
# Değişikliklerinizi stage edin
git add .

# Commit edin (anlamlı mesaj yazın)
git commit -m "feat: Add new cipher algorithm"

# Branch'inizi push edin
git push origin feature/amazing-feature
```

### 5. Pull Request Açın

- GitHub'da repository'nize gidin
- "Pull Request" butonuna tıklayın
- Değişikliklerinizi açıklayın
- PR'ınızı gönderin

## 🎯 Katkı Türleri

### 🐛 Bug Raporları

Bug bulduğunuzda lütfen şunları ekleyin:
- Bug'ın açık bir açıklaması
- Yeniden üretme adımları
- Beklenen davranış
- Ekran görüntüleri (varsa)
- Tarayıcı ve versiyon bilgisi

### ✨ Yeni Özellikler

Yeni özellik eklerken:
- Önce bir issue açarak özelliği tartışın
- Kod stiline uyun
- Dokümantasyon ekleyin
- Test edin

### 📝 Dokümantasyon

- README.md iyileştirmeleri
- Kod yorumları
- Kullanım örnekleri
- Çeviri katkıları

## 💻 Kod Stili

### JavaScript

```javascript
// Camel case kullanın
function encodeBase64(input) {
    // ...
}

// Anlamlı değişken isimleri
const encodedText = btoa(input);

// Arrow functions (modern JS)
const decode = (text) => atob(text);
```

### CSS

```css
/* Kebab-case kullanın */
.main-content {
    background: var(--bg);
}

/* CSS Variables kullanın */
:root {
    --accent: #a855f7;
}
```

### HTML

```html
<!-- Semantic HTML kullanın -->
<section class="card">
    <header class="card-header">
        <h2>Title</h2>
    </header>
</section>
```

## 🧪 Test Etme

Değişikliklerinizi test edin:

1. **Farklı tarayıcılarda test edin:**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Responsive tasarımı kontrol edin:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

3. **Tüm şifreleme yöntemlerini test edin:**
   - Encode/Decode işlemleri
   - Hata durumları
   - Edge cases

## 📜 Commit Mesajları

Conventional Commits formatını kullanın:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

Örnekler:
```
feat: Add AES encryption support
fix: Fix Base64 decode error with special characters
docs: Update README with new cipher examples
style: Format JavaScript code with Prettier
```

## 🌍 Çeviri Katkıları

Yeni dil eklemek için:

1. `assets/script/script.js` dosyasındaki `dictionary` objesine yeni dil ekleyin:

```javascript
const dictionary = {
    // ... mevcut diller
    newlang: {
        ops: "OPERATIONS",
        proc: "Text Processing",
        // ... diğer çeviriler
    }
};
```

2. `index.html` dosyasındaki dil seçiciye yeni dili ekleyin:

```html
<option value="newlang">NEW LANG</option>
```

## ❓ Sorular

Sorularınız için:
- [Issue açın](https://github.com/yourusername/Sherlock-Decoder-main/issues)
- [Discussions kullanın](https://github.com/yourusername/Sherlock-Decoder-main/discussions)

## 📄 Lisans

Katkıda bulunarak, katkılarınızın MIT Lisansı altında lisanslanmasını kabul etmiş olursunuz.

---

**Teşekkürler! 🙏**

Her katkı, Sherlock Decoder'ı daha iyi hale getirir! 🔍
