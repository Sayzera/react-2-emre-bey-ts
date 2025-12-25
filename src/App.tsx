// import FoodApp from "./views/food-app"
// import ReducerHook from "./views/useReducer"
// import SeperReducerExample from "./views/useReducer/sepet-reducer-example"
// import MultipleForm from "./views/multiple-form"
// import NotifactionSystem from "./views/notification-managment-system"

import ContextApiExampleView from "./views/context-api-2";
import ReactRouterExample from "./views/react-router-example";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      {/* <FoodApp /> */}
      {/* <ReducerHook /> */}
      {/* <SeperReducerExample /> */}
      {/* <NotifactionSystem /> */}
      {/* <MultipleForm /> */}
      {/* <ReactRouterExample /> */}
      <ContextApiExampleView />
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
