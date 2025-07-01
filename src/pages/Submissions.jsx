import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  Download,
  Eye,
  Edit,
  Send,
  Filter,
  Search,
  Calendar,
  BarChart3,
  TrendingUp,
  Star,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('submittedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Load submissions from localStorage
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('scopingSubmissions');
    if (savedSubmissions) {
      try {
        const parsed = JSON.parse(savedSubmissions);
        setSubmissions(parsed);
      } catch (error) {
        console.error('Error loading submissions:', error);
      }
    }

    // Add mock data if no submissions exist
    if (!savedSubmissions || JSON.parse(savedSubmissions).length === 0) {
      const mockSubmissions = [
        {
          id: '1',
          clientInfo: { 
            name: 'Acme Corporation', 
            email: 'john@acme.com',
            phone: '+1 (555) 123-4567',
            website: 'https://acme.com'
          },
          status: 'submitted',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          answers: {
            company_name: 'Acme Corporation',
            industry: 'Technology',
            business_description: 'We provide cloud-based software solutions for small businesses, helping them streamline their operations and improve efficiency.',
            target_audience: 'Small business owners (10-50 employees) who need better software tools.',
            business_goals: 'Generate leads, showcase our products, and provide customer support.',
            website_type: 'dynamic',
            cms_needed: 'yes_easy',
            budget_range: '$10,000 - $25,000',
            urgency_level: 'month',
            design_style: 'modern'
          },
          completeness: 85,
          qualityScore: 78,
          estimatedValue: 15000,
          priority: 'high'
        },
        {
          id: '2',
          clientInfo: { 
            name: 'Green Earth Consulting', 
            email: 'sarah@greenearth.com',
            phone: '+1 (555) 987-6543',
            website: 'https://greenearth.com'
          },
          status: 'under_review',
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          answers: {
            company_name: 'Green Earth Consulting',
            industry: 'Environmental',
            business_description: 'Environmental consulting firm specializing in sustainable business practices and green technology implementation.',
            target_audience: 'Medium to large businesses looking to improve their environmental impact.',
            business_goals: 'Establish thought leadership, attract new clients, showcase case studies.',
            website_type: 'static',
            cms_needed: 'yes_advanced',
            budget_range: '$5,000 - $10,000',
            urgency_level: 'quarter',
            design_style: 'professional'
          },
          completeness: 92,
          qualityScore: 88,
          estimatedValue: 8000,
          priority: 'medium'
        },
        {
          id: '3',
          clientInfo: { 
            name: 'TechStart Solutions', 
            email: 'mike@techstart.com',
            phone: '+1 (555) 456-7890',
            website: null
          },
          status: 'needs_clarification',
          submittedAt: new Date(Date.now() - 259200000).toISOString(),
          answers: {
            company_name: 'TechStart Solutions',
            industry: 'Technology',
            business_description: 'Startup focused on AI solutions.',
            target_audience: 'Enterprise clients',
            business_goals: 'Launch product, get funding.',
            website_type: 'webapp',
            cms_needed: 'no',
            budget_range: '$25,000 - $50,000',
            urgency_level: 'asap',
            design_style: 'creative'
          },
          completeness: 65,
          qualityScore: 55,
          estimatedValue: 35000,
          priority: 'high',
          clarifications: [
            {
              id: '1',
              question: 'Can you provide more details about your AI solutions and target market?',
              requestedAt: new Date(Date.now() - 86400000).toISOString(),
              status: 'pending'
            }
          ]
        },
        {
          id: '4',
          clientInfo: { 
            name: 'Local Bakery Co', 
            email: 'info@localbakery.com',
            phone: '+1 (555) 234-5678',
            website: null
          },
          status: 'approved',
          submittedAt: new Date(Date.now() - 432000000).toISOString(),
          answers: {
            company_name: 'Local Bakery Co',
            industry: 'Food & Beverage',
            business_description: 'Family-owned bakery serving fresh bread, pastries, and custom cakes for over 20 years.',
            target_audience: 'Local community members, families, and event planners.',
            business_goals: 'Increase online orders, showcase products, build community presence.',
            website_type: 'ecommerce',
            cms_needed: 'yes_easy',
            budget_range: '$5,000 - $10,000',
            urgency_level: 'flexible',
            design_style: 'playful'
          },
          completeness: 95,
          qualityScore: 92,
          estimatedValue: 7500,
          priority: 'low'
        }
      ];
      setSubmissions(mockSubmissions);
      localStorage.setItem('scopingSubmissions', JSON.stringify(mockSubmissions));
    }
  }, []);

  // Filter and sort submissions
  useEffect(() => {
    let filtered = submissions.filter(submission => {
      const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
      const matchesSearch = searchTerm === '' || 
        submission.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.clientInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (submission.answers.industry && submission.answers.industry.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesStatus && matchesSearch;
    });

    // Sort submissions
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'submittedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'clientInfo.name') {
        aValue = a.clientInfo.name;
        bValue = b.clientInfo.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, statusFilter, sortBy, sortOrder]);

  // Status configuration
  const getStatusInfo = (status) => {
    const statusMap = {
      'submitted': { color: 'blue', label: 'New Submission', icon: FileText },
      'under_review': { color: 'yellow', label: 'Under Review', icon: Eye },
      'needs_clarification': { color: 'orange', label: 'Needs Clarification', icon: MessageSquare },
      'approved': { color: 'green', label: 'Approved', icon: CheckCircle },
      'in_development': { color: 'purple', label: 'In Development', icon: Star }
    };
    return statusMap[status] || { color: 'gray', label: status, icon: FileText };
  };

  // Priority configuration
  const getPriorityInfo = (priority) => {
    const priorityMap = {
      'high': { color: 'red', label: 'High Priority' },
      'medium': { color: 'yellow', label: 'Medium Priority' },
      'low': { color: 'green', label: 'Low Priority' }
    };
    return priorityMap[priority] || { color: 'gray', label: 'Normal' };
  };

  // Export all submissions
  const exportAllSubmissions = () => {
    const exportData = filteredSubmissions.map(submission => ({
      id: submission.id,
      client: submission.clientInfo,
      status: submission.status,
      submittedAt: submission.submittedAt,
      completeness: submission.completeness,
      qualityScore: submission.qualityScore,
      estimatedValue: submission.estimatedValue,
      priority: submission.priority,
      answers: submission.answers
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scoping-submissions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'submitted').length,
    underReview: submissions.filter(s => s.status === 'under_review').length,
    needsClarification: submissions.filter(s => s.status === 'needs_clarification').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    totalValue: submissions.reduce((sum, s) => sum + (s.estimatedValue || 0), 0),
    avgCompleteness: submissions.length > 0 
      ? Math.round(submissions.reduce((sum, s) => sum + (s.completeness || 0), 0) / submissions.length)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Submissions</h1>
          <p className="text-gray-600 mt-2">
            Manage and review all client scoping submissions.
          </p>
        </div>
        <Button onClick={exportAllSubmissions} className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-500">Total Submissions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.underReview}</div>
            <div className="text-xs text-gray-500">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-xs text-gray-500">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${(stats.totalValue / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-gray-500">Total Value</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.avgCompleteness}%</div>
            <div className="text-xs text-gray-500">Avg Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by client name, email, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="submitted">New Submissions</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="needs_clarification">Needs Clarification</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in_development">In Development</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submittedAt">Date Submitted</SelectItem>
                <SelectItem value="clientInfo.name">Client Name</SelectItem>
                <SelectItem value="completeness">Completeness</SelectItem>
                <SelectItem value="qualityScore">Quality Score</SelectItem>
                <SelectItem value="estimatedValue">Estimated Value</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center space-x-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
          <CardDescription>
            Click on any submission to view detailed information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => {
              const statusInfo = getStatusInfo(submission.status);
              const priorityInfo = getPriorityInfo(submission.priority);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card 
                  key={submission.id}
                  className="cursor-pointer transition-all hover:shadow-md border-l-4"
                  style={{ borderLeftColor: `var(--${priorityInfo.color}-500)` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {submission.clientInfo.name}
                          </h3>
                          <Badge variant="outline" className={`text-${statusInfo.color}-700 border-${statusInfo.color}-200`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <Badge variant="outline" className={`text-${priorityInfo.color}-700 border-${priorityInfo.color}-200`}>
                            {priorityInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Email:</span>
                            <p className="text-gray-900">{submission.clientInfo.email}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Industry:</span>
                            <p className="text-gray-900">{submission.answers.industry || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Budget:</span>
                            <p className="text-gray-900">{submission.answers.budget_range || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Submitted:</span>
                            <p className="text-gray-900">{new Date(submission.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 mt-3 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <BarChart3 className="w-3 h-3" />
                            <span>{submission.completeness}% complete</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{submission.qualityScore}% quality</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>${(submission.estimatedValue || 0).toLocaleString()} estimated</span>
                          </span>
                          {submission.clarifications && submission.clarifications.length > 0 && (
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{submission.clarifications.length} clarification(s)</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{submission.clientInfo.name} - Submission Details</DialogTitle>
                              <DialogDescription>
                                Complete submission information and project requirements.
                              </DialogDescription>
                            </DialogHeader>
                            <SubmissionDetailView submission={submission} />
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const exportData = {
                              client: submission.clientInfo,
                              submissionDate: submission.submittedAt,
                              status: submission.status,
                              answers: submission.answers,
                              completeness: submission.completeness,
                              qualityScore: submission.qualityScore,
                              estimatedValue: submission.estimatedValue
                            };
                            const dataStr = JSON.stringify(exportData, null, 2);
                            const dataBlob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(dataBlob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${submission.clientInfo.name.replace(/\s+/g, '-')}-submission.json`;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No client submissions have been received yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Detailed submission view component
const SubmissionDetailView = ({ submission }) => {
  const statusInfo = getStatusInfo(submission.status);
  const StatusIcon = statusInfo.icon;

  const getStatusInfo = (status) => {
    const statusMap = {
      'submitted': { color: 'blue', label: 'New Submission', icon: FileText },
      'under_review': { color: 'yellow', label: 'Under Review', icon: Eye },
      'needs_clarification': { color: 'orange', label: 'Needs Clarification', icon: MessageSquare },
      'approved': { color: 'green', label: 'Approved', icon: CheckCircle },
      'in_development': { color: 'purple', label: 'In Development', icon: Star }
    };
    return statusMap[status] || { color: 'gray', label: status, icon: FileText };
  };

  return (
    <div className="space-y-6">
      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Client Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <p className="text-gray-900">{submission.clientInfo.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{submission.clientInfo.email}</span>
            </p>
          </div>
          {submission.clientInfo.phone && (
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="text-gray-900 flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{submission.clientInfo.phone}</span>
              </p>
            </div>
          )}
          {submission.clientInfo.website && (
            <div>
              <label className="text-sm font-medium text-gray-700">Website</label>
              <p className="text-gray-900 flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <a href={submission.clientInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {submission.clientInfo.website}
                </a>
              </p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Badge variant="outline" className={`text-${statusInfo.color}-700 border-${statusInfo.color}-200`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Submitted</label>
            <p className="text-gray-900">{new Date(submission.submittedAt).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Project Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Project Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(submission.answers).map(([key, value]) => (
            <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <div className="md:col-span-2">
                <p className="text-gray-900 text-sm">
                  {Array.isArray(value) ? value.join(', ') : value || 'Not specified'}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{submission.completeness}%</div>
            <div className="text-sm text-gray-500">Completeness</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{submission.qualityScore}%</div>
            <div className="text-sm text-gray-500">Quality Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${(submission.estimatedValue || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Estimated Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Clarifications */}
      {submission.clarifications && submission.clarifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Clarification Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {submission.clarifications.map((clarification) => (
              <div key={clarification.id} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900 mb-2">{clarification.question}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Requested: {new Date(clarification.requestedAt).toLocaleDateString()}</span>
                  <Badge variant="outline" size="sm">
                    {clarification.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Submissions;

