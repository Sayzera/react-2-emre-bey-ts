/**
 * ÖRNEK 7: Dependent Queries (Bağımlı Sorgular)
 * 
 * Bu örnekte:
 * - Bir query'nin sonucuna bağlı olarak başka bir query çalıştırma
 * - enabled parametresi ile koşullu sorgu çalıştırma
 * - İlişkili verileri çekme (post -> comments)
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getPostComments, Post, Comment } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, MessageSquare } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Example7DependentQueries() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  // İlk query: Posts listesi
  const { data: posts, isLoading: postsLoading, isError: postsError, error: postsErrorData } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  // İkinci query: Seçili postun yorumları (bağımlı query)
  // Bu query sadece selectedPostId varsa çalışır
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    error: commentsErrorData,
  } = useQuery({
    queryKey: ['post', selectedPostId, 'comments'],
    queryFn: () => getPostComments(selectedPostId!),
    enabled: selectedPostId !== null, // Sadece post seçildiğinde çalışsın
  })

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 7: Dependent Queries (Bağımlı Sorgular)</h2>
        <p className="text-muted-foreground mb-4">
          Bir query'nin sonucuna bağlı olarak başka bir query çalıştırma.
          Post seçildiğinde o postun yorumları otomatik yüklenir.
        </p>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Postlar</TabsTrigger>
          <TabsTrigger value="comments" disabled={!selectedPostId}>
            Yorumlar {selectedPostId && `(Post #${selectedPostId})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {postsLoading && (
            <div className="flex items-center justify-center p-8">
              <Spinner className="h-8 w-8" />
              <span className="ml-2">Postlar yükleniyor...</span>
            </div>
          )}

          {postsError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hata!</AlertTitle>
              <AlertDescription>
                {postsErrorData instanceof Error ? postsErrorData.message : 'Bir hata oluştu'}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {posts?.slice(0, 10).map((post) => (
              <Card
                key={post.id}
                className={selectedPostId === post.id ? 'ring-2 ring-primary' : ''}
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>Post ID: {post.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.body}
                  </p>
                  <Button
                    variant={selectedPostId === post.id ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedPostId(post.id)
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Yorumları Göster
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          {!selectedPostId ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Post Seçin</AlertTitle>
              <AlertDescription>
                Yorumları görmek için önce bir post seçin.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {commentsLoading && (
                <div className="flex items-center justify-center p-8">
                  <Spinner className="h-8 w-8" />
                  <span className="ml-2">Yorumlar yükleniyor...</span>
                </div>
              )}

              {commentsError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Hata!</AlertTitle>
                  <AlertDescription>
                    {commentsErrorData instanceof Error
                      ? commentsErrorData.message
                      : 'Bir hata oluştu'}
                  </AlertDescription>
                </Alert>
              )}

              {comments && comments.length > 0 ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Post #{selectedPostId} Yorumları</AlertTitle>
                    <AlertDescription>
                      Toplam {comments.length} yorum bulundu.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardHeader>
                          <CardTitle className="text-base">{comment.name}</CardTitle>
                          <CardDescription>{comment.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{comment.body}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                comments && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Yorum Yok</AlertTitle>
                    <AlertDescription>
                      Bu post için henüz yorum bulunmuyor.
                    </AlertDescription>
                  </Alert>
                )
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm space-y-1">
          <strong>Bağımlı Query Nasıl Çalışır?</strong>
          <br />
          • İlk query (posts) her zaman çalışır
          <br />
          • İkinci query (comments) sadece{' '}
          <code className="bg-background px-1 rounded">enabled: selectedPostId !== null</code> olduğunda çalışır
          <br />
          • Post seçildiğinde comments query otomatik tetiklenir
          <br />
          • Her farklı postId için ayrı cache oluşur:{' '}
          <code className="bg-background px-1 rounded">['post', {selectedPostId}, 'comments']</code>
        </p>
      </div>
    </div>
  )
}
