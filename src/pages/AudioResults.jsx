import React, { useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

export default function AudioResults() {
  const { audioBlob, audioAnalysis, setAudioAnalysis } = useAnalysis();

  useEffect(() => {
    console.log("useEffect triggered in AudioResults", audioBlob, audioAnalysis);

    const fetchAudioAnalysis = async () => {
      if (!audioBlob) {
        console.warn("No audioBlob available yet.");
        return;
      }

      console.log("AudioBlob Info:");
      console.log("Name:", audioBlob?.name || 'Unnamed Blob');
      console.log("Type:", audioBlob?.type);
      console.log("Size (bytes):", audioBlob?.size);

      const formData = new FormData();
      formData.append('file', audioBlob);

      console.log("FormData content:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        const res = await fetch("https://4780-35-245-151-123.ngrok-free.app/api/predict", {
          method: "POST",
          body: formData,
        });

        console.log("Response Status:", res.status);
        const contentType = res.headers.get("content-type");
        console.log("Response Content-Type:", contentType);

        const raw = await res.text(); // always read as text first
        console.log("Raw Response Text:", raw);

        let data;
        try {
          data = JSON.parse(raw);
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          return;
        }

        console.log("Parsed Audio Analysis Response:", data);
        setAudioAnalysis(data);
      } catch (err) {
        console.error("Audio analysis request failed:", err);
      }
    };

    if (!audioAnalysis) {
      fetchAudioAnalysis();
    } else {
      console.log("Audio analysis already available:", audioAnalysis);
    }
  }, [audioBlob, audioAnalysis, setAudioAnalysis]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Audio Analysis</h2>
      {audioAnalysis ? (
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
          {JSON.stringify(audioAnalysis, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-600">Loading audio analysis or waiting for audio upload...</p>
      )}
    </div>
  );
}