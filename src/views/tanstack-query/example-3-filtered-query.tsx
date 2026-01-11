/**
 * ÖRNEK 3: Query Parametreleri ile Filtreleme
 * 
 * Bu örnekte:
 * - Query parametreleri ile filtreleme
 * - Query key'e birden fazla parametre ekleme
 * - Kullanıcı seçimine göre veri çekme
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers, getPostsByUserId } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function Example3FilteredQuery() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // Önce kullanıcıları çekiyoruz
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  // Seçili kullanıcının postlarını çekiyoruz
  const { data: posts, isLoading: postsLoading, isError, error } = useQuery({
    queryKey: ['posts', 'user', selectedUserId], // Çoklu parametreli query key
    queryFn: () => getPostsByUserId(selectedUserId!),
    enabled: selectedUserId !== null, // Sadece kullanıcı seçildiğinde çalışsın
  })

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 3: Query Parametreleri ile Filtreleme</h2>
        <p className="text-muted-foreground mb-4">
          Kullanıcı seçimine göre filtreli veri çekme. Query key'e birden fazla parametre ekleme.
        </p>
      </div>

      <div className="max-w-md">
        <label className="text-sm font-medium mb-2 block">Kullanıcı Seçin:</label>
        {usersLoading ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            <span className="text-sm">Kullanıcılar yükleniyor...</span>
          </div>
        ) : (
          <Select
            value={selectedUserId?.toString() || ''}
            onValueChange={(value) => setSelectedUserId(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bir kullanıcı seçin" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name} ({user.username})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {postsLoading && (
        <div className="flex items-center justify-center p-8">
          <Spinner className="h-8 w-8" />
          <span className="ml-2">Postlar yükleniyor...</span>
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

      {selectedUserId && posts && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {users?.find((u) => u.id === selectedUserId)?.name}'in Postları
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
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
              <strong>Toplam:</strong> {posts.length} post bulundu
            </p>
          </div>
        </div>
      )}

      {!selectedUserId && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Bilgi</AlertTitle>
          <AlertDescription>
            Postları görmek için yukarıdan bir kullanıcı seçin.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Not:</strong> Query key <code className="bg-background px-1 rounded">['posts', 'user', {selectedUserId}]</code> şeklinde.
          Her farklı kullanıcı için ayrı cache oluşur.
        </p>
      </div>
    </div>
  )
}
