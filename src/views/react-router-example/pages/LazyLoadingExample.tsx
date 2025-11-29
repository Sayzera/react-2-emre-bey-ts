import { lazy, Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

/**
 * LazyLoadingExample - Lazy Loading & Code Splitting Örneği
 * 
 * Bu örnek, React'te lazy loading ve code splitting kullanımını gösterir.
 * Büyük component'ler sadece gerektiğinde yüklenir.
 * 
 * Öğrenilenler:
 * - React.lazy() ile component lazy loading
 * - Suspense ile loading state yönetimi
 * - Code splitting ve bundle optimization
 * - Dynamic imports
 */

// Lazy loaded component'ler
const LazyHeavyComponent = lazy(() => import('../components/LazyHeavyComponent'))
const LazyChartComponent = lazy(() => import('../components/LazyChartComponent'))
const LazyTableComponent = lazy(() => import('../components/LazyTableComponent'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Yükleniyor...</p>
    </div>
  )
}

// Ana Sayfa
function LazyLoadingExample() {
  return (
    <div className="page-container">
      <h1>⚡ Lazy Loading & Code Splitting</h1>
      
      <div className="info-box">
        <h3>Lazy Loading Nedir?</h3>
        <p>
          Lazy loading, component'lerin sadece gerektiğinde yüklenmesini sağlar.
          Bu sayede ilk yükleme hızı artar ve bundle boyutu küçülür.
        </p>
        <p>
          <strong>Code Splitting:</strong> Kodun parçalara ayrılması ve sadece gerektiğinde yüklenmesi.
        </p>
      </div>

      <div className="lazy-examples">
        <section className="example-section">
          <h2>1. Suspense ile Lazy Component</h2>
          <p>Bu component, sadece görünür olduğunda yüklenir.</p>
          
          <Suspense fallback={<LoadingFallback />}>
            <LazyHeavyComponent />
          </Suspense>
        </section>

        <section className="example-section">
          <h2>2. Route-based Lazy Loading</h2>
          <p>Route'lar için lazy loading kullanımı:</p>
          
          <div className="button-group">
            <Link to="/lazy-loading/chart" className="btn btn-primary">
              📊 Chart Sayfası (Lazy)
            </Link>
            <Link to="/lazy-loading/table" className="btn btn-primary">
              📋 Table Sayfası (Lazy)
            </Link>
          </div>

          <div className="lazy-route-content">
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </div>
        </section>
      </div>

      <div className="info-box">
        <h3>Bu örnekte öğrenilenler:</h3>
        <ul>
          <li><code>React.lazy()</code> ile component lazy loading</li>
          <li><code>Suspense</code> component ile loading state</li>
          <li>Route-based code splitting</li>
          <li>Dynamic imports kullanımı</li>
          <li>Bundle optimization teknikleri</li>
          <li>Fallback UI oluşturma</li>
        </ul>
      </div>

      <div className="info-box warning">
        <h3>⚠️ Önemli Notlar:</h3>
        <ul>
          <li>Lazy loading sadece default export'lar için çalışır</li>
          <li>Suspense, lazy component'i sarmalı olmalıdır</li>
          <li>Fallback prop'u zorunludur</li>
          <li>Route-based lazy loading performansı önemli ölçüde artırır</li>
        </ul>
      </div>
    </div>
  )
}

// Chart Sayfası (Lazy loaded route)
export function LazyChartPage() {
  return (
    <div className="lazy-page">
      <h2>📊 Chart Sayfası</h2>
      <p>Bu sayfa lazy loading ile yüklenmiştir.</p>
      <Suspense fallback={<LoadingFallback />}>
        <LazyChartComponent />
      </Suspense>
    </div>
  )
}

// Table Sayfası (Lazy loaded route)
export function LazyTablePage() {
  return (
    <div className="lazy-page">
      <h2>📋 Table Sayfası</h2>
      <p>Bu sayfa lazy loading ile yüklenmiştir.</p>
      <Suspense fallback={<LoadingFallback />}>
        <LazyTableComponent />
      </Suspense>
    </div>
  )
}

export default LazyLoadingExample

