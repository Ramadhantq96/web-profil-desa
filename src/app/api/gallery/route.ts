import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const serverClient = createClient({
  projectId: "i2qhpr65",
  dataset: "production",
  apiVersion: "2026-08-05",
  token: process.env.SANITY_API_TOKEN, // Pastikan token Developer/Editor aktif di .env.local
  useCdn: false,
});

// GET: Mengambil seluruh data galeri terurut berdasarkan tanggal
export async function GET() {
  try {
    // Menambahkan | order(date desc)
    const query = `*[_type == "gallery"] | order(date desc) {
      _id,
      title,
      date,
      category,
      "image": image.asset->url
    }`;
    const data = await serverClient.fetch(query);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Menambah data baru
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('imageFile') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadedAsset = await serverClient.assets.upload('image', buffer, {
      filename: imageFile.name,
    });

    const newDoc = await serverClient.create({
      _type: 'gallery',
      title,
      date,
      category,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedAsset._id,
        },
      },
    });

    return NextResponse.json({ success: true, data: newDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT / UPDATE: Memperbarui data yang sudah ada
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('imageFile') as File | null;

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    let patchTx = serverClient.patch(id).set({
      title,
      date,
      category,
    });

    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadedAsset = await serverClient.assets.upload('image', buffer, {
        filename: imageFile.name,
      });

      patchTx = patchTx.set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedAsset._id,
          },
        },
      });
    }

    const updatedDoc = await patchTx.commit();
    return NextResponse.json({ success: true, data: updatedDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Menghapus data
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    await serverClient.delete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}