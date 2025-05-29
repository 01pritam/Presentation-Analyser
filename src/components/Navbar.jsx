// Components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { 
  Menu, X, User, LogOut, Settings, Bell, 
  Briefcase, BarChart3, Upload, Home, ChevronDown,
  Edit3, Building, Mail, Phone, MapPin, Calendar,
  Shield, CreditCard, Users, FileText, Camera, 
  Save, Eye, Lock, Globe, Moon, Sun, Smartphone,
  AlertTriangle, Plus, Check
} from 'lucide-react';

// Responsive Profile Dropdown Component
const ProfileDropdown = () => {
  const { user, userRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getMenuItems = () => {
    const baseItems = [
      { 
        icon: User, 
        label: 'View Profile', 
        action: () => setShowProfileModal(true),
        description: 'Manage your personal information',
        color: 'text-blue-600 bg-blue-50'
      },
      { 
        icon: Settings, 
        label: 'Account Settings', 
        action: () => setShowSettingsModal(true),
        description: 'Privacy, security, and preferences',
        color: 'text-purple-600 bg-purple-50'
      }
    ];

    const roleSpecificItems = userRole === 'company' ? [
      { 
        icon: Building, 
        label: 'Company Profile', 
        action: () => setShowProfileModal(true),
        description: 'Update company information',
        color: 'text-green-600 bg-green-50'
      },
      { 
        icon: Users, 
        label: 'Team Management', 
        action: () => console.log('Team Management'),
        description: 'Manage team members and roles',
        color: 'text-orange-600 bg-orange-50'
      }
    ] : [
      { 
        icon: FileText, 
        label: 'My Applications', 
        action: () => console.log('Applications'),
        description: 'Track your job applications',
        color: 'text-emerald-600 bg-emerald-50'
      }
    ];

    return [...baseItems, ...roleSpecificItems];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Responsive Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
      >
        <div className="relative">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-2 border-white rounded-full"></div>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-semibold text-gray-900 leading-tight truncate max-w-[120px]">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-500 capitalize">{userRole}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Responsive Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight truncate">{user?.name || 'User Name'}</h3>
                <p className="text-sm text-gray-600 truncate">{user?.email || 'user@example.com'}</p>
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {userRole}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1 sm:py-2 max-h-60 sm:max-h-80 overflow-y-auto">
            {getMenuItems().map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-gray-50 transition-all duration-150 flex items-center space-x-3 group"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150 group-hover:scale-105 ${item.color}`}>
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm leading-tight">{item.label}</p>
                  <p className="text-xs text-gray-500 leading-tight truncate">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-2 sm:p-3 bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-2 sm:px-3 py-2 sm:py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-150 group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal 
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userRole={userRole}
          user={user}
        />
      )}

      {showSettingsModal && (
        <SettingsModal 
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          userRole={userRole}
          user={user}
        />
      )}
    </div>
  );
};

// Fully Responsive Profile Modal Component
const ProfileModal = ({ isOpen, onClose, userRole, user }) => {
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate professional with expertise in my field.',
    companyName: 'TechCorp Inc.',
    companySize: '100-500',
    industry: 'Technology',
    website: 'https://techcorp.com',
    founded: '2015',
    description: 'Leading technology company focused on innovation.',
    position: 'Senior Product Manager',
    experience: '5+ years',
    skills: ['Product Management', 'Agile', 'Leadership'],
    education: 'MBA, Computer Science',
    linkedIn: 'https://linkedin.com/in/user'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  const tabs = userRole === 'company' 
    ? [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'company', label: 'Company', icon: Building }
      ]
    : [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'professional', label: 'Professional', icon: Building }
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-2xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Responsive Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Profile Settings</h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600">Manage your profile information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition-all font-medium shadow-lg text-sm sm:text-base flex-1 sm:flex-none"
                >
                  <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Save Changes</span>
                  <span className="sm:hidden">Save</span>
                </button>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                <span className="sm:hidden">{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-semibold transition-all relative whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-white border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Responsive Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
          {activeTab === 'personal' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Profile Picture Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                    <User className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg">
                      <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Profile Picture</h3>
                <p className="text-sm sm:text-base text-gray-600">Upload a professional photo</p>
              </div>

              {/* Responsive Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg resize-none"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Write a brief description about yourself (max 300 characters)</p>
              </div>
            </div>
          )}

          {/* Company Tab Content - Responsive */}
          {activeTab === 'company' && userRole === 'company' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Company Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        value={profileData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="Enter company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Industry</label>
                    <select
                      value={profileData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Company Size</label>
                    <select
                      value={profileData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Founded Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <input
                        type="text"
                        value={profileData.founded}
                        onChange={(e) => handleInputChange('founded', e.target.value)}
                        disabled={!isEditing}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                        placeholder="2015"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Company Description</label>
                <textarea
                  value={profileData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg resize-none"
                  placeholder="Describe your company..."
                />
              </div>
            </div>
          )}

          {/* Professional Tab Content - Responsive */}
          {activeTab === 'professional' && userRole === 'interviewer' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Current Position</label>
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                      placeholder="Enter your current position"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Experience Level</label>
                    <select
                      value={profileData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                    >
                      <option value="0-1 years">0-1 years</option>
                      <option value="2-3 years">2-3 years</option>
                      <option value="4-5 years">4-5 years</option>
                      <option value="5+ years">5+ years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Education</label>
                    <input
                      type="text"
                      value={profileData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                      placeholder="Enter your education"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={profileData.linkedIn}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base lg:text-lg"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Skills</label>
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-800 rounded-lg sm:rounded-xl text-sm font-medium">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSkills = profileData.skills.filter((_, i) => i !== index);
                            handleInputChange('skills', newSkills);
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg sm:rounded-xl text-sm font-medium hover:border-blue-300 hover:text-blue-600 transition-colors">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Add Skill
                    </button>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base lg:text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        const newSkills = [...profileData.skills, e.target.value.trim()];
                        handleInputChange('skills', newSkills);
                        e.target.value = '';
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Responsive Settings Modal Component
const SettingsModal = ({ isOpen, onClose, userRole, user }) => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    allowMessaging: true,
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    interviewReminders: true,
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    theme: 'light',
    language: 'en',
    timezone: 'UTC-5',
    autoRenewal: true,
    billingEmail: user?.email || ''
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    onClose();
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    ...(userRole === 'company' ? [{ id: 'billing', label: 'Billing', icon: CreditCard }] : [])
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-2xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Responsive Header */}
        <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Account Settings</h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Manage your account preferences and security</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={handleSave}
                className="flex items-center justify-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold transition-all relative whitespace-nowrap text-xs sm:text-sm lg:text-base ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-white border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Responsive Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
          {activeTab === 'privacy' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Profile Visibility</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Profile Visibility</label>
                      <p className="text-xs sm:text-sm text-gray-500">Control who can see your profile</p>
                    </div>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="public">Public</option>
                      <option value="connections">Connections Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Show Email Address</label>
                      <p className="text-xs sm:text-sm text-gray-500">Allow others to see your email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showEmail}
                        onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Show Phone Number</label>
                      <p className="text-xs sm:text-sm text-gray-500">Allow others to see your phone number</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showPhone}
                        onChange={(e) => handleSettingChange('showPhone', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Notification Preferences</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                    { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Get reminded about upcoming interviews' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive weekly summary of activities' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional and marketing emails' }
                  ].map(item => (
                    <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                      <div>
                        <label className="font-medium text-gray-700 text-sm sm:text-base">{item.label}</label>
                        <p className="text-xs sm:text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Security Settings</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Two-Factor Authentication</label>
                      <p className="text-xs sm:text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Session Timeout</label>
                      <p className="text-xs sm:text-sm text-gray-500">Automatically log out after inactivity</p>
                    </div>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 text-sm sm:text-base">Password Security</h4>
                    <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                      Your password was last changed 3 months ago. Consider updating it regularly for better security.
                    </p>
                    <button className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-xs sm:text-sm">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Appearance & Language</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Theme</label>
                      <p className="text-xs sm:text-sm text-gray-500">Choose your preferred theme</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSettingChange('theme', 'light')}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-colors ${
                          settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => handleSettingChange('theme', 'dark')}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-colors ${
                          settings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Language</label>
                      <p className="text-xs sm:text-sm text-gray-500">Select your preferred language</p>
                    </div>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && userRole === 'company' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Billing & Subscription</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Professional Plan</h4>
                      <p className="text-blue-700 text-xs sm:text-sm">$19.99/month • Next billing: Jan 15, 2025</p>
                    </div>
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                      Manage Plan
                    </button>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <label className="font-medium text-gray-700 text-sm sm:text-base">Auto-renewal</label>
                      <p className="text-xs sm:text-sm text-gray-500">Automatically renew your subscription</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoRenewal}
                        onChange={(e) => handleSettingChange('autoRenewal', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Email</label>
                    <input
                      type="email"
                      value={settings.billingEmail}
                      onChange={(e) => handleSettingChange('billingEmail', e.target.value)}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Responsive Navbar Component
const Navbar = () => {
  const { isAuthenticated, user, userRole } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getRoleBasedNavItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: Home }
    ];

    if (!isAuthenticated) {
      return [
        ...baseItems,
        { path: '/login', label: 'Login', icon: User },
        { path: '/signup', label: 'Sign Up', icon: User }
      ];
    }

    switch (userRole) {
      case 'company':
        return [
          ...baseItems,
          { path: '/dash', label: 'Dashboard', icon: BarChart3 },
          { path: '/upload', label: 'Add Job', icon: Upload }
        ];
      case 'interviewer':
        return [
          ...baseItems,
          { path: '/apply', label: 'Job Applications', icon: Briefcase },
          { path: '/upload', label: 'Upload', icon: Upload }
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getRoleBasedNavItems();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Responsive Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
<img 
  src="../../public/WhatsApp Image 2025-05-29 at 22.00.37.jpeg" 
  alt="WhatsApp Image" 
  className="h-auto max-w-full rounded-lg object-cover object-center shadow-lg"
/>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Prism
              </h1>
              <p className="text-xs text-gray-500 hidden lg:block">Professional Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 rounded-lg font-medium transition-all text-sm lg:text-base ${
                  isActivePath(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Responsive User Menu */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <ProfileDropdown />
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 bg-white">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all ${
                    isActivePath(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile User Section */}
              {isAuthenticated ? (
                <div className="pt-3 border-t border-gray-100 mt-3">
                  <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500 capitalize">{userRole}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      // Open profile modal logic here
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <User className="h-5 w-5" />
                    <span>View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      // Open settings modal logic here
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-3 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors border border-gray-300 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-3 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
