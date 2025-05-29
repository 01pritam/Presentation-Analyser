import React, { useEffect, useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { ShieldCheck } from 'lucide-react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Search, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

export default function FactCheckResults() {
  const {
    audioBlob,
    pptFile,
    transcript,
    setTranscript,
    factCheck,
    setFactCheck
  } = useAnalysis();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parsedFactCheck, setParsedFactCheck] = useState([]);
  const [summary, setSummary] = useState('');
  const [activeTab, setActiveTab] = useState('fact-check');
  const [showDetails, setShowDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchFactCheck = async () => {
      if (!audioBlob || !pptFile) return;

      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        formData.append('pptx', pptFile);

        const res = await fetch('https://factchecker-9056.onrender.com/factcheck', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setTranscript(data.transcript);
        setFactCheck(data.factCheck);
        // localStorage.setItem('factCheckData', JSON.stringify(data));
      } catch (err) {
        setError(err.message || 'Failed to fetch fact check results');
      } finally {
        setIsLoading(false);
      }
    };

    if (!factCheck && audioBlob && pptFile) {
      fetchFactCheck();
    }
  }, [audioBlob, pptFile, factCheck, setFactCheck, setTranscript]);

  // Parse fact check data when it's available.
  // If factCheck is a string that starts with "**" and ends with "**", consider it a summary.
  useEffect(() => {
    if (factCheck) {
      if (typeof factCheck === 'string') {
        const trimmed = factCheck.trim();
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          setSummary(trimmed.slice(2, -2).trim());
          setParsedFactCheck([]); // Clear parsed facts if summary exists.
          return;
        }
      }
      try {
        // If factCheck is a string (but not a summary), try to parse it as a structured format.
        const parsed = typeof factCheck === 'string' 
          ? parseFactCheckString(factCheck) 
          : Array.isArray(factCheck) ? factCheck : [];
          
        setParsedFactCheck(parsed);
        setSummary('');
        
        // Initialize showDetails state for accordion
        const details = {};
        parsed.forEach((_, index) => {
          details[index] = false;
        });
        setShowDetails(details);
      } catch (err) {
        console.error('Error parsing fact check data:', err);
        setParsedFactCheck([]);
      }
    }
  }, [factCheck]);

  // Function to parse fact check string
  const parseFactCheckString = (factCheckStr) => {
    // This regex looks for patterns like "* **Claim:** Text **Classification:** Status **Explanation:** Text"
    const regex = /\*\s\*\*Claim:\*\*\s(.+?)\s+\*\*Classification:\*\*\s(.+?)\s+\*\*Explanation:\*\*\s(.+?)(?=\n\n|\n\*|\*\*|$)/gs;
    let match;
    const facts = [];
    
    while ((match = regex.exec(factCheckStr)) !== null) {
      const claim = match[1].trim();
      const status = match[2].trim();
      const explanation = match[3].trim();
      
      facts.push({
        claim,
        status,
        explanation,
        verificationStatus: determineStatus(status)
      });
    }
    
    // If no structured facts were found, provide the raw string as a single fact.
    if (facts.length === 0 && factCheckStr.trim().length > 0) {
      facts.push({
        claim: "Unstructured Result",
        explanation: factCheckStr,
        status: "Unknown",
        verificationStatus: 'unknown'
      });
    }
    
    return facts;
  };

  // Helper function to determine verification status.
  const determineStatus = (statusText) => {
    statusText = statusText.toLowerCase();
    
    if (statusText.includes('correct')) {
      return 'verified';
    } else if (statusText.includes('incorrect') || statusText.includes('false')) {
      return 'false';
    } else if (statusText.includes('misleading') || statusText.includes('partial')) {
      return 'partial';
    } else {
      return 'unknown';
    }
  };

  // Function to safely escape regex special characters.
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Function to highlight keywords in transcript.
  const highlightTranscript = (text) => {
    if (!text) return '';
    
    // Create a set of keywords from parsed fact check.
    const keywords = new Set();
    parsedFactCheck.forEach(fact => {
      if (fact.claim) {
        const potentialKeywords = fact.claim
          .split(/\s+/)
          .filter(word => word.length > 3)
          .map(word => word.replace(/[.,!?;:()"']/g, '').toLowerCase());
        
        potentialKeywords.forEach(word => {
          if (word && !['when', 'what', 'where', 'which', 'that', 'with', 'from', 'this', 'these', 'those', 'then', 'than'].includes(word)) {
            keywords.add(escapeRegExp(word));
          }
        });
      }
    });
    
    if (keywords.size > 0 && text) {
      let highlightedText = text;
      keywords.forEach(keyword => {
        if (keyword && keyword.length > 0) {
          try {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark class="bg-amber-100 dark:bg-amber-700 px-1 rounded">$1</mark>');
          } catch (e) {
            console.error(`Invalid regex pattern for keyword: ${keyword}`, e);
          }
        }
      });
      return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    }
    
    return <span className="whitespace-pre-line">{text}</span>;
  };

  // Function to render status icon based on verification status.
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="text-emerald-500 mr-2" size={20} />;
      case 'false':
        return <XCircle className="text-rose-500 mr-2" size={20} />;
      case 'partial':
        return <AlertTriangle className="text-amber-500 mr-2" size={20} />;
      default:
        return <AlertCircle className="text-slate-400 mr-2" size={20} />;
    }
  };

  // Function to get style classes based on status.
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'verified':
//         return {
//           bg: 'bg-emerald-50 dark:bg-emerald-900/30',
//           border: 'border-emerald-200 dark:border-emerald-700',
//           header: 'bg-emerald-100/50 dark:bg-emerald-800/40',
//           text: 'text-emerald-800 dark:text-emerald-100',
//           hover: 'hover:bg-emerald-100 dark:hover:bg-emerald-800/60'
//         };
//       case 'false':
//         return {
//           bg: 'bg-rose-50 dark:bg-rose-900/30',
//           border: 'border-rose-200 dark:border-rose-700',
//           header: 'bg-rose-100/50 dark:bg-rose-800/40',
//           text: 'text-rose-800 dark:text-rose-100',
//           hover: 'hover:bg-rose-100 dark:hover:bg-rose-800/60'
//         };
//       case 'partial':
//         return {
//           bg: 'bg-amber-50 dark:bg-amber-900/30',
//           border: 'border-amber-200 dark:border-amber-700',
//           header: 'bg-amber-100/50 dark:bg-amber-800/40', 
//           text: 'text-amber-800 dark:text-amber-100',
//           hover: 'hover:bg-amber-100 dark:hover:bg-amber-800/60'
//         };
//       default:
//         return {
//           bg: 'bg-slate-50 dark:bg-slate-800/30',
//           border: 'border-slate-200 dark:border-slate-700',
//           header: 'bg-slate-100/50 dark:bg-slate-700/40',
//           text: 'text-slate-700 dark:text-slate-200',
//           hover: 'hover:bg-slate-100 dark:hover:bg-slate-700/60'
//         };
//     }
//   };

  // Toggle accordion item.
  const toggleDetails = (index) => {
    setShowDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter facts based on search and status filter.
  const getFilteredFacts = () => {
    return parsedFactCheck.filter(fact => {
      const matchesSearch = searchQuery === '' || 
        fact.claim.toLowerCase().includes(searchQuery.toLowerCase()) || 
        fact.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || fact.verificationStatus === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Calculate stats for the summary.
  const calculateStats = () => {
    const total = parsedFactCheck.length;
    const verified = parsedFactCheck.filter(fact => fact.verificationStatus === 'verified').length;
    const incorrect = parsedFactCheck.filter(fact => fact.verificationStatus === 'false').length;
    const partial = parsedFactCheck.filter(fact => fact.verificationStatus === 'partial').length;
    const unknown = parsedFactCheck.filter(fact => fact.verificationStatus === 'unknown').length;
    
    return { total, verified, incorrect, partial, unknown };
  };

  // Render fact check cards.
//   const renderFactChecks = () => {
//     const filteredFacts = getFilteredFacts();
    
//     if (filteredFacts.length === 0) {
//       return (
//         <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
//           <AlertCircle className="mx-auto text-slate-400 mb-3" size={32} />
//           <p className="text-slate-600 dark:text-slate-300">No matching results found.</p>
//         </div>
//       );
//     }
    
//     return (
//       <div className="space-y-4">
//         {filteredFacts.map((fact, index) => {
//           const style = getStatusStyle(fact.verificationStatus);
          
//           return (
//             <div 
//               key={index} 
//               className={`border rounded-lg shadow-sm transition-all ${style.bg} ${style.border}`}
//             >
//               <div 
//                 className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${style.header} rounded-t-lg ${style.hover}`}
//                 onClick={() => toggleDetails(index)}
//               >
//                 <div className="flex items-center pr-4">
//                   {renderStatusIcon(fact.verificationStatus)}
//                   <h4 className={`font-medium ${style.text} line-clamp-1`}>
//                     {fact.claim}
//                   </h4>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="text-xs font-medium uppercase px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-700 border border-current mr-2 text-opacity-90 dark:text-opacity-90 whitespace-nowrap" 
//                     style={{
//                       color: fact.verificationStatus === 'verified' ? '#10b981' : 
//                             fact.verificationStatus === 'false' ? '#f43f5e' : 
//                             fact.verificationStatus === 'partial' ? '#f59e0b' : '#94a3b8'
//                     }}>
//                     {fact.status}
//                   </span>
//                   {showDetails[index] ? 
//                     <ChevronUp size={18} className="text-slate-500" /> : 
//                     <ChevronDown size={18} className="text-slate-500" />
//                   }
//                 </div>
//               </div>
              
//               {showDetails[index] && (
//                 <div className={`p-4 ${style.bg} rounded-b-lg text-slate-700 dark:text-slate-200`}>
//                   <div className="flex items-start mb-3">
//                     <Info size={16} className="text-slate-400 mr-2 mt-0.5" />
//                     <div>
//                       <h5 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Explanation</h5>
//                       <p className="text-sm">{fact.explanation}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // Render summary stats at top of results.
//   const renderSummary = () => {
//     const stats = calculateStats();
    
//     return (
//     //   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//     //     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
//     //       <div className="flex items-center mb-1">
//     //         <CheckCircle className="text-emerald-500 mr-2" size={16} />
//     //         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Verified</span>
//     //       </div>
//     //       <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.verified}</p>
//     //     </div>
        
//     //     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
//     //       <div className="flex items-center mb-1">
//     //         <XCircle className="text-rose-500 mr-2" size={16} />
//     //         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Incorrect</span>
//     //       </div>
//     //       <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">{stats.incorrect}</p>
//     //     </div>
        
//     //     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
//     //       <div className="flex items-center mb-1">
//     //         <AlertTriangle className="text-amber-500 mr-2" size={16} />
//     //         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Partial</span>
//     //       </div>
//     //       <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.partial}</p>
//     //     </div>
        
//     //     <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
//     //       <div className="flex items-center mb-1">
//     //         <AlertCircle className="text-slate-400 mr-2" size={16} />
//     //         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Total</span>
//     //       </div>
//     //       <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">{stats.total}</p>
//     //     </div>
//     //   </div>
//     );
//   };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex items-center mb-6">
        <ShieldCheck className="text-blue-600 mr-3" size={24} />
        <h2 className="text-2xl font-semibold text-gray-800">Fact Check</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
            <Search size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Fact Checking Results</h2>
        </div>
        {factCheck && !isLoading && !error && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('fact-check')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'fact-check' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              Results
            </button>
            <button 
              onClick={() => setActiveTab('transcript')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'transcript' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              Transcript
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-400 mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Analyzing presentation and checking facts...</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">This may take a moment</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl p-8 text-center shadow">
          <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mx-auto mb-4">
            <XCircle size={32} className="text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">Error Loading Results</h3>
          <p className="text-rose-600 dark:text-rose-400">{error}</p>
          <button className="mt-6 px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors shadow-sm">
            Try Again
          </button>
        </div>
      ) : factCheck ? (
        <>
          {summary && summary.length > 0 && (
            <div className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow border border-blue-200 dark:border-blue-700">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Summary</h3>
              <p className="text-blue-600 dark:text-blue-200">{summary}</p>
            </div>
          )}
          {activeTab === 'fact-check' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow">
              {renderSummary()}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0 mb-6">
                <div className="relative w-full sm:max-w-md">
                  <div className="absolute inset-y-0 left-2 flex items-center pl-1 pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search claims or explanations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Filter:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  >
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="false">Incorrect</option>
                    <option value="partial">Partially Correct</option>
                  </select>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[600px] pr-1">
                {renderFactChecks()}
              </div>
            </div>
          )}
          {activeTab === 'transcript' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-2">
                  <FileText className="text-blue-600 dark:text-blue-400" size={18} />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white">Transcript</h3>
              </div>
              <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 overflow-y-auto max-h-[600px] bg-slate-50 dark:bg-slate-700/20 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                {highlightTranscript(transcript)}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center shadow">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
            <Clock size={28} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Waiting for Analysis</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-lg mx-auto">
            Please upload both an audio file and presentation to begin fact checking.
          </p>
          <div className="inline-flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <div className={`px-4 py-2 rounded-full flex items-center ${
              audioBlob 
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600'
            }`}>
              {audioBlob 
                ? <CheckCircle className="mr-2" size={16} /> 
                : <AlertCircle className="mr-2" size={16} />
              }
              Audio: {audioBlob ? 'Uploaded' : 'Missing'}
            </div>
            <div className={`px-4 py-2 rounded-full flex items-center ${
              pptFile 
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600'
            }`}>
              {pptFile 
                ? <CheckCircle className="mr-2" size={16} /> 
                : <AlertCircle className="mr-2" size={16} />
              }
              Presentation: {pptFile ? 'Uploaded' : 'Missing'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



