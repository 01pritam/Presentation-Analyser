import React, { useState, useRef } from 'react';
import Upload from './Upload';

import { 
   FileText, Video, User, Mic, BarChart2, Activity, 
  Star, Trophy, CheckCircle, XCircle, Clock, Eye, Play,
  Download, Calendar, Award, TrendingUp, Zap, RefreshCw,
  Lock, Unlock, CreditCard, Check, X, ChevronDown, Info,
  ArrowUp, Filter, Search, Lightbulb, Target, Users,
  MapPin, Building, Globe, Briefcase, Heart, ArrowRight,
  ChevronLeft, Home, Menu, Bell, Settings
} from 'lucide-react';

// Professional Job Postings Data
const JOB_POSTINGS = [
  {
    id: 1,
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    companyLogo: "TC",
    department: "Product",
    location: "New York, NY",
    locationType: "On-site",
    postedDate: "2025-05-20",
    description: "Lead product teams and strategy for our flagship products. Drive product vision, roadmap, and execution across multiple product lines.",
    experience: "5+ years",
    employmentType: "Full-time",
    salary: "$120,000 - $160,000",
    skills: ["Product Strategy", "Agile", "Data Analysis", "Leadership", "Roadmapping", "User Research"],
    benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options", "Learning Budget"],
    applicants: 47,
    featured: true,
    urgentHiring: false,
    companySize: "500-1000",
    industry: "Technology"
  },
  {
    id: 2,
    title: "Sales Director",
    company: "SalesForce Pro",
    companyLogo: "SF",
    department: "Sales",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    postedDate: "2025-05-18",
    description: "Drive sales growth and manage high-performing sales teams across multiple regions. Build strategic partnerships and expand market presence.",
    experience: "7+ years",
    employmentType: "Full-time",
    salary: "$140,000 - $180,000",
    skills: ["Sales Management", "CRM", "Team Leadership", "B2B Sales", "Strategic Planning"],
    benefits: ["Commission", "Health Insurance", "Car Allowance", "Flexible Hours", "Performance Bonus"],
    applicants: 32,
    featured: false,
    urgentHiring: true,
    companySize: "1000+",
    industry: "Software"
  },
  {
    id: 3,
    title: "UX Design Lead",
    company: "Design Studio",
    companyLogo: "DS",
    department: "Design",
    location: "Remote",
    locationType: "Remote",
    postedDate: "2025-05-22",
    description: "Lead UX design and user research initiatives for cutting-edge digital products. Shape design systems and mentor junior designers.",
    experience: "4+ years",
    employmentType: "Full-time",
    salary: "$100,000 - $130,000",
    skills: ["UI/UX Design", "User Research", "Figma", "Prototyping", "Design Systems", "Usability Testing"],
    benefits: ["Remote Work", "Health Insurance", "Learning Budget", "Flexible PTO", "Equipment Allowance"],
    applicants: 89,
    featured: true,
    urgentHiring: false,
    companySize: "50-200",
    industry: "Design"
  },
  {
    id: 4,
    title: "Chief Technology Officer",
    company: "StartupX",
    companyLogo: "SX",
    department: "Engineering",
    location: "Austin, TX",
    locationType: "On-site",
    postedDate: "2025-05-15",
    description: "Oversee technology strategy and development for a fast-growing startup. Lead engineering teams and drive technical innovation.",
    experience: "10+ years",
    employmentType: "Full-time",
    salary: "$200,000 - $250,000",
    skills: ["System Architecture", "Team Leadership", "Cloud Computing", "AI/ML", "Strategic Planning"],
    benefits: ["Equity", "Health Insurance", "Unlimited PTO", "Tech Budget", "Stock Options"],
    applicants: 23,
    featured: true,
    urgentHiring: true,
    companySize: "10-50",
    industry: "Startup"
  },
  {
    id: 5,
    title: "Marketing Director",
    company: "BrandCorp",
    companyLogo: "BC",
    department: "Marketing",
    location: "Boston, MA",
    locationType: "Hybrid",
    postedDate: "2025-05-25",
    description: "Lead marketing campaigns and branding initiatives for global market expansion. Drive digital transformation and growth strategies.",
    experience: "6+ years",
    employmentType: "Full-time",
    salary: "$110,000 - $140,000",
    skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Content Marketing", "Growth Hacking"],
    benefits: ["Health Insurance", "Marketing Budget", "Conference Attendance", "Stock Options", "Flexible Work"],
    applicants: 56,
    featured: false,
    urgentHiring: false,
    companySize: "200-500",
    industry: "Marketing"
  },
  {
    id: 6,
    title: "Senior Data Scientist",
    company: "AI Innovations",
    companyLogo: "AI",
    department: "Engineering",
    location: "Seattle, WA",
    locationType: "Remote",
    postedDate: "2025-05-19",
    description: "Develop machine learning models and data-driven solutions for enterprise clients. Work with cutting-edge AI technologies.",
    experience: "3+ years",
    employmentType: "Full-time",
    salary: "$130,000 - $170,000",
    skills: ["Python", "Machine Learning", "SQL", "Statistics", "Deep Learning", "TensorFlow"],
    benefits: ["Remote Work", "Health Insurance", "Learning Stipend", "Equity", "Conference Budget"],
    applicants: 78,
    featured: false,
    urgentHiring: false,
    companySize: "100-500",
    industry: "AI/ML"
  }
];

// Professional Job Postings Page Component
const JobPostingsPage = ({ onNavigateToUpload }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // Get unique values for filters
  const departments = ['all', ...new Set(JOB_POSTINGS.map(job => job.department))];
  const locations = ['all', ...new Set(JOB_POSTINGS.map(job => job.locationType))];
  const types = ['all', ...new Set(JOB_POSTINGS.map(job => job.employmentType))];

  // Filter and sort jobs
  const filteredJobs = JOB_POSTINGS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment;
    const matchesLocation = filterLocation === 'all' || job.locationType === filterLocation;
    const matchesType = filterType === 'all' || job.employmentType === filterType;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'oldest':
        return new Date(a.postedDate) - new Date(b.postedDate);
      case 'salary':
        return parseInt(b.salary.split(' - ')[1].replace(/[^0-9]/g, '')) - 
               parseInt(a.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
      case 'applicants':
        return b.applicants - a.applicants;
      case 'featured':
        return b.featured - a.featured;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('all');
    setFilterLocation('all');
    setFilterType('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
   

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job with
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              AI-Powered Analysis
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Apply with confidence using our advanced interview analysis platform. 
            Get personalized feedback and improve your chances of success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
              Browse Jobs
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap lg:flex-nowrap gap-3">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[150px]"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>

                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[150px]"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Filter className="h-5 w-5" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="salary">Highest Salary</option>
                    <option value="applicants">Most Popular</option>
                    <option value="featured">Featured First</option>
                  </select>

                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {sortedJobs.length} Jobs Found
              </h2>
              <p className="text-gray-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedJobs.length)} of {sortedJobs.length} results
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Saved Jobs:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                {savedJobs.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedJobs.map((job) => (
              <div 
                key={job.id} 
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1 ${
                  job.featured ? 'ring-2 ring-blue-500 ring-opacity-20' : ''
                }`}
              >
                {/* Job Card Header */}
                <div className="relative">
                  {job.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Featured Job
                    </div>
                  )}
                  
                  {job.urgentHiring && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                      Urgent Hiring
                    </div>
                  )}
                </div>
                
                <div className={`p-6 ${job.featured ? 'pt-12' : ''}`}>
                  {/* Company Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                        {job.companyLogo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600 font-medium">{job.company}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-full transition-all ${
                        savedJobs.includes(job.id) 
                          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.locationType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.employmentType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Salary Highlight */}
                  <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-700">{job.salary}</span>
                      <span className="text-sm text-green-600">per year</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

                  {/* Skills Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.benefits.slice(0, 3).map((benefit, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                          {benefit}
                        </span>
                      ))}
                      {job.benefits.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{job.benefits.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {getTimeAgo(job.postedDate)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.applicants} applicants
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onNavigateToUpload(job)}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-16">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful candidates who used our AI-powered interview analysis to get hired.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
              Start Your Analysis
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all">
              View Success Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main App Component with Routing
const JobApplicationApp = () => {
  const [currentRoute, setCurrentRoute] = useState('/jobs'); // /jobs, /upload
  const [selectedJob, setSelectedJob] = useState(null);

  const handleNavigateToUpload = (job) => {
    setSelectedJob(job);
    setCurrentRoute('/upload');
  };

  const handleBackToJobs = () => {
    setCurrentRoute('/jobs');
    setSelectedJob(null);
  };

//   // Simple Upload Page Component
//   const UploadPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header with Back Button */}
//         <div className="flex items-center mb-8">
//           <button
//             onClick={handleBackToJobs}
//             className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-4"
//           >
//             <ChevronLeft className="h-5 w-5 mr-1" />
//             Back to Jobs
//           </button>
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Apply for Position</h1>
//             {selectedJob && (
//               <p className="text-gray-600">{selectedJob.title} at {selectedJob.company}</p>
//             )}
//           </div>
//         </div>

//         {/* Upload Interface */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Application Materials</h2>
//             <p className="text-gray-600">Upload your interview video and resume for AI-powered analysis</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Video Upload */}
//             <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer">
//               <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">Upload Interview Video</h3>
//               <p className="text-gray-600 mb-4">MP4, MOV, AVI formats supported</p>
//               <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                 Choose Video File
//               </button>
//             </div>

//             {/* Resume Upload */}
//             <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 transition-colors cursor-pointer">
//               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
//               <p className="text-gray-600 mb-4">PDF format recommended</p>
//               <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
//                 Choose Resume File
//               </button>
//             </div>
//           </div>

//           <div className="text-center mt-8">
//             <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
//               <Zap className="h-5 w-5 inline mr-2" />
//               Start AI Analysis
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

  return (
    <div>
      {currentRoute === '/jobs' && (
        <JobPostingsPage onNavigateToUpload={handleNavigateToUpload} />
      )}
      {currentRoute === '/upload' && < Upload/>}
    </div>
  );
};

export default JobApplicationApp;
