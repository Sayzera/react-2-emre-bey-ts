


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";

function UserExample() {
    const {login, logout,updateUser, user} = useUser()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");



    const handleLogin = () => {
        login(name, email)
    }
  return (
    <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Yönetimi Örneği</CardTitle>
        <CardDescription>
          Context API ile kullanıcı bilgilerini global olarak yönetme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-semibold mb-2">Giriş Yapıldı:</h3>
              <div className="space-y-2">
                <p>
                  <Badge variant="secondary">ID:</Badge> {user.id}
                </p>
                <p>
                  <Badge variant="secondary">İsim:</Badge> {user.name}
                </p>
                <p>
                  <Badge variant="secondary">Email:</Badge> {user.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={logout} variant="destructive">
                Çıkış Yap
              </Button>
              <Button
                onClick={() => updateUser({ name: "Güncellenmiş İsim", email: 'deneme@gmail.com' })}
                variant="outline"
              >
                İsmi Güncelle
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="İsim"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleLogin} disabled={!name || !email}>
              Giriş Yap
            </Button>
          </div>
        )}
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Nasıl Çalışıyor?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            • <strong>UserContext</strong> kullanıcı bilgilerini saklar
          </p>
          <p>
            • <strong>UserProvider</strong> tüm uygulamayı sarar ve state'i
            yönetir
          </p>
          <p>
            • <strong>useUser</strong> hook'u ile herhangi bir bileşenden
            kullanıcı bilgilerine erişilir
          </p>
          <p>
            • Props drilling olmadan derin bileşenlerde bile kullanıcı
            bilgilerine erişilebilir
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default UserExample