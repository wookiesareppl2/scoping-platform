import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

// Mobile Navigation Component
export const MobileNavigation = ({ isOpen, onToggle, currentPath }) => {
  const navItems = [
    { path: '/', label: 'Home', icon: Monitor },
    { path: '/scoping-form', label: 'Start Scoping', icon: Smartphone },
    { path: '/admin', label: 'Admin Dashboard', icon: Tablet },
    { path: '/submissions', label: 'Submissions', icon: Monitor },
    { path: '/analytics', label: 'Analytics', icon: Tablet }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="md:hidden fixed top-4 right-4 z-50 bg-white shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onToggle} />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-16">
          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={onToggle}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

// Mobile-Optimized Form Step Indicator
export const MobileStepIndicator = ({ currentStep, totalSteps, stepNames }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="md:hidden mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-sm">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">
                {stepNames[currentStep]}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-2">
            {stepNames.map((name, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 p-2 rounded ${
                  index === currentStep 
                    ? 'bg-blue-50 text-blue-700' 
                    : index < currentStep 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : index < currentStep 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Touch-Optimized Button Component
export const TouchButton = ({ children, className = '', size = 'default', ...props }) => {
  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2',
    default: 'min-h-[48px] px-6 py-3',
    lg: 'min-h-[52px] px-8 py-4'
  };

  return (
    <Button
      className={`${sizeClasses[size]} touch-manipulation ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

// Mobile-Optimized Input Component
export const MobileInput = ({ label, error, hint, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {hint && (
        <p className="text-sm text-gray-600">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Mobile-Optimized Textarea Component
export const MobileTextarea = ({ label, error, hint, className = '', rows = 4, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-y ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {hint && (
        <p className="text-sm text-gray-600">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Mobile-Optimized Select Component
export const MobileSelect = ({ label, options, error, hint, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full min-h-[48px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base appearance-none bg-white ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && (
        <p className="text-sm text-gray-600">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Mobile-Optimized Checkbox Component
export const MobileCheckbox = ({ label, description, error, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-start space-x-3 cursor-pointer">
        <input
          type="checkbox"
          className={`mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
          {...props}
        />
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </label>
      {error && (
        <p className="text-sm text-red-600 ml-8">{error}</p>
      )}
    </div>
  );
};

// Mobile-Optimized Radio Group Component
export const MobileRadioGroup = ({ label, options, value, onChange, error, className = '' }) => {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Device Detection Hook
export const useDeviceDetection = () => {
  const [device, setDevice] = useState('desktop');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }

      // Check for touch capability
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { device, isTouchDevice, isMobile: device === 'mobile', isTablet: device === 'tablet' };
};

// Responsive Container Component
export const ResponsiveContainer = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Mobile-Optimized Card Component
export const MobileCard = ({ children, className = '', padding = 'default' }) => {
  const paddingClasses = {
    sm: 'p-3',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <Card className={`${className}`}>
      <CardContent className={paddingClasses[padding]}>
        {children}
      </CardContent>
    </Card>
  );
};

export default {
  MobileNavigation,
  MobileStepIndicator,
  TouchButton,
  MobileInput,
  MobileTextarea,
  MobileSelect,
  MobileCheckbox,
  MobileRadioGroup,
  useDeviceDetection,
  ResponsiveContainer,
  MobileCard
};

