/**
 * ÖRNEK 2: Tek Bir Post Getirme
 * 
 * Bu örnekte:
 * - Query key'e parametre ekleme
 * - Dinamik query key kullanımı
 * - Input state ile query tetikleme
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPost } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function Example2SinglePost() {
  const [postId, setPostId] = useState<number>(1)

  // Query key'e parametre ekliyoruz: ['post', postId]
  // Bu sayede her farklı postId için ayrı cache oluşur
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId], // Parametreli query key
    queryFn: () => getPost(postId), // Parametreyi fonksiyona geçiriyoruz
    enabled: postId > 0, // Sadece geçerli ID varsa query çalışsın
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input') as HTMLInputElement
    const id = parseInt(input.value)
    if (id > 0 && id <= 100) {
      setPostId(id)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 2: Tek Bir Post Getirme</h2>
        <p className="text-muted-foreground mb-4">
          Query key'e parametre ekleyerek dinamik sorgular yapma.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="number"
          placeholder="Post ID (1-100)"
          min={1}
          max={100}
          defaultValue={1}
          className="max-w-xs"
        />
        <Button type="submit">Getir</Button>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <Spinner className="h-8 w-8" />
          <span className="ml-2">Yükleniyor...</span>
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Hata!</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Bir hata oluştu'}
          </AlertDescription>
        </Alert>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>
              Post ID: {data.id} | User ID: {data.userId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{data.body}</p>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Not:</strong> Query key <code className="bg-background px-1 rounded">['post', {postId}]</code> şeklinde.
          Her farklı postId için ayrı cache oluşur.
        </p>
      </div>
    </div>
  )
}
