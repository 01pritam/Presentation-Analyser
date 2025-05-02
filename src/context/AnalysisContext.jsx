import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext();

export function useAnalysis() {
  return useContext(AnalysisContext);
}

export function AnalysisProvider({ children }) {
  const [videoFile, setVideoFile] = useState(null);
  const [pptFile, setPptFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [factCheck, setFactCheck] = useState(null);
  const [postureData, setPostureData] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);

  return (
    <AnalysisContext.Provider value={{
      videoFile, setVideoFile,
      pptFile, setPptFile,
      audioBlob, setAudioBlob,
      transcript, setTranscript,
      factCheck, setFactCheck,
      postureData, setPostureData,
      audioAnalysis, setAudioAnalysis
    }}>
      {children}
    </AnalysisContext.Provider>
  );
}