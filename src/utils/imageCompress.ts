export interface CompressedPick {
  blob: Blob;
  url: string;
  name: string;
}

export function compressImage(file: File): Promise<CompressedPick | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 2000 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve({ blob: file, url: URL.createObjectURL(file), name: file.name });
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve({ blob, url: URL.createObjectURL(blob), name: file.name });
          } else {
            resolve({ blob: file, url: URL.createObjectURL(file), name: file.name });
          }
        },
        'image/webp',
        0.85,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}
