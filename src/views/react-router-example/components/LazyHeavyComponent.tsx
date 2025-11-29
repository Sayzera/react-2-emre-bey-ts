/**
 * LazyHeavyComponent - Lazy Loading Örneği
 * 
 * Bu component, lazy loading ile yüklenir.
 * Gerçek uygulamada bu büyük bir component olabilir.
 */

function LazyHeavyComponent() {
  return (
    <div className="heavy-component">
      <h3>🔄 Lazy Yüklenen Component</h3>
      <p>Bu component, <code>React.lazy()</code> ile yüklenmiştir.</p>
      <div className="card">
        <p>
          Bu component sadece gerektiğinde yüklenir ve bundle'a dahil edilmez.
          Bu sayede ilk yükleme hızı artar.
        </p>
      </div>
    </div>
  )
}

export default LazyHeavyComponent

