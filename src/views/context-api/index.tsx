import { ThemeProvider } from "@/context/theme-context";
import ContextApiExampleView1 from "./ContextApiExample-1";


function ContextApiExampleView() {
  return (
    <ThemeProvider>
      <ContextApiExampleView1 />
    </ThemeProvider>
  );
}

export default ContextApiExampleView;
