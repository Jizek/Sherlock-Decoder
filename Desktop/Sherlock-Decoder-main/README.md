# 🔍 SHERLOCK DECODER

<div align="center">
  <img src="assets/Sherlock.png" alt="Sherlock Decoder Logo" width="200"/>
  
  ### Modern Kriptoloji ve Şifreleme Aracı
  
  [![GitHub Pages](https://img.shields.io/badge/demo-live-success)](https://yourusername.github.io/Sherlock-Decoder-main/)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

  **[🌐 Demo](https://yourusername.github.io/Sherlock-Decoder-main/) | [📖 Dokümantasyon](#özellikler) | [🐛 Hata Bildir](https://github.com/yourusername/Sherlock-Decoder-main/issues)**
</div>

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Desteklenen Şifreleme Yöntemleri](#-desteklenen-şifreleme-yöntemleri)
- [Akıllı Tespit Sistemi](#-akıllı-tespit-sistemi)
- [Teknolojiler](#-teknolojiler)
- [Katkıda Bulunanlar](#-katkıda-bulunanlar)
- [Lisans](#-lisans)

---

## 🎯 Hakkında

**Sherlock Decoder**, modern web teknolojileri kullanılarak geliştirilmiş, kullanıcı dostu bir kriptoloji ve şifreleme aracıdır. 30'dan fazla şifreleme ve kodlama yöntemini destekler, akıllı tespit sistemi ile otomatik olarak şifre türünü tanır ve çok dilli arayüzü ile global kullanıcılara hitap eder.

### ✨ Neden Sherlock Decoder?

- 🎨 **Modern ve Şık Tasarım** - Dark/Light tema desteği
- 🧠 **Akıllı Tespit** - Otomatik şifre türü tanıma
- 🌍 **10 Dil Desteği** - TR, EN, DE, FR, ES, IT, RU, JP, ZH, AR
- 🔐 **RSA Şifreleme** - 2048-bit asimetrik şifreleme
- 🎵 **Morse Ses Çalma** - Morse kodunu sesli dinleme
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ⚡ **Hızlı ve Güvenli** - Tamamen tarayıcı tabanlı, sunucu gerektirmez

---

## 🚀 Özellikler

### 🔐 Şifreleme Kategorileri

#### **Base Encoding**
- Base64 Encode/Decode
- Base32 Encode/Decode
- Base58 Encode/Decode

#### **Klasik ve Modern Şifreler**
- Vigenère Cipher (Encrypt/Decrypt)
- XOR Cipher (Anahtar gerektirir)
- Atbash Cipher
- ROT13
- Caesar Cipher (+3/-3)

#### **Teknik Kodlamalar**
- Hexadecimal Encode/Decode
- Binary Encode/Decode
- URL Encode/Decode
- Brainf*ck Interpreter

#### **Ekstra Araçlar**
- NATO Phonetic Alphabet
- Bacon Cipher (Encode/Decode)
- Reverse Text
- Morse Code (Encode/Decode + Audio)

#### **Asimetrik Şifreleme**
- RSA-OAEP (2048-bit)
- Public/Private Key Generation
- RSA Encrypt/Decrypt

---

## 🧠 Akıllı Tespit Sistemi

Sherlock Decoder, girdiğiniz metni otomatik olarak analiz eder ve muhtemel şifreleme türünü tespit eder:

```
🔍 Sherlock iz sürüyor...
🔎 Buldum! Bu muhtemelen: Base64
```

**Tespit Edilen Formatlar:**
- RSA (Uzun Base64 dizileri)
- Morse Code (. - / karakterleri)
- Binary (0 ve 1'ler)
- Hexadecimal (0-9, A-F)
- Brainf*ck (+-<>[]., karakterleri)
- Bacon Cipher (a/b dizileri)
- URL Encoding (% kodlamaları)
- Base64 (Standart Base64 formatı)

---

## 💻 Kurulum

### Yerel Kurulum

1. **Repoyu klonlayın:**
```bash
git clone https://github.com/yourusername/Sherlock-Decoder-main.git
cd Sherlock-Decoder-main
```

2. **Tarayıcıda açın:**
```bash
# Basitçe index.html dosyasını tarayıcınızda açın
# veya bir local server kullanın:
python -m http.server 8000
# veya
npx serve
```

3. **Tarayıcınızda açın:**
```
http://localhost:8000
```

### GitHub Pages ile Yayınlama

1. **Repository Settings'e gidin**
2. **Pages sekmesini açın**
3. **Source olarak `main` branch'i seçin**
4. **Save'e tıklayın**
5. **Siteniz şu adreste yayınlanacak:** `https://yourusername.github.io/Sherlock-Decoder-main/`

### Özel Domain Ekleme

1. **Repository'nizde `CNAME` dosyası oluşturun:**
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. **DNS ayarlarınızı yapılandırın:**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

3. **GitHub Settings > Pages'de custom domain'i girin**

---

## 📖 Kullanım

### Temel Kullanım

1. **Operasyon Seçin:** Sol menüden şifreleme/çözme yöntemini seçin
2. **Metin Girin:** Üst textarea'ya şifrelenecek/çözülecek metni yazın
3. **Sonuç:** Alt textarea'da otomatik olarak sonucu görün
4. **Kopyala:** Sonucu kopyalamak için sağ üstteki kopyala butonunu kullanın

### RSA Şifreleme

```javascript
1. "Generate" butonuna tıklayın
2. Public ve Private key'ler otomatik oluşturulur
3. Şifrelemek için metni girin ve "Encrypt" butonuna tıklayın
4. Çözmek için şifreli metni girin ve "Decrypt" butonuna tıklayın
```

### Morse Code Audio

```javascript
1. Morse Encode seçin
2. Metninizi girin
3. "PLAY" butonuna tıklayarak Morse kodunu dinleyin
4. "STOP" ile durdurabilirsiniz
```

### Dil Değiştirme

Sağ üst köşedeki dil seçiciden 10 farklı dil arasından seçim yapabilirsiniz:
- 🇹🇷 Türkçe
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇫🇷 Français
- 🇪🇸 Español
- 🇮🇹 Italiano
- 🇷🇺 Русский
- 🇯🇵 日本語
- 🇨🇳 中文
- 🇸🇦 العربية

---

## 🔧 Desteklenen Şifreleme Yöntemleri

### Base Encoding
| Yöntem | Encode | Decode | Açıklama |
|--------|--------|--------|----------|
| Base64 | ✅ | ✅ | RFC 4648 standardı |
| Base32 | ✅ | ✅ | RFC 4648 standardı |
| Base58 | ✅ | ✅ | Bitcoin formatı |

### Klasik Şifreler
| Yöntem | Encrypt | Decrypt | Anahtar Gerekli |
|--------|---------|---------|-----------------|
| Vigenère | ✅ | ✅ | ✅ |
| Caesar | ✅ | ✅ | ❌ (Sabit +3/-3) |
| Atbash | ✅ | ✅ | ❌ |
| ROT13 | ✅ | ✅ | ❌ |
| XOR | ✅ | ✅ | ✅ |

### Modern Şifreleme
| Yöntem | Bit | Algoritma | Web Crypto API |
|--------|-----|-----------|----------------|
| RSA-OAEP | 2048 | SHA-256 | ✅ |

### Teknik Kodlamalar
| Yöntem | Encode | Decode | Format |
|--------|--------|--------|--------|
| Hexadecimal | ✅ | ✅ | Space-separated |
| Binary | ✅ | ✅ | 8-bit groups |
| URL | ✅ | ✅ | RFC 3986 |

### Özel Formatlar
| Yöntem | Özellik | Açıklama |
|--------|---------|----------|
| Morse Code | 🔊 Audio | Web Audio API ile ses çalma |
| Brainf*ck | 🧠 Interpreter | 30,000 hücre, 100K operasyon limiti |
| NATO Phonetic | 📻 | A-Z harfler için fonetik alfabe |
| Bacon Cipher | 🥓 | 5-bit binary encoding |

---

## 🛠️ Teknolojiler

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling, CSS Variables, Flexbox, Grid
- **JavaScript (ES6+)** - Vanilla JS, no frameworks

### Web APIs
- **Web Crypto API** - RSA şifreleme
- **Web Audio API** - Morse code ses çalma
- **Clipboard API** - Kopyalama fonksiyonu
- **TextEncoder/TextDecoder** - UTF-8 encoding

### Özellikler
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - CSS Variables ile tema değiştirme
- **Multi-language** - 10 dil desteği
- **No Dependencies** - Saf JavaScript, framework yok

---

## 📱 Tarayıcı Desteği

| Tarayıcı | Versiyon | Destek |
|----------|----------|--------|
| Chrome | 60+ | ✅ Tam Destek |
| Firefox | 55+ | ✅ Tam Destek |
| Safari | 11+ | ✅ Tam Destek |
| Edge | 79+ | ✅ Tam Destek |
| Opera | 47+ | ✅ Tam Destek |

**Not:** Web Crypto API ve Web Audio API desteği gereklidir.

---

## 🤝 Katkıda Bulunanlar

Bu projeye katkıda bulunan herkese teşekkürler! 🎉

- **Kadir Recep Köse** - Geliştirici
- **Yusuf Koşman** - Geliştirici
- **Ubeyd Kahraman** - Geliştirici
- **Ferhat Özkan** - Geliştirici

### Katkıda Bulunmak İster misiniz?

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 🔒 Güvenlik

- Tüm şifreleme işlemleri **tarayıcınızda** gerçekleşir
- Hiçbir veri sunucuya gönderilmez
- RSA anahtarları oturum bazlıdır (sayfa yenilendiğinde silinir)
- Web Crypto API kullanılarak güvenli şifreleme

---

## 📞 İletişim

Sorularınız veya önerileriniz için:

- 🐛 [Issue açın](https://github.com/yourusername/Sherlock-Decoder-main/issues)
- 💬 [Discussions](https://github.com/yourusername/Sherlock-Decoder-main/discussions)

---

## 🌟 Yıldız Geçmişi

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/Sherlock-Decoder-main&type=Date)](https://star-history.com/#yourusername/Sherlock-Decoder-main&Date)

---

<div align="center">
  
  ### 🔍 Sen yaz, Sherlock bulsun!
  
  Made with ❤️ by SHERLOCK Dev Team
  
  **[⬆ Başa Dön](#-sherlock-decoder)**
  
</div>
