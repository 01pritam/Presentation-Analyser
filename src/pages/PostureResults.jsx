import React, { useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

export default function PostureResults() {
  const { videoFile, postureData, setPostureData } = useAnalysis();

  useEffect(() => {
    const fetchPosture = async () => {
      if (!videoFile) return;
      const formData = new FormData();
      formData.append('video', videoFile);
      const res = await fetch('https://your-api/posture-analysis', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setPostureData(data);
    };

    if (!postureData) {
      fetchPosture();
    }
  }, [videoFile, postureData, setPostureData]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Posture Analysis</h2>
      {postureData ? (
        <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(postureData, null, 2)}</pre>
      ) : (
        <p>Loading posture analysis...</p>
      )}
    </div>
  );
}