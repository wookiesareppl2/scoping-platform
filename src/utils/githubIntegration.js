// GitHub Integration Utilities for Project Management

export class GitHubIntegration {
  constructor(token = null) {
    this.token = token;
    this.baseURL = 'https://api.github.com';
  }

  // Set GitHub token
  setToken(token) {
    this.token = token;
  }

  // Check if token is configured
  isConfigured() {
    return !!this.token;
  }

  // Make authenticated request to GitHub API
  async makeRequest(endpoint, options = {}) {
    if (!this.token) {
      throw new Error('GitHub token not configured');
    }

    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Authorization': `token ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API Error: ${error.message}`);
    }

    return response.json();
  }

  // Get user repositories
  async getRepositories() {
    try {
      return await this.makeRequest('/user/repos?sort=updated&per_page=100');
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  // Create a new repository
  async createRepository(name, description, isPrivate = true) {
    try {
      const repoData = {
        name: name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase(),
        description,
        private: isPrivate,
        auto_init: true,
        gitignore_template: 'Node',
        license_template: 'mit'
      };

      return await this.makeRequest('/user/repos', {
        method: 'POST',
        body: JSON.stringify(repoData)
      });
    } catch (error) {
      console.error('Error creating repository:', error);
      throw error;
    }
  }

  // Create an issue in a repository
  async createIssue(owner, repo, title, body, labels = []) {
    try {
      const issueData = {
        title,
        body,
        labels
      };

      return await this.makeRequest(`/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        body: JSON.stringify(issueData)
      });
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  }

  // Create project board
  async createProjectBoard(owner, repo, name, description) {
    try {
      const projectData = {
        name,
        body: description
      };

      return await this.makeRequest(`/repos/${owner}/${repo}/projects`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.inertia-preview+json'
        },
        body: JSON.stringify(projectData)
      });
    } catch (error) {
      console.error('Error creating project board:', error);
      throw error;
    }
  }

  // Create milestone
  async createMilestone(owner, repo, title, description, dueDate = null) {
    try {
      const milestoneData = {
        title,
        description,
        due_on: dueDate
      };

      return await this.makeRequest(`/repos/${owner}/${repo}/milestones`, {
        method: 'POST',
        body: JSON.stringify(milestoneData)
      });
    } catch (error) {
      console.error('Error creating milestone:', error);
      throw error;
    }
  }

  // Create multiple issues for project phases
  async createProjectIssues(owner, repo, submission) {
    const issues = generateProjectIssues(submission);
    const createdIssues = [];

    for (const issue of issues) {
      try {
        const createdIssue = await this.createIssue(
          owner, 
          repo, 
          issue.title, 
          issue.body, 
          issue.labels
        );
        createdIssues.push(createdIssue);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error creating issue "${issue.title}":`, error);
      }
    }

    return createdIssues;
  }

  // Setup complete project structure
  async setupProject(submission) {
    const clientName = submission.clientInfo.name;
    const repoName = `${clientName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-website`;
    const description = `Website development project for ${clientName}`;

    try {
      // Create repository
      const repo = await this.createRepository(repoName, description);
      
      // Create project board
      const project = await this.createProjectBoard(
        repo.owner.login,
        repo.name,
        `${clientName} Website Project`,
        'Project management board for website development'
      );

      // Create milestones
      const milestones = await this.createProjectMilestones(
        repo.owner.login,
        repo.name,
        submission
      );

      // Create issues
      const issues = await this.createProjectIssues(
        repo.owner.login,
        repo.name,
        submission
      );

      return {
        repository: repo,
        project,
        milestones,
        issues,
        setupComplete: true
      };
    } catch (error) {
      console.error('Error setting up project:', error);
      throw error;
    }
  }

  // Create project milestones
  async createProjectMilestones(owner, repo, submission) {
    const timeline = generateTimeline(submission);
    const milestones = [];
    let currentDate = new Date();

    for (const phase of timeline.phases) {
      try {
        // Calculate due date based on phase duration
        const durationWeeks = parseInt(phase.duration.match(/\d+/)[0]);
        const dueDate = new Date(currentDate);
        dueDate.setDate(dueDate.getDate() + (durationWeeks * 7));

        const milestone = await this.createMilestone(
          owner,
          repo,
          phase.name,
          `${phase.name} phase for ${submission.clientInfo.name} website project`,
          dueDate.toISOString()
        );

        milestones.push(milestone);
        currentDate = dueDate;

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error creating milestone "${phase.name}":`, error);
      }
    }

    return milestones;
  }
}

// Generate project issues based on submission
export const generateProjectIssues = (submission) => {
  const answers = submission.answers;
  const clientInfo = submission.clientInfo;
  const issues = [];

  // Main project issue
  issues.push({
    title: `${clientInfo.name} - Website Development Project`,
    body: generateMainProjectIssue(submission),
    labels: ['epic', 'client-project', answers.website_type || 'website']
  });

  // Discovery and planning issues
  issues.push({
    title: 'Project Discovery and Requirements Analysis',
    body: generateDiscoveryIssue(submission),
    labels: ['discovery', 'planning', 'phase-1']
  });

  // Design issues
  issues.push({
    title: 'Website Design and Wireframing',
    body: generateDesignIssue(submission),
    labels: ['design', 'wireframes', 'phase-2']
  });

  issues.push({
    title: 'Visual Design and Mockups',
    body: generateVisualDesignIssue(submission),
    labels: ['design', 'mockups', 'phase-2']
  });

  // Development issues
  issues.push({
    title: 'Frontend Development',
    body: generateFrontendIssue(submission),
    labels: ['development', 'frontend', 'phase-3']
  });

  if (needsBackend(answers)) {
    issues.push({
      title: 'Backend Development',
      body: generateBackendIssue(submission),
      labels: ['development', 'backend', 'phase-3']
    });
  }

  if (answers.cms_needed && answers.cms_needed !== 'no') {
    issues.push({
      title: 'Content Management System Setup',
      body: generateCMSIssue(submission),
      labels: ['development', 'cms', 'phase-3']
    });
  }

  // Content issues
  issues.push({
    title: 'Content Integration and Migration',
    body: generateContentIssue(submission),
    labels: ['content', 'integration', 'phase-3']
  });

  // Testing and launch issues
  issues.push({
    title: 'Testing and Quality Assurance',
    body: generateTestingIssue(submission),
    labels: ['testing', 'qa', 'phase-4']
  });

  issues.push({
    title: 'Deployment and Launch',
    body: generateLaunchIssue(submission),
    labels: ['deployment', 'launch', 'phase-4']
  });

  // Integration issues
  if (hasIntegrations(answers)) {
    issues.push({
      title: 'Third-Party Integrations',
      body: generateIntegrationsIssue(submission),
      labels: ['integrations', 'third-party', 'phase-3']
    });
  }

  return issues;
};

// Generate main project issue content
const generateMainProjectIssue = (submission) => {
  const answers = submission.answers;
  const clientInfo = submission.clientInfo;
  
  let content = `# ${clientInfo.name} - Website Development Project\n\n`;
  content += `## Project Overview\n`;
  content += `**Client:** ${clientInfo.name}\n`;
  content += `**Email:** ${clientInfo.email}\n`;
  content += `**Industry:** ${answers.industry || 'Not specified'}\n`;
  content += `**Website Type:** ${getWebsiteTypeDescription(answers.website_type)}\n`;
  content += `**Budget Range:** ${answers.budget_range || 'Not specified'}\n`;
  content += `**Timeline:** ${getUrgencyDescription(answers.urgency_level)}\n\n`;

  content += `## Business Description\n`;
  content += `${answers.business_description || 'No description provided'}\n\n`;

  content += `## Target Audience\n`;
  content += `${answers.target_audience || 'Not specified'}\n\n`;

  content += `## Business Goals\n`;
  content += `${answers.business_goals || 'Not specified'}\n\n`;

  content += `## Key Requirements\n`;
  const requirements = extractAllRequirements(answers);
  requirements.forEach(req => {
    content += `- ${req}\n`;
  });

  content += `\n## Project Phases\n`;
  content += `This project will be completed in the following phases:\n`;
  content += `1. **Discovery & Planning** - Requirements analysis and project planning\n`;
  content += `2. **Design & Wireframing** - Site architecture and visual design\n`;
  content += `3. **Development** - Frontend and backend development\n`;
  content += `4. **Testing & Launch** - Quality assurance and deployment\n\n`;

  content += `## Success Criteria\n`;
  content += `- [ ] Website meets all functional requirements\n`;
  content += `- [ ] Design aligns with brand and user expectations\n`;
  content += `- [ ] Site is responsive and performs well on all devices\n`;
  content += `- [ ] Content is properly integrated and optimized\n`;
  content += `- [ ] All integrations are working correctly\n`;
  content += `- [ ] Client training is completed\n`;
  content += `- [ ] Site is successfully launched\n\n`;

  return content;
};

// Generate discovery issue content
const generateDiscoveryIssue = (submission) => {
  let content = `## Discovery and Requirements Analysis\n\n`;
  content += `### Objectives\n`;
  content += `- Review and validate client requirements\n`;
  content += `- Conduct competitive analysis\n`;
  content += `- Define project scope and deliverables\n`;
  content += `- Create project timeline and milestones\n\n`;

  content += `### Tasks\n`;
  content += `- [ ] Client kickoff meeting\n`;
  content += `- [ ] Requirements review and validation\n`;
  content += `- [ ] Competitive analysis\n`;
  content += `- [ ] Technical architecture planning\n`;
  content += `- [ ] Content audit and planning\n`;
  content += `- [ ] Project timeline creation\n`;
  content += `- [ ] Risk assessment\n\n`;

  content += `### Deliverables\n`;
  content += `- Project requirements document\n`;
  content += `- Technical specification\n`;
  content += `- Project timeline and milestones\n`;
  content += `- Risk assessment report\n\n`;

  return content;
};

// Generate design issue content
const generateDesignIssue = (submission) => {
  const answers = submission.answers;
  
  let content = `## Website Design and Wireframing\n\n`;
  content += `### Design Requirements\n`;
  content += `**Style:** ${getDesignStyleDescription(answers.design_style)}\n`;
  if (answers.color_preferences) {
    content += `**Colors:** ${answers.color_preferences}\n`;
  }
  if (answers.existing_branding) {
    content += `**Branding:** ${answers.existing_branding}\n`;
  }
  content += `\n`;

  content += `### Tasks\n`;
  content += `- [ ] Site architecture and user flow mapping\n`;
  content += `- [ ] Wireframe creation for key pages\n`;
  content += `- [ ] Information architecture review\n`;
  content += `- [ ] Navigation structure design\n`;
  content += `- [ ] Mobile responsiveness planning\n`;
  content += `- [ ] Accessibility considerations\n\n`;

  content += `### Deliverables\n`;
  content += `- Site architecture diagram\n`;
  content += `- Wireframes for all key pages\n`;
  content += `- Navigation structure\n`;
  content += `- Mobile layout plans\n\n`;

  return content;
};

// Generate visual design issue content
const generateVisualDesignIssue = (submission) => {
  let content = `## Visual Design and Mockups\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Visual design concept development\n`;
  content += `- [ ] Color palette and typography selection\n`;
  content += `- [ ] Homepage mockup creation\n`;
  content += `- [ ] Key page mockups\n`;
  content += `- [ ] Mobile design mockups\n`;
  content += `- [ ] Design system documentation\n`;
  content += `- [ ] Client review and approval\n\n`;

  content += `### Deliverables\n`;
  content += `- Visual design mockups\n`;
  content += `- Design system guide\n`;
  content += `- Asset library\n`;
  content += `- Approved final designs\n\n`;

  return content;
};

// Generate frontend development issue content
const generateFrontendIssue = (submission) => {
  const answers = submission.answers;
  
  let content = `## Frontend Development\n\n`;
  content += `### Requirements\n`;
  if (answers.mobile_requirements) {
    const mobileReqs = Array.isArray(answers.mobile_requirements) 
      ? answers.mobile_requirements 
      : [answers.mobile_requirements];
    mobileReqs.forEach(req => {
      content += `- ${req}\n`;
    });
  }
  content += `\n`;

  content += `### Tasks\n`;
  content += `- [ ] Development environment setup\n`;
  content += `- [ ] HTML structure implementation\n`;
  content += `- [ ] CSS styling and responsive design\n`;
  content += `- [ ] JavaScript functionality\n`;
  content += `- [ ] Cross-browser testing\n`;
  content += `- [ ] Performance optimization\n`;
  content += `- [ ] Accessibility implementation\n\n`;

  content += `### Technical Specifications\n`;
  content += `- Responsive design for all screen sizes\n`;
  content += `- Modern browser compatibility\n`;
  content += `- Optimized loading performance\n`;
  content += `- SEO-friendly markup\n\n`;

  return content;
};

// Helper functions
const needsBackend = (answers) => {
  return answers.website_type === 'dynamic' || 
         answers.website_type === 'ecommerce' || 
         answers.website_type === 'webapp' ||
         answers.website_type === 'portal' ||
         (answers.cms_needed && answers.cms_needed !== 'no') ||
         (answers.user_accounts && answers.user_accounts !== 'no');
};

const hasIntegrations = (answers) => {
  return (answers.payment_processing && answers.payment_processing.length > 0) ||
         (answers.email_marketing && answers.email_marketing.length > 0) ||
         (answers.social_media && answers.social_media.length > 0) ||
         answers.third_party_tools ||
         answers.api_requirements;
};

const extractAllRequirements = (answers) => {
  const requirements = [];
  
  if (answers.cms_needed && answers.cms_needed !== 'no') {
    requirements.push(`Content Management System (${answers.cms_needed})`);
  }
  
  if (answers.user_accounts && answers.user_accounts !== 'no') {
    requirements.push(`User Account System (${answers.user_accounts})`);
  }
  
  if (answers.mobile_requirements) {
    const mobileReqs = Array.isArray(answers.mobile_requirements) 
      ? answers.mobile_requirements 
      : [answers.mobile_requirements];
    requirements.push(...mobileReqs);
  }
  
  if (answers.payment_processing && answers.payment_processing.length > 0) {
    requirements.push('Payment Processing');
  }
  
  return requirements;
};

// Import helper functions from dataExport
const getWebsiteTypeDescription = (type) => {
  const descriptions = {
    'static': 'Static/Brochure Website',
    'dynamic': 'Dynamic Website',
    'ecommerce': 'E-commerce Store',
    'webapp': 'Web Application',
    'portal': 'Customer/Member Portal'
  };
  return descriptions[type] || type;
};

const getDesignStyleDescription = (style) => {
  const descriptions = {
    'modern': 'Modern & Clean',
    'professional': 'Professional & Corporate',
    'creative': 'Creative & Artistic',
    'playful': 'Fun & Playful',
    'luxury': 'Luxury & Premium',
    'technical': 'Technical & Data-focused'
  };
  return descriptions[style] || style;
};

const getUrgencyDescription = (urgency) => {
  const descriptions = {
    'asap': 'ASAP - Very urgent',
    'month': 'Within one month',
    'quarter': 'Within 2-3 months',
    'flexible': 'Flexible timeline'
  };
  return descriptions[urgency] || urgency;
};

// Generate additional issue content functions
const generateBackendIssue = (submission) => {
  let content = `## Backend Development\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Database design and setup\n`;
  content += `- [ ] API development\n`;
  content += `- [ ] Authentication system\n`;
  content += `- [ ] Data validation and security\n`;
  content += `- [ ] Performance optimization\n`;
  content += `- [ ] Testing and documentation\n\n`;
  return content;
};

const generateCMSIssue = (submission) => {
  let content = `## Content Management System Setup\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] CMS platform selection and setup\n`;
  content += `- [ ] Content types and fields configuration\n`;
  content += `- [ ] User roles and permissions\n`;
  content += `- [ ] Admin interface customization\n`;
  content += `- [ ] Content migration tools\n`;
  content += `- [ ] Training materials creation\n\n`;
  return content;
};

const generateContentIssue = (submission) => {
  let content = `## Content Integration and Migration\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Content audit and organization\n`;
  content += `- [ ] Content migration from existing sources\n`;
  content += `- [ ] SEO optimization\n`;
  content += `- [ ] Image optimization and processing\n`;
  content += `- [ ] Content review and approval\n\n`;
  return content;
};

const generateTestingIssue = (submission) => {
  let content = `## Testing and Quality Assurance\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Functional testing\n`;
  content += `- [ ] Cross-browser testing\n`;
  content += `- [ ] Mobile responsiveness testing\n`;
  content += `- [ ] Performance testing\n`;
  content += `- [ ] Security testing\n`;
  content += `- [ ] Accessibility testing\n`;
  content += `- [ ] User acceptance testing\n\n`;
  return content;
};

const generateLaunchIssue = (submission) => {
  let content = `## Deployment and Launch\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Production environment setup\n`;
  content += `- [ ] Domain and SSL configuration\n`;
  content += `- [ ] Final content review\n`;
  content += `- [ ] Go-live deployment\n`;
  content += `- [ ] Post-launch monitoring\n`;
  content += `- [ ] Client training and handover\n\n`;
  return content;
};

const generateIntegrationsIssue = (submission) => {
  let content = `## Third-Party Integrations\n\n`;
  content += `### Tasks\n`;
  content += `- [ ] Integration requirements analysis\n`;
  content += `- [ ] API connections setup\n`;
  content += `- [ ] Data synchronization\n`;
  content += `- [ ] Testing and validation\n`;
  content += `- [ ] Error handling and monitoring\n\n`;
  return content;
};

const generateTimeline = (submission) => {
  return {
    phases: [
      { name: 'Discovery & Planning', duration: '2 weeks' },
      { name: 'Design & Wireframing', duration: '3 weeks' },
      { name: 'Development', duration: '6 weeks' },
      { name: 'Testing & Launch', duration: '2 weeks' }
    ]
  };
};

