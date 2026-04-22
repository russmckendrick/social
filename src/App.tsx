import { BentoGrid } from './components/BentoGrid';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BentoGrid />
    </ThemeProvider>
  );
}

export default App;
