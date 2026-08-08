"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Loader2,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  X
} from "lucide-react";

export default function AdminDashboardPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "Kegiatan",
    imageFile: null as File | null,
  });

// Di dalam komponen AdminDashboardPage, perbarui fungsi fetchGallery:
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const result = await res.json();
      if (result.success) {
        // Mengurutkan data berdasarkan tanggal secara lokal (descending)
        const sortedData = (result.data || []).sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setGalleryItems(sortedData);
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setErrorMsg("Gagal memuat data galeri.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: "", date: "", category: "Kegiatan", imageFile: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      date: item.date || "",
      category: item.category || "Kegiatan",
      imageFile: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto galeri ini?")) return;

    try {
      setActionLoading(true);
      setErrorMsg("");

      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal menghapus");

      setSuccessMsg("Galeri berhasil dihapus!");
      fetchGallery();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      console.error("Gagal menghapus:", err);
      setErrorMsg(err.message || "Gagal menghapus data.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg("");

    try {
      const dataPayload = new FormData();
      if (editingId) dataPayload.append("id", editingId);
      dataPayload.append("title", formData.title);
      dataPayload.append("date", formData.date);
      dataPayload.append("category", formData.category);
      if (formData.imageFile) {
        dataPayload.append("imageFile", formData.imageFile);
      }

      const endpoint = "/api/gallery";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: dataPayload,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan data");

      setSuccessMsg(editingId ? "Galeri berhasil diperbarui!" : "Galeri baru berhasil ditambahkan!");
      setIsModalOpen(false);
      fetchGallery();
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      console.error("Gagal menyimpan:", err);
      setErrorMsg(err.message || "Gagal menyimpan ke server.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F3E5] py-12 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-200 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/" className="text-xs font-semibold text-gray-500 hover:text-[#227b13] flex items-center gap-1">
                <ArrowLeft size={14} /> Beranda
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Kelola Galeri Desa Buddih
            </h1>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-[#227b13] hover:bg-[#1b620f] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all w-full sm:w-auto cursor-pointer"
          >
            <Plus size={16} /> Tambah Galeri Baru
          </button>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-700 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <h3 className="text-lg font-extrabold text-gray-900 mb-6">Daftar Foto Galeri ({galleryItems.length})</h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#227b13] mb-3" size={36} />
              <p className="text-gray-500 text-xs font-medium">Memuat data...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-16 bg-[#F2F3E5]/50 rounded-2xl border border-dashed border-gray-300">
              <ImageIcon className="mx-auto text-gray-400 mb-2" size={42} />
              <p className="font-bold text-gray-700 text-sm">Belum ada data galeri</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between group">
                  <div className="h-48 relative bg-gray-100">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title || "Galeri"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    )}
                    <span className="absolute top-3 left-3 bg-[#227b13] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {item.category || "Umum"}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs mb-4">{item.date}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-800 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Edit / Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={actionLoading}
                        className="bg-red-50 hover:bg-red-100 text-red-700 p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-lg">
                  {editingId ? "Edit / Update Galeri" : "Tambah Galeri Baru"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 p-1 rounded-full bg-gray-100 cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Judul Kegiatan</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#227b13]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tanggal Kegiatan</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#227b13]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#227b13]"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pembangunan">Pembangunan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="UMKM">UMKM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    {editingId ? "Ganti Foto (Opsional)" : "Upload Foto Galeri"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-green-50 file:text-green-700 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex items-center gap-2 bg-[#227b13] hover:bg-[#1b620f] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading && <Loader2 className="animate-spin" size={14} />}
                    {editingId ? "Simpan Perubahan" : "Publikasikan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}