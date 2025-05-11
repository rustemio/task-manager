# 📝 Görev Yönetim Uygulaması (Task Manager)

Bu proje, kullanıcıların görev eklemesine, görüntülemesine ve silmesine olanak tanıyan bir görev yönetim sistemidir.  
Frontend React ile geliştirildi, Backend ise Flask (Python) kullanılarak Azure üzerinde barındırıldı.

---

## 🚀 Canlı Demo

🔗 **Frontend (Netlify):**  
[https://gleeful-buttercream-33ef5d.netlify.app](https://gleeful-buttercream-33ef5d.netlify.app)

🔗 **Backend (Azure):**  
[https://gorev-backend-rustemio.azurewebsites.net/tasks](https://gorev-backend-rustemio.azurewebsites.net/tasks)

---

## ⚙️ Kullanılan Teknolojiler

- React (Vite / Create React App)
- Axios (HTTP istekleri)
- Flask (Python)
- flask-cors
- Azure App Service (backend host)
- Netlify (frontend deploy)
- Git & GitHub

---

## 🔧 Özellikler

- ✅ Görev ekleme
- ✅ Görev silme
- ✅ Görev tamamlama
- ✅ Kategori seçimi
- ✅ Karanlık / Aydınlık mod
- ✅ Anlık saat ve tarih
- ✅ PDF export (isteğe bağlı)
- ✅ Mobile uyumlu arayüz
- ✅ CORS uyumlu backend bağlantısı

---

## 🛠️ Projeyi Çalıştırma

### Gerekli Kurulumlar:
- `Node.js`, `npm`
- `Python 3`, `pip`

### Kurulum Adımları:

```bash
# frontend
cd frontend
npm install
npm start

# backend
cd backend
pip install -r requirements.txt
python app.py
