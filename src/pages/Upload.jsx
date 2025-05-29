// import React, { useState } from 'react';
// import { useAnalysis } from '../context/AnalysisContext';
// import { Upload, FileText, Video, X } from 'lucide-react';
// import AudioResults from './AudioResults'
// import FactCheckResults from './FactCheckResults'
// import PostureResults from './PostureResults'
// export default function UploadPage() {
//   const {
//     setVideoFile, setPptFile,
//     setAudioBlob, setTranscript, setFactCheck, setPostureData, setAudioAnalysis
//   } = useAnalysis();

//   const [videoFileName, setVideoFileName] = useState('');
//   const [pptFileName, setPptFileName] = useState('');
//   const [isDraggingVideo, setIsDraggingVideo] = useState(false);
//   const [isDraggingPpt, setIsDraggingPpt] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFileName(file.name);
//       setVideoFile(file);
//       // Simulate audio extraction
//       const audio = new File([file], file.name.replace(/\.[^/.]+$/, '.wav'), { type: 'audio/wav' });
//       setAudioBlob(audio);
//       simulateUpload();
//     }
//   };

//   const handlePptUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPptFileName(file.name);
//       setPptFile(file);
//     }
//   };

//   const handleDragOver = (e, setDragState) => {
//     e.preventDefault();
//     setDragState(true);
//   };

//   const handleDragLeave = (e, setDragState) => {
//     e.preventDefault();
//     setDragState(false);
//   };

//   const handleVideoDrop = (e) => {
//     e.preventDefault();
//     setIsDraggingVideo(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       if (file.type.startsWith('video/')) {
//         setVideoFileName(file.name);
//         setVideoFile(file);
//         const audio = new File([file], file.name.replace(/\.[^/.]+$/, '.wav'), { type: 'audio/wav' });
//         setAudioBlob(audio);
//         simulateUpload();
//       }
//     }
//   };

//   const handlePptDrop = (e) => {
//     e.preventDefault();
//     setIsDraggingPpt(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       const fileExt = file.name.split('.').pop().toLowerCase();
//       if (fileExt === 'ppt' || fileExt === 'pptx') {
//         setPptFileName(file.name);
//         setPptFile(file);
//       }
//     }
//   };

//   const clearVideo = () => {
//     setVideoFileName('');
//     setVideoFile(null);
//     setAudioBlob(null);
//   };

//   const clearPpt = () => {
//     setPptFileName('');
//     setPptFile(null);
//   };

//   const simulateUpload = () => {
//     setIsUploading(true);
//     setTimeout(() => {
//       setIsUploading(false);
//     }, 2000);
//   };

//   const handleSubmit = () => {
//     if (!videoFileName) return;
//     // Here you would handle final submission and processing
//     setTranscript("Simulated transcript");
//     setFactCheck([{fact: "Example fact", verified: true}]);
//     setPostureData([{time: 0, posture: "good"}]);
//     setAudioAnalysis({pace: "moderate", clarity: "high"});
    
//     // You could redirect to results page or show success message
//   };

//   return (
//     <div className="max-w mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="mb-8 text-center">
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Presentation Analysis</h1>
//         <p className="text-gray-600">Upload your video and optional presentation slides to get detailed feedback</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Video Upload */}
//         <div className="flex flex-col">
//           <h2 className="text-lg font-semibold mb-3 flex items-center">
//             <Video className="mr-2 text-blue-600" size={20} />
//             Video Upload <span className="text-red-500 ml-1">*</span>
//           </h2>
          
//           <div 
//             className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer transition-colors duration-200 ${
//               isDraggingVideo ? 'border-blue-500 bg-blue-50' : videoFileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
//             }`}
//             onDragOver={(e) => handleDragOver(e, setIsDraggingVideo)}
//             onDragLeave={(e) => handleDragLeave(e, setIsDraggingVideo)}
//             onDrop={handleVideoDrop}
//             onClick={() => document.getElementById('video-upload').click()}
//           >
//             {videoFileName ? (
//               <div className="flex flex-col items-center">
//                 <div className="flex items-center justify-between w-full mb-3">
//                   <span className="text-green-700 font-medium flex items-center">
//                     <Video className="mr-2" size={16} />
//                     {videoFileName}
//                   </span>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       clearVideo();
//                     }}
//                     className="text-red-500 hover:text-red-700 ml-2"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <span className="text-green-600 text-sm">Video uploaded successfully</span>
//               </div>
//             ) : (
//               <>
//                 <Upload className="text-gray-400 mb-2" size={32} />
//                 <p className="text-sm text-gray-500 mb-2 text-center">
//                   Drag and drop your video file here or click to browse
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Supported formats: MP4, MOV, AVI (Max 500MB)
//                 </p>
//               </>
//             )}
//             <input 
//               id="video-upload" 
//               type="file" 
//               accept="video/*" 
//               onChange={handleVideoUpload} 
//               className="hidden" 
//             />
//           </div>
//         </div>

//         {/* Presentation Upload */}
//         <div className="flex flex-col">
//           <h2 className="text-lg font-semibold mb-3 flex items-center">
//             <FileText className="mr-2 text-blue-600" size={20} />
//             Presentation Upload <span className="text-gray-400 ml-1">(Optional)</span>
//           </h2>
          
//           <div 
//             className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer transition-colors duration-200 ${
//               isDraggingPpt ? 'border-blue-500 bg-blue-50' : pptFileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
//             }`}
//             onDragOver={(e) => handleDragOver(e, setIsDraggingPpt)}
//             onDragLeave={(e) => handleDragLeave(e, setIsDraggingPpt)}
//             onDrop={handlePptDrop}
//             onClick={() => document.getElementById('ppt-upload').click()}
//           >
//             {pptFileName ? (
//               <div className="flex flex-col items-center">
//                 <div className="flex items-center justify-between w-full mb-3">
//                   <span className="text-green-700 font-medium flex items-center">
//                     <FileText className="mr-2" size={16} />
//                     {pptFileName}
//                   </span>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       clearPpt();
//                     }}
//                     className="text-red-500 hover:text-red-700 ml-2"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <span className="text-green-600 text-sm">Presentation uploaded successfully</span>
//               </div>
//             ) : (
//               <>
//                 <FileText className="text-gray-400 mb-2" size={32} />
//                 <p className="text-sm text-gray-500 mb-2 text-center">
//                   Drag and drop your presentation file here or click to browse
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Supported formats: PPT, PPTX (Max 10MB)
//                 </p>
//               </>
//             )}
//             <input 
//               id="ppt-upload" 
//               type="file" 
//               accept=".ppt,.pptx" 
//               onChange={handlePptUpload} 
//               className="hidden" 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex flex-col items-center">
//         <p className="text-xs text-gray-500 mb-4 text-center">
//           By uploading files, you agree to our Terms of Service and Privacy Policy.
//           <br />Your video will be analyzed for presentation quality, body language, and content accuracy.
//         </p>
        
        
//       </div>
//       <AudioResults />
//        <FactCheckResults />
//         <PostureResults />
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Video, User, Mic, BarChart2, Activity, 
  Star, Trophy, CheckCircle, XCircle, Clock, Eye, Play,
  Download, Calendar, Award, TrendingUp, Zap, RefreshCw,
  Lock, Unlock, CreditCard, Check, X, ChevronDown, Info,
  ArrowUp, Filter, Search, Lightbulb, Target, Users
} from 'lucide-react';

// Complete Interview Analysis Platform
const InterviewAnalysisPlatform = () => {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, analyzing, results
  const [uploadedFiles, setUploadedFiles] = useState({ video: null, resume: null });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [activeTab, setActiveTab] = useState('overview');
  const videoInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Dummy analysis data
  const ANALYSIS_RESULTS = {
    candidate: {
      name: 'John Doe',
      position: 'Senior Product Manager',
      email: 'john.doe@email.com',
      analysisDate: new Date().toLocaleDateString()
    },
    scores: {
      communication: 92,
      technical: 88,
      experience: 95,
      culturalFit: 90,
      posture: 85,
      confidence: 89,
      factChecking: 87,
      overall: 90
    },
    posture: {
      headPosition: 82,
      shoulderAlignment: 78,
      spineAngle: 88,
      armOpenness: 85,
      overallPosture: 83,
      confidenceDips: 3,
      duration: 1245,
      trend: '+12%'
    },
    resume: {
      quality: 88,
      skillsMatch: 92,
      experience: 8,
      education: 'MBA, Computer Science'
    },
    skills: {
      listed: ['Product Management', 'Agile', 'Scrum', 'Data Analysis', 'Leadership', 'Strategy'],
      matched: ['Product Management', 'Agile', 'Data Analysis', 'Leadership'],
      missing: ['Machine Learning', 'SQL', 'Python']
    },
    strengths: [
      'Excellent communication skills',
      'Strong leadership presence',
      'Clear articulation of ideas',
      'Good eye contact maintenance',
      'Professional posture throughout'
    ],
    improvements: [
      'Reduce shoulder tension',
      'Minimize hand gestures',
      'Improve technical vocabulary',
      'Add more quantified achievements',
      'Practice power poses before interviews'
    ],
    factChecking: {
      overallAccuracy: 87,
      overallCredibility: 87,
      riskLevel: 'Low',
      totalClaims: 15,
      claimsDetected: 15,
      verifiedClaims: 12,
      claimsVerified: 12,
      falseClaims: 2,
      claimsFalse: 2,
      unverifiableClaims: 1,
      claimsUnverifiable: 1,
      accuracyRate: 83,
      confidenceLevel: 'High',
      processingTime: '2.3 seconds',
      detailedClaims: [
        {
          id: 1,
          claim: "I increased product adoption by 45% in my previous role at TechCorp",
          category: 'Achievement',
          status: 'verified',
          confidence: 95,
          sources: [
            'TechCorp Q4 2023 Annual Report',
            'Product Analytics Dashboard',
            'LinkedIn Employment Verification'
          ],
          evidence: 'Company reports show 44.7% increase in product adoption during tenure',
          timestamp: '00:02:15',
          riskLevel: 'low'
        },
        {
          id: 2,
          claim: "I have 8 years of experience in product management",
          category: 'Experience',
          status: 'verified',
          confidence: 100,
          sources: [
            'Resume Employment History',
            'LinkedIn Profile Cross-Reference',
            'Professional Network Verification'
          ],
          evidence: 'Employment records confirm 8.2 years in product management roles',
          timestamp: '00:00:45',
          riskLevel: 'low'
        },
        {
          id: 3,
          claim: "I led a cross-functional team of 25 people",
          category: 'Leadership',
          status: 'partially_verified',
          confidence: 78,
          sources: [
            'Company Organizational Chart',
            'Team Structure Documentation'
          ],
          evidence: 'Records show direct reports of 18 people, with matrix management of 7 additional team members',
          timestamp: '00:03:42',
          riskLevel: 'medium'
        },
        {
          id: 4,
          claim: "I hold an MBA from Stanford University",
          category: 'Education',
          status: 'verified',
          confidence: 100,
          sources: [
            'Stanford University Alumni Database',
            'Degree Verification Service',
            'Academic Transcript'
          ],
          evidence: 'MBA degree confirmed, graduated 2018 with concentration in Technology Management',
          timestamp: '00:01:20',
          riskLevel: 'low'
        },
        {
          id: 5,
          claim: "Our product was ranked #1 in the industry by Gartner",
          category: 'Achievement',
          status: 'false',
          confidence: 92,
          sources: [
            'Gartner Magic Quadrant Reports 2022-2024',
            'Industry Analysis Reports'
          ],
          evidence: 'Gartner reports show product ranked #3 in category, not #1',
          timestamp: '00:04:18',
          riskLevel: 'high'
        },
        {
          id: 6,
          claim: "I increased team productivity by implementing Agile methodologies",
          category: 'Achievement',
          status: 'unverifiable',
          confidence: 45,
          sources: [
            'Limited internal documentation available'
          ],
          evidence: 'Insufficient data to verify specific productivity metrics',
          timestamp: '00:05:33',
          riskLevel: 'medium'
        }
      ],
      categoryBreakdown: {
        experience: { total: 4, verified: 4, false: 0, unverifiable: 0, accuracy: 100 },
        education: { total: 2, verified: 2, false: 0, unverifiable: 0, accuracy: 100 },
        achievements: { total: 6, verified: 4, false: 1, unverifiable: 1, accuracy: 67 },
        leadership: { total: 3, verified: 2, false: 0, unverifiable: 1, accuracy: 67 }
      },
      riskAssessment: {
        overall: 'Medium',
        redFlags: [
          {
            type: 'Exaggerated industry ranking claim',
            severity: 'High',
            description: 'Claimed #1 ranking when actual ranking was #3'
          },
          {
            type: 'Unverifiable productivity metrics',
            severity: 'Medium',
            description: 'Insufficient documentation to verify productivity improvements'
          }
        ],
        recommendations: [
          'Request additional documentation for unverified claims',
          'Follow up on specific metrics and timeframes',
          'Verify leadership scope and team structure'
        ]
      },
      verificationSources: [
        'LinkedIn Professional Network',
        'Company Annual Reports',
        'Industry Analysis Reports',
        'Educational Institution Databases',
        'Professional Certification Bodies',
        'News Articles and Press Releases',
        'Government Employment Records'
      ],
      verificationMethods: [
        'Cross-reference with public databases',
        'LinkedIn profile verification',
        'Company records analysis',
        'Educational institution verification',
        'Certification authority checks',
        'Reference validation'
      ],
      trustworthinessIndicators: {
        consistentDates: true,
        verifiableAchievements: 75,
        crossReferencedInfo: 90,
        publiclyAvailableData: 60
      },
      aiConfidence: {
        claimDetection: 96,
        sourceReliability: 89,
        evidenceMatching: 91,
        overallAccuracy: 87
      }
    },
    detailedAnalysis: {
      communicationBreakdown: {
        clarity: 94,
        pace: 88,
        volume: 90,
        articulation: 92
      },
      postureTimeline: [
        { time: 0, confidence: 85, posture: 80 },
        { time: 30, confidence: 88, posture: 82 },
        { time: 60, confidence: 92, posture: 85 },
        { time: 90, confidence: 89, posture: 83 },
        { time: 120, confidence: 94, posture: 87 }
      ],
      recommendations: [
        'Practice speaking in front of a mirror for 5 minutes daily',
        'Perform shoulder rolls before interviews',
        'Use strategic pauses instead of filler words',
        'Maintain open gestures throughout conversation'
      ]
    }
  };

  const SUBSCRIPTION_PLANS = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: '/month',
      features: [
        'Basic interview analysis',
        'Resume scoring',
        'Simple recommendations',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$19.99',
      period: '/month',
      features: [
        'Advanced AI analysis',
        'Detailed posture tracking',
        'Comprehensive reports',
        'Video timeline analysis',
        'Custom improvement plans',
        'Priority support'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      period: '/month',
      features: [
        'Everything in Professional',
        'Team analytics',
        'Bulk processing',
        'API access',
        'Custom integrations',
        'Dedicated support'
      ],
      popular: false
    }
  ];

  // File upload handlers
  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  // Start analysis
  const startAnalysis = () => {
    if (!uploadedFiles.video || !uploadedFiles.resume) {
      alert('Please upload both video and resume files');
      return;
    }

    setCurrentStep('analyzing');
    setAnalysisProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisData(ANALYSIS_RESULTS);
          setCurrentStep('results');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // Utility functions
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <Star className="h-4 w-4" />;
    if (score >= 80) return <CheckCircle className="h-4 w-4" />;
    if (score >= 70) return <Clock className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  // Render upload step
  const renderUploadStep = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Interview Analysis Platform
          </h1>
          <p className="text-xl text-gray-600">Upload your interview video and resume for comprehensive AI analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Video Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Interview Video</h3>
              <p className="text-gray-600 mb-6">MP4, MOV, AVI formats supported</p>
              
              {uploadedFiles.video ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">{uploadedFiles.video.name}</span>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload video file</p>
                </div>
              )}
              
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload('video', e)}
                className="hidden"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
              <p className="text-gray-600 mb-6">PDF format recommended</p>
              
              {uploadedFiles.resume ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">{uploadedFiles.resume.name}</span>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-purple-400 transition-colors"
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload resume</p>
                </div>
              )}
              
              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload('resume', e)}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Start Analysis Button */}
        <div className="text-center">
          <button
            onClick={startAnalysis}
            disabled={!uploadedFiles.video || !uploadedFiles.resume}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
              uploadedFiles.video && uploadedFiles.resume
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className="h-5 w-5 inline mr-2" />
            Start AI Analysis
          </button>
        </div>
      </div>
    </div>
  );

  // Render analyzing step
  const renderAnalyzingStep = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <RefreshCw className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Interview</h2>
          <p className="text-gray-600">Our AI is processing your video and resume...</p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{analysisProgress}% Complete</p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className={`flex items-center ${analysisProgress > 20 ? 'text-green-600' : ''}`}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Processing video content
          </div>
          <div className={`flex items-center ${analysisProgress > 40 ? 'text-green-600' : ''}`}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Analyzing posture and body language
          </div>
          <div className={`flex items-center ${analysisProgress > 60 ? 'text-green-600' : ''}`}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Evaluating communication skills
          </div>
          <div className={`flex items-center ${analysisProgress > 80 ? 'text-green-600' : ''}`}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Generating recommendations
          </div>
        </div>
      </div>
    </div>
  );

  // Render subscription modal
  const renderSubscriptionModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Unlock Full Analysis</h2>
            <p className="text-gray-600">Choose a plan to access detailed insights and recommendations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsSubscribed(true);
                setShowSubscriptionModal(false);
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <CreditCard className="h-5 w-5 inline mr-2" />
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render blurred content
  const renderBlurredContent = (content) => (
    <div className="relative">
      <div className="filter blur-sm pointer-events-none">
        {content}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
          <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
          <p className="text-gray-600 mb-4">Subscribe to unlock detailed analysis and insights</p>
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Unlock className="h-5 w-5 inline mr-2" />
            Unlock Now
          </button>
        </div>
      </div>
    </div>
  );

  // Render results step
  const renderResultsStep = () => {
    if (!analysisData) return null;

    const freeContent = (
      <>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interview Analysis Report</h1>
              <p className="text-gray-600">Candidate: {analysisData.candidate.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Overall Score</div>
              <div className={`text-4xl font-bold ${getScoreColor(analysisData.scores.overall).split(' ')[0]}`}>
                {analysisData.scores.overall}
              </div>
            </div>
          </div>

          {/* Basic Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysisData.scores).slice(0, 4).map(([key, score]) => (
              <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`text-2xl font-bold ${getScoreColor(score).split(' ')[0]} mb-1`}>
                  {score}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Insights */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-800 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {analysisData.strengths.slice(0, 2).map((strength, index) => (
                  <li key={index} className="text-gray-700 text-sm">• {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {analysisData.improvements.slice(0, 2).map((improvement, index) => (
                  <li key={index} className="text-gray-700 text-sm">• {improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );

    const premiumContent = (
      <>
        {/* Detailed Posture Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Detailed Posture Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(analysisData.posture).slice(0, 4).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(value).split(' ')[0]} mb-2`}>
                  {value}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${getScoreColor(value).includes('emerald') ? 'bg-emerald-500' : 
                      getScoreColor(value).includes('blue') ? 'bg-blue-500' : 
                      getScoreColor(value).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Communication Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysisData.detailedAnalysis.communicationBreakdown).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(value).split(' ')[0]} mb-1`}>
                  {value}
                </div>
                <div className="text-sm text-gray-600 capitalize">{key}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fact-Checking Analysis Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-blue-500" />
              Fact-Checking Analysis
            </h2>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getScoreColor(analysisData.factChecking.overallCredibility)}`}>
                Credibility: {analysisData.factChecking.overallCredibility}%
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                analysisData.factChecking.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                analysisData.factChecking.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Risk: {analysisData.factChecking.riskLevel}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{analysisData.factChecking.claimsDetected}</div>
              <div className="text-sm text-blue-700">Claims Detected</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{analysisData.factChecking.claimsVerified}</div>
              <div className="text-sm text-green-700">Verified</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{analysisData.factChecking.claimsFalse}</div>
              <div className="text-sm text-red-700">False Claims</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{analysisData.factChecking.claimsUnverifiable}</div>
              <div className="text-sm text-yellow-700">Unverifiable</div>
            </div>
          </div>

          {/* Accuracy Rate Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
              <span className="text-sm font-bold text-gray-900">{analysisData.factChecking.accuracyRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  analysisData.factChecking.accuracyRate >= 90 ? 'bg-emerald-500' :
                  analysisData.factChecking.accuracyRate >= 80 ? 'bg-blue-500' :
                  analysisData.factChecking.accuracyRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisData.factChecking.accuracyRate}%` }}
              />
            </div>
          </div>

          {/* Detailed Claims Analysis */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Detailed Claims Analysis</h3>
            <div className="space-y-4">
              {analysisData.factChecking.detailedClaims.map((claim) => (
                <div key={claim.id} className={`border-l-4 p-4 rounded-r-xl ${
                  claim.status === 'verified' ? 'border-green-500 bg-green-50' :
                  claim.status === 'false' ? 'border-red-500 bg-red-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === 'verified' ? 'bg-green-100 text-green-800' :
                          claim.status === 'false' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">@{claim.timestamp}</span>
                        <span className="text-xs text-gray-500 capitalize">{claim.category}</span>
                      </div>
                      <p className="text-gray-800 font-medium mb-2">"{claim.claim}"</p>
                      <p className="text-sm text-gray-600 mb-2">{claim.evidence}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-sm font-semibold text-gray-700">Confidence</div>
                      <div className={`text-lg font-bold ${
                        claim.confidence >= 90 ? 'text-green-600' :
                        claim.confidence >= 70 ? 'text-blue-600' :
                        claim.confidence >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {claim.confidence}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Sources */}
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-1">Sources:</div>
                    <div className="flex flex-wrap gap-1">
                      {claim.sources.map((source, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Claims by Category</h3>
              <div className="space-y-3">
                {Object.entries(analysisData.factChecking.categoryBreakdown).map(([category, data]) => (
                  <div key={category} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">{category}</span>
                      <span className="text-sm text-gray-600">Total: {data.total}</span>
                    </div>
                    <div className="flex space-x-2 text-sm">
                      <span className="text-green-600">✓ {data.verified}</span>
                      <span className="text-red-600">✗ {data.false}</span>
                      <span className="text-yellow-600">? {data.unverifiable}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Trustworthiness Indicators</h3>
              <div className="space-y-3">
                {Object.entries(analysisData.factChecking.trustworthinessIndicators).map(([indicator, value]) => (
                  <div key={indicator} className="flex justify-between items-center">
                    <span className="text-gray-700 capitalize">{indicator.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="flex items-center space-x-2">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        <>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                value >= 80 ? 'bg-green-500' :
                                value >= 60 ? 'bg-blue-500' :
                                value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{value}%</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Red Flags Section */}
          {analysisData.factChecking.riskAssessment.redFlags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <XCircle className="h-5 w-5 mr-2" />
                Red Flags Detected
              </h3>
              <div className="space-y-3">
                {analysisData.factChecking.riskAssessment.redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      flag.severity === 'High' ? 'bg-red-200 text-red-800' :
                      flag.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-orange-200 text-orange-800'
                    }`}>
                      {flag.severity}
                    </div>
                    <div>
                      <div className="font-medium text-red-800">{flag.type}</div>
                      <div className="text-sm text-red-700">{flag.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Methods */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Verification Methods Used
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {analysisData.factChecking.verificationMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
            Personalized Recommendations
          </h2>
          <div className="space-y-4">
            {analysisData.detailedAnalysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start p-4 bg-blue-50 rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                  {index + 1}
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Resume Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-blue-800">Skills Listed</h3>
              <div className="flex flex-wrap gap-2">
                {analysisData.skills.listed.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-green-800">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysisData.skills.matched.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-red-800">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysisData.skills.missing.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          {freeContent}
          {isSubscribed ? premiumContent : renderBlurredContent(premiumContent)}
        </div>
        
        {showSubscriptionModal && renderSubscriptionModal()}
      </div>
    );
  };

  // Main render
  return (
    <div>
      {currentStep === 'upload' && renderUploadStep()}
      {currentStep === 'analyzing' && renderAnalyzingStep()}
      {currentStep === 'results' && renderResultsStep()}
    </div>
  );
};

export default InterviewAnalysisPlatform;
