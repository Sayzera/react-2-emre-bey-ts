export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  size: number;
  type: string;
  uploadProgress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export type AllowedFileType = 
  | 'image/jpeg' 
  | 'image/png' 
  | 'image/gif' 
  | 'image/webp'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'text/plain'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export interface FileUploadConfig {
  maxFileSize: number; // bytes cinsinden
  allowedTypes: AllowedFileType[];
  maxFiles?: number; // Çoklu dosya için
  allowMultiple: boolean;
}
