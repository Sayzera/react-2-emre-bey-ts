import type React from "react";
import { useReducer } from "react";
import { Bell, X, CheckCircle, AlertCircle, Info } from "lucide-react";

// Tipler
type NotificationType = "success" | "error" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
}

type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id"> }
  | { type: "REMOVE_NOTIFICATION"; payload: number };

// Reducer Fonksiyon
const notificationReducer = (
  state: Notification[],
  action: NotificationAction
): Notification[] => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, { ...action.payload, id: Date.now() }];

    case "REMOVE_NOTIFICATION":
      return state.filter((notifcation) => notifcation.id != action.payload);

    default:
      return state;
  }
};

// Bildirim Listesi

interface NotificationProps {
  notification: Notification;
  onRemove: (id: number) => void;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  notification,
  onRemove,
}) => {
  const icons: Record<NotificationType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors: Record<NotificationType, string> = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div
      className={`${
        bgColors[notification.type]
      } border rounded-lg p-4 shadow-lg mb-3 flex items-start gap-3 animate-slide-in`}
    >
      {icons[notification.type]}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{notification.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
      </div>
      <button
        onClick={() => {
          onRemove(notification.id);
        }}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// Ana Bileşen
const NotifactionSystem: React.FC = () => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (
    type: NotificationType,
    title: string,
    message: string
  ): void => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { type, title, message },
    });
  };

  const removeNotification = (id: number): void => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      payload: id,
    });
  };

  /**
   * TODO: her 3 saniye bir eğer mevcutta bir bildirim varsa onu sırayla silmeli
   */

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Bildirim Yönetim Sistemi
            </h1>
          </div>
          <p className="text-gray-600">
            useReducer + TypeScript ile yapılmış bildirim sistemi - Her bildirim
            3 saniye sonra otomatik silinir
          </p>
        </div>

        {/* Butonlar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bildirim Ekle
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                addNotification(
                  "success",
                  "Başarılı!",
                  "İşlem başarıyla gerçekleşti."
                );
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              ✓ Başarı Bildirimi
            </button>
            <button
              onClick={() => {
                addNotification("error", "Hata!", "Bir şeyler yanlış gitti.");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              ✗ Hata Bildirimi
            </button>
            <button
              onClick={() => {
                addNotification("info", "Bilgi!", "Yeni bir güncelleme mevcut");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              ℹ Bilgi Bildirimi
            </button>
          </div>
        </div>

        {/* Bildirim Sayısı Sonra Yap Bunu */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 ">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">
              Aktif Bildirimler:
            </span>
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
              {notifications.length}
            </span>
          </div>
        </div>

        {/* Bildirim Listesi */}
        <div className="fixed top-8 right-8 w-96 max-w-full z-50">
          {notifications.map((notification) => (
            <NotificationComponent
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>

        {/* Bildirim geçmişi (açıklama amaçlı) */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Henüz bildirim yok</p>
            <p className="text-gray-400 text-sm mt-2">
              Yukarıdaki butonları kullanarak bildirim ekleyin
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotifactionSystem;
