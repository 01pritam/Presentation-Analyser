// import { useState } from 'react';
// import { 
//   BarChart, LineChart, PieChart, Mic, 
//   CheckCircle, Video, Presentation, Lock, CheckSquare, 
//   EyeOff, Book, Users, ArrowRight, ListChecks, Play, 
//   Settings, Info
// } from 'lucide-react';
// import CompetitorTable from './CompetitorTable';
// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Navigation */}
      

//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div>
//               <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
//                 Comprehensive Media Analysis Platform
//               </h1>
//               <p className="text-lg md:text-xl mb-6">
//                 Analyze video posture, audio content, presentation slides, and verify facts in real-time with our cutting-edge AI tools.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button className="px-6 py-3 text-base font-medium text-blue-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none shadow-lg">
//                   Get Started
//                 </button>
//                 <button className="px-6 py-3 text-base font-medium text-white bg-transparent border border-white rounded-md hover:bg-blue-500 hover:bg-opacity-10 focus:outline-none">
//                   Book a Demo
//                 </button>
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <div className=" bg-opacity-10 p-6 rounded-xl shadow-xl">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
//                     <Video className="h-10 w-10 mb-2" />
//                     <span className="font-medium">Video Analysis</span>
//                   </div>
//                   <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
//                     <Users className="h-10 w-10 mb-2" />
//                     <span className="font-medium">Pose Estimation</span>
//                   </div>
//                   <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
//                     <Mic className="h-10 w-10 mb-2" />
//                     <span className="font-medium">Audio Analysis</span>
//                   </div>
//                   <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
//                     <CheckCircle className="h-10 w-10 mb-2" />
//                     <span className="font-medium">Fact Checking</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Tabs */}
//       <div className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//               All-in-One Analysis Platform
//             </h2>
//             <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
//               Our comprehensive suite of AI-powered tools helps you gain valuable insights from your media content.
//             </p>
//           </div>

//           {/* Tabs */}
//           <div className="mb-8">
//             <div className="border-b border-gray-200">
//               <nav className="flex -mb-px overflow-x-auto">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`${
//                     activeTab === 'overview'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('video')}
//                   className={`${
//                     activeTab === 'video'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
//                 >
//                   Video Analysis
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('audio')}
//                   className={`${
//                     activeTab === 'audio'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
//                 >
//                   Audio Analysis
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('slides')}
//                   className={`${
//                     activeTab === 'slides'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
//                 >
//                   Slide Analysis
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('fact')}
//                   className={`${
//                     activeTab === 'fact'
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
//                 >
//                   Fact Checking
//                 </button>
//               </nav>
//             </div>
//           </div>

//           {/* Tab content */}
//           <div className="mt-8">
//             {activeTab === 'overview' && (
//               <div className="grid md:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Media Intelligence</h3>
//                   <p className="text-gray-600 mb-6">
//                     Our platform combines multiple analysis technologies to provide comprehensive insights about your video and audio content.
//                   </p>
//                   <ul className="space-y-4">
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Advanced posture and gesture analysis</span> to improve presentation confidence
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Multi-language audio transcription</span> with semantic analysis
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Presentation slide content analysis</span> for engagement and brand consistency
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Real-time fact checking</span> with credible source verification
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
//                   <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 flex justify-center items-center mb-6">
//                     <div className="text-center p-4">
//                       {/* <Analytics className="h-16 w-16 text-blue-500 mx-auto mb-2" /> */}
//                       <span className="text-gray-600">Dashboard Preview</span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-white p-4 rounded-lg shadow-sm">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="font-medium text-gray-900">Confidence Score</h4>
//                         <span className="text-green-600 font-bold">87%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-sm">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="font-medium text-gray-900">Fact Accuracy</h4>
//                         <span className="text-blue-600 font-bold">92%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-sm">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="font-medium text-gray-900">Audio Clarity</h4>
//                         <span className="text-purple-600 font-bold">78%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
//                       </div>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg shadow-sm">
//                       <div className="flex items-center justify-between mb-2">
//                         <h4 className="font-medium text-gray-900">Slide Engagement</h4>
//                         <span className="text-orange-600 font-bold">83%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div className="bg-orange-500 h-2 rounded-full" style={{ width: '83%' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'video' && (
//               <div className="grid md:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Video & Posture Analysis</h3>
//                   <p className="text-gray-600 mb-6">
//                     Our AI analyzes body language, facial expressions, and overall presentation confidence to help you deliver more impactful presentations.
//                   </p>
//                   <ul className="space-y-4">
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Shoulder alignment tracking</span> to improve posture awareness
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Head position monitoring</span> for optimal eye contact
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Spine angle assessment</span> for confident stance
//                       </p>
//                     </li>
//                     <li className="flex items-start">
//                       <div className="flex-shrink-0">
//                         <CheckSquare className="h-6 w-6 text-green-500" />
//                       </div>
//                       <p className="ml-3 text-gray-600">
//                         <span className="font-medium text-gray-900">Arm openness tracking</span> for engaging delivery
//                       </p>
//                     </li>
//                   </ul>
//                 </div>
//                 {/* Add your video analysis preview or illustration here */}
//                 <div className="bg-gray-100 p-6 rounded-xl shadow-sm flex items-center justify-center">
//                   <Video className="h-24 w-24 text-blue-500" />
//                 </div>
//               </div>
//             )}

//             {/* You can continue similarly for the other tabs: 'audio', 'slides', and 'fact' */}
//             <div className='mt-10'>

//             <CompetitorTable />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { 
  BarChart, LineChart, PieChart, Mic, 
  CheckCircle, Video, Lock, CheckSquare, 
  EyeOff, Book, Users, ArrowRight, ListChecks, Play, 
  Settings, Info, Sparkles, Brain, Zap, Shield, Globe,
  Star, TrendingUp, Activity, Award, Database, Search,
  AlertTriangle, FileText, Clock
} from 'lucide-react';
import CompetitorTable from './CompetitorTable';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isHovered, setIsHovered] = useState(null);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-xl rounded-full border border-blue-400/30">
                  <Sparkles className="h-4 w-4 mr-2 text-blue-300" />
                  <span className="text-blue-200 text-sm font-medium">AI-Powered Analysis Platform</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Next-Gen
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Media AI
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                  Revolutionary AI platform that analyzes video posture, audio content, and verifies facts with 
                  <span className="text-cyan-300 font-semibold"> 99.7% accuracy</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 overflow-hidden"
                  onMouseEnter={() => setIsHovered('primary')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span className="font-semibold">Start AI Analysis</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isHovered === 'primary' ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
                
                <button className="group px-8 py-4 bg-transparent border-2 border-white/30 rounded-2xl hover:border-white/50 hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span className="font-semibold">Watch Demo</span>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-cyan-300">99.7%</div>
                  <div className="text-sm text-blue-200">AI Accuracy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-green-300">2.3s</div>
                  <div className="text-sm text-blue-200">Analysis Time</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-300">50K+</div>
                  <div className="text-sm text-blue-200">Users</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Video, label: 'Video Analysis', color: 'from-blue-500 to-cyan-500', progress: 94 },
                    { icon: Users, label: 'Pose Detection', color: 'from-purple-500 to-pink-500', progress: 87 },
                    { icon: Mic, label: 'Audio Analysis', color: 'from-green-500 to-emerald-500', progress: 92 },
                    { icon: Shield, label: 'Fact Checking', color: 'from-orange-500 to-red-500', progress: 89 }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="group bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <span className="font-semibold text-white block">{item.label}</span>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-blue-200">{item.progress}% Accuracy</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Zap className="h-4 w-4 mr-2 text-blue-600" />
              <span className="text-blue-800 font-medium">AI-Powered Platform</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Revolutionary
              </span>
              <br />
              Analysis Suite
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of media analysis with our comprehensive AI-powered platform that delivers 
              unprecedented insights and accuracy.
            </p>
          </div>

          {/* Updated Tabs - Removed Slide Analysis */}
          <div className="mb-12">
            <div className="bg-gray-100 p-2 rounded-2xl inline-flex">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'video', label: 'Video AI', icon: Video },
                { id: 'audio', label: 'Audio AI', icon: Mic },
                { id: 'fact', label: 'Fact Check', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-12">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                    Complete Media Intelligence
                    <span className="block text-blue-600">Powered by AI</span>
                  </h3>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Our revolutionary platform combines cutting-edge AI technologies to provide comprehensive 
                    insights about your video and audio content with unprecedented accuracy.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Brain,
                        title: 'Advanced AI Analysis',
                        description: 'Neural networks analyze posture, gestures, and micro-expressions',
                        color: 'text-blue-600 bg-blue-100'
                      },
                      {
                        icon: Globe,
                        title: 'Multi-language Processing',
                        description: 'Support for 50+ languages with real-time transcription',
                        color: 'text-green-600 bg-green-100'
                      },
                      {
                        icon: Shield,
                        title: 'Real-time Fact Verification',
                        description: 'Cross-reference claims with 10M+ verified sources',
                        color: 'text-purple-600 bg-purple-100'
                      },
                      {
                        icon: TrendingUp,
                        title: 'Predictive Analytics',
                        description: 'AI predicts engagement and effectiveness metrics',
                        color: 'text-orange-600 bg-orange-100'
                      }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-2xl border border-white/20">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">AI Analysis Dashboard</h4>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <BarChart className="h-12 w-12 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Confidence Score', value: '94%', color: 'bg-green-500', icon: TrendingUp },
                        { label: 'Fact Accuracy', value: '97%', color: 'bg-blue-500', icon: Shield },
                        { label: 'Audio Clarity', value: '89%', color: 'bg-purple-500', icon: Mic },
                        { label: 'Engagement', value: '92%', color: 'bg-orange-500', icon: Star }
                      ].map((metric, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/30 hover:bg-white/90 transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <metric.icon className="h-4 w-4 text-gray-600" />
                            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                          </div>
                          <h5 className="text-sm font-medium text-gray-700">{metric.label}</h5>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className={`${metric.color} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: metric.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                    Advanced Video & 
                    <span className="block text-blue-600">Posture Analysis</span>
                  </h3>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Our cutting-edge AI analyzes 68 facial landmarks, body language patterns, and micro-expressions 
                    to provide comprehensive presentation insights.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      'Real-time shoulder alignment tracking with 99.2% accuracy',
                      'Advanced head position monitoring for optimal eye contact',
                      'Spine angle assessment for confident posture analysis',
                      'Gesture recognition with emotional context mapping',
                      'Micro-expression analysis for authenticity detection'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckSquare className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    <Video className="h-32 w-32 text-blue-600" />
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                    Intelligent Audio &
                    <span className="block text-green-600">Speech Analysis</span>
                  </h3>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Advanced speech recognition and audio processing capabilities that analyze tone, pace, 
                    clarity, and emotional context with industry-leading accuracy.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      'Multi-language transcription with 98.5% accuracy',
                      'Real-time tone and emotion detection',
                      'Speech pace and clarity optimization',
                      'Background noise reduction and enhancement',
                      'Confidence level assessment through vocal patterns'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckSquare className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-12 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="relative">
                    <Mic className="h-32 w-32 text-green-600" />
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fact' && (
              <div className="space-y-16">
                {/* Main Fact Check Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                      AI-Powered
                      <span className="block text-red-600">Fact Verification</span>
                    </h3>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Revolutionary fact-checking system that analyzes claims in real-time, cross-references 
                      multiple sources, and provides detailed verification reports with 99.7% accuracy.
                    </p>
                    
                    <div className="space-y-6">
                      {[
                        {
                          icon: Search,
                          title: 'Intelligent Claim Detection',
                          description: 'AI automatically identifies factual statements and verifiable claims',
                          color: 'text-blue-600 bg-blue-100'
                        },
                        {
                          icon: Database,
                          title: 'Multi-Source Verification',
                          description: 'Cross-references with 10M+ trusted sources and databases',
                          color: 'text-purple-600 bg-purple-100'
                        },
                        {
                          icon: Brain,
                          title: 'Context Analysis',
                          description: 'Understands context and nuance for accurate fact assessment',
                          color: 'text-green-600 bg-green-100'
                        },
                        {
                          icon: Clock,
                          title: 'Real-Time Processing',
                          description: 'Instant fact-checking with detailed confidence scores',
                          color: 'text-orange-600 bg-orange-100'
                        }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4 group">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg mb-1">{feature.title}</h4>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-red-50 to-orange-100 p-8 rounded-3xl shadow-2xl border border-white/20">
                      {/* Fact Check Demo Interface */}
                      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/30">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-red-600" />
                            Fact Check Results
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-500">Live Analysis</span>
                          </div>
                        </div>
                        
                        {/* Sample Fact Check Results */}
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-green-800">VERIFIED</span>
                              <span className="text-lg font-bold text-green-600">97%</span>
                            </div>
                            <p className="text-sm text-green-700">"The company was founded in 2015"</p>
                            <div className="text-xs text-green-600 mt-1">Sources: Company Registry, LinkedIn</div>
                          </div>
                          
                          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-red-800">FALSE</span>
                              <span className="text-lg font-bold text-red-600">91%</span>
                            </div>
                            <p className="text-sm text-red-700">"Ranked #1 by industry reports"</p>
                            <div className="text-xs text-red-600 mt-1">Sources: Industry Reports show #3 ranking</div>
                          </div>
                          
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-yellow-800">UNVERIFIABLE</span>
                              <span className="text-lg font-bold text-yellow-600">45%</span>
                            </div>
                            <p className="text-sm text-yellow-700">"Increased productivity by 40%"</p>
                            <div className="text-xs text-yellow-600 mt-1">Insufficient data for verification</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Processing Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/30">
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="h-4 w-4 text-gray-600" />
                            <span className="text-2xl font-bold text-gray-900">15</span>
                          </div>
                          <h5 className="text-sm font-medium text-gray-700">Claims Detected</h5>
                        </div>
                        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/30">
                          <div className="flex items-center justify-between mb-2">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="text-2xl font-bold text-gray-900">2.3s</span>
                          </div>
                          <h5 className="text-sm font-medium text-gray-700">Processing Time</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fact Check Process Flow */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl">
                  <div className="text-center mb-12">
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">How Our Fact-Checking Works</h4>
                    <p className="text-xl text-gray-600">Advanced AI pipeline for comprehensive fact verification</p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-8">
                    {[
                      {
                        step: '01',
                        title: 'Content Analysis',
                        description: 'AI scans text and identifies factual claims',
                        icon: Search,
                        color: 'from-blue-500 to-cyan-500'
                      },
                      {
                        step: '02',
                        title: 'Source Querying',
                        description: 'Cross-references with trusted databases',
                        icon: Database,
                        color: 'from-purple-500 to-pink-500'
                      },
                      {
                        step: '03',
                        title: 'Evidence Matching',
                        description: 'Compares claims against verified sources',
                        icon: Brain,
                        color: 'from-green-500 to-emerald-500'
                      },
                      {
                        step: '04',
                        title: 'Confidence Scoring',
                        description: 'Generates accuracy scores and reports',
                        icon: Award,
                        color: 'from-orange-500 to-red-500'
                      }
                    ].map((item, index) => (
                      <div key={index} className="relative group">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                          <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-400 mb-2">STEP {item.step}</div>
                            <h5 className="font-semibold text-gray-900 mb-2">{item.title}</h5>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2 z-10">
                            <ArrowRight className="h-4 w-4 text-gray-400 absolute -top-2 right-0" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fact Check Features */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Multi-Source Verification</h4>
                    <p className="text-gray-600 mb-4">
                      Cross-references claims with BBC, Reuters, Associated Press, and 10,000+ trusted sources.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />News Organizations</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Academic Databases</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Government Records</li>
                    </ul>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                      <AlertTriangle className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment</h4>
                    <p className="text-gray-600 mb-4">
                      Advanced algorithms detect misinformation patterns and assess credibility risks.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Bias Detection</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Source Reliability</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Context Analysis</li>
                    </ul>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Detailed Reports</h4>
                    <p className="text-gray-600 mb-4">
                      Comprehensive verification reports with evidence, sources, and confidence scores.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Evidence Summary</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Source Citations</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Confidence Metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Competitor Table */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Industry Leading
                <span className="block text-blue-600">Performance</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See how our AI platform outperforms competitors across key metrics
              </p>
            </div>
            <CompetitorTable />
          </div>
        </div>
      </div>
    </div>
  );
}
