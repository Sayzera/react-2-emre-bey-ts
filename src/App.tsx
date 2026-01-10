// import FoodApp from "./views/food-app"
// import ReducerHook from "./views/useReducer"
// import SeperReducerExample from "./views/useReducer/sepet-reducer-example"
// import MultipleForm from "./views/multiple-form"
// import NotifactionSystem from "./views/notification-managment-system"

// import ContextApiExampleView from "./views/context-api-2";
// import ReactRouterExample from "./views/react-router-example";
// import ErrorHandlingExample from "./views/error-handling-example";
import ReactHookFormExample, { FileUploadExample } from "./views/react-hook-form-example";
import { Toaster } from "@/components/ui/sonner";
import { ErrorProvider } from "@/context/error-provider";
import { ErrorBoundary } from "@/components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <Toaster />
        {/* <FoodApp /> */}
        {/* <ReducerHook /> */}
        {/* <SeperReducerExample /> */}
        {/* <NotifactionSystem /> */}
        {/* <MultipleForm /> */}
        {/* <ReactRouterExample /> */}
        {/* <ContextApiExampleView /> */}
        {/* <ErrorHandlingExample /> */}
        {/* <ReactHookFormExample /> */}
        {/* Dosya İşlemleri Örneği - Yeni! */}
        <FileUploadExample />
      </ErrorProvider>
    </ErrorBoundary>
  );
}

export default App;

/**
 * Stok Ödev 10-28-2025
 *
 * Apikey için 5-6 adet kullanalım bunun sonunda olan tüm verileri firebase atalım ve sonrasında veri kaynağı olarak firebase'i kullanalım.
 *
 */
