# 📚 **Bookshelf App Starter Project**  

Starter project ini dirancang khusus untuk membantu menyelesaikan tugas akhir kelas **Belajar Membuat Front-End Web untuk Pemula**. Dengan struktur yang sudah disiapkan, Anda dapat fokus pada pengembangan fitur dan logika aplikasi! 🚀  

---

## 🎯 **Tujuan Utama**  
Membuat aplikasi pengelolaan buku sederhana yang memungkinkan pengguna:  
- Menambahkan buku baru.  
- Menandai buku sebagai **sudah selesai dibaca** atau **belum selesai dibaca**.  
- Mengedit dan menghapus data buku sesuai kebutuhan.  

--- 

### 📝 **Daftar Atribut `data-testid`**  
| **Elemen**                 | **`data-testid`**                | **Deskripsi**                           |  
|----------------------------|----------------------------------|-----------------------------------------|  
| Kontainer Buku             | `bookItem`                      | Menampung seluruh data buku.           |  
| Judul Buku                 | `bookItemTitle`                 | Judul buku.                             |  
| Penulis Buku               | `bookItemAuthor`                | Nama penulis buku.                      |  
| Tahun Rilis Buku           | `bookItemYear`                  | Tahun buku dirilis.                     |  
| Tombol Ubah Status         | `bookItemIsCompleteButton`      | Tombol untuk mengubah status buku.      |  
| Tombol Hapus Buku          | `bookItemDeleteButton`          | Tombol untuk menghapus buku.            |  
| Tombol Edit Buku           | `bookItemEditButton`            | Tombol untuk mengubah informasi buku.   |  

---

## 💡 **Contoh Template Buku**  
Gunakan templat berikut untuk menampilkan data buku dalam aplikasi:  
```html
<div data-bookid="{{ ID_buku }}" data-testid="bookItem">
  <h3 data-testid="bookItemTitle">{{ judul_buku }}</h3>
  <p data-testid="bookItemAuthor">Penulis: {{ penulis_buku }}</p>
  <p data-testid="bookItemYear">Tahun: {{ tahun_rilis_buku }}</p>
  <div>
    <button data-testid="bookItemIsCompleteButton">{{ tombol_untuk_ubah_kondisi }}</button>
    <button data-testid="bookItemDeleteButton">{{ tombol_untuk_hapus }}</button>
    <button data-testid="bookItemEditButton">{{ tombol_untuk_edit }}</button>
  </div>
</div>
```   