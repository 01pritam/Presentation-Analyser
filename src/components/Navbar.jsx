import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Upload as UploadIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  RocketLaunch as GetStartedIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Language as LanguageIcon,
  Analytics as AnalyticsIcon,
  Description as DocumentationIcon,
  PriceCheck as PricingIcon,
  AutoAwesome as FeaturesIcon
} from '@mui/icons-material';

export default function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, signOut } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainMenuItems = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { name: 'Features', icon: <FeaturesIcon />, path: '/features' },
    { name: 'Pricing', icon: <PricingIcon />, path: '/pricing' },
    { name: 'Documentation', icon: <DocumentationIcon />, path: '/docs' }
  ];

  const userMenuItems = [
    { name: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { name: 'Upload', icon: <UploadIcon />, path: '/upload' },
    { name: 'Get Started', icon: <GetStartedIcon />, path: '/get-started' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français ' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' }
];

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLangMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMobileOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    handleCloseLangMenu();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 4 }}>
            <AnalyticsIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
            <Typography variant="h6" noWrap component="div" color="primary.main" fontWeight="bold">
              Presentation-Insight AI
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={() => setMobileOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo - Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center' }}>
            <AnalyticsIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
            <Typography variant="subtitle1" noWrap component="div" color="primary.main" fontWeight="bold">
              P-Insight
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {mainMenuItems.map((item) => (
              <Button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': { backgroundColor: 'action.hover' }
                }}
                startIcon={item.icon}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right Menu Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Language Selector */}
            <Tooltip title={t('common.changeLanguage')}>
              <IconButton onClick={handleOpenLangMenu} color="inherit">
                <LanguageIcon />
              </IconButton>
            </Tooltip>

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <Tooltip title={user?.name || t('common.userMenu')}>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar 
                    alt={user?.name} 
                    src={user?.avatar}
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: 35,
                      height: 35
                    }}
                  >
                    {user?.name?.[0] || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/signup')}
                >
                  SIGNUP
                </Button>
              </Box>
            )}
          </Box>

          {/* Language Menu */}
          <Menu
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
            sx={{ mt: '45px' }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                selected={i18n.language === lang.code}
              >
                {lang.name}
              </MenuItem>
            ))}
          </Menu>

          {/* User Menu */}
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: '45px' }}
          >
            {userMenuItems.map((item) => (
              <MenuItem
                key={item.name}
                onClick={() => {
                  handleNavigation(item.path);
                  handleCloseUserMenu();
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(`menu.${item.name.toLowerCase()}`)} />
              </MenuItem>
            ))}
            <Divider />
            <MenuItem onClick={handleSignOut} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary={t('common.signOut')} />
            </MenuItem>
          </Menu>

          {/* Mobile Drawer */}
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          >
            <Box sx={{ width: 280, pt: 2 }} role="presentation">
              <List>
                {mainMenuItems.map((item) => (
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => handleNavigation(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
                <Divider sx={{ my: 2 }} />
                {isAuthenticated && userMenuItems.map((item) => (
                  <ListItem
                    key={item.name}
                    button
                    onClick={() => handleNavigation(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}