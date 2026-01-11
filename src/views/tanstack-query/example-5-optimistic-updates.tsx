/**
 * ÖRNEK 5: Optimistic Updates
 * 
 * Bu örnekte:
 * - Optimistic updates (önce UI'ı güncelle, sonra API'ye gönder)
 * - onMutate, onError, onSettled callback'leri
 * - Rollback mekanizması
 */

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, updatePost, Post } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Edit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export default function Example5OptimisticUpdates() {
  const queryClient = useQueryClient()
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  // Optimistic Update Mutation
  const updateMutation = useMutation({
    mutationFn: updatePost,
    // onMutate: Mutation başlamadan önce çalışır
    onMutate: async (newPost) => {
      // Önce mevcut sorguları iptal et (eski verilerin üzerine yazılmasını önle)
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Önceki veriyi sakla (rollback için)
      const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

      // Optimistically update (UI'ı hemen güncelle)
      queryClient.setQueryData<Post[]>(['posts'], (old) => {
        if (!old) return old
        return old.map((post) =>
          post.id === newPost.id ? newPost : post
        )
      })

      // Rollback için önceki veriyi döndür
      return { previousPosts }
    },
    // onError: Hata durumunda rollback yap
    onError: (err, newPost, context) => {
      // Önceki veriyi geri yükle
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    // onSettled: İşlem bittiğinde (başarılı veya hatalı) cache'i yenile
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
    },
  })

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingPost) return
    const formData = new FormData(e.currentTarget)
    const updatedPost: Post = {
      ...editingPost,
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    }
    updateMutation.mutate(updatedPost)
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 5: Optimistic Updates</h2>
        <p className="text-muted-foreground mb-4">
          Optimistic updates ile kullanıcı deneyimini iyileştirme. UI hemen güncellenir,
          API yanıtı beklenmez. Hata durumunda otomatik rollback yapılır.
        </p>
      </div>

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.slice(0, 9).map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>Post ID: {post.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.body}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPost(post)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Düzenle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingPost && (
        <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Postu Düzenle (Optimistic Update)</DialogTitle>
              <DialogDescription>
                Değişiklikler hemen görünecek, API yanıtı arka planda işlenecek.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Başlık</Label>
                <Input
                  id="edit-title"
                  name="title"
                  defaultValue={editingPost.title}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-body">İçerik</Label>
                <Textarea
                  id="edit-body"
                  name="body"
                  defaultValue={editingPost.body}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      Güncelleniyor...
                    </>
                  ) : (
                    'Güncelle'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPost(null)}
                >
                  İptal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Optimistic Update Nasıl Çalışır?</AlertTitle>
        <AlertDescription className="space-y-2 mt-2">
          <p>
            1. <strong>onMutate:</strong> Mutation başlamadan önce çalışır. UI hemen güncellenir.
          </p>
          <p>
            2. <strong>onError:</strong> Hata durumunda önceki veri geri yüklenir (rollback).
          </p>
          <p>
            3. <strong>onSettled:</strong> İşlem bittiğinde cache'i yeniler.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Bu sayede kullanıcı anında geri bildirim alır ve uygulama daha hızlı görünür.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
