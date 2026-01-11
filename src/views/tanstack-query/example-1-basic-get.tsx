/**
 * ÖRNEK 1: Basit GET İsteği
 * 
 * Bu örnekte TanStack Query'nin en temel kullanımını göreceğiz:
 * - useQuery hook'unu kullanma
 * - Loading, error ve data durumlarını yönetme
 * - Query key kullanımı
 */

import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function Example1BasicGet() {
  // useQuery hook'u ile veri çekme
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'], // Query key - cache için benzersiz anahtar
    queryFn: getPosts, // Veri çekme fonksiyonu
  })

  // Loading durumu
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="h-8 w-8" />
        <span className="ml-2">Yükleniyor...</span>
      </div>
    )
  }

  // Error durumu
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Hata!</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Bir hata oluştu'}
        </AlertDescription>
      </Alert>
    )
  }

  // Başarılı durum - veriler geldi
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 1: Basit GET İsteği</h2>
        <p className="text-muted-foreground mb-4">
          Tüm postları listeleyen basit bir örnek. useQuery hook'u ile veri çekme.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 6).map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>Post ID: {post.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Toplam:</strong> {data?.length} post yüklendi (ilk 6 tanesi gösteriliyor)
        </p>
      </div>
    </div>
  )
}
