import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";


function ThemeExample() {
    const {toggleTheme, theme} = useTheme();
  return (
    <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Tema Yönetimi Örneği</CardTitle>
        <CardDescription>
          Context API ile dark/light mode yönetimi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">
          {theme === "light" ? "☀️" : "🌙"}
          </div>
          <Badge  className="text-lg" variant={theme === 'light' ? 'default' : 'secondary'}>
            {
                theme === 'light' ? 'Açık Tema' : 'Koyu Tema'
            }
          </Badge>
        </div>

        <div className="flex justify-center">
          <Button  size="lg" onClick={toggleTheme}>
            Temayı Değiştir
          </Button>
        </div>

        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Bu tema ayarı tüm uygulama genelinde geçerlidir. Herhangi bir
            bileşenden tema değiştirilebilir ve tüm bileşenler otomatik
            olarak güncellenir.
          </p>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Kullanım Senaryoları</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>
            🎨 <strong>Kullanıcı Tercihleri:</strong> Tema, dil, bölge ayarları
          </p>
          <p>
            👤 <strong>Kimlik Doğrulama:</strong> Kullanıcı giriş durumu
          </p>
          <p>
            🛒 <strong>E-Ticaret:</strong> Sepet, favoriler, sipariş durumu
          </p>
          <p>
            📊 <strong>Dashboard:</strong> Filtreler, görünüm ayarları
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default ThemeExample