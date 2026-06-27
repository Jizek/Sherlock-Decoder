# 🚀 GitHub Pages Kurulum Rehberi

Bu rehber, Sherlock Decoder projenizi GitHub Pages'de yayınlamanız için adım adım talimatlar içerir.

## 📋 Ön Gereksinimler

- GitHub hesabı
- Git kurulu olmalı
- Proje dosyaları hazır

## 🔧 Adım 1: GitHub Repository Oluşturma

### 1.1 Yeni Repository Oluşturun

1. GitHub'da oturum açın
2. Sağ üst köşedeki **+** butonuna tıklayın
3. **New repository** seçin
4. Repository bilgilerini girin:
   - **Repository name:** `Sherlock-Decoder-main` (veya istediğiniz isim)
   - **Description:** "Modern Kriptoloji ve Şifreleme Aracı"
   - **Public** seçin (GitHub Pages için gerekli)
   - **Initialize this repository with a README** seçmeyin (zaten var)

### 1.2 Repository'yi Oluşturun

**Create repository** butonuna tıklayın.

## 📤 Adım 2: Projeyi GitHub'a Yükleme

### 2.1 Git Başlatma

Proje klasöründe terminal açın ve şu komutları çalıştırın:

```bash
# Git repository'sini başlatın
git init

# Tüm dosyaları stage edin
git add .

# İlk commit'i yapın
git commit -m "Initial commit: Sherlock Decoder v1.0"

# Ana branch'i main olarak ayarlayın
git branch -M main
```

### 2.2 Remote Repository Ekleme

```bash
# GitHub repository'nizi remote olarak ekleyin
# YOURUSERNAME yerine kendi kullanıcı adınızı yazın
git remote add origin https://github.com/YOURUSERNAME/Sherlock-Decoder-main.git

# Dosyaları GitHub'a push edin
git push -u origin main
```

## 🌐 Adım 3: GitHub Pages Aktifleştirme

### 3.1 Settings'e Gidin

1. GitHub'da repository'nize gidin
2. **Settings** sekmesine tıklayın
3. Sol menüden **Pages** seçin

### 3.2 Source Ayarları

1. **Source** bölümünde:
   - **Branch:** `main` seçin
   - **Folder:** `/ (root)` seçin
2. **Save** butonuna tıklayın

### 3.3 Deployment Bekleyin

- GitHub Pages deployment'ı başlatacak (1-2 dakika sürer)
- Sayfa yenilendiğinde üstte yeşil bir banner göreceksiniz:
  ```
  Your site is live at https://YOURUSERNAME.github.io/Sherlock-Decoder-main/
  ```

## 🎯 Adım 4: GitHub Actions Workflow (Opsiyonel)

Proje zaten `.github/workflows/deploy.yml` dosyasını içeriyor. Bu otomatik deployment sağlar.

### 4.1 Actions'ı Aktifleştirin

1. Repository'de **Actions** sekmesine gidin
2. **I understand my workflows, go ahead and enable them** butonuna tıklayın

### 4.2 İlk Deployment

- Her `main` branch'e push yaptığınızda otomatik deploy olacak
- **Actions** sekmesinden deployment durumunu takip edebilirsiniz

## 🌍 Adım 5: Özel Domain Ekleme (Opsiyonel)

### 5.1 CNAME Dosyasını Düzenleyin

Proje kök dizinindeki `CNAME` dosyasını düzenleyin:

```bash
# CNAME dosyasını açın ve kendi domain'inizi yazın
echo "yourdomain.com" > CNAME

# Değişikliği commit edin
git add CNAME
git commit -m "Update CNAME with custom domain"
git push
```

### 5.2 DNS Ayarları

Domain sağlayıcınızın DNS ayarlarına gidin ve şu kayıtları ekleyin:

#### A Records (Root Domain için)

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### CNAME Record (www subdomain için)

```
Type: CNAME
Name: www
Value: YOURUSERNAME.github.io
```

### 5.3 GitHub'da Custom Domain Ayarlama

1. Repository **Settings > Pages** gidin
2. **Custom domain** bölümüne domain'inizi girin: `yourdomain.com`
3. **Save** butonuna tıklayın
4. **Enforce HTTPS** seçeneğini aktifleştirin (DNS propagation'dan sonra)

### 5.4 DNS Propagation Bekleyin

- DNS değişikliklerinin yayılması 24-48 saat sürebilir
- Kontrol etmek için: https://dnschecker.org/

## ✅ Adım 6: Test ve Doğrulama

### 6.1 Sitenizi Ziyaret Edin

```
https://YOURUSERNAME.github.io/Sherlock-Decoder-main/
```

veya özel domain kullanıyorsanız:

```
https://yourdomain.com
```

### 6.2 Kontrol Listesi

- [ ] Ana sayfa düzgün yükleniyor mu?
- [ ] Sherlock.png görseli görünüyor mu?
- [ ] CSS stilleri uygulanıyor mu?
- [ ] JavaScript çalışıyor mu?
- [ ] Tüm şifreleme yöntemleri çalışıyor mu?
- [ ] Responsive tasarım mobilde çalışıyor mu?
- [ ] Dil değiştirme çalışıyor mu?
- [ ] RSA şifreleme çalışıyor mu?
- [ ] Morse audio çalışıyor mu?

## 🔧 Sorun Giderme

### Sayfa 404 Hatası Veriyor

**Çözüm:**
- Settings > Pages'de source ayarlarını kontrol edin
- `main` branch ve `/ (root)` seçili olmalı
- 5-10 dakika bekleyin ve sayfayı yenileyin

### CSS/JS Dosyaları Yüklenmiyor

**Çözüm:**
- Tarayıcı konsolunu açın (F12)
- Hata mesajlarını kontrol edin
- Dosya yollarının doğru olduğundan emin olun
- Cache'i temizleyin (Ctrl+Shift+R)

### Görsel Görünmüyor

**Çözüm:**
- `assets/Sherlock.png` dosyasının var olduğundan emin olun
- Dosya adının büyük/küçük harf duyarlı olduğunu unutmayın
- Git'e eklendiğinden emin olun: `git add assets/Sherlock.png`

### Custom Domain Çalışmıyor

**Çözüm:**
- DNS ayarlarını kontrol edin
- DNS propagation'ı bekleyin (24-48 saat)
- CNAME dosyasının doğru olduğundan emin olun
- GitHub'da custom domain ayarını kontrol edin

## 📱 Mobil Test

Mobil cihazlarda test etmek için:

1. **Chrome DevTools:**
   - F12 > Toggle device toolbar (Ctrl+Shift+M)
   - Farklı cihaz boyutlarını test edin

2. **Gerçek Cihaz:**
   - Mobil tarayıcınızda sitenizi açın
   - Responsive tasarımı kontrol edin

## 🔄 Güncelleme Yapma

Projeyi güncellemek için:

```bash
# Değişikliklerinizi yapın
# Dosyaları stage edin
git add .

# Commit edin
git commit -m "Update: Description of changes"

# Push edin
git push origin main
```

GitHub Actions otomatik olarak yeni versiyonu deploy edecek.

## 📊 Analytics Ekleme (Opsiyonel)

### Google Analytics

`index.html` dosyasının `<head>` bölümüne ekleyin:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎉 Tebrikler!

Sherlock Decoder projeniz artık canlı! 🚀

### Sonraki Adımlar

- [ ] README.md'deki `yourusername` kısımlarını güncelleyin
- [ ] Social media'da paylaşın
- [ ] Arkadaşlarınıza gönderin
- [ ] Star verin ⭐
- [ ] Katkıda bulunun

## 📞 Yardım

Sorun yaşıyorsanız:

1. [GitHub Issues](https://github.com/YOURUSERNAME/Sherlock-Decoder-main/issues) açın
2. [Discussions](https://github.com/YOURUSERNAME/Sherlock-Decoder-main/discussions) kullanın
3. README.md'yi okuyun

---

**İyi kodlamalar! 🔍**

Made with ❤️ by SHERLOCK Dev Team
