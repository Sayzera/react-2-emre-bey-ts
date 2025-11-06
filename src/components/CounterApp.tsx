import { useReducer } from 'react';
import './CounterApp.css';

// State tipi
interface CounterState {
  count: number;
  history: number[];
}

// Action tipleri
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'ADD'; payload: number }
  | { type: 'UNDO' };

// Initial state
const initialState: CounterState = {
  count: 0,
  history: [0],
};

// Reducer fonksiyonu
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'RESET':
      return {
        count: 0,
        history: [0],
      };
    case 'ADD':
      return {
        count: state.count + action.payload,
        history: [...state.history, state.count + action.payload],
      };
    case 'UNDO':
      if (state.history.length > 1) {
        const newHistory = state.history.slice(0, -1);
        return {
          count: newHistory[newHistory.length - 1],
          history: newHistory,
        };
      }
      return state;
    default:
      return state;
  }
};

const CounterApp = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const handleAddCustom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('value');
    if (value) {
      dispatch({ type: 'ADD', payload: Number(value) });
      e.currentTarget.reset();
    }
  };

  return (
    <div className="counter-app">
      <div className="counter-container">
        <h1>useReducer Sayaç Uygulaması</h1>
        
        <div className="counter-display">
          <div className="count-value">{state.count}</div>
          <div className="count-label">Mevcut Değer</div>
        </div>

        <div className="counter-buttons">
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>
            ➖ Azalt
          </button>
          <button onClick={() => dispatch({ type: 'RESET' })}>
            🔄 Sıfırla
          </button>
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>
            ➕ Artır
          </button>
        </div>

        <form onSubmit={handleAddCustom} className="custom-add-form">
          <input
            type="number"
            name="value"
            placeholder="Özel değer ekle"
            required
          />
          <button type="submit">Ekle</button>
        </form>

        <div className="history-section">
          <h3>Geçmiş ({state.history.length})</h3>
          <div className="history-buttons">
            <button 
              onClick={() => dispatch({ type: 'UNDO' })}
              disabled={state.history.length <= 1}
            >
              ⏪ Geri Al
            </button>
            <button onClick={() => dispatch({ type: 'RESET' })}>
              🗑️ Geçmişi Temizle
            </button>
          </div>
          <div className="history-list">
            {state.history.slice(-10).reverse().map((value, index) => (
              <span key={index} className="history-item">
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterApp;

