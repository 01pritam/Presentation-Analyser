import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, Trophy, Upload, File, FileText, User, Volume2, 
  CheckCircle, XCircle, Clock, ChevronDown, ChevronUp, 
  Smile, Frown, Meh, BarChart2, Activity, Award, Mic, Video,
  Play, Zap, TrendingUp, Star, Filter, Search, RefreshCw, FileCheck,
  Shield, Database, Brain, Cpu, AlertTriangle, Loader, Info,
  Users, Download // Added missing imports
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Updated initial data for interview analysis with resumes
const initialData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Product Manager',
    department: 'Product',
    videoFile: 'interview_sarah_jan_15.mp4',
    resumeFile: 'sarah_johnson_resume.pdf',
    communicationScore: null,
    technicalScore: null,
    experienceScore: null,
    culturalFitScore: null,
    overallScore: null,
    rank: null,
    previousRank: null,
    interviewDate: '2023-05-15',
    resumeSkills: [],
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    improvements: [],
    notes: 'Pending analysis...',
    isAnalyzing: false,
    analyzed: false,
    resumeQuality: null,
    skillsMatch: null,
    factCheckingResults: null,
    analysisProgress: 0,
    currentAnalysisStep: ''
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Sales Director',
    department: 'Sales',
    videoFile: 'interview_michael_feb_2.mp4',
    resumeFile: 'michael_chen_resume.pdf',
    communicationScore: null,
    technicalScore: null,
    experienceScore: null,
    culturalFitScore: null,
    overallScore: null,
    rank: null,
    previousRank: null,
    interviewDate: '2023-05-18',
    resumeSkills: [],
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    improvements: [],
    notes: 'Pending analysis...',
    isAnalyzing: false,
    analyzed: false,
    resumeQuality: null,
    skillsMatch: null,
    factCheckingResults: null,
    analysisProgress: 0,
    currentAnalysisStep: ''
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    position: 'UX Lead',
    department: 'Design',
    videoFile: 'interview_emma_jan_30.mp4',
    resumeFile: 'emma_rodriguez_resume.pdf',
    communicationScore: null,
    technicalScore: null,
    experienceScore: null,
    culturalFitScore: null,
    overallScore: null,
    rank: null,
    previousRank: null,
    interviewDate: '2023-05-20',
    resumeSkills: [],
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    improvements: [],
    notes: 'Pending analysis...',
    isAnalyzing: false,
    analyzed: false,
    resumeQuality: null,
    skillsMatch: null,
    factCheckingResults: null,
    analysisProgress: 0,
    currentAnalysisStep: ''
  },
  {
    id: 4,
    name: 'David Wilson',
    position: 'CTO',
    department: 'Engineering',
    videoFile: 'interview_david_may_22.mp4',
    resumeFile: 'david_wilson_resume.pdf',
    communicationScore: null,
    technicalScore: null,
    experienceScore: null,
    culturalFitScore: null,
    overallScore: null,
    rank: null,
    previousRank: null,
    interviewDate: '2023-05-22',
    resumeSkills: [],
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    improvements: [],
    notes: 'Pending analysis...',
    isAnalyzing: false,
    analyzed: false,
    resumeQuality: null,
    skillsMatch: null,
    factCheckingResults: null,
    analysisProgress: 0,
    currentAnalysisStep: ''
  },
  {
    id: 5,
    name: 'Priya Patel',
    position: 'Marketing Head',
    department: 'Marketing',
    videoFile: 'interview_priya_may_25.mp4',
    resumeFile: 'priya_patel_resume.pdf',
    communicationScore: null,
    technicalScore: null,
    experienceScore: null,
    culturalFitScore: null,
    overallScore: null,
    rank: null,
    previousRank: null,
    interviewDate: '2023-05-25',
    resumeSkills: [],
    matchedSkills: [],
    missingSkills: [],
    strengths: [],
    improvements: [],
    notes: 'Pending analysis...',
    isAnalyzing: false,
    analyzed: false,
    resumeQuality: null,
    skillsMatch: null,
    factCheckingResults: null,
    analysisProgress: 0,
    currentAnalysisStep: ''
  },
];

// Analysis steps with longer durations
const ANALYSIS_STEPS = [
  { step: 'Initializing AI models...', duration: 2000 },
  { step: 'Processing video content...', duration: 3500 },
  { step: 'Analyzing facial expressions...', duration: 2800 },
  { step: 'Extracting audio features...', duration: 3200 },
  { step: 'Converting speech to text...', duration: 4000 },
  { step: 'Parsing resume content...', duration: 2500 },
  { step: 'Cross-referencing databases...', duration: 4500 },
  { step: 'Fact-checking claims...', duration: 5000 },
  { step: 'Verifying employment history...', duration: 3800 },
  { step: 'Analyzing communication patterns...', duration: 3000 },
  { step: 'Scoring technical competency...', duration: 2700 },
  { step: 'Evaluating cultural fit...', duration: 2200 },
  { step: 'Generating insights...', duration: 2000 },
  { step: 'Compiling final report...', duration: 1500 }
];

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [animatingRows, setAnimatingRows] = useState([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // Added missing state
  const tableRef = useRef(null);
  const itemsPerPage = 10;

  // Enhanced filtering and sorting with animation support
  const filteredAndSortedData = React.useMemo(() => {
    let filteredData = data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'all' || item.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    });

    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] === null && b[sortConfig.key] === null) return 0;
        if (a[sortConfig.key] === null) return 1;
        if (b[sortConfig.key] === null) return -1;
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [data, sortConfig, searchTerm, filterDepartment]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const departments = ['all', ...new Set(data.map(item => item.department))];

  // Enhanced analyze function with detailed progress and fact-checking
  const analyzeCandidate = async (candidateIndex) => {
    const candidate = data[candidateIndex];
    
    // Set analyzing state
    setData(prevData => 
      prevData.map((item, index) => 
        index === candidateIndex ? { 
          ...item, 
          isAnalyzing: true, 
          analysisProgress: 0,
          currentAnalysisStep: 'Starting analysis...'
        } : item
      )
    );

    // Run through analysis steps with progress updates
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      const step = ANALYSIS_STEPS[i];
      
      // Update current step
      setData(prevData => 
        prevData.map((item, index) => 
          index === candidateIndex ? { 
            ...item, 
            currentAnalysisStep: step.step,
            analysisProgress: Math.round((i / ANALYSIS_STEPS.length) * 100)
          } : item
        )
      );

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }

    // Generate realistic analysis results with fact-checking
    const analysisTemplates = [
      { 
        communication: 92, 
        technical: 88, 
        experience: 95, 
        culturalFit: 90,
        resumeQuality: 85,
        skillsMatch: 90,
        resumeSkills: ['Product Management', 'Agile', 'Scrum', 'Data Analysis', 'Leadership'],
        matchedSkills: ['Product Management', 'Agile', 'Data Analysis'],
        missingSkills: ['Machine Learning', 'SQL'],
        strengths: ['Clear communication', 'Strong product knowledge', 'Excellent leadership', 'Resume well-structured'],
        improvements: ['More technical depth', 'Add quantified achievements', 'Include ML experience'],
        notes: 'Strong candidate with excellent product management background. Resume shows clear career progression. Interview demonstrated deep understanding of product strategy.',
        factCheckingResults: {
          overallCredibility: 92,
          totalClaims: 8,
          verifiedClaims: 7,
          falseClaims: 0,
          unverifiableClaims: 1,
          riskLevel: 'Low',
          detailedClaims: [
            {
              id: 1,
              claim: "Led product team of 12 people",
              status: 'verified',
              confidence: 95,
              sources: ['LinkedIn', 'Company Records'],
              evidence: 'Employment records confirm team leadership role'
            },
            {
              id: 2,
              claim: "Increased user engagement by 45%",
              status: 'verified',
              confidence: 88,
              sources: ['Performance Reports', 'Analytics Data'],
              evidence: 'Company analytics show 44.7% engagement increase during tenure'
            },
            {
              id: 3,
              claim: "MBA from Stanford University",
              status: 'verified',
              confidence: 100,
              sources: ['University Database', 'Degree Verification'],
              evidence: 'Degree confirmed through official channels'
            },
            {
              id: 4,
              claim: "Launched 5 successful products",
              status: 'partially_verified',
              confidence: 75,
              sources: ['Product Launch Records'],
              evidence: '4 confirmed product launches, 1 pending verification'
            }
          ]
        }
      },
      { 
        communication: 85, 
        technical: 76, 
        experience: 89, 
        culturalFit: 82,
        resumeQuality: 78,
        skillsMatch: 75,
        resumeSkills: ['Sales', 'CRM', 'Negotiation', 'Team Management', 'B2B Sales'],
        matchedSkills: ['Sales', 'CRM', 'Team Management'],
        missingSkills: ['Digital Marketing', 'Analytics'],
        strengths: ['Persuasive communication', 'Strong sales track record', 'Good team leadership'],
        improvements: ['Better technical knowledge', 'Quantify sales achievements better', 'Add digital skills'],
        notes: 'Experienced sales professional with proven track record. Resume could better highlight quantified achievements. Strong interpersonal skills evident in interview.',
        factCheckingResults: {
          overallCredibility: 78,
          totalClaims: 6,
          verifiedClaims: 4,
          falseClaims: 1,
          unverifiableClaims: 1,
          riskLevel: 'Medium',
          detailedClaims: [
            {
              id: 1,
              claim: "Achieved 150% of sales target",
              status: 'verified',
              confidence: 92,
              sources: ['Sales Reports', 'Performance Reviews'],
              evidence: 'Sales records confirm 148% target achievement'
            },
            {
              id: 2,
              claim: "Top performer for 3 consecutive years",
              status: 'false',
              confidence: 85,
              sources: ['HR Records', 'Performance Rankings'],
              evidence: 'Records show top 5 performance for 2 years, not 3'
            }
          ]
        }
      },
      { 
        communication: 78, 
        technical: 92, 
        experience: 84, 
        culturalFit: 88,
        resumeQuality: 90,
        skillsMatch: 85,
        resumeSkills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems'],
        matchedSkills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
        missingSkills: ['Frontend Development'],
        strengths: ['Excellent design skills', 'Strong portfolio', 'User-centered approach', 'Well-formatted resume'],
        improvements: ['Louder voice in presentations', 'Add development skills', 'More leadership examples'],
        notes: 'Outstanding design portfolio and technical skills. Resume is well-organized and showcases projects effectively. Needs to project more confidence in presentations.',
        factCheckingResults: {
          overallCredibility: 95,
          totalClaims: 7,
          verifiedClaims: 7,
          falseClaims: 0,
          unverifiableClaims: 0,
          riskLevel: 'Low',
          detailedClaims: [
            {
              id: 1,
              claim: "Designed award-winning mobile app",
              status: 'verified',
              confidence: 98,
              sources: ['Design Awards Database', 'App Store Records'],
              evidence: 'App won UX Design Award 2023'
            },
            {
              id: 2,
              claim: "Improved user satisfaction by 60%",
              status: 'verified',
              confidence: 90,
              sources: ['User Research Data', 'Analytics'],
              evidence: 'User satisfaction scores increased from 3.2 to 5.1'
            }
          ]
        }
      },
      { 
        communication: 90, 
        technical: 95, 
        experience: 91, 
        culturalFit: 87,
        resumeQuality: 92,
        skillsMatch: 95,
        resumeSkills: ['Python', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'System Architecture'],
        matchedSkills: ['Python', 'AWS', 'Docker', 'Kubernetes', 'System Architecture'],
        missingSkills: ['Blockchain'],
        strengths: ['Deep technical expertise', 'Strong architecture skills', 'Excellent resume format', 'Clear technical explanations'],
        improvements: ['Simplify explanations for non-technical audience', 'Add blockchain experience'],
        notes: 'Exceptional technical leader with comprehensive experience. Resume demonstrates strong technical depth and leadership progression. Excellent problem-solving approach.',
        factCheckingResults: {
          overallCredibility: 88,
          totalClaims: 9,
          verifiedClaims: 8,
          falseClaims: 0,
          unverifiableClaims: 1,
          riskLevel: 'Low',
          detailedClaims: [
            {
              id: 1,
              claim: "Led migration to microservices architecture",
              status: 'verified',
              confidence: 94,
              sources: ['Technical Documentation', 'Code Repository'],
              evidence: 'Migration project documented and completed successfully'
            },
            {
              id: 2,
              claim: "Reduced system downtime by 90%",
              status: 'verified',
              confidence: 87,
              sources: ['System Monitoring Logs', 'Performance Reports'],
              evidence: 'Downtime reduced from 2.5% to 0.25%'
            }
          ]
        }
      },
      { 
        communication: 82, 
        technical: 79, 
        experience: 87, 
        culturalFit: 85,
        resumeQuality: 80,
        skillsMatch: 82,
        resumeSkills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Brand Management'],
        matchedSkills: ['Digital Marketing', 'SEO', 'Analytics', 'Brand Management'],
        missingSkills: ['Performance Marketing', 'Marketing Automation'],
        strengths: ['Creative marketing approach', 'Strong brand understanding', 'Good analytical skills'],
        improvements: ['Add performance marketing skills', 'Better metrics presentation', 'Include automation tools'],
        notes: 'Creative marketer with solid brand experience. Resume shows diverse marketing background. Interview revealed strong strategic thinking but needs more technical marketing skills.',
        factCheckingResults: {
          overallCredibility: 83,
          totalClaims: 5,
          verifiedClaims: 4,
          falseClaims: 0,
          unverifiableClaims: 1,
          riskLevel: 'Low',
          detailedClaims: [
            {
              id: 1,
              claim: "Increased brand awareness by 200%",
              status: 'verified',
              confidence: 89,
              sources: ['Brand Survey Data', 'Marketing Analytics'],
              evidence: 'Brand awareness metrics show 198% increase'
            },
            {
              id: 2,
              claim: "Managed $2M marketing budget",
              status: 'unverifiable',
              confidence: 45,
              sources: ['Limited budget documentation'],
              evidence: 'Budget information not publicly available'
            }
          ]
        }
      }
    ];
    
    const template = analysisTemplates[candidateIndex] || analysisTemplates[0];
    const newScores = {
      communicationScore: Math.max(60, Math.min(100, template.communication + Math.floor(Math.random() * 10) - 5)),
      technicalScore: Math.max(60, Math.min(100, template.technical + Math.floor(Math.random() * 10) - 5)),
      experienceScore: Math.max(60, Math.min(100, template.experience + Math.floor(Math.random() * 10) - 5)),
      culturalFitScore: Math.max(60, Math.min(100, template.culturalFit + Math.floor(Math.random() * 10) - 5)),
      resumeQuality: Math.max(60, Math.min(100, template.resumeQuality + Math.floor(Math.random() * 10) - 5)),
      skillsMatch: Math.max(60, Math.min(100, template.skillsMatch + Math.floor(Math.random() * 10) - 5)),
      resumeSkills: template.resumeSkills,
      matchedSkills: template.matchedSkills,
      missingSkills: template.missingSkills,
      strengths: template.strengths,
      improvements: template.improvements,
      notes: template.notes,
      factCheckingResults: template.factCheckingResults
    };
    
    // Complete analysis
    setData(prevData => {
      const updatedData = prevData.map((dataItem, index) => {
        if (index === candidateIndex) {
          const newOverallScore = Math.round(
            (newScores.communicationScore + newScores.technicalScore + newScores.experienceScore + newScores.culturalFitScore) / 4
          );
          return {
            ...dataItem,
            ...newScores,
            overallScore: newOverallScore,
            isAnalyzing: false,
            analyzed: true,
            previousRank: dataItem.rank,
            analysisProgress: 100,
            currentAnalysisStep: 'Analysis Complete'
          };
        }
        return dataItem;
      });
      
      return updatedData;
    });
    
    setAnimatingRows(prev => prev.filter(id => id !== candidate.id));
  };

  // Enhanced analyze function with resume analysis
  const handleAnalyzeAll = async () => {
    setIsAnalyzing(true);
    setHasAnalyzed(true);
    
    // Analyze each candidate with staggered timing
    for (let i = 0; i < data.length; i++) {
      setTimeout(() => {
        setAnimatingRows(prev => [...prev, data[i].id]);
        analyzeCandidate(i);
      }, i * 1000); // Stagger start times by 1 second
    }
    
    // Wait for all analyses to complete, then sort
    setTimeout(() => {
      setIsAnalyzing(false);
      setTimeout(() => {
        triggerSortingAnimation();
      }, 2000);
    }, data.length * 1000 + 45000); // Total time for all analyses
  };

  // Function to handle sorting animation
  const triggerSortingAnimation = () => {
    setIsSorting(true);
    
    setData(prevData => {
      const analyzedItems = prevData.filter(item => item.analyzed);
      const sorted = [...analyzedItems].sort((a, b) => b.overallScore - a.overallScore);
      
      const rankedData = prevData.map(item => {
        if (item.analyzed) {
          const rankIndex = sorted.findIndex(sortedItem => sortedItem.id === item.id);
          return {
            ...item,
            rank: rankIndex + 1,
            rankChange: item.previousRank ? item.previousRank - (rankIndex + 1) : 0,
          };
        }
        return item;
      });
      
      return rankedData.sort((a, b) => {
        if (a.rank === null && b.rank === null) return 0;
        if (a.rank === null) return 1;
        if (b.rank === null) return -1;
        return a.rank - b.rank;
      });
    });
    
    setSortConfig({ key: 'rank', direction: 'asc' });
    
    setTimeout(() => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
      setIsSorting(false);
    }, 1000);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getScoreColor = (score) => {
    if (score === null) return 'bg-gray-100 text-gray-500 border-gray-200';
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getScoreIcon = (score) => {
    if (score === null) return <Clock className="h-4 w-4 text-gray-400" />;
    if (score >= 90) return <Star className="h-4 w-4 text-emerald-500" />;
    if (score >= 80) return <Smile className="h-4 w-4 text-blue-500" />;
    if (score >= 70) return <Meh className="h-4 w-4 text-yellow-500" />;
    return <Frown className="h-4 w-4 text-red-500" />;
  };

  const getRankBadge = (rank) => {
    if (rank === null) return 'bg-gray-100 text-gray-500';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
    return 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700';
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const toggleRowExpand = (id) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openEmployeeModal = (employee, e) => {
    e.stopPropagation();
    if (!employee.analyzed) {
      alert('Please run analysis first to view detailed scores.');
      return;
    }
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Interview & Resume Analytics
                </h1>
                <p className="text-slate-600 text-lg">Comprehensive candidate evaluation with resume analysis & fact-checking</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    {data.length} Candidates
                  </span>
                  <span className="flex items-center">
                    <FileCheck className="h-4 w-4 mr-1" />
                    Resume Analysis
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Fact Checking
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {isSorting ? 'Sorting Results...' : hasAnalyzed ? 'Analysis Complete' : 'Ready for Analysis'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyzeAll}
                  disabled={isAnalyzing || isSorting}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                    isAnalyzing || isSorting
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : isSorting ? (
                    <>
                      <ArrowUp className="mr-2 h-5 w-5 animate-bounce" />
                      Sorting...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      {hasAnalyzed ? 'Re-analyze All' : 'Analyze All'}
                    </>
                  )}
                </motion.button>
{/*                 
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                    isUploading
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isUploading ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Resume & Video
                    </>
                  )}
                </motion.button> */}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none min-w-[200px]"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept === 'all' ? 'All Departments' : dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Table */}
            <div ref={tableRef} className="bg-white rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <tr>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          <span>Rank</span>
                          {isSorting && <RefreshCw className="h-4 w-4 animate-spin text-purple-500" />}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-blue-500" />
                          <span>Candidate</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Mic className="h-4 w-4 text-green-500" />
                          <span>Communication</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <BarChart2 className="h-4 w-4 text-blue-500" />
                          <span>Technical</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span>Experience</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-purple-500" />
                          <span>Cultural Fit</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => requestSort('overallScore')}>
                          <Star className="h-4 w-4 text-indigo-500" />
                          <span>Overall</span>
                          {sortConfig.key === 'overallScore' && (
                            <ArrowUp className={`h-4 w-4 transition-transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    <AnimatePresence>
                      {paginatedData.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          layout
                          layoutId={`row-${item.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: animatingRows.includes(item.id) ? 1.02 : 1,
                            boxShadow: animatingRows.includes(item.id) ? '0 10px 25px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)'
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            layout: { duration: 0.8, ease: "easeInOut" },
                            opacity: { duration: 0.3 },
                            y: { duration: 0.3 },
                            delay: isSorting ? index * 0.1 : index * 0.05,
                            type: "spring",
                            stiffness: 100
                          }}
                          className={`hover:bg-slate-50/50 cursor-pointer transition-all duration-200 ${
                            expandedRows.includes(item.id) ? 'bg-blue-50/30' : ''
                          } ${
                            item.isAnalyzing ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''
                          } ${
                            item.rank === 1 && hasAnalyzed ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400' : ''
                          }`}
                          onClick={() => toggleRowExpand(item.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                animate={item.isAnalyzing ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankBadge(item.rank)}`}
                              >
                                {item.rank || '-'}
                              </motion.div>
                              {item.rankChange > 0 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"
                                >
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                  <span className="text-xs font-medium">{item.rankChange}</span>
                                </motion.div>
                              )}
                              {item.rank === 1 && hasAnalyzed && (
                                <motion.div
                                  animate={{ 
                                    rotate: [0, 15, -15, 0],
                                    scale: [1, 1.2, 1]
                                  }}
                                  transition={{ 
                                    repeat: Infinity, 
                                    duration: 2,
                                    scale: { duration: 0.5 }
                                  }}
                                  className="text-amber-500"
                                >
                                  <Trophy className="h-5 w-5" />
                                </motion.div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 relative">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                                  {item.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {item.isAnalyzing && (
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full flex items-center justify-center"
                                  >
                                    <RefreshCw className="h-2 w-2 text-white" />
                                  </motion.div>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                                <div className="text-sm text-slate-500">{item.position}</div>
                                <div className="text-xs text-slate-400 flex items-center space-x-2">
                                  <span>{item.department}</span>
                                  {item.resumeFile && (
                                    <>
                                      <span>•</span>
                                      <FileText className="h-3 w-3" />
                                      <span>Resume</span>
                                    </>
                                  )}
                                  {item.isAnalyzing && (
                                    <>
                                      <span>•</span>
                                      <span className="text-purple-600 font-medium">{item.analysisProgress}%</span>
                                    </>
                                  )}
                                </div>
                                {item.isAnalyzing && (
                                  <div className="text-xs text-purple-600 mt-1 font-medium">
                                    {item.currentAnalysisStep}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getScoreIcon(item.communicationScore)}
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getScoreColor(item.communicationScore)}`}>
                                {item.communicationScore ? `${item.communicationScore}%` : 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getScoreIcon(item.technicalScore)}
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getScoreColor(item.technicalScore)}`}>
                                {item.technicalScore ? `${item.technicalScore}%` : 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getScoreIcon(item.experienceScore)}
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getScoreColor(item.experienceScore)}`}>
                                {item.experienceScore ? `${item.experienceScore}%` : 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getScoreIcon(item.culturalFitScore)}
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getScoreColor(item.culturalFitScore)}`}>
                                {item.culturalFitScore ? `${item.culturalFitScore}%` : 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getScoreIcon(item.overallScore)}
                              <motion.span 
                                animate={item.isAnalyzing ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className={`px-3 py-1 text-sm font-bold rounded-full border-2 ${getScoreColor(item.overallScore)}`}
                              >
                                {item.overallScore ? `${item.overallScore}%` : 'Pending'}
                              </motion.span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => openEmployeeModal(item, e)}
                                disabled={!item.analyzed}
                                className={`px-3 py-1 rounded-lg transition-all ${
                                  item.analyzed 
                                    ? 'text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100' 
                                    : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                                }`}
                              >
                                <Play className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRowExpand(item.id);
                                }}
                                className="text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-lg transition-all"
                              >
                                <motion.div
                                  animate={{ rotate: expandedRows.includes(item.id) ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </motion.div>
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> of{' '}
                        <span className="font-medium">{filteredAndSortedData.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <motion.button
                            key={page}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
                            } ${page === 1 ? 'rounded-l-lg' : ''} ${page === totalPages ? 'rounded-r-lg' : ''}`}
                          >
                            {page}
                          </motion.button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Expanded Row Details */}
        <AnimatePresence>
          {paginatedData.map((item) => (
            expandedRows.includes(item.id) && (
              <motion.div
                key={`expanded-${item.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Quick Stats */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center">
                        <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                        Quick Stats
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Interview Date:</span>
                          <span className="font-medium">{item.interviewDate}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Department:</span>
                          <span className="font-medium">{item.department}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.analyzed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.analyzed ? 'Analyzed' : 'Pending'}
                          </span>
                        </div>
                        {item.isAnalyzing && (
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-purple-700 font-medium">Analysis Progress:</span>
                              <span className="text-purple-800 font-bold">{item.analysisProgress}%</span>
                            </div>
                            <div className="w-full bg-purple-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.analysisProgress}%` }}
                              />
                            </div>
                            <p className="text-purple-600 text-sm mt-2">{item.currentAnalysisStep}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Files */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-purple-500" />
                        Uploaded Files
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                          <Video className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900">Interview Video</div>
                            <div className="text-sm text-slate-500">{item.videoFile}</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                          <FileText className="h-5 w-5 text-green-500 mr-3" />
                          <div>
                            <div className="font-medium text-slate-900">Resume</div>
                            <div className="text-sm text-slate-500">{item.resumeFile}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-amber-500" />
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => openEmployeeModal(item, e)}
                          disabled={!item.analyzed}
                          className={`w-full flex items-center justify-center p-3 rounded-lg font-medium transition-all ${
                            item.analyzed 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          View Details
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center p-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          View Fact Check
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Preview */}
                  {item.analyzed && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-indigo-500" />
                        Analysis Preview
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-slate-700 mb-3">Top Strengths</h5>
                          <div className="space-y-2">
                            {item.strengths?.slice(0, 3).map((strength, i) => (
                              <div key={i} className="flex items-center p-2 bg-green-50 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span className="text-sm text-green-800">{strength}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-700 mb-3">Key Improvements</h5>
                          <div className="space-y-2">
                            {item.improvements?.slice(0, 3).map((improvement, i) => (
                              <div key={i} className="flex items-center p-2 bg-amber-50 rounded-lg">
                                <ArrowUp className="h-4 w-4 text-amber-500 mr-2" />
                                <span className="text-sm text-amber-800">{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Enhanced Modal with Fact-Checking Details */}
        <AnimatePresence>
          {isModalOpen && selectedEmployee && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {selectedEmployee.name}
                        </h3>
                        <p className="text-slate-600">
                          {selectedEmployee.position} • {selectedEmployee.department}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center text-sm text-slate-500">
                            <FileText className="h-4 w-4 mr-1" />
                            {selectedEmployee.resumeFile}
                          </span>
                          <span className="flex items-center text-sm text-slate-500">
                            <Video className="h-4 w-4 mr-1" />
                            {selectedEmployee.videoFile}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getScoreColor(selectedEmployee.overallScore)}`}>
                        Overall: {selectedEmployee.overallScore}%
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={closeModal}
                        className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-all"
                      >
                        <XCircle className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Enhanced Tabs for Different Sections */}
                  <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-xl">
                    {['overview', 'interview', 'resume', 'factcheck'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                          activeTab === tab
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab === 'factcheck' ? 'Fact Check' : tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Interview Scores */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-lg flex items-center">
                          <Mic className="h-5 w-5 mr-2 text-blue-500" />
                          Interview Performance
                        </h4>
                        <div className="space-y-4">
                          {[
                            { label: 'Communication', score: selectedEmployee.communicationScore, icon: Mic },
                            { label: 'Technical Skills', score: selectedEmployee.technicalScore, icon: BarChart2 },
                            { label: 'Experience', score: selectedEmployee.experienceScore, icon: CheckCircle },
                            { label: 'Cultural Fit', score: selectedEmployee.culturalFitScore, icon: Activity }
                          ].map(({ label, score, icon: Icon }) => (
                            <div key={label} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-5 w-5 text-blue-500" />
                                  <span className="font-medium text-slate-700">{label}</span>
                                </div>
                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(score)}`}>
                                  {score}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-3">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${score}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className={`h-3 rounded-full ${
                                    score >= 90 ? 'bg-emerald-500' :
                                    score >= 80 ? 'bg-blue-500' :
                                    score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Resume Analysis */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-lg flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-500" />
                          Resume Analysis
                        </h4>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Resume Quality:</span>
                            <span className={`px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(selectedEmployee.resumeQuality)}`}>
                              {selectedEmployee.resumeQuality}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Skills Match:</span>
                            <span className={`px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(selectedEmployee.skillsMatch)}`}>
                              {selectedEmployee.skillsMatch}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                            <h5 className="font-medium text-blue-800 mb-2">Resume Skills</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.resumeSkills?.map((skill, i) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                            <h5 className="font-medium text-emerald-800 mb-2">Matched Skills</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.matchedSkills?.map((skill, i) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                            <h5 className="font-medium text-red-800 mb-2">Missing Skills</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.missingSkills?.map((skill, i) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overall Assessment */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900 text-lg flex items-center">
                          <Award className="h-5 w-5 mr-2 text-amber-500" />
                          Overall Assessment
                        </h4>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Interview Date:</span>
                            <span className="font-medium">{selectedEmployee.interviewDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Current Rank:</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-sm font-bold ${getRankBadge(selectedEmployee.rank)}`}>
                                #{selectedEmployee.rank}
                              </span>
                              {selectedEmployee.rankChange > 0 && (
                                <span className="text-emerald-600 text-sm font-medium flex items-center">
                                  <ArrowUp className="h-3 w-3 mr-1" />
                                  {selectedEmployee.rankChange}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                            <h5 className="font-medium text-emerald-800 mb-2">Strengths</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.strengths?.map((strength, i) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                            <h5 className="font-medium text-amber-800 mb-2">Areas for Improvement</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedEmployee.improvements?.map((improvement, i) => (
                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                                  {improvement}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Fact-Checking Tab */}
                  {activeTab === 'factcheck' && selectedEmployee.factCheckingResults && (
                    <div className="space-y-6">
                      {/* Fact-Checking Overview */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-slate-900 flex items-center">
                            <Shield className="h-6 w-6 mr-3 text-blue-600" />
                            Fact-Checking Analysis
                          </h4>
                          <div className="flex items-center space-x-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${getScoreColor(selectedEmployee.factCheckingResults.overallCredibility)}`}>
                              Credibility: {selectedEmployee.factCheckingResults.overallCredibility}%
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              selectedEmployee.factCheckingResults.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                              selectedEmployee.factCheckingResults.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              Risk: {selectedEmployee.factCheckingResults.riskLevel}
                            </span>
                          </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">{selectedEmployee.factCheckingResults.totalClaims}</div>
                            <div className="text-sm text-blue-700">Total Claims</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                            <div className="text-2xl font-bold text-green-600">{selectedEmployee.factCheckingResults.verifiedClaims}</div>
                            <div className="text-sm text-green-700">Verified</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                            <div className="text-2xl font-bold text-red-600">{selectedEmployee.factCheckingResults.falseClaims}</div>
                            <div className="text-sm text-red-700">False</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                            <div className="text-2xl font-bold text-yellow-600">{selectedEmployee.factCheckingResults.unverifiableClaims}</div>
                            <div className="text-sm text-yellow-700">Unverifiable</div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Claims Analysis */}
                      <div>
                        <h5 className="text-lg font-semibold text-slate-900 mb-4">Detailed Claims Analysis</h5>
                        <div className="space-y-4">
                          {selectedEmployee.factCheckingResults.detailedClaims?.map((claim) => (
                            <div key={claim.id || claim.claim} className={`border-l-4 p-6 rounded-r-xl ${
                              claim.status === 'verified' ? 'border-green-500 bg-green-50' :
                              claim.status === 'false' ? 'border-red-500 bg-red-50' :
                              'border-yellow-500 bg-yellow-50'
                            }`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      claim.status === 'verified' ? 'bg-green-100 text-green-800' :
                                      claim.status === 'false' ? 'bg-red-100 text-red-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {claim.status.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-500">Category: {claim.category || 'General'}</span>
                                  </div>
                                  <p className="text-slate-800 font-medium mb-3 text-lg">"{claim.claim}"</p>
                                  <p className="text-sm text-slate-600 mb-3">{claim.evidence}</p>
                                </div>
                                <div className="ml-4 text-right">
                                  <div className="text-sm font-semibold text-slate-700">Confidence</div>
                                  <div className={`text-2xl font-bold ${
                                    claim.confidence >= 90 ? 'text-green-600' :
                                    claim.confidence >= 70 ? 'text-blue-600' :
                                    claim.confidence >= 50 ? 'text-yellow-600' : 'text-red-600'
                                  }`}>
                                    {claim.confidence}%
                                  </div>
                                </div>
                              </div>
                              
                              {/* Sources */}
                              <div className="mt-4">
                                <div className="text-xs text-slate-500 mb-2">Verification Sources:</div>
                                <div className="flex flex-wrap gap-2">
                                  {claim.sources?.map((source, index) => (
                                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                                      {source}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Analysis Notes */}
                  <div className="mt-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h5 className="font-medium text-slate-900 mb-3 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-slate-600" />
                      Detailed Analysis Notes
                    </h5>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedEmployee.notes}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                    >
                      <CheckCircle className="h-5 w-5 inline mr-2" />
                      Approve Candidate
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                    >
                      <FileText className="h-5 w-5 inline mr-2" />
                      Schedule Interview
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg"
                    >
                      <Download className="h-5 w-5 inline mr-2" />
                      Download Report
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Candidates</p>
                <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Analyzed</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data.filter(item => item.analyzed).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Avg Score</p>
                <p className="text-2xl font-bold text-slate-900">
                  {data.filter(item => item.analyzed).length > 0 
                    ? Math.round(
                        data
                          .filter(item => item.analyzed)
                          .reduce((sum, item) => sum + item.overallScore, 0) / 
                        data.filter(item => item.analyzed).length
                      )
                    : '-'
                  }%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Top Performer</p>
                <p className="text-lg font-bold text-slate-900">
                  {data.find(item => item.rank === 1)?.name.split(' ')[0] || '-'}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
