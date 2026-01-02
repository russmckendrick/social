import { BentoGrid } from './components/BentoGrid';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <BentoGrid />
    </ThemeProvider>
  );
}

export default App;
