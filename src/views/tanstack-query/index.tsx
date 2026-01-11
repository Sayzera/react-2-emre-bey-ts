/**
 * TanStack Query Örnekleri Ana Sayfası
 * 
 * Bu sayfada TanStack Query'nin temel özelliklerini gösteren
 * adım adım örnekler bulunmaktadır.
 * 
 * Öğrenme Sırası:
 * 1. Basit GET İsteği - useQuery hook'unun temel kullanımı
 * 2. Tek Bir Post Getirme - Query key'e parametre ekleme
 * 3. Query Parametreleri ile Filtreleme - Çoklu parametreli query key
 * 4. Mutations - POST/PUT/DELETE işlemleri
 * 5. Optimistic Updates - UI'ı önce güncelleme
 * 6. Infinite Queries - Sayfalama ve sonsuz scroll
 * 7. Dependent Queries - Bağımlı sorgular
 * 8. Pagination - Klasik sayfalama (sayfa numaraları ile)
 */

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Example1BasicGet from './example-1-basic-get'
import Example2SinglePost from './example-2-single-post'
import Example3FilteredQuery from './example-3-filtered-query'
import Example4Mutations from './example-4-mutations'
import Example5OptimisticUpdates from './example-5-optimistic-updates'
import Example6InfiniteQuery from './example-6-infinite-query'
import Example7DependentQueries from './example-7-dependent-queries'
import Example8Pagination from './example-8-pagination'

export default function TanStackQueryExamples() {
  const [activeTab, setActiveTab] = useState('example-1')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">TanStack Query Örnekleri</h1>
          <p className="text-lg text-muted-foreground">
            React Query (TanStack Query) ile veri yönetimi örnekleri. Basit örneklerden
            ileri seviye örneklere doğru ilerleyin.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="example-1">Örnek 1</TabsTrigger>
            <TabsTrigger value="example-2">Örnek 2</TabsTrigger>
            <TabsTrigger value="example-3">Örnek 3</TabsTrigger>
            <TabsTrigger value="example-4">Örnek 4</TabsTrigger>
            <TabsTrigger value="example-5">Örnek 5</TabsTrigger>
            <TabsTrigger value="example-6">Örnek 6</TabsTrigger>
            <TabsTrigger value="example-7">Örnek 7</TabsTrigger>
            <TabsTrigger value="example-8">Örnek 8</TabsTrigger>
          </TabsList>

          <TabsContent value="example-1">
            <Example1BasicGet />
          </TabsContent>

          <TabsContent value="example-2">
            <Example2SinglePost />
          </TabsContent>

          <TabsContent value="example-3">
            <Example3FilteredQuery />
          </TabsContent>

          <TabsContent value="example-4">
            <Example4Mutations />
          </TabsContent>

          <TabsContent value="example-5">
            <Example5OptimisticUpdates />
          </TabsContent>

          <TabsContent value="example-6">
            <Example6InfiniteQuery />
          </TabsContent>

          <TabsContent value="example-7">
            <Example7DependentQueries />
          </TabsContent>

          <TabsContent value="example-8">
            <Example8Pagination />
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Öğrenme Yolu</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              <strong>Örnek 1:</strong> useQuery hook'unun temel kullanımı, loading ve error durumları
            </li>
            <li>
              <strong>Örnek 2:</strong> Query key'e parametre ekleme, dinamik sorgular
            </li>
            <li>
              <strong>Örnek 3:</strong> Çoklu parametreli query key, filtreleme
            </li>
            <li>
              <strong>Örnek 4:</strong> useMutation hook'u, POST/PUT/DELETE işlemleri, cache güncelleme
            </li>
            <li>
              <strong>Örnek 5:</strong> Optimistic updates, onMutate, onError callback'leri
            </li>
            <li>
              <strong>Örnek 6:</strong> useInfiniteQuery, sayfalama, sonsuz scroll
            </li>
            <li>
              <strong>Örnek 7:</strong> Bağımlı sorgular, enabled parametresi
            </li>
            <li>
              <strong>Örnek 8:</strong> Klasik pagination, sayfa numaraları ile navigasyon, keepPreviousData
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
