import { useTheme } from "@/hooks/use-theme";

function ContextApiExampleView2() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      ContextApiExampleView2
      <div>
        <button className="border border-red" onClick={toggleTheme}>
          {theme}
        </button>
      </div>
    </div>
  );
}

export default ContextApiExampleView2;
