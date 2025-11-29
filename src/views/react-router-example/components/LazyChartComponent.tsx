/**
 * LazyChartComponent - Chart Component (Lazy Loaded)
 */

function LazyChartComponent() {
  const data = [10, 20, 30, 40, 50, 60, 70]
  
  return (
    <div className="chart-component">
      <h3>📊 Chart Component</h3>
      <div className="chart-visualization">
        {data.map((value, index) => (
          <div 
            key={index} 
            className="chart-bar"
            style={{ height: `${value}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <p className="hint">Bu component lazy loading ile yüklenmiştir.</p>
    </div>
  )
}

export default LazyChartComponent

