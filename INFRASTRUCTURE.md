# 🏛️ Darkrock Games Studio — Altyapı, DNS, Servis Envanteri & Felaket Kurtarma Kılavuzu (Runbook)
*Son Güncelleme: Kasım 2026*

Bu belge; stüdyonun tüm canlı servislerini, alan adı mimarisini, DNS yapılandırmasını, Google AdSense/AdMob entegrasyonlarını ve olası bir bilgisayar çökmesi durumunda sıfırdan sistemi ayağa kaldırmak için gereken **eksiksiz felaket kurtarma (disaster recovery)** adımlarını içerir.

---

## 🌐 1. Canlı Alan Adı (Domain) & Cloudflare DNS Mimarisi

* **Ana Alan Adı (Apex):** `https://darkrockstudio.net/`
* **WWW Alan Adı:** `https://www.darkrockstudio.net/` (Apex'e yönlenir)
* **Barındırma (Hosting):** GitHub Pages (`ONURKRKY/onurkrky.github.io.git` reposu, `main` dalı)
* **Kök CNAME Dosyası:** `/CNAME` -> `darkrockstudio.net`

### Cloudflare DNS Kayıtları Tablosu:
| Tür (Type) | İsim (Name) | Hedef (Target / Content) | Proxy Durumu | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (darkrockstudio.net) | `185.199.108.153` | Proxied (Turuncu Bulut) | GitHub Pages IP 1 |
| **A** | `@` (darkrockstudio.net) | `185.199.109.153` | Proxied (Turuncu Bulut) | GitHub Pages IP 2 |
| **A** | `@` (darkrockstudio.net) | `185.199.110.153` | Proxied (Turuncu Bulut) | GitHub Pages IP 3 |
| **A** | `@` (darkrockstudio.net) | `185.199.111.153` | Proxied (Turuncu Bulut) | GitHub Pages IP 4 |
| **CNAME** | `www` | `onurkrky.github.io` | Proxied (Turuncu Bulut) | WWW alt alan adı |

### Cloudflare SSL/TLS & Güvenlik Ayarları:
* **SSL/TLS Şifreleme Modu:** `Full` (veya `Full (Strict)`)
* **Always Use HTTPS:** Aktif (`ON`)
* **Automatic HTTPS Rewrites:** Aktif (`ON`)
* **Minimum TLS Sürümü:** TLS 1.2

---

## 🎮 2. Canlı Oyunlar & Servis Dağılımı

| Oyun / Servis | Web Canlı URL | Sunucu (Backend) WebSocket URL | Mobil Uygulama Durumu |
| :--- | :--- | :--- | :--- |
| **Darkrock Portal** | `https://darkrockstudio.net/` | — | Statik Vitrin & Kurallar |
| **Klasik Tavla** | `https://darkrockstudio.net/tavla/` | `wss://tavla-3q16.onrender.com` | Google Play Yayında (`com.darkrock.tavla`) • iOS Yakında |
| **Klasik Pişti** | `https://darkrockstudio.net/pisti/` | `wss://pisti-3q16.onrender.com` | iOS İncelemede (`id6835895552`) • Android Kapalı Testte |
| **Klasik Dama** | `https://darkrockstudio.net/dama/` *(Planlanan)* | `wss://dama-3q16.onrender.com` | Geliştirme Aşamasında (2026 Q1) |

---

## 💰 3. Reklam & Gelir Altyapısı (AdSense & AdMob)

* **Google AdSense Yayıncı Kimliği:** `ca-pub-5059706166608811`
* **Google AdMob Hesap Kimliği:** `pub-5059706166608811`
* **AdSense Web Doğrulama Kodu:** `<meta name="google-adsense-account" content="ca-pub-5059706166608811">`
* **Canlı `ads.txt` URL:** `https://darkrockstudio.net/ads.txt`
  ```text
  google.com, pub-5059706166608811, DIRECT, f08c47fec0942fa0
  smartadserver.com, 4194-OB, RESELLER, 060d053dcf45cbf3
  smartadserver.com, 4194, RESELLER, 060d053dcf45cbf3
  sharethrough.com, 4194-OB, RESELLER, 060d053dcf45cbf3
  sharethrough.com, 4194, RESELLER, 060d053dcf45cbf3
  ```
* **AdMob `app-ads.txt` Doğrulaması:** Google Play Console $\rightarrow$ Mağaza Ayarları $\rightarrow$ Web Sitesi: `https://onurkrky.github.io` (Render alt alan adları PSL listesinde olduğu için AdMob doğrulaması doğrudan github.io üzerinden yapılır).

---

## 🔍 4. SEO & Arama Motoru Dizin Haritası

* **Google Search Console Doğrulama:** Alan Adı Mülkü (`darkrockstudio.net`)
* **Site Haritası (Sitemap):** `https://darkrockstudio.net/sitemap.xml`
  * İçerik: `/` (Ana Portal), `/tavla/` (Web Tavla), `/pisti/` (Web Pişti)
* **Robot Dosyası (Robots.txt):** `https://darkrockstudio.net/robots.txt`
* **Google Rich Results (Yapısal Veri):**
  * `Organization` (Darkrock Games Studio)
  * `VideoGame` (Klasik Tavla & Klasik Pişti Web/Android/iOS)
  * `FAQPage` (4 soru ve cevaptan oluşan SSS zengin kartları)

---

## 🛡️ 5. Felaket Kurtarma (Disaster Recovery) & Profesyonel Yedekleme Kılavuzu

Bilgisayarınız bozulursa, çalınırsa veya diski çökerse stüdyonun tüm faaliyetlerini yeni bir bilgisayarda **30 dakika içinde** ayağa kaldırma rehberidir:

### A. Kodlar ve Web Portalı:
* Tüm kodlar GitHub'da saklanmaktadır:
  1. `git clone https://github.com/ONURKRKY/tavla.git`
  2. `git clone https://github.com/ONURKRKY/pisti.git`
  3. `git clone https://github.com/ONURKRKY/onurkrky.github.io.git`

### B. EN KRİTİK RİSK: Android İmza Anahtarı (`upload-keystore.jks`)
> [!CAUTION]
> Google Play'e yüklenen uygulamalar bir defa imzalandıktan sonra o imza anahtarı (`.jks`) kaybolursa, Google Play'e **asla güncelleme atılamaz**.

**Profesyonel Koruma Stratejisi:**
1. **GitHub Private (Özel) Yedek Deposu Açın:**
   * GitHub'da yalnızca sizin erişebileceğiniz **Private** bir repo açın (örnek: `darkrock-vault` veya `studio-secrets`).
   * İçerisine şunları yükleyin:
     * `tavla/android/app/upload-keystore.jks`
     * `tavla/android/key.properties`
     * `pisti/android/app/upload-keystore.jks`
     * `pisti/android/key.properties`
   * Bu sayede şifreleriniz ve anahtarlarınız GitHub'ın güvenli sunucularında yedeklenmiş olur; bilgisayarınız yansa bile kaybolmaz.
2. **Alternatif Bulut Kasası (Cloud Vault):**
   * Bu 2 `.jks` dosyasını ve şifre notunu şifreli bir ZIP yaparak Google Drive / iCloud / Proton Drive veya Bitwarden / 1Password kasanıza atın.

### C. Sunucular (Render.com):
* Sunucular Render.com üzerinde doğrudan GitHub depolarınıza bağlıdır (`tavla` ve `pisti` ana dalları).
* Yeni bilgisayarda `git push` yaptığınız an Render sunucuları otomatik derlenip yayına girer; sunucu tarafında hiçbir şey kaybolmaz.
