import React from 'react';
import { useAnalysis } from '../context/AnalysisContext';

export default function Upload() {
  const {
    setVideoFile, setPptFile,
    setAudioBlob, setTranscript, setFactCheck, setPostureData, setAudioAnalysis
  } = useAnalysis();

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Simulate audio extraction
      const audio = new File([file], file.name.replace(/\.[^/.]+$/, '.wav'), { type: 'audio/wav' });
      setAudioBlob(audio);
    }
  };

  const handlePptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPptFile(file);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Video and Presentation</h2>
      <input type="file" accept="video/*" onChange={handleVideoUpload} className="mb-4" />
      <br />
      <input type="file" accept=".ppt,.pptx" onChange={handlePptUpload} className="mb-4" />
      <br />
      <p className="text-sm text-gray-600">Video is required. Presentation is optional.</p>
    </div>
  );
}