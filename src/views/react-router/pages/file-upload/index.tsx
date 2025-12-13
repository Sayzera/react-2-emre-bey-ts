import { useRef, useState } from "react";
import type { FileUploadConfig, UploadedFile } from "./types";
import { createImagePreview, formatFileSize } from "./utils";

const defaultConfig: FileUploadConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5 mb
  allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
  maxFiles: 10,
  allowMultiple: true,
};

/**
 *
 * TODOS: Kullanıcı eklenecek dosya tiplerini kendisi seçip ekleyebilmeli
 */

function FileUpload() {
  //   const [errors, setErrors] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [config, setConfig] = useState<FileUploadConfig>(defaultConfig);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Functions
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**Dosya yükleme işlemini simüle eder */

  const simulateUpload = async (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "uploading" as const } : f
      )
    );

    // Proggress similasyonu
    for (let progress = 0; progress <= 100; progress++) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, uploadProgress: progress } : f
        )
      );
    }

    setUploadedFiles((prev) =>
      prev.map((f) =>
        f.id === fileId ? { ...f, status: "success" as const } : f
      )
    );
  };

  const processFiles = async (files: FileList | File[]) => {
    //TODO: new map ve new set konuları detaylı bir şekilde araştırılacak farkları iyice anlaşılması gerekiyor
    const fileArray = Array.from(files);

    // Validation

    // Her dosya için UploaadedFileObjesi Oluştur
    const newFiles: UploadedFile[] = await Promise.all(
      fileArray.map(async (file) => {
        const id = `${Date.now()}-${Math.random()}`;
        let preview: string | undefined;

        if (file.type.startsWith("image/")) {
          try {
            preview = await createImagePreview(file);
          } catch (error) {
            console.error("Önizleme oluşturulamadı", error);
          }
        }

        return {
          id,
          file,
          preview,
          size: file.size,
          type: file.type,
          status: "pending" as const,
        };
      })
    );

    setUploadedFiles((prev) => {
      if (config.allowMultiple) {
        return [...prev, ...newFiles];
      } else {
        return newFiles.slice(0, 1);
      }
    });

    // otomatik yükleme başlat
    newFiles.forEach((file) => simulateUpload(file.id));
  };

  // Drag & Drop
  // TODO: Açıkla
  const handleDragEnter = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // üzerinden ayrıldım mı ?
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // üzerinden geçtim mi ?
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // üzerinde braktım mı ?
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // TODO: üzerine bir yazı atınca yakalayabilir miyiz ?

    const files = e.dataTransfer.files;

    processFiles(files);
  };

  return (
    <div className="page-container">
      <div className="info-box" style={{ marginBottom: "rem" }}>
        <h3>Yükleme Ayarları</h3>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div>
            <label>Maksimum Dosya Boyutu (MB)</label>
            <input
              style={{
                marginLeft: "0.5rem",
                padding: "0.25rem",
                border: "1px solid gray",
              }}
              value={config.maxFileSize / (1024 * 1024)}
              type="number"
              onChange={(e) => {
                setConfig((prev) => ({
                  ...prev,
                  maxFileSize: Number(e.target.value) * 1024 * 1024,
                }));
              }}
            />
          </div>

          <div>
            <label>En fazla kaç dosya yüklenebilir</label>
            <input
              style={{
                marginLeft: "0.5rem",
                padding: "0.25rem",
                border: "1px solid gray",
              }}
              value={config.maxFiles}
              type="number"
              onChange={(e) => {
                setConfig((prev) => ({
                  ...prev,
                  maxFiles: Number(e.target.value),
                }));
              }}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setConfig((prev) => ({
                    ...prev,
                    allowMultiple: e.target.checked,
                  }));
                }}
              />
              Çoklu Dosya Yükleme
            </label>
          </div>
        </div>
      </div>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        style={{
          border: `2px dashed ${isDragging ? "#667eea" : "#ccc"}`,
          borderRadius: "8px",
          padding: "3rem",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#f0f4ff" : "#fafafa",
          transition: "all 0.3s",
          marginBottom: "2rem",
          marginTop: "20px",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={config?.allowedTypes.join(",")}
          multiple={config?.allowMultiple}
          style={{ display: "none" }}
        />

        <h3>Dosyaları buraya sürükleyin veya tıklayın</h3>
        <p
          style={{
            color: "#666",
            marginTop: "0.5rem",
          }}
        >
          Maksimum {formatFileSize(config.maxFileSize)}
          {config.allowMultiple
            ? ` ${config.maxFiles} dosya`
            : " tek dosya"}{" "}
          için yükleme yapınız.
        </p>
        <p
          style={{
            color: "#666",
            marginTop: "0.5rem",
            fontSize: "14px",
          }}
        >
          İzin verilen dosya tipleri {config.allowedTypes.join(",")}
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2>Yüklenen Dosyalar ({uploadedFiles.length})</h2>

            <button>
              {/* TODO: Tüm dosları silebileceğimiz bir yapı ekleyin. */}
              Tümünü Temizle
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)",
              gap: "1rem",
            }}
          >
            {uploadedFiles.map((uploadFile) => {
              console.log(uploadFile, "uploadfile");
              return (
                <div
                  key={uploadFile.id}
                  className="product-card"
                  style={{ position: "relative" }}
                >
                  {/* Önizleme kontrol */}
                  {uploadFile.preview && (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "1rem",
                        overflow: "hidden",
                        borderRadius: "4px",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      <img
                        src={uploadFile.preview}
                        alt={uploadFile.file.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}

                  <div>
                    <div>
                      <h4
                        style={{
                          margin: "0 0 0.5rem 0",
                          fontSize: "1rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {uploadFile.file.name}
                      </h4>

                      <p
                        style={{
                          margin: "0.25rem 0",
                          fontSize: "0.9rem",
                          color: "#666",
                        }}
                      >
                        {/* 
                                 TODO: file.type kısmını objedeki gibi eşleştirip sağ taraftaki value ile gösterin
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
                            */}
                        <strong>Tip: {uploadFile.file.type}</strong>
                      </p>

                      <p
                        style={{
                          margin: "0.25rem 0",
                          fontSize: "0.9rem",
                          color: "#666",
                        }}
                      >
                        <strong>
                          Boyut: {formatFileSize(uploadFile.size)}
                        </strong>
                      </p>

                      {/* Yükleme durumu  */}
                      <div
                        style={{
                          marginTop: "0.5rem",
                        }}
                      >
                        {uploadFile.status === "pending" && (
                          <span style={{ color: "#999" }}>Bekliyor</span>
                        )}

                        {uploadFile.status === "uploading" && (
                          <div style={{ marginTop: "0.5rem" }}>
                            <div
                              style={{
                                width: "100%",
                                height: "8px",
                                backgroundColor: "#e0e0e0",
                                borderRadius: "4px",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${uploadFile.uploadProgress}%`,
                                  height: "100%",
                                  backgroundColor: "#667eea",
                                  transition: "width 0.3s",
                                }}
                              ></div>

                              <span
                                style={{ fontSize: "0.8rem", color: "667eea" }}
                              >
                                Yükleniyor
                              </span>
                            </div>
                          </div>
                        )}

                        {uploadFile.status === "success" && (
                          <div>
                            <span
                              style={{
                                color: "#4caf50",
                              }}
                            >
                              Yüklendi
                            </span>
                          </div>
                        )}

                        {uploadFile.status === "error" &&    <div>
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              Yüklenemedi {uploadFile.errorMessage}
                            </span>
                          </div>}
                      </div>
                    </div>
                  </div>

                  <div  style={{
                    position: 'absolute',
                    right:"9px",
                    top:"-1px"
                  }}>
                    <button style={{
                       backgroundColor: '#f44336',
                       color: 'white',
                       border:'none',
                       borderRadius : '50%',
                       width: '30px',
                       height: '30px',
                       cursor: 'pointer',
                       fontSize: '0.8rem',
                       display:'flex',
                       alignItems: 'center',
                       justifyContent:'center'
                    }}
                     onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFiles((prev) => prev.filter((item) => item.id != uploadFile.id))
                     }}
                    >x</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div>
<h4 style={{
    margin: '0 0 0.5rem 0',
    fontSize: '1rem',
    wordBreak: 'break-word'
}}>
    {uploadFile.file.name}qeqweqw
</h4>


</div> */
}
export default FileUpload;
