import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [clarificationText, setClarificationText] = useState('');

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
  }, []);

  // Mock data for demonstration if no submissions exist
  useEffect(() => {
    if (submissions.length === 0) {
      const mockSubmissions = [
        {
          id: '1',
          clientInfo: { name: 'Acme Corporation', email: 'john@acme.com' },
          status: 'submitted',
          submittedAt: new Date(Date.now() - 86400000).toISOString(),
          answers: {
            company_name: 'Acme Corporation',
            industry: 'Technology',
            business_description: 'We provide cloud-based software solutions for small businesses.',
            target_audience: 'Small business owners who need efficient software tools.',
            website_type: 'dynamic',
            budget_range: '$10,000 - $25,000'
          },
          completeness: 85,
          qualityScore: 78
        },
        {
          id: '2',
          clientInfo: { name: 'Green Earth Consulting', email: 'sarah@greenearth.com' },
          status: 'under_review',
          submittedAt: new Date(Date.now() - 172800000).toISOString(),
          answers: {
            company_name: 'Green Earth Consulting',
            industry: 'Environmental',
            business_description: 'Environmental consulting for sustainable business practices.',
            target_audience: 'Medium to large businesses looking to improve sustainability.',
            website_type: 'static',
            budget_range: '$5,000 - $10,000'
          },
          completeness: 92,
          qualityScore: 88
        },
        {
          id: '3',
          clientInfo: { name: 'TechStart Solutions', email: 'mike@techstart.com' },
          status: 'needs_clarification',
          submittedAt: new Date(Date.now() - 259200000).toISOString(),
          answers: {
            company_name: 'TechStart Solutions',
            industry: 'Technology',
            business_description: 'Startup focused on AI solutions.',
            target_audience: 'Enterprise clients',
            website_type: 'webapp',
            budget_range: '$25,000 - $50,000'
          },
          completeness: 65,
          qualityScore: 55,
          clarifications: [
            {
              id: '1',
              question: 'Can you provide more details about your AI solutions?',
              requestedAt: new Date(Date.now() - 86400000).toISOString(),
              status: 'pending'
            }
          ]
        }
      ];
      setSubmissions(mockSubmissions);
    }
  }, [submissions.length]);

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      submission.clientInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.clientInfo.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Status colors and labels
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

  // Update submission status
  const updateSubmissionStatus = (submissionId, newStatus) => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: newStatus } : sub
    );
    setSubmissions(updatedSubmissions);
    localStorage.setItem('scopingSubmissions', JSON.stringify(updatedSubmissions));
  };

  // Send clarification request
  const sendClarificationRequest = (submissionId) => {
    if (!clarificationText.trim()) return;

    const clarification = {
      id: Date.now().toString(),
      question: clarificationText,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status: 'needs_clarification',
          clarifications: [...(sub.clarifications || []), clarification]
        };
      }
      return sub;
    });

    setSubmissions(updatedSubmissions);
    localStorage.setItem('scopingSubmissions', JSON.stringify(updatedSubmissions));
    setClarificationText('');
  };

  // Export submission data
  const exportSubmission = (submission) => {
    const exportData = {
      client: submission.clientInfo,
      submissionDate: submission.submittedAt,
      status: submission.status,
      answers: submission.answers,
      completeness: submission.completeness,
      qualityScore: submission.qualityScore,
      clarifications: submission.clarifications || []
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scoping-${submission.clientInfo.name.replace(/\s+/g, '-')}-${submission.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Dashboard statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'submitted').length,
    underReview: submissions.filter(s => s.status === 'under_review').length,
    needsClarification: submissions.filter(s => s.status === 'needs_clarification').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    avgCompleteness: submissions.length > 0 
      ? Math.round(submissions.reduce((sum, s) => sum + (s.completeness || 0), 0) / submissions.length)
      : 0,
    avgQuality: submissions.length > 0
      ? Math.round(submissions.reduce((sum, s) => sum + (s.qualityScore || 0), 0) / submissions.length)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage client scoping submissions and review project requirements.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-500">Total Submissions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pending Review</div>
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
            <div className="text-2xl font-bold text-red-600">{stats.needsClarification}</div>
            <div className="text-xs text-gray-500">Need Clarification</div>
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
            <div className="text-2xl font-bold text-purple-600">{stats.avgCompleteness}%</div>
            <div className="text-xs text-gray-500">Avg Completeness</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.avgQuality}%</div>
            <div className="text-xs text-gray-500">Avg Quality</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by client name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
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
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => {
              const statusInfo = getStatusInfo(submission.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <Card 
                  key={submission.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSubmission?.id === submission.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
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
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {submission.clientInfo.email}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <BarChart3 className="w-3 h-3" />
                            <span>{submission.completeness}% complete</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3" />
                            <span>{submission.qualityScore}% quality</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportSubmission(submission);
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
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No client submissions have been received yet.'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div className="space-y-4">
          {selectedSubmission ? (
            <SubmissionDetails 
              submission={selectedSubmission}
              onStatusUpdate={updateSubmissionStatus}
              onSendClarification={sendClarificationRequest}
              clarificationText={clarificationText}
              setClarificationText={setClarificationText}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Submission</h3>
                <p className="text-gray-600">
                  Choose a submission from the list to view details and manage the review process.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Submission Details Component
const SubmissionDetails = ({ 
  submission, 
  onStatusUpdate, 
  onSendClarification, 
  clarificationText, 
  setClarificationText 
}) => {
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
    <div className="space-y-4">
      {/* Client Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Client Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <p className="text-gray-900">{submission.clientInfo.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <p className="text-gray-900">{submission.clientInfo.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Submitted</label>
            <p className="text-gray-900">{new Date(submission.submittedAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Badge variant="outline" className={`text-${statusInfo.color}-700 border-${statusInfo.color}-200`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status Management */}
      <Card>
        <CardHeader>
          <CardTitle>Status Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusUpdate(submission.id, 'under_review')}
              disabled={submission.status === 'under_review'}
            >
              <Eye className="w-4 h-4 mr-1" />
              Review
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusUpdate(submission.id, 'approved')}
              disabled={submission.status === 'approved'}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          </div>
          
          {/* Clarification Request */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Request Clarification</label>
            <Textarea
              placeholder="Ask the client for more information..."
              value={clarificationText}
              onChange={(e) => setClarificationText(e.target.value)}
              rows={3}
            />
            <Button
              size="sm"
              onClick={() => onSendClarification(submission.id)}
              disabled={!clarificationText.trim()}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-1" />
              Send Clarification Request
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submission Answers */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(submission.answers).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <p className="text-gray-900 text-sm">
                {Array.isArray(value) ? value.join(', ') : value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clarifications */}
      {submission.clarifications && submission.clarifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Clarification Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {submission.clarifications.map((clarification) => (
              <div key={clarification.id} className="p-3 bg-gray-50 rounded-lg">
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

export default AdminDashboard;

