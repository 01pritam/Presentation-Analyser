import React, { useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

export default function FactCheckResults() {
  const {
    audioBlob,
    pptFile,
    transcript,
    setTranscript,
    factCheck,
    setFactCheck
  } = useAnalysis();

  useEffect(() => {
    const fetchFactCheck = async () => {
      if (!audioBlob || !pptFile) return; // ⬅️ wait for both audio AND ppt

      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('pptx', pptFile);

      const res = await fetch('https://factchecker-9056.onrender.com/factcheck', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setTranscript(data.transcript);
      setFactCheck(data.factCheck);
    };

    if (!factCheck) {
      fetchFactCheck();
    }
  }, [audioBlob, pptFile, factCheck, setFactCheck, setTranscript]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Fact Checking</h2>
      {factCheck ? (
        <>
          <div className="bg-white border rounded p-4 mb-4 shadow-sm">
            <h3 className="font-bold mb-2">Transcript:</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{transcript}</p>
          </div>
          <div className="bg-white border rounded p-4 shadow-sm">
            <h3 className="font-bold mb-2">Fact Check Results:</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">{factCheck}</pre>
          </div>
        </>
      ) : (
        <p>Waiting for audio and presentation to be uploaded...</p>
      )}
    </div>
  );
}