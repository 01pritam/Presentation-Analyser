import React, { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { Upload, FileText, Video, X } from 'lucide-react';

export default function UploadPage() {
  const {
    setVideoFile, setPptFile,
    setAudioBlob, setTranscript, setFactCheck, setPostureData, setAudioAnalysis
  } = useAnalysis();

  const [videoFileName, setVideoFileName] = useState('');
  const [pptFileName, setPptFileName] = useState('');
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [isDraggingPpt, setIsDraggingPpt] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFileName(file.name);
      setVideoFile(file);
      // Simulate audio extraction
      const audio = new File([file], file.name.replace(/\.[^/.]+$/, '.wav'), { type: 'audio/wav' });
      setAudioBlob(audio);
      simulateUpload();
    }
  };

  const handlePptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPptFileName(file.name);
      setPptFile(file);
    }
  };

  const handleDragOver = (e, setDragState) => {
    e.preventDefault();
    setDragState(true);
  };

  const handleDragLeave = (e, setDragState) => {
    e.preventDefault();
    setDragState(false);
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFileName(file.name);
        setVideoFile(file);
        const audio = new File([file], file.name.replace(/\.[^/.]+$/, '.wav'), { type: 'audio/wav' });
        setAudioBlob(audio);
        simulateUpload();
      }
    }
  };

  const handlePptDrop = (e) => {
    e.preventDefault();
    setIsDraggingPpt(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileExt = file.name.split('.').pop().toLowerCase();
      if (fileExt === 'ppt' || fileExt === 'pptx') {
        setPptFileName(file.name);
        setPptFile(file);
      }
    }
  };

  const clearVideo = () => {
    setVideoFileName('');
    setVideoFile(null);
    setAudioBlob(null);
  };

  const clearPpt = () => {
    setPptFileName('');
    setPptFile(null);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!videoFileName) return;
    // Here you would handle final submission and processing
    setTranscript("Simulated transcript");
    setFactCheck([{fact: "Example fact", verified: true}]);
    setPostureData([{time: 0, posture: "good"}]);
    setAudioAnalysis({pace: "moderate", clarity: "high"});
    
    // You could redirect to results page or show success message
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Presentation Analysis</h1>
        <p className="text-gray-600">Upload your video and optional presentation slides to get detailed feedback</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Video Upload */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Video className="mr-2 text-blue-600" size={20} />
            Video Upload <span className="text-red-500 ml-1">*</span>
          </h2>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer transition-colors duration-200 ${
              isDraggingVideo ? 'border-blue-500 bg-blue-50' : videoFileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={(e) => handleDragOver(e, setIsDraggingVideo)}
            onDragLeave={(e) => handleDragLeave(e, setIsDraggingVideo)}
            onDrop={handleVideoDrop}
            onClick={() => document.getElementById('video-upload').click()}
          >
            {videoFileName ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-green-700 font-medium flex items-center">
                    <Video className="mr-2" size={16} />
                    {videoFileName}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearVideo();
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={18} />
                  </button>
                </div>
                <span className="text-green-600 text-sm">Video uploaded successfully</span>
              </div>
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-500 mb-2 text-center">
                  Drag and drop your video file here or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: MP4, MOV, AVI (Max 500MB)
                </p>
              </>
            )}
            <input 
              id="video-upload" 
              type="file" 
              accept="video/*" 
              onChange={handleVideoUpload} 
              className="hidden" 
            />
          </div>
        </div>

        {/* Presentation Upload */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <FileText className="mr-2 text-blue-600" size={20} />
            Presentation Upload <span className="text-gray-400 ml-1">(Optional)</span>
          </h2>
          
          <div 
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer transition-colors duration-200 ${
              isDraggingPpt ? 'border-blue-500 bg-blue-50' : pptFileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={(e) => handleDragOver(e, setIsDraggingPpt)}
            onDragLeave={(e) => handleDragLeave(e, setIsDraggingPpt)}
            onDrop={handlePptDrop}
            onClick={() => document.getElementById('ppt-upload').click()}
          >
            {pptFileName ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="text-green-700 font-medium flex items-center">
                    <FileText className="mr-2" size={16} />
                    {pptFileName}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearPpt();
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={18} />
                  </button>
                </div>
                <span className="text-green-600 text-sm">Presentation uploaded successfully</span>
              </div>
            ) : (
              <>
                <FileText className="text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-500 mb-2 text-center">
                  Drag and drop your presentation file here or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: PPT, PPTX (Max 10MB)
                </p>
              </>
            )}
            <input 
              id="ppt-upload" 
              type="file" 
              accept=".ppt,.pptx" 
              onChange={handlePptUpload} 
              className="hidden" 
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-xs text-gray-500 mb-4 text-center">
          By uploading files, you agree to our Terms of Service and Privacy Policy.
          <br />Your video will be analyzed for presentation quality, body language, and content accuracy.
        </p>
        
        <button 
          onClick={handleSubmit}
          disabled={!videoFileName || isUploading}
          className={`flex items-center justify-center px-6 py-3 rounded-md font-medium text-white w-48 transition-all duration-200 ${
            !videoFileName || isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </div>
          ) : (
            <>Analyze Presentation</>
          )}
        </button>
      </div>
    </div>
  );
}