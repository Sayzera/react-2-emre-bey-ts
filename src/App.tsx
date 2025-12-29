// import FoodApp from "./views/food-app"
// import ReducerHook from "./views/useReducer"
// import SeperReducerExample from "./views/useReducer/sepet-reducer-example"
// import MultipleForm from "./views/multiple-form"
// import NotifactionSystem from "./views/notification-managment-system"

import { ErrorBoundary } from "./components/error-boundary";
import { ErrorThrower } from "./components/error-thrower";
import { ErrorProvider } from "./context/error-provider";
// import ErrorHandlingExample from "./views/error-handling/ErrorHandlingExample";
import I18nExample from "./views/i18n-example";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <ErrorBoundary>
        <ErrorProvider>
          <ErrorThrower />
          <Toaster />
          {/* <FoodApp /> */}
          {/* <ReducerHook /> */}
          {/* <SeperReducerExample /> */}
          {/* <NotifactionSystem /> */}
          {/* <MultipleForm /> */}
          {/* <ReactRouterExample /> */}
          {/* <ContextApiExampleView /> */}
          {/* <ErrorHandlingExample /> */}
          <I18nExample />
        </ErrorProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;

/**
 * Stok Ödev 10-28-2025
 *
 * Apikey için 5-6 adet kullanalım bunun sonunda olan tüm verileri firebase atalım ve sonrasında veri kaynağı olarak firebase'i kullanalım.
 *
 */
