// Data Export Utilities for Development Workflow Integration

export const exportFormats = {
  JSON: 'json',
  MARKDOWN: 'markdown',
  PDF: 'pdf',
  GITHUB_ISSUE: 'github_issue',
  PROJECT_SPEC: 'project_spec',
  PROPOSAL: 'proposal'
};

// Export submission to JSON format
export const exportToJSON = (submission) => {
  const exportData = {
    metadata: {
      exportDate: new Date().toISOString(),
      submissionId: submission.id,
      clientName: submission.clientInfo.name,
      status: submission.status
    },
    client: submission.clientInfo,
    project: {
      submittedAt: submission.submittedAt,
      status: submission.status,
      completeness: submission.completeness,
      qualityScore: submission.qualityScore,
      estimatedValue: submission.estimatedValue,
      priority: submission.priority
    },
    requirements: submission.answers,
    clarifications: submission.clarifications || [],
    timeline: generateTimeline(submission),
    recommendations: generateRecommendations(submission)
  };

  return JSON.stringify(exportData, null, 2);
};

// Export submission to Markdown format
export const exportToMarkdown = (submission) => {
  const answers = submission.answers;
  const clientInfo = submission.clientInfo;
  
  let markdown = `# Project Scoping Document\n\n`;
  markdown += `**Client:** ${clientInfo.name}\n`;
  markdown += `**Email:** ${clientInfo.email}\n`;
  markdown += `**Submission Date:** ${new Date(submission.submittedAt).toLocaleDateString()}\n`;
  markdown += `**Status:** ${submission.status}\n`;
  markdown += `**Estimated Value:** $${(submission.estimatedValue || 0).toLocaleString()}\n\n`;

  // Executive Summary
  markdown += `## Executive Summary\n\n`;
  markdown += `${answers.business_description || 'No business description provided.'}\n\n`;
  
  // Business Information
  markdown += `## Business Information\n\n`;
  markdown += `### Company Details\n`;
  markdown += `- **Company Name:** ${answers.company_name || 'Not specified'}\n`;
  markdown += `- **Industry:** ${answers.industry || 'Not specified'}\n`;
  markdown += `- **Target Audience:** ${answers.target_audience || 'Not specified'}\n`;
  markdown += `- **Business Goals:** ${answers.business_goals || 'Not specified'}\n\n`;

  if (answers.current_website) {
    markdown += `- **Current Website:** ${answers.current_website}\n`;
  }
  if (answers.competitors) {
    markdown += `- **Competitors:** ${answers.competitors}\n`;
  }
  markdown += `\n`;

  // Technical Requirements
  markdown += `## Technical Requirements\n\n`;
  markdown += `### Website Type\n`;
  markdown += `${getWebsiteTypeDescription(answers.website_type)}\n\n`;
  
  markdown += `### Key Features\n`;
  if (answers.cms_needed && answers.cms_needed !== 'no') {
    markdown += `- Content Management System (${answers.cms_needed})\n`;
  }
  if (answers.user_accounts && answers.user_accounts !== 'no') {
    markdown += `- User Account System (${answers.user_accounts})\n`;
  }
  if (answers.mobile_requirements) {
    const mobileReqs = Array.isArray(answers.mobile_requirements) 
      ? answers.mobile_requirements 
      : [answers.mobile_requirements];
    mobileReqs.forEach(req => {
      markdown += `- ${req}\n`;
    });
  }
  markdown += `\n`;

  // Content Strategy
  markdown += `## Content Strategy\n\n`;
  markdown += `### Content Readiness\n`;
  markdown += `${getContentReadinessDescription(answers.content_ready)}\n\n`;
  
  if (answers.content_volume) {
    markdown += `### Estimated Pages\n`;
    markdown += `${answers.content_volume}\n\n`;
  }

  if (answers.blog_needed && answers.blog_needed !== 'no') {
    markdown += `### Blog Requirements\n`;
    markdown += `${getBlogDescription(answers.blog_needed)}\n\n`;
  }

  // Design Preferences
  markdown += `## Design Preferences\n\n`;
  if (answers.design_style) {
    markdown += `### Design Style\n`;
    markdown += `${getDesignStyleDescription(answers.design_style)}\n\n`;
  }

  if (answers.color_preferences) {
    markdown += `### Color Preferences\n`;
    markdown += `${answers.color_preferences}\n\n`;
  }

  if (answers.inspiration_sites) {
    markdown += `### Inspiration Websites\n`;
    markdown += `${answers.inspiration_sites}\n\n`;
  }

  // Timeline and Budget
  markdown += `## Timeline and Budget\n\n`;
  markdown += `### Budget Range\n`;
  markdown += `${answers.budget_range || 'Not specified'}\n\n`;
  
  markdown += `### Timeline Requirements\n`;
  markdown += `- **Urgency Level:** ${getUrgencyDescription(answers.urgency_level)}\n`;
  if (answers.launch_deadline) {
    markdown += `- **Launch Deadline:** ${answers.launch_deadline}\n`;
  }
  markdown += `- **Budget Flexibility:** ${getBudgetFlexibilityDescription(answers.budget_flexibility)}\n\n`;

  // Third-Party Integrations
  if (hasIntegrations(answers)) {
    markdown += `## Third-Party Integrations\n\n`;
    
    if (answers.payment_processing && answers.payment_processing.length > 0) {
      markdown += `### Payment Processing\n`;
      answers.payment_processing.forEach(payment => {
        markdown += `- ${payment}\n`;
      });
      markdown += `\n`;
    }

    if (answers.email_marketing && answers.email_marketing.length > 0) {
      markdown += `### Email Marketing\n`;
      answers.email_marketing.forEach(email => {
        markdown += `- ${email}\n`;
      });
      markdown += `\n`;
    }

    if (answers.social_media && answers.social_media.length > 0) {
      markdown += `### Social Media\n`;
      answers.social_media.forEach(social => {
        markdown += `- ${social}\n`;
      });
      markdown += `\n`;
    }

    if (answers.third_party_tools) {
      markdown += `### Other Integrations\n`;
      markdown += `${answers.third_party_tools}\n\n`;
    }
  }

  // Recommendations
  markdown += `## Recommendations\n\n`;
  const recommendations = generateRecommendations(submission);
  recommendations.forEach(rec => {
    markdown += `### ${rec.category}\n`;
    markdown += `${rec.recommendation}\n\n`;
  });

  // Next Steps
  markdown += `## Next Steps\n\n`;
  markdown += `1. **Review and Approval** - Review this scoping document with the client\n`;
  markdown += `2. **Proposal Creation** - Create detailed proposal with timeline and pricing\n`;
  markdown += `3. **Contract and Kickoff** - Finalize contract and begin project kickoff\n`;
  markdown += `4. **Design Phase** - Begin wireframing and design mockups\n`;
  markdown += `5. **Development Phase** - Start development based on approved designs\n\n`;

  // Clarifications
  if (submission.clarifications && submission.clarifications.length > 0) {
    markdown += `## Clarifications Requested\n\n`;
    submission.clarifications.forEach((clarification, index) => {
      markdown += `${index + 1}. **${new Date(clarification.requestedAt).toLocaleDateString()}** - ${clarification.question}\n`;
      markdown += `   Status: ${clarification.status}\n\n`;
    });
  }

  return markdown;
};

// Export as GitHub Issue format
export const exportToGitHubIssue = (submission) => {
  const answers = submission.answers;
  const clientInfo = submission.clientInfo;
  
  let issue = `# ${clientInfo.name} - Website Development Project\n\n`;
  issue += `## Client Information\n`;
  issue += `- **Company:** ${clientInfo.name}\n`;
  issue += `- **Email:** ${clientInfo.email}\n`;
  issue += `- **Industry:** ${answers.industry || 'Not specified'}\n`;
  issue += `- **Budget:** ${answers.budget_range || 'Not specified'}\n`;
  issue += `- **Timeline:** ${getUrgencyDescription(answers.urgency_level)}\n\n`;

  issue += `## Project Requirements\n\n`;
  issue += `### Website Type\n`;
  issue += `${getWebsiteTypeDescription(answers.website_type)}\n\n`;

  issue += `### Key Features\n`;
  const features = [];
  if (answers.cms_needed && answers.cms_needed !== 'no') {
    features.push(`Content Management System (${answers.cms_needed})`);
  }
  if (answers.user_accounts && answers.user_accounts !== 'no') {
    features.push(`User Account System (${answers.user_accounts})`);
  }
  if (answers.mobile_requirements) {
    const mobileReqs = Array.isArray(answers.mobile_requirements) 
      ? answers.mobile_requirements 
      : [answers.mobile_requirements];
    features.push(...mobileReqs);
  }
  
  features.forEach(feature => {
    issue += `- [ ] ${feature}\n`;
  });
  issue += `\n`;

  issue += `## Tasks\n\n`;
  issue += `- [ ] Initial consultation and requirements review\n`;
  issue += `- [ ] Wireframing and site architecture\n`;
  issue += `- [ ] Design mockups and approval\n`;
  issue += `- [ ] Frontend development\n`;
  issue += `- [ ] Backend development (if applicable)\n`;
  issue += `- [ ] Content integration\n`;
  issue += `- [ ] Testing and quality assurance\n`;
  issue += `- [ ] Launch and deployment\n`;
  issue += `- [ ] Training and handover\n\n`;

  issue += `## Labels\n`;
  issue += `\`client-project\` \`${answers.website_type || 'website'}\` \`${answers.urgency_level || 'normal'}\`\n\n`;

  issue += `## Estimated Timeline\n`;
  const timeline = generateTimeline(submission);
  timeline.phases.forEach(phase => {
    issue += `- **${phase.name}:** ${phase.duration}\n`;
  });

  return issue;
};

// Export as Project Specification
export const exportToProjectSpec = (submission) => {
  const spec = {
    project: {
      name: `${submission.clientInfo.name} Website`,
      description: submission.answers.business_description,
      type: submission.answers.website_type,
      estimatedValue: submission.estimatedValue,
      priority: submission.priority
    },
    client: submission.clientInfo,
    requirements: {
      functional: extractFunctionalRequirements(submission.answers),
      technical: extractTechnicalRequirements(submission.answers),
      design: extractDesignRequirements(submission.answers),
      content: extractContentRequirements(submission.answers)
    },
    timeline: generateTimeline(submission),
    budget: {
      range: submission.answers.budget_range,
      flexibility: submission.answers.budget_flexibility,
      estimated: submission.estimatedValue
    },
    deliverables: generateDeliverables(submission.answers),
    assumptions: generateAssumptions(submission.answers),
    risks: generateRisks(submission.answers)
  };

  return JSON.stringify(spec, null, 2);
};

// Helper functions for descriptions
const getWebsiteTypeDescription = (type) => {
  const descriptions = {
    'static': 'Static/Brochure Website - Information-focused with minimal interactivity',
    'dynamic': 'Dynamic Website - Database-driven with user interactions and content management',
    'ecommerce': 'E-commerce Store - Online store with payment processing and inventory management',
    'webapp': 'Web Application - Complex functionality with user accounts and advanced features',
    'portal': 'Customer/Member Portal - Login-based access to resources and member content'
  };
  return descriptions[type] || type;
};

const getContentReadinessDescription = (readiness) => {
  const descriptions = {
    'ready': 'All content is prepared and ready for implementation',
    'partial': 'Some content is ready, additional content creation needed',
    'outline': 'Content structure is planned, full content creation required',
    'help': 'Content creation assistance needed from development team'
  };
  return descriptions[readiness] || readiness;
};

const getBlogDescription = (blogType) => {
  const descriptions = {
    'yes': 'Full blogging platform with categories, tags, and content management',
    'simple': 'Simple news/updates section with basic posting capabilities',
    'future': 'Blog functionality to be added in future phase'
  };
  return descriptions[blogType] || blogType;
};

const getDesignStyleDescription = (style) => {
  const descriptions = {
    'modern': 'Modern & Clean - Minimalist design with lots of white space',
    'professional': 'Professional & Corporate - Traditional business appearance',
    'creative': 'Creative & Artistic - Unique, eye-catching design elements',
    'playful': 'Fun & Playful - Colorful, engaging, and informal design',
    'luxury': 'Luxury & Premium - Elegant and sophisticated appearance',
    'technical': 'Technical & Data-focused - Clean, functional, information-dense layout'
  };
  return descriptions[style] || style;
};

const getUrgencyDescription = (urgency) => {
  const descriptions = {
    'asap': 'ASAP - Very urgent timeline required',
    'month': 'Within one month',
    'quarter': 'Within 2-3 months',
    'flexible': 'Flexible timeline, quality over speed'
  };
  return descriptions[urgency] || urgency;
};

const getBudgetFlexibilityDescription = (flexibility) => {
  const descriptions = {
    'fixed': 'Fixed budget - cannot exceed specified range',
    'some': 'Some flexibility for important features',
    'flexible': 'Flexible budget - value and quality are priorities'
  };
  return descriptions[flexibility] || flexibility;
};

// Check if submission has integrations
const hasIntegrations = (answers) => {
  return (answers.payment_processing && answers.payment_processing.length > 0) ||
         (answers.email_marketing && answers.email_marketing.length > 0) ||
         (answers.social_media && answers.social_media.length > 0) ||
         answers.third_party_tools ||
         answers.api_requirements;
};

// Generate timeline based on project requirements
const generateTimeline = (submission) => {
  const answers = submission.answers;
  const baseWeeks = getBaseTimelineWeeks(answers.website_type);
  const complexity = calculateComplexity(answers);
  const totalWeeks = Math.ceil(baseWeeks * complexity);

  return {
    totalWeeks,
    phases: [
      { name: 'Discovery & Planning', duration: '1-2 weeks', percentage: 15 },
      { name: 'Design & Wireframing', duration: `${Math.ceil(totalWeeks * 0.25)} weeks`, percentage: 25 },
      { name: 'Development', duration: `${Math.ceil(totalWeeks * 0.45)} weeks`, percentage: 45 },
      { name: 'Testing & Launch', duration: `${Math.ceil(totalWeeks * 0.15)} weeks`, percentage: 15 }
    ]
  };
};

const getBaseTimelineWeeks = (websiteType) => {
  const baseTimelines = {
    'static': 4,
    'dynamic': 8,
    'ecommerce': 12,
    'webapp': 16,
    'portal': 14
  };
  return baseTimelines[websiteType] || 8;
};

const calculateComplexity = (answers) => {
  let complexity = 1.0;
  
  // CMS adds complexity
  if (answers.cms_needed === 'yes_advanced') complexity += 0.3;
  else if (answers.cms_needed === 'yes_easy') complexity += 0.2;
  
  // User accounts add complexity
  if (answers.user_accounts === 'advanced') complexity += 0.4;
  else if (answers.user_accounts === 'social') complexity += 0.3;
  else if (answers.user_accounts === 'simple') complexity += 0.2;
  
  // Integrations add complexity
  if (answers.payment_processing && answers.payment_processing.length > 0) complexity += 0.3;
  if (answers.third_party_tools) complexity += 0.2;
  if (answers.api_requirements) complexity += 0.3;
  
  // Content volume affects timeline
  if (answers.content_volume === '100+ pages (large site/catalog)') complexity += 0.4;
  else if (answers.content_volume === '51-100 pages (complex site)') complexity += 0.3;
  else if (answers.content_volume === '16-50 pages (larger business site)') complexity += 0.2;
  
  return Math.min(complexity, 2.5); // Cap at 2.5x base timeline
};

// Generate recommendations based on submission
const generateRecommendations = (submission) => {
  const answers = submission.answers;
  const recommendations = [];

  // Technology recommendations
  if (answers.website_type === 'static') {
    recommendations.push({
      category: 'Technology Stack',
      recommendation: 'Recommend using a static site generator (like Gatsby or Next.js) for optimal performance and SEO.'
    });
  } else if (answers.website_type === 'dynamic') {
    recommendations.push({
      category: 'Technology Stack',
      recommendation: 'Recommend using a modern CMS like WordPress or a headless CMS for flexibility and ease of management.'
    });
  }

  // Design recommendations
  if (answers.design_style === 'modern') {
    recommendations.push({
      category: 'Design Approach',
      recommendation: 'Focus on clean typography, generous white space, and minimal color palette for a modern aesthetic.'
    });
  }

  // SEO recommendations
  if (!answers.seo_keywords || answers.seo_keywords.trim() === '') {
    recommendations.push({
      category: 'SEO Strategy',
      recommendation: 'Conduct keyword research to identify target keywords for better search engine visibility.'
    });
  }

  // Content recommendations
  if (answers.content_ready === 'help') {
    recommendations.push({
      category: 'Content Strategy',
      recommendation: 'Include content creation services in the project scope to ensure high-quality, SEO-optimized content.'
    });
  }

  return recommendations;
};

// Extract functional requirements
const extractFunctionalRequirements = (answers) => {
  const requirements = [];
  
  if (answers.cms_needed && answers.cms_needed !== 'no') {
    requirements.push(`Content Management System (${answers.cms_needed})`);
  }
  
  if (answers.user_accounts && answers.user_accounts !== 'no') {
    requirements.push(`User Account System (${answers.user_accounts})`);
  }
  
  if (answers.blog_needed === 'yes') {
    requirements.push('Blog/News System');
  }
  
  if (answers.payment_processing && answers.payment_processing.length > 0) {
    requirements.push('Payment Processing');
  }
  
  return requirements;
};

// Extract technical requirements
const extractTechnicalRequirements = (answers) => {
  const requirements = [];
  
  if (answers.mobile_requirements) {
    const mobileReqs = Array.isArray(answers.mobile_requirements) 
      ? answers.mobile_requirements 
      : [answers.mobile_requirements];
    requirements.push(...mobileReqs);
  }
  
  if (answers.performance_requirements) {
    const perfReqs = Array.isArray(answers.performance_requirements) 
      ? answers.performance_requirements 
      : [answers.performance_requirements];
    requirements.push(...perfReqs);
  }
  
  return requirements;
};

// Extract design requirements
const extractDesignRequirements = (answers) => {
  const requirements = [];
  
  if (answers.design_style) {
    requirements.push(`Design Style: ${getDesignStyleDescription(answers.design_style)}`);
  }
  
  if (answers.color_preferences) {
    requirements.push(`Color Preferences: ${answers.color_preferences}`);
  }
  
  if (answers.existing_branding) {
    requirements.push(`Existing Branding: ${answers.existing_branding}`);
  }
  
  return requirements;
};

// Extract content requirements
const extractContentRequirements = (answers) => {
  const requirements = [];
  
  if (answers.content_volume) {
    requirements.push(`Page Count: ${answers.content_volume}`);
  }
  
  if (answers.content_ready) {
    requirements.push(`Content Readiness: ${getContentReadinessDescription(answers.content_ready)}`);
  }
  
  if (answers.content_types) {
    const contentTypes = Array.isArray(answers.content_types) 
      ? answers.content_types 
      : [answers.content_types];
    requirements.push(`Content Types: ${contentTypes.join(', ')}`);
  }
  
  return requirements;
};

// Generate deliverables list
const generateDeliverables = (answers) => {
  const deliverables = [
    'Project discovery and requirements documentation',
    'Site architecture and wireframes',
    'Visual design mockups',
    'Responsive website development',
    'Content integration',
    'Testing and quality assurance',
    'Launch and deployment',
    'Training and documentation'
  ];
  
  if (answers.cms_needed && answers.cms_needed !== 'no') {
    deliverables.push('Content management system setup and training');
  }
  
  if (answers.user_accounts && answers.user_accounts !== 'no') {
    deliverables.push('User account system implementation');
  }
  
  return deliverables;
};

// Generate project assumptions
const generateAssumptions = (answers) => {
  const assumptions = [
    'Client will provide all necessary content and materials in a timely manner',
    'Client will provide feedback and approvals within agreed timeframes',
    'All third-party services and integrations will be accessible and functional'
  ];
  
  if (answers.hosting_preference === 'existing') {
    assumptions.push('Existing hosting environment meets technical requirements');
  }
  
  if (answers.existing_branding === 'complete') {
    assumptions.push('Existing brand guidelines will be provided and followed');
  }
  
  return assumptions;
};

// Generate project risks
const generateRisks = (answers) => {
  const risks = [];
  
  if (answers.urgency_level === 'asap') {
    risks.push('Tight timeline may impact quality or require additional resources');
  }
  
  if (answers.content_ready === 'help') {
    risks.push('Content creation delays could impact project timeline');
  }
  
  if (answers.budget_flexibility === 'fixed') {
    risks.push('Fixed budget may limit scope flexibility for additional requirements');
  }
  
  if (answers.third_party_tools) {
    risks.push('Third-party integration dependencies may cause delays');
  }
  
  return risks;
};

// Download file utility
export const downloadFile = (content, filename, contentType = 'text/plain') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

