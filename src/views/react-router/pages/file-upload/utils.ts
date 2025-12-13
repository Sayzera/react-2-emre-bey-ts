import type { FileValidationResult, AllowedFileType, FileUploadConfig } from './types';

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

/**
 * Dosya tipini kontrol eder
 */
export const isValidFileType = (
  file: File, 
  allowedTypes: AllowedFileType[]
): boolean => {
  return allowedTypes.includes(file.type as AllowedFileType);
};

/**
 * Dosya boyutunu kontrol eder
 */
export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

/**
 * Dosya uzantısından tip tahmin eder (MIME type yoksa)
 */
export const getFileTypeFromExtension = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  const typeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  
  return typeMap[extension || ''] || 'application/octet-stream';
};

/**
 * Dosya tipini kullanıcı dostu isme çevirir
 */
export const getFileTypeLabel = (mimeType: string): string => {
  const labels: Record<string, string> = {
    'image/jpeg': 'JPEG Resim',
    'image/png': 'PNG Resim',
    'image/gif': 'GIF Resim',
    'image/webp': 'WebP Resim',
    'application/pdf': 'PDF Doküman',
    'application/msword': 'Word Doküman',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Doküman',
    'text/plain': 'Metin Dosyası',
    'application/vnd.ms-excel': 'Excel Dosyası',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Dosyası',
  };
  
  return labels[mimeType] || 'Bilinmeyen Dosya';
};

/**
 * Dosya validasyonu yapar
 */
export const validateFile = (
  file: File,
  config: FileUploadConfig
): FileValidationResult => {
  const errors: string[] = [];
  
  // Dosya tipi kontrolü
  if (!isValidFileType(file, config.allowedTypes)) {
    const allowedExtensions = config.allowedTypes
      .map(type => type.split('/')[1].toUpperCase())
      .join(', ');
    errors.push(
      `Dosya tipi desteklenmiyor. İzin verilen tipler: ${allowedExtensions}`
    );
  }
  
  // Dosya boyutu kontrolü
  if (!isValidFileSize(file, config.maxFileSize)) {
    errors.push(
      `Dosya boyutu çok büyük. Maksimum boyut: ${formatFileSize(config.maxFileSize)}`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Birden fazla dosya validasyonu yapar
 */
export const validateFiles = (
  files: File[],
  config: FileUploadConfig
): FileValidationResult => {
  const errors: string[] = [];
  
  // Maksimum dosya sayısı kontrolü
  if (config.maxFiles && files.length > config.maxFiles) {
    errors.push(`Maksimum ${config.maxFiles} dosya yükleyebilirsiniz.`);
  }
  
  // Her dosyayı tek tek kontrol et
  files.forEach((file, index) => {
    const validation = validateFile(file, config);
    if (!validation.isValid) {
      errors.push(`Dosya ${index + 1} (${file.name}): ${validation.errors.join(', ')}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Resim dosyası için önizleme URL'i oluşturur
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Dosya bir resim değil'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Dosya okunamadı'));
    };
    
    reader.readAsDataURL(file);
  });
};
