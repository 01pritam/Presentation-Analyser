import { AnalysisProvider } from './context/AnalysisContext'; // make sure the path is correct
import Upload from './pages/Upload';
import AudioResults from './pages/AudioResults';
import FactCheckResults from './pages/FactCheckResults';
import PostureResults from './pages/PostureResults';

function App() {
  return (
    <AnalysisProvider>
      <Upload />
      <AudioResults />
      <FactCheckResults />
      <PostureResults />
    </AnalysisProvider>
  );
}

export default App;