import { useTheme } from "@/hooks/use-theme";
import React from "react";
import ContextApiExampleView2 from "./ContextApiExample-2";

function ContextApiExampleView1() {
  const { theme, toggleTheme} = useTheme();

  return (
    <div>
      ContextApiExampleView
      <div>
        <button className="border border-red" onClick={toggleTheme}>
          Tıkla {theme}
        </button>
      </div>

      <ContextApiExampleView2 />
    </div>
  );
}

export default ContextApiExampleView1;
