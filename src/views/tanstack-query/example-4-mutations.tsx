/**
 * ÖRNEK 4: Mutations (POST/PUT/DELETE)
 * 
 * Bu örnekte:
 * - useMutation hook'unu kullanma
 * - POST, PUT, DELETE işlemleri
 * - Mutation sonrası cache'i güncelleme (invalidateQueries)
 * - Optimistic updates
 */

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, createPost, updatePost, deletePost, Post } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Plus, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export default function Example4Mutations() {
  const queryClient = useQueryClient()
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Posts listesini çekiyoruz
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  // CREATE Mutation
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Başarılı olduğunda posts listesini yeniden yükle
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsCreateDialogOpen(false)
    },
  })

  // UPDATE Mutation
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setEditingPost(null)
    },
  })

  // DELETE Mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPost: Omit<Post, 'id'> = {
      userId: parseInt(formData.get('userId') as string),
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    }
    createMutation.mutate(newPost)
  }

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

  const handleDelete = (id: number) => {
    if (confirm('Bu postu silmek istediğinize emin misiniz?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Örnek 4: Mutations (POST/PUT/DELETE)</h2>
          <p className="text-muted-foreground mb-4">
            useMutation hook'u ile veri oluşturma, güncelleme ve silme işlemleri.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Post Oluştur</DialogTitle>
              <DialogDescription>
                Yeni bir post oluşturmak için formu doldurun.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="userId">User ID</Label>
                <Input id="userId" name="userId" type="number" defaultValue={1} required />
              </div>
              <div>
                <Label htmlFor="title">Başlık</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="body">İçerik</Label>
                <Textarea id="body" name="body" required />
              </div>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    Oluşturuluyor...
                  </>
                ) : (
                  'Oluştur'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPost(post)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Düzenle
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingPost && (
        <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Postu Düzenle</DialogTitle>
              <DialogDescription>
                Post bilgilerini güncelleyin.
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

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          <strong>Not:</strong> Mutation işlemlerinden sonra{' '}
          <code className="bg-background px-1 rounded">invalidateQueries</code> ile cache'i
          yeniliyoruz. Bu sayede liste otomatik olarak güncellenir.
        </p>
      </div>
    </div>
  )
}
