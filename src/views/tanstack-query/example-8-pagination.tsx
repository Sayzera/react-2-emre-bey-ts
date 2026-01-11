/**
 * ÖRNEK 8: Pagination (Sayfalama)
 * 
 * Bu örnekte:
 * - Klasik pagination (sayfa numaraları ile)
 * - useQuery ile sayfa bazlı veri çekme
 * - Sayfa değiştirme butonları
 * - İlk/son sayfa, önceki/sonraki sayfa navigasyonu
 * - Toplam sayfa sayısı gösterimi
 */

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPostsPaginated } from '@/services/jsonplaceholder/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Example8Pagination() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  // Sayfa ve limit değiştiğinde query otomatik olarak yeniden çalışır
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching, // Yeni veri çekilirken true olur
  } = useQuery({
    queryKey: ['posts', 'paginated', page, limit], // Sayfa ve limit query key'e eklenir
    queryFn: () => getPostsPaginated(page, limit),
    placeholderData: (previousData) => previousData, // Sayfa değişirken önceki veriyi göster (daha iyi UX)
  })

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage)
      // Sayfa değiştiğinde scroll'u yukarı kaydır
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLimitChange = (newLimit: string) => {
    const limitNum = parseInt(newLimit)
    setLimit(limitNum)
    setPage(1) // Limit değiştiğinde ilk sayfaya dön
  }

  // Sayfa numaralarını hesapla (maksimum 5 sayfa göster)
  const getPageNumbers = () => {
    if (!data) return []
    const totalPages = data.totalPages
    const currentPage = page
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      // 7 veya daha az sayfa varsa hepsini göster
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // İlk sayfa
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Mevcut sayfanın etrafındaki sayfalar
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Son sayfa
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">Örnek 8: Pagination (Sayfalama)</h2>
          <p className="text-muted-foreground mb-4">
            Klasik pagination örneği. Sayfa numaraları ile navigasyon, sayfa başına
            gösterilecek kayıt sayısı seçimi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sayfa başına:</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      {data && (
        <>
          {/* Veri Bilgisi */}
          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm">
                <strong>Toplam:</strong> {data.total} post |{' '}
                <strong>Sayfa:</strong> {data.page} / {data.totalPages}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Gösterilen: {(data.page - 1) * data.limit + 1} -{' '}
                {Math.min(data.page * data.limit, data.total)} arası
              </p>
            </div>
            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner className="h-4 w-4" />
                <span>Güncelleniyor...</span>
              </div>
            )}
          </div>

          {/* Postlar */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.data.map((post) => (
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

          {/* Pagination Kontrolleri */}
          <div className="flex flex-col items-center gap-4 pt-6">
            {/* Sayfa Numaraları */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* İlk Sayfa */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={page === 1 || isLoading}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              {/* Önceki Sayfa */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </Button>

              {/* Sayfa Numaraları */}
              {getPageNumbers().map((pageNum, index) => {
                if (pageNum === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="px-2">
                      ...
                    </span>
                  )
                }
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(pageNum as number)}
                    disabled={isLoading}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              {/* Sonraki Sayfa */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === data.totalPages || isLoading}
              >
                Sonraki
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Son Sayfa */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(data.totalPages)}
                disabled={page === data.totalPages || isLoading}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Sayfa Bilgisi */}
            <p className="text-sm text-muted-foreground">
              Sayfa {data.page} / {data.totalPages}
            </p>
          </div>
        </>
      )}

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm space-y-1">
          <strong>Pagination Özellikleri:</strong>
          <br />
          • <code className="bg-background px-1 rounded">placeholderData</code> - Sayfa
          değişirken önceki veriyi gösterir (daha iyi UX)
          <br />
          • Query key'e sayfa ve limit eklenir:{' '}
          <code className="bg-background px-1 rounded">['posts', 'paginated', {page}, {limit}]</code>
          <br />
          • Her sayfa için ayrı cache oluşur
          <br />
          • <code className="bg-background px-1 rounded">isFetching</code> ile yeni veri çekilirken
          gösterge gösterilir
          <br />
          • Sayfa numaraları akıllıca gösterilir (çok sayfa varsa "..." ile kısaltılır)
        </p>
      </div>
    </div>
  )
}
