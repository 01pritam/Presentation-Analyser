import { useState, useEffect } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { Video } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  Check, 
  X, 
  TrendingUp, 
  ChevronDown, 
  Info, 
  BarChart2, 
  Award 
} from 'lucide-react';

export default function PostureResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { videoFile } = useAnalysis();

  useEffect(() => {
    const analyzePresentationData = async () => {
      // If no video file, use mock data for development
      if (!videoFile) {
        console.log("Not video data fetched ")
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('video', videoFile);

        const response = await fetch('http://localhost:3003/api/analyze', {
          method: 'POST',
          body: formData,
        });
        console.log("response",response);
        if (!response.ok) {
          throw new Error(await response.text());
        }

        const analysisData = await response.json();
        console.log('[POSTURE ANALYSIS DATA]', analysisData);
        
        // Generate real chart data from analysis
        const chartData = generateChartData(analysisData);
        setData({ ...analysisData, chartData });
        localStorage.setItem('postureAnalysisData', JSON.stringify(response));
      } catch (err) {
        console.error('[ERROR]', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    analyzePresentationData();
  }, [videoFile]);

  const generateChartData = (analysisData) => {
    // Implementation would depend on your actual data structure
    // This is a placeholder that should be replaced with actual implementation
    return [];
  };

  const parseRemarks = (text, evaluatorText) => {
    const sections = {
      overall: '',
      strengths: [],
      improvements: [],
      tips: [],
      evaluatorOverview: '',
      evaluatorStrengths: [],
      evaluatorConcerns: []
    };
    
    // Parse main remarks
    let currentSection = 'overall';
    const lines = text?.split('\n') || [];
    
    for (const line of lines) {
      if (line.includes('*Overall Assessment:*')) {
        currentSection = 'overall';
        sections.overall = line.replace('*Overall Assessment:*', '').trim();
      } else if (line.includes('*Strengths:')) {
        currentSection = 'strengths';
      } else if (line.includes('*Areas for Improvement:')) {
        currentSection = 'improvements';
      } else if (line.includes('*Actionable Tips:')) {
        currentSection = 'tips';
      } else if (line.trim() && line.match(/^\d*\.\s*\**/) && currentSection !== 'overall') {
        const content = line.replace(/^\d*\.\s*\**/, '').replace(/\*+$/, '').trim();
        sections[currentSection].push(content);
      }
    }
  
    // Parse evaluator remarks
    if (evaluatorText) {
      const evalLines = evaluatorText.split('\n');
      let currentEvalSection = '';
  
      for (const line of evalLines) {
        if (line.includes('General Overview')) {
          currentEvalSection = 'evaluatorOverview';
        } else if (line.includes('Perceived Strengths')) {
          currentEvalSection = 'evaluatorStrengths';
        } else if (line.includes('Professional Concerns')) {
          currentEvalSection = 'evaluatorConcerns';
        } else if (line.trim() && !line.startsWith('*')) {
          if (currentEvalSection === 'evaluatorOverview' && !sections.evaluatorOverview) {
            sections.evaluatorOverview = line.trim();
          } else if (line.match(/^\d*\.\s*\**/)) {
            const content = line.replace(/^\d*\.\s*\**/, '').replace(/\*+$/, '').trim();
            if (currentEvalSection === 'evaluatorStrengths') {
              sections.evaluatorStrengths.push(content);
            } else if (currentEvalSection === 'evaluatorConcerns') {
              sections.evaluatorConcerns.push(content);
            }
          }
        }
      }
    }
    
    return sections;
  };
const computeOverallScore = () => {
    if (!data || !data.analysis || !data.analysis.averages) return null;
    const metrics = Object.entries(data.analysis.averages).filter(
      ([key]) => key !== 'smoothed'
    );
    const total = metrics.reduce((sum, [key, value]) => sum + value, 0);
    return (total / metrics.length).toFixed(1);
  };

  const overallScore = computeOverallScore();
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Average';
    if (score >= 40) return 'Below Average';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {

    return (
      <div className="flex items-center justify-center h-screen">
        
<div className="flex items-center mb-6">
  <Video className="text-blue-600 mr-3" size={24} />
  <h2 className="text-2xl font-semibold text-gray-800">Video Analysis</h2>
</div>
      </div>
    );
  }
  console.log("data ",data);
  const parsedRemarks = parseRemarks(data.remarks);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart2 className="mr-2" />
            Posture Analysis Dashboard
          </h1>
          <div className="flex items-center">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center">
              <span className="mr-2">Session Duration:</span>
              <span className="font-bold">{data.analysis.duration}s</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="rounded-full bg-blue-50 p-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">OVERALL SCORE</h2>
                <div className="flex items-baseline">
                <p className={`text-5xl font-bold ${getScoreColor(parseFloat(overallScore))}`}>
                  {overallScore}
                </p>
                <p className="ml-2 text-gray-500">/ 100</p>
              </div>
              </div>
            </div>

            {/* <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                <TrendingUp className={parseFloat(data.analysis.trend) > 0 ? "text-green-500" : "text-red-500"} />
                <div className="ml-2">
                  <p className="text-xs text-gray-500">TREND</p>
                  <p className={`font-semibold ${parseFloat(data.analysis.trend) > 0 ? "text-green-600" : "text-red-600"}`}>
                    {parseFloat(data.analysis.trend) > 0 ? "+" : ""}{data.analysis.trend}%
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                <Info className="text-blue-500" />
                <div className="ml-2">
                  <p className="text-xs text-gray-500">CONFIDENCE DIPS</p>
                  <p className="font-semibold text-blue-600">{data.analysis.dips.confidence}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">RATING</p>
                <p className="font-semibold text-gray-800">{formatScoreLabel(parseFloat(data.score))}</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Detailed Metrics
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Recommendations
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
              <p className="text-gray-700">{parsedRemarks.overall}</p>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Check className="text-green-500 mr-2" />
                  Strengths
                </h2>
                <ul className="space-y-3">
                  {parsedRemarks.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-2">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-gray-700">{strength}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <ChevronDown className="text-yellow-500 mr-2" />
                  Areas for Improvement
                </h2>
                <ul className="space-y-3">
                  {parsedRemarks.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mt-1 mr-2">
                        <ChevronDown className="h-3 w-3 text-yellow-600" />
                      </div>
                      <p className="text-gray-700">{improvement}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Performance Over Time</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: 'Time (seconds)', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value.toFixed(1)}`, 'Score']} />
                    <Legend />
                    <Area type="monotone" dataKey="confidence" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConfidence)" name="Confidence" />
                    <Area type="monotone" dataKey="shoulder" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.3} name="Shoulder Alignment" />
                    <Area type="monotone" dataKey="spine" stroke="#10b981" fill="#d1fae5" fillOpacity={0.3} name="Spine Angle" />
                    <Area type="monotone" dataKey="head" stroke="#f59e0b" fill="#fef3c7" fillOpacity={0.3} name="Head Position" />
                    <Area type="monotone" dataKey="arms" stroke="#8b5cf6" fill="#ede9fe" fillOpacity={0.3} name="Arm Openness" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div> */}
          </>
        )}

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.analysis.averages).map(([key, value]) => {
              // Skip the smoothed metric as it's a computed value
              if (key === 'smoothed') return null;
              
              // Format the key for display
              const formattedKey = key.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              
              // Get appropriate color based on the score
              let scoreColor = getScoreColor(value);
              
              // Special case for shoulder alignment which uses a different scale
              if (key === 'shoulder_alignment') {
                scoreColor = value > 60 ? 'text-green-600' : (value > 30 ? 'text-yellow-600' : 'text-red-600');
              }
              
              return (
                <div key={key} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{formattedKey}</h3>
                  <div className="flex items-center mb-4">
                    <div className={`text-3xl font-bold ${scoreColor}`}>{value}</div>
                    <div className="ml-2 text-sm text-gray-500">/ 100</div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        value >= 90 ? 'bg-green-600' : 
                        value >= 75 ? 'bg-yellow-500' : 
                        'bg-red-600'
                      }`} 
                      style={{ width: `${Math.min(100, value)}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    {key === 'confidence' && (
                      <>
                        <p className="font-medium mb-1">Insights:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Minimum confidence: <span className="font-medium">{data.analysis.minimums.confidence}</span></li>
                          <li>Confidence dips: <span className="font-medium">{data.analysis.dips.confidence}</span></li>
                        </ul>
                      </>
                    )}
                    {/* {key === 'shoulder_alignment' && (
                      <p>Shoulder alignment is significantly below optimal levels. Focus on exercises to strengthen upper back muscles.</p>
                    )}
                    {key === 'head_position' && (
                      <p>Head position is excellent, showing proper alignment throughout the presentation.</p>
                    )}
                    {key === 'spine_angle' && (
                      <p>Spine angle is excellent, demonstrating strong core engagement and proper posture.</p>
                    )}
                    {key === 'arm_openness' && (
                      <p>Good arm openness indicating confident and engaging body language.</p>
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        )}

{activeTab === 'recommendations' && (
  <div className="space-y-8">
    {/* Score Category and Overall Assessment */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Award className="mr-2 text-blue-600" />
        Final Score Category: Good
      </h2>
      <p className="text-gray-700 leading-relaxed">
        You've shown significant improvement in your presentation style, particularly in maintaining consistent posture and exhibiting more confidence while speaking.
      </p>
    </div>

    {/* Key Metrics Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Confidence Score</h3>
        <p className="text-3xl font-bold text-blue-600">8.6</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Body Language Score</h3>
        <p className="text-3xl font-bold text-green-600">9.1</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Overall Progress</h3>
        <p className="text-3xl font-bold text-purple-600">+18%</p>
      </div>
    </div>

    {/* Evaluator's Analysis */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Professional Evaluation</h2>
      <div className="prose max-w-none">
        Your body language has become much more relaxed and open. Try to reduce repetitive hand gestures. You maintained good eye contact throughout most of your presentation, which added impact to your delivery.
      </div>
    </div>

    {/* Actionable Recommendations */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Lightbulb className="mr-2 text-yellow-500" />
        Actionable Recommendations
      </h2>
      <div className="space-y-4">
        {[
          "Practice speaking in front of a mirror for at least 5 minutes daily.",
          "Avoid crossing arms or slouching during presentations.",
          "Use strategic pauses instead of filler words.",
          "Engage more with your audience using open gestures."
        ].map((tip, index) => (
          <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {index + 1}
              </div>
            </div>
            <p className="ml-4 text-gray-700">{tip}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Practice Resources */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Practice Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Daily Exercises</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Mirror practice sessions</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Posture alignment checks</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Confidence building exercises</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Next Steps</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Schedule follow-up analysis</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Review improvement trends</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Set new improvement goals</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}


// Update the parseRemarks function to handle both types of remarks
