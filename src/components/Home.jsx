import { useState } from 'react';
import { 
  BarChart, LineChart, PieChart, Mic, 
  CheckCircle, Video, Presentation, Lock, CheckSquare, 
  EyeOff, Book, Users, ArrowRight, ListChecks, Play, 
  Settings, Info
} from 'lucide-react';
import CompetitorTable from './CompetitorTable';
export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation */}
      

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Comprehensive Media Analysis Platform
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Analyze video posture, audio content, presentation slides, and verify facts in real-time with our cutting-edge AI tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 text-base font-medium text-blue-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none shadow-lg">
                  Get Started
                </button>
                <button className="px-6 py-3 text-base font-medium text-white bg-transparent border border-white rounded-md hover:bg-blue-500 hover:bg-opacity-10 focus:outline-none">
                  Book a Demo
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" bg-opacity-10 p-6 rounded-xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
                    <Video className="h-10 w-10 mb-2" />
                    <span className="font-medium">Video Analysis</span>
                  </div>
                  <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
                    <Users className="h-10 w-10 mb-2" />
                    <span className="font-medium">Pose Estimation</span>
                  </div>
                  <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
                    <Mic className="h-10 w-10 mb-2" />
                    <span className="font-medium">Audio Analysis</span>
                  </div>
                  <div className=" bg-opacity-20 p-4 rounded-lg flex flex-col items-center text-center">
                    <CheckCircle className="h-10 w-10 mb-2" />
                    <span className="font-medium">Fact Checking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Tabs */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              All-in-One Analysis Platform
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our comprehensive suite of AI-powered tools helps you gain valuable insights from your media content.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`${
                    activeTab === 'video'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Video Analysis
                </button>
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`${
                    activeTab === 'audio'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Audio Analysis
                </button>
                <button
                  onClick={() => setActiveTab('slides')}
                  className={`${
                    activeTab === 'slides'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Slide Analysis
                </button>
                <button
                  onClick={() => setActiveTab('fact')}
                  className={`${
                    activeTab === 'fact'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Fact Checking
                </button>
              </nav>
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Media Intelligence</h3>
                  <p className="text-gray-600 mb-6">
                    Our platform combines multiple analysis technologies to provide comprehensive insights about your video and audio content.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Advanced posture and gesture analysis</span> to improve presentation confidence
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Multi-language audio transcription</span> with semantic analysis
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Presentation slide content analysis</span> for engagement and brand consistency
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Real-time fact checking</span> with credible source verification
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 flex justify-center items-center mb-6">
                    <div className="text-center p-4">
                      {/* <Analytics className="h-16 w-16 text-blue-500 mx-auto mb-2" /> */}
                      <span className="text-gray-600">Dashboard Preview</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Confidence Score</h4>
                        <span className="text-green-600 font-bold">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Fact Accuracy</h4>
                        <span className="text-blue-600 font-bold">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Audio Clarity</h4>
                        <span className="text-purple-600 font-bold">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Slide Engagement</h4>
                        <span className="text-orange-600 font-bold">83%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Video & Posture Analysis</h3>
                  <p className="text-gray-600 mb-6">
                    Our AI analyzes body language, facial expressions, and overall presentation confidence to help you deliver more impactful presentations.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Shoulder alignment tracking</span> to improve posture awareness
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Head position monitoring</span> for optimal eye contact
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Spine angle assessment</span> for confident stance
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckSquare className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-600">
                        <span className="font-medium text-gray-900">Arm openness tracking</span> for engaging delivery
                      </p>
                    </li>
                  </ul>
                </div>
                {/* Add your video analysis preview or illustration here */}
                <div className="bg-gray-100 p-6 rounded-xl shadow-sm flex items-center justify-center">
                  <Video className="h-24 w-24 text-blue-500" />
                </div>
              </div>
            )}

            {/* You can continue similarly for the other tabs: 'audio', 'slides', and 'fact' */}
            <div className='mt-10'>

            <CompetitorTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
