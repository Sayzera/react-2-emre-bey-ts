import { useState, useRef, useCallback } from 'react';
import type { UploadedFile, FileUploadConfig, AllowedFileType } from './types';
import {
  validateFiles,
  formatFileSize,
  getFileTypeLabel,
  createImagePreview,
} from './utils';

// Varsayılan yapılandırma
const defaultConfig: FileUploadConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  maxFiles: 10,
  allowMultiple: true,
};

function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [config, setConfig] = useState<FileUploadConfig>(defaultConfig);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  /**
   * Dosya yükleme işlemini simüle eder
   */
  const simulateUpload = async (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: 'uploading' as const } : f
      )
    );

    // Progress simülasyonu
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, uploadProgress: progress }
            : f
        )
      );
    }

    // Başarılı yükleme
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: 'success' as const } : f
      )
    );
  };

  /**
   * Dosyaları işle ve validasyon yap
   */
  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      setErrors([]);

      // Validasyon
      const validation = validateFiles(fileArray, config);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      // Her dosya için UploadedFile objesi oluştur
      const newFiles: UploadedFile[] = await Promise.all(
        fileArray.map(async (file) => {
          const id = `${Date.now()}-${Math.random()}`;
          let preview: string | undefined;

          // Resim dosyaları için önizleme oluştur
          if (file.type.startsWith('image/')) {
            try {
              preview = await createImagePreview(file);
            } catch (error) {
              console.error('Önizleme oluşturulamadı:', error);
            }
          }

          return {
            id,
            file,
            preview,
            size: file.size,
            type: file.type,
            status: 'pending' as const,
          };
        })
      );

      setUploadedFiles((prev) => {
        if (config.allowMultiple) {
          return [...prev, ...newFiles];
        } else {
          return newFiles.slice(0, 1); // Tek dosya modunda sadece ilkini al
        }
      });

      // Otomatik yükleme başlat
      newFiles.forEach((file) => {
        simulateUpload(file.id);
      });
    },
    [config]
  );

  /**
   * Dosya seçme handler'ı
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Input'u temizle (aynı dosyayı tekrar seçebilmek için)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Drag & Drop handlers
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  /**
   * Dosya silme
   */
  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  /**
   * Tüm dosyaları temizle
   */
  const handleClearAll = () => {
    setUploadedFiles([]);
    setErrors([]);
  };

  /**
   * Dosya yükleme butonu tıklama
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="page-container">
      <h1>📁 Dosya Yükleme Sistemi</h1>

      {/* Yapılandırma Paneli */}
      <div className="info-box" style={{ marginBottom: '2rem' }}>
        <h3>⚙️ Yükleme Ayarları</h3>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label>
              Maksimum Dosya Boyutu (MB):
              <input
                type="number"
                value={config.maxFileSize / (1024 * 1024)}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    maxFileSize: Number(e.target.value) * 1024 * 1024,
                  })
                }
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
              />
            </label>
          </div>
          <div>
            <label>
              Maksimum Dosya Sayısı:
              <input
                type="number"
                value={config.maxFiles}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    maxFiles: Number(e.target.value),
                  })
                }
                style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={config.allowMultiple}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    allowMultiple: e.target.checked,
                  })
                }
              />
              Çoklu Dosya Yükleme
            </label>
          </div>
        </div>
      </div>

      {/* Hata Mesajları */}
      {errors.length > 0 && (
        <div
          className="info-box"
          style={{
            backgroundColor: '#fee',
            borderColor: '#fcc',
            marginBottom: '1rem',
          }}
        >
          <h3 style={{ color: '#c33' }}>❌ Hatalar:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: '#c33' }}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dosya Yükleme Alanı */}
      <div
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        style={{
          border: `2px dashed ${isDragging ? '#667eea' : '#ccc'}`,
          borderRadius: '8px',
          padding: '3rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? '#f0f4ff' : '#fafafa',
          transition: 'all 0.3s',
          marginBottom: '2rem',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={config.allowMultiple}
          accept={config.allowedTypes.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📤</div>
          <h3>Dosyaları buraya sürükleyin veya tıklayın</h3>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Maksimum {formatFileSize(config.maxFileSize)} • 
            {config.allowMultiple
              ? ` Maksimum ${config.maxFiles} dosya`
              : ' Tek dosya'}
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            İzin verilen tipler: {config.allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}
          </p>
        </div>
      </div>

      {/* Yüklenen Dosyalar Listesi */}
      {uploadedFiles.length > 0 && (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <h2>Yüklenen Dosyalar ({uploadedFiles.length})</h2>
            <button
              onClick={handleClearAll}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem' }}
            >
              Tümünü Temizle
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
            }}
          >
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="product-card"
                style={{ position: 'relative' }}
              >
                {/* Önizleme (Resimler için) */}
                {uploadedFile.preview && (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      marginBottom: '1rem',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}

                {/* Dosya Bilgileri */}
                <div>
                  <h4
                    style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1rem',
                      wordBreak: 'break-word',
                    }}
                  >
                    {uploadedFile.file.name}
                  </h4>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                    <strong>Tip:</strong> {getFileTypeLabel(uploadedFile.type)}
                  </p>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                    <strong>Boyut:</strong> {formatFileSize(uploadedFile.size)}
                  </p>

                  {/* Yükleme Durumu */}
                  <div style={{ marginTop: '0.5rem' }}>
                    {uploadedFile.status === 'pending' && (
                      <span style={{ color: '#999' }}>⏳ Bekliyor...</span>
                    )}
                    {uploadedFile.status === 'uploading' && (
                      <div>
                        <div
                          style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginTop: '0.5rem',
                          }}
                        >
                          <div
                            style={{
                              width: `${uploadedFile.uploadProgress || 0}%`,
                              height: '100%',
                              backgroundColor: '#667eea',
                              transition: 'width 0.3s',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#667eea' }}>
                          Yükleniyor... {uploadedFile.uploadProgress}%
                        </span>
                      </div>
                    )}
                    {uploadedFile.status === 'success' && (
                      <span style={{ color: '#4caf50' }}>✅ Yüklendi</span>
                    )}
                    {uploadedFile.status === 'error' && (
                      <span style={{ color: '#f44336' }}>
                        ❌ Hata: {uploadedFile.errorMessage}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sil Butonu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(uploadedFile.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Öğrenilenler */}
      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>Bu sayfada öğrenilenler:</h3>
        <ul>
          <li>
            <code>File</code> API ile dosya okuma ve işleme
          </li>
          <li>
            <code>FileReader</code> ile dosya içeriğini okuma
          </li>
          <li>Drag & Drop ile dosya yükleme</li>
          <li>Dosya tipi ve boyut validasyonu</li>
          <li>Çoklu dosya yükleme işlemleri</li>
          <li>Dosya önizleme (resimler için)</li>
          <li>Yükleme progress göstergesi</li>
          <li>Hata yönetimi ve kullanıcı geri bildirimi</li>
          <li>
            <code>useRef</code> ile DOM elementlerine erişim
          </li>
          <li>
            <code>useState</code> ile kompleks state yönetimi
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FileUpload;
