/**
 * ÖRNEK 6: Infinite Queries (Sonsuz Scroll)
 * 
 * Bu örnekte:
 * - useInfiniteQuery hook'unu kullanma
 * - Sayfalama (pagination) ile veri çekme
 * - fetchNextPage ile sonraki sayfayı yükleme
 * - hasNextPage ve isFetchingNextPage durumları
 */

import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts, Post } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useRef, useEffect } from 'react'

// Sayfalama için API fonksiyonu
const getPostsPaginated = async ({ pageParam = 1 }): Promise<{
  data: Post[]
  nextPage: number | null
}> => {
  const limit = 10 // Her sayfada 10 post
  const start = (pageParam - 1) * limit
  const end = start + limit

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Posts yüklenemedi')
  }
  const allPosts: Post[] = await response.json()

  // Sayfalama yapıyoruz
  const paginatedPosts = allPosts.slice(start, end)
  const nextPage = end < allPosts.length ? pageParam + 1 : null

  return {
    data: paginatedPosts,
    nextPage,
  }
}

export default function Example6InfiniteQuery() {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: getPostsPaginated,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage, // Sonraki sayfa parametresi
  })

  // Intersection Observer ile otomatik yükleme
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Tüm sayfalardaki postları birleştir
  const allPosts = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Örnek 6: Infinite Queries (Sonsuz Scroll)</h2>
        <p className="text-muted-foreground mb-4">
          useInfiniteQuery ile sayfalama ve sonsuz scroll örneği. Sayfa sonuna geldiğinizde
          otomatik olarak yeni veriler yüklenir.
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
        {allPosts.map((post) => (
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

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <Spinner className="h-6 w-6" />
            <span>Daha fazla yükleniyor...</span>
          </div>
        )}
        {!hasNextPage && allPosts.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tüm postlar yüklendi</AlertTitle>
            <AlertDescription>
              Toplam {allPosts.length} post gösteriliyor.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Manuel Yükleme Butonu (Alternatif) */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center">
          <Button onClick={() => fetchNextPage()} variant="outline">
            Daha Fazla Yükle
          </Button>
        </div>
      )}

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm space-y-1">
          <strong>Özellikler:</strong>
          <br />
          • <code className="bg-background px-1 rounded">useInfiniteQuery</code> ile sayfalama
          <br />
          • <code className="bg-background px-1 rounded">fetchNextPage()</code> ile sonraki sayfa
          <br />
          • <code className="bg-background px-1 rounded">hasNextPage</code> ile daha fazla veri kontrolü
          <br />
          • Intersection Observer ile otomatik yükleme
        </p>
      </div>
    </div>
  )
}
