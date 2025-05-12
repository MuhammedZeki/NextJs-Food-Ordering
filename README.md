# 🍽️ Next.js Food Ordering

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir çevrimiçi yemek siparişi platformudur. 
Kullanıcılar, çeşitli yemekleri görüntüleyebilir, sepetlerine ekleyebilir ve sipariş verebilirler. 
Ayrıca yöneticiler için özel bir admin paneli de bulunmaktadır.

🔗 [GitHub Projesi](https://github.com/MuhammedZeki/NextJs-Food-Ordering)

---

## 📑 İçindekiler

- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Admin Paneli Girişi](#admin-paneli-girişi)
- [Geliştirici](#geliştirici)

---

## ✨ Özellikler

- Yemekleri listeleme ve detaylarını görüntüleme
- Sepete ürün ekleme / çıkarma
- Sipariş tamamlama adımı
- Admin panel üzerinden ürün yönetimi (ekleme, silme, güncelleme)
- Mobil uyumlu responsive tasarım

---

## 🧰 Kullanılan Teknolojiler

- [Next.js](https://nextjs.org/) – React tabanlı framework
- [MongoDB + Mongoose](https://mongoosejs.com/) – Veritabanı ve ODM
- [Tailwind CSS](https://tailwindcss.com/) – Hızlı UI geliştirme için
- [NextAuth veya özel auth sistemi] – Kullanıcı ve admin kimlik doğrulama
- [Redux Toolkit] – Global state yönetimi

---

## ⚙️ Kurulum

1. Bu repoyu klonlayın:

```bash
git clone https://github.com/MuhammedZeki/NextJs-Food-Ordering.git
cd NextJs-Food-Ordering
```

2. Gerekli paketleri yükleyin:

```bash
npm install
```

3. Ortam değişkenlerini `.env.local` dosyasında tanımlayın (örnek dosya içinde olabilir):

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
```

4. Uygulamayı başlatın:

```bash
npm run dev
```

---

## 🧪 Kullanım

- Ana sayfada yemek menülerine göz atabilirsiniz.
- Beğendiğiniz yemekleri sepete ekleyerek sipariş sürecini başlatabilirsiniz.
- Sipariş sırasında teslimat bilgilerini girip ödeme adımına geçersiniz (demo ödeme olabilir).
- Sipariş sonrası sipariş geçmişi görüntülenebilir (kullanıcı hesabı mevcutsa).

---

## 🔐 Admin Paneli Girişi

Admin paneline erişmek için:

📍 `http://localhost:3000/admin`  
🧑 **Kullanıcı Adı:** `admin`  
🔑 **Şifre:** `admin`

> ⚠️ Bu bilgiler sadece geliştirme ortamı içindir. Üretime geçerken güvenlik için mutlaka değiştirin!

---

## 👨‍💻 Geliştirici

**Muhammed Zeki**  
🔗 [GitHub Profilim](https://github.com/MuhammedZeki)
