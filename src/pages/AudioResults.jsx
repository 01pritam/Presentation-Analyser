import React, { useEffect, useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { 
  Mic, 
  Volume2, 
  Timer, 
  TrendingUp, 
  Activity, 
  BarChart2, 
  AlertCircle, 
  Volume, 
  PauseCircle, 
  Music 
} from 'lucide-react';

export default function AudioResults() {
  const { audioBlob, audioAnalysis, setAudioAnalysis } = useAnalysis();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudioAnalysis = async () => {
      if (!audioBlob) {
        return;
      }

      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('file', audioBlob);

      try {
        const res = await fetch("https://2a38-34-106-20-83.ngrok-free.app/api/predict", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }

        const raw = await res.text();
        
        let data;
        try {
          data = JSON.parse(raw);
          setAudioAnalysis(data);
        } catch (parseError) {
          throw new Error(`Failed to parse response: ${parseError.message}`);
        }
      } catch (err) {
        console.error("Audio analysis request failed:", err);
        setError(err.message || "Failed to analyze audio");
      } finally {
        setLoading(false);
      }
    };

    if (!audioAnalysis && audioBlob) {
      fetchAudioAnalysis();
    }
  }, [audioBlob, audioAnalysis, setAudioAnalysis]);

  // Function to interpret confidence level
  const getConfidenceLevel = (score) => {
    if (score >= 0.8) return "Very High";
    if (score >= 0.6) return "High";
    if (score >= 0.4) return "Moderate";
    if (score >= 0.2) return "Low";
    return "Very Low";
  };

  // Function to interpret average pause
  const getPauseInterpretation = (avgPause) => {
    if (avgPause < 1) return "Very short pauses - speech may seem rushed";
    if (avgPause < 2) return "Short pauses - good for fast-paced delivery";
    if (avgPause < 3) return "Moderate pauses - balanced speech rhythm";
    if (avgPause < 4) return "Long pauses - deliberate, thoughtful delivery";
    return "Very long pauses - may indicate hesitation";
  };

  // Function to interpret pitch
  const getPitchInterpretation = (pitchMean) => {
    if (pitchMean < 800) return "Lower pitch - may convey authority";
    if (pitchMean < 1100) return "Moderate pitch - balanced and natural";
    if (pitchMean < 1400) return "Higher pitch - energetic, engaging";
    return "Very high pitch - highly expressive, excited";
  };

  // Function to get color based on confidence score
  const getConfidenceColor = (score) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.6) return "text-green-500";
    if (score >= 0.4) return "text-yellow-500";
    if (score >= 0.2) return "text-orange-500";
    return "text-red-500";
  };

  const renderConfidenceGauge = () => {
    if (!audioAnalysis?.confidence) return null;
    
    const confidentScore = audioAnalysis.confidence.confident;
    const percentage = Math.round(confidentScore * 100);
    const colorClass = getConfidenceColor(confidentScore);
    
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Volume2 className="mr-2 text-blue-600" size={20} />
          Speaking Confidence
        </h3>
        
        <div className="relative w-48 h-48 mb-4">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
          
          {/* Progress Circle with stroke-dasharray trick */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" 
              fill="transparent" 
              stroke={confidentScore >= 0.8 ? "#059669" : 
                      confidentScore >= 0.6 ? "#10B981" : 
                      confidentScore >= 0.4 ? "#FBBF24" : 
                      confidentScore >= 0.2 ? "#F97316" : "#EF4444"}
              strokeWidth="10" 
              strokeDasharray={`${percentage * 2.83} 283`} 
            />
          </svg>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${colorClass}`}>{percentage}%</span>
            <span className="text-gray-500 text-sm">Confidence</span>
          </div>
        </div>
        
        <div className="text-center">
          <span className={`text-lg font-semibold ${colorClass}`}>
            {getConfidenceLevel(confidentScore)}
          </span>
          <p className="text-gray-600 text-sm mt-1">
            {confidentScore >= 0.6 
              ? "Your vocal delivery conveys strong confidence" 
              : "Consider working on your vocal delivery to enhance confidence"}
          </p>
        </div>
      </div>
    );
  };

  const renderAudioMetrics = () => {
    if (!audioAnalysis?.features) return null;
    
    const { avg_pause, pitch_mean, speech_rate, volume_std } = audioAnalysis.features;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Activity className="mr-2 text-blue-600" size={20} />
          Voice Metrics
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Pause */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <PauseCircle className="text-blue-600 mr-2" size={20} />
                <h4 className="font-semibold text-gray-700">Average Pause</h4>
              </div>
              <span className="text-lg font-bold text-blue-700">{avg_pause.toFixed(2)}s</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(avg_pause / 5 * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{getPauseInterpretation(avg_pause)}</p>
            </div>
          </div>
          
          {/* Pitch Mean */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Music className="text-purple-600 mr-2" size={20} />
                <h4 className="font-semibold text-gray-700">Pitch Mean</h4>
              </div>
              <span className="text-lg font-bold text-purple-700">{pitch_mean.toFixed(0)} Hz</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(pitch_mean / 2000 * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{getPitchInterpretation(pitch_mean)}</p>
            </div>
          </div>
          
          {/* Volume Variation */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Volume className="text-green-600 mr-2" size={20} />
                <h4 className="font-semibold text-gray-700">Volume Variation</h4>
              </div>
              <span className="text-lg font-bold text-green-700">
                {(volume_std * 100).toFixed(2)}%
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(volume_std * 1000, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {volume_std < 0.01 ? "Very monotone delivery" :
                 volume_std < 0.02 ? "Moderate volume variation" :
                 "Good dynamic range in volume"}
              </p>
            </div>
          </div>
          
          {/* Speech Rate (if available) */}
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <TrendingUp className="text-amber-600 mr-2" size={20} />
                <h4 className="font-semibold text-gray-700">Speech Rate</h4>
              </div>
              <span className="text-lg font-bold text-amber-700">
                {speech_rate ? `${speech_rate.toFixed(1)} WPM` : "N/A"}
              </span>
            </div>
            <div className="mt-2">
              {speech_rate ? (
                <>
                  <div className="w-full bg-amber-200 rounded-full h-2.5">
                    <div 
                      className="bg-amber-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(speech_rate / 200 * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {speech_rate < 120 ? "Slower paced speech - good for emphasis" :
                     speech_rate < 160 ? "Moderate pace - clear and understandable" :
                     "Fast paced speech - energetic but may be harder to follow"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-600 mt-2">
                  Speech rate data not available for this analysis
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTechnicalDetails = () => {
    if (!audioAnalysis?.features) return null;
    
    // Filter out the features we're already showing in other sections
    const technicalFeatures = { ...audioAnalysis.features };
    delete technicalFeatures.avg_pause;
    delete technicalFeatures.pitch_mean;
    delete technicalFeatures.speech_rate;
    delete technicalFeatures.volume_std;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <BarChart2 className="mr-2 text-blue-600" size={20} />
            Technical Audio Features
          </h3>
          <button className="text-sm text-blue-600 hover:underline">
            Export Data
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b-2 border-gray-200 font-semibold text-gray-700">Feature</th>
                <th className="text-right py-2 px-4 border-b-2 border-gray-200 font-semibold text-gray-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(technicalFeatures).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200 text-gray-800">{key}</td>
                  <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-gray-800">
                    {typeof value === 'number' ? value.toFixed(4) : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Mic className="text-blue-600 mr-3" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Audio Analysis</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-center">
            Analyzing your audio for confidence metrics and vocal patterns...
            <br />
            <span className="text-sm text-gray-500">This may take a moment</span>
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Mic className="text-blue-600 mr-3" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Audio Analysis</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex flex-col items-center text-center">
            <AlertCircle className="text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-red-600 mb-2">Analysis Error</h3>
            <p className="text-gray-700 mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setAudioAnalysis(null)} // This will trigger a retry
            >
              Retry Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render waiting for upload state
  if (!audioBlob) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Mic className="text-blue-600 mr-3" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Audio Analysis</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Mic className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Audio Detected</h3>
          <p className="text-gray-600 mb-6">
            Please upload a video or audio file to analyze your speaking confidence and voice metrics.
          </p>
          <a 
            href="/upload" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Upload Page
          </a>
        </div>
      </div>
    );
  }

  // Main content rendering when data is available
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Mic className="text-blue-600 mr-3" size={24} />
        <h2 className="text-2xl font-semibold text-gray-800">Audio Analysis Results</h2>
      </div>
      
      {audioAnalysis ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Analysis Summary</h3>
              <span className="text-sm text-gray-500">
                File: {audioAnalysis.filename || "Uploaded Audio"}
              </span>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  {audioAnalysis.prediction === "Confident" ? (
                    <Volume2 className="text-blue-600" size={24} />
                  ) : (
                    <Volume className="text-yellow-600" size={24} />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800">
                    {audioAnalysis.prediction === "Confident" 
                      ? "Your speech shows confidence" 
                      : "Your speech could be more confident"}
                  </h3>
                  <p className="mt-2 text-blue-700">
                    {audioAnalysis.prediction === "Confident"
                      ? `Your vocal delivery is in the top ${Math.round(audioAnalysis.confidence.confident * 100)}% of confident speakers. You effectively use pitch, pauses, and volume variation to engage your audience.`
                      : `Your confidence level is at ${Math.round(audioAnalysis.confidence.confident * 100)}%. Consider working on your pitch variation and pausing technique to sound more authoritative.`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Confidence Gauge */}
            <div className="md:col-span-1">
              {renderConfidenceGauge()}
            </div>
            
            {/* Audio Metrics */}
            <div className="md:col-span-2">
              {renderAudioMetrics()}
            </div>
          </div>
          
          {/* Technical Data */}
          <div>
            {renderTechnicalDetails()}
          </div>
          
          {/* Recommendations Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              Recommendations for Improvement
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-gray-700 mb-2">Pause Technique</h4>
                <p className="text-gray-600 text-sm">
                  {audioAnalysis.features.avg_pause < 2 
                    ? "Try incorporating longer strategic pauses (2-3 seconds) before and after key points to give your audience time to process information."
                    : audioAnalysis.features.avg_pause > 4
                    ? "Your pauses are quite long. Try to be more fluid between points to maintain audience engagement."
                    : "Your pausing technique is well-balanced. Continue using pauses strategically to emphasize key points."
                  }
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-gray-700 mb-2">Pitch Variation</h4>
                <p className="text-gray-600 text-sm">
                  {audioAnalysis.features.pitch_std < 500 
                    ? "Your pitch is relatively monotone. Try to add more variation in your tone to emphasize important points and maintain listener interest."
                    : audioAnalysis.features.pitch_std > 1200
                    ? "Your pitch variation is very high. Consider moderating for some segments to project more authority."
                    : "Your pitch variation is engaging and dynamic, effectively maintaining audience interest."
                  }
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-gray-700 mb-2">Volume Control</h4>
                <p className="text-gray-600 text-sm">
                  {audioAnalysis.features.volume_std < 0.015
                    ? "Try varying your volume more to emphasize key points. Slightly louder delivery on important statements can increase audience retention."
                    : "Your volume variation is effective at highlighting key points. Continue using this technique to maintain engagement."
                  }
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <h4 className="font-semibold text-gray-700 mb-2">Overall Confidence</h4>
                <p className="text-gray-600 text-sm">
                  {audioAnalysis.confidence.confident < 0.6
                    ? "Practice speaking with more authority by standing tall, breathing deeply, and ending sentences with downward intonation rather than an upward questioning tone."
                    : "Your confident delivery is effective. Continue projecting this authority while ensuring you maintain a conversational connection with your audience."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Analyzing your audio or waiting for upload...</p>
      )}
    </div>
  );
}