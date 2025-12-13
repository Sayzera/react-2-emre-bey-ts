

/**
 * Dosya boyutunu okunabilir formata çevirir
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Dosya bir resim değil"));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Dosya okunamadı"));
    };

    reader.readAsDataURL(file);
  });
};
