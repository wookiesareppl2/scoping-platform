# AI Prompting Guide for Client Scoping Platform

## Overview

This document provides guidelines for AI assistants working on the Client Scoping Platform. It includes context about the project structure, common modification patterns, and best practices for implementing changes.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── FormWizard.jsx   # Main form controller
│   ├── FormQuestion.jsx # Dynamic question renderer
│   ├── ProgressGamification.jsx
│   ├── HelpfulHints.jsx
│   ├── VisualFeedback.jsx
│   └── MobileOptimization.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── ScopingForm.jsx
│   ├── AdminDashboard.jsx
│   ├── Submissions.jsx
│   └── Analytics.jsx
├── types/               # Data models and types
│   └── scoping.js
├── utils/               # Utility functions
│   ├── dataExport.js
│   └── githubIntegration.js
└── App.jsx             # Main application component
```

## Common Modification Patterns

### Adding New Questions

1. **Location**: `src/types/scoping.js`
2. **Pattern**: Add to the appropriate category's questions array
3. **Required fields**: `id`, `text`, `type`, `required`, `category`
4. **Optional fields**: `hint`, `placeholder`, `options`, `showIf`

Example:
```javascript
{
  id: 'new_question_id',
  text: 'What is your question?',
  type: 'text', // text, textarea, select, radio, checkbox, number
  required: true,
  category: SCOPING_CATEGORIES.BUSINESS,
  hint: 'This helps us understand...',
  placeholder: 'Enter your answer here...'
}
```

### Modifying Form Logic

1. **Conditional Logic**: Update `shouldShowQuestion` function in `src/types/scoping.js`
2. **Validation**: Update `validateAnswer` function in `src/types/scoping.js`
3. **Form Flow**: Modify `FormWizard.jsx` component

### Styling Changes

1. **Use Tailwind CSS classes** - avoid inline styles
2. **Follow existing color scheme** defined in `tailwind.config.js`
3. **Maintain responsive design** with mobile-first approach
4. **Use shadcn/ui components** for consistency

### Adding New Export Formats

1. **Location**: `src/utils/dataExport.js`
2. **Pattern**: Create new export function following existing patterns
3. **Integration**: Add to export options in admin dashboard

## Development Workflow

### Making Changes

1. **Analyze the request** - understand what needs to be changed
2. **Identify affected files** - determine which components need updates
3. **Plan the implementation** - outline the approach
4. **Make changes** - implement with proper error handling
5. **Test locally** - ensure changes work correctly
6. **Update documentation** - if needed
7. **Commit with descriptive messages**

### Testing Checklist

- [ ] Form functionality works correctly
- [ ] Mobile responsiveness is maintained
- [ ] All validation rules work
- [ ] Export functionality works
- [ ] Admin dashboard functions properly
- [ ] No console errors
- [ ] Accessibility is maintained

### Commit Message Format

Use conventional commits format:
```
type(scope): description

feat(form): add new industry selection question
fix(mobile): resolve touch target sizing issue
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(export): optimize data transformation logic
```

## Component Guidelines

### FormWizard.jsx
- **Purpose**: Main form controller with step navigation
- **Key features**: Progress tracking, auto-save, validation
- **Common changes**: Adding new steps, modifying navigation logic

### FormQuestion.jsx
- **Purpose**: Renders individual questions dynamically
- **Key features**: Type-specific rendering, validation, hints
- **Common changes**: Adding new question types, improving UX

### AdminDashboard.jsx
- **Purpose**: Submission management interface
- **Key features**: Status management, filtering, export
- **Common changes**: Adding new status types, improving filters

### Data Export (dataExport.js)
- **Purpose**: Generate various export formats
- **Key features**: JSON, Markdown, GitHub integration
- **Common changes**: Adding new formats, improving templates

## Best Practices

### Code Quality
- Use consistent naming conventions
- Add comments for complex logic
- Handle errors gracefully
- Maintain TypeScript-like prop validation

### User Experience
- Provide clear feedback for user actions
- Maintain consistent visual hierarchy
- Ensure accessibility compliance
- Optimize for mobile devices

### Performance
- Minimize re-renders with proper state management
- Optimize images and assets
- Use lazy loading where appropriate
- Keep bundle size minimal

### Security
- Validate all user inputs
- Sanitize data before export
- Use secure storage practices
- Implement proper error boundaries

## Common Issues and Solutions

### Form Not Saving
- Check localStorage permissions
- Verify auto-save functionality
- Ensure proper error handling

### Mobile Display Issues
- Test on actual devices
- Check touch target sizes (minimum 44px)
- Verify responsive breakpoints

### Export Failures
- Validate data structure
- Check browser download permissions
- Ensure proper error messages

### Performance Issues
- Profile component renders
- Optimize large lists with virtualization
- Check for memory leaks

## Integration Points

### GitHub Integration
- Uses GitHub API for repository management
- Requires personal access token
- Handles project setup automation

### Local Storage
- Stores form data and submissions
- Implements auto-save functionality
- Provides data persistence

### Export System
- Multiple format support
- Template-based generation
- Customizable output

## Future Enhancements

### Planned Features
- Multi-language support
- Advanced analytics
- CRM integration
- Email automation
- Template library

### Technical Improvements
- TypeScript migration
- Comprehensive testing
- Performance optimization
- Enhanced accessibility

## Support and Maintenance

### Regular Tasks
- Dependency updates
- Security patches
- Performance monitoring
- Content updates

### Monitoring
- Error tracking
- User behavior analytics
- Performance metrics
- Uptime monitoring

## Contact and Resources

- **Repository**: https://github.com/wookiesareppl2/scoping-platform
- **Documentation**: README.md and CONTEXT.md
- **Issues**: GitHub Issues for bug reports and feature requests

---

This guide should be updated as the project evolves and new patterns emerge.

## 📝 Scoping Form Feature Prompts

### Form Enhancement Requests
```
Now I'd like to work on the scoping form validation, which involves:
Adding real-time validation for email fields and required questions.

Please:
1. Add email format validation to contact fields
2. Implement required field highlighting
3. Add progress validation before step advancement
4. Test validation with various input scenarios
5. Commit changes with descriptive messages
```

### UI/UX Improvements
```
Now I'd like to work on the scoping form user experience, which involves:
Improving the visual feedback and progress indicators.

Please:
1. Enhance progress bar with completion percentages
2. Add smooth transitions between form steps
3. Improve mobile touch interactions
4. Add loading animations for better perceived performance
5. Test on various screen sizes and devices
```

### Data Management Features
```
Now I'd like to work on scoping form data export, which involves:
Adding CSV and PDF export functionality for submissions.

Please:
1. Implement CSV export for submission data
2. Add PDF generation for formatted reports
3. Create export buttons in admin dashboard
4. Add date range filtering for exports
5. Test export functionality with sample data
```

### Integration Enhancements
```
Now I'd like to work on scoping form integrations, which involves:
Adding email notifications when forms are submitted.

Please:
1. Implement email service integration
2. Create notification templates for submissions
3. Add admin notification preferences
4. Test email delivery and formatting
5. Update documentation with email setup instructions
```

### Performance Optimization
```
Now I'd like to work on scoping form performance, which involves:
Optimizing form loading and submission speed.

Please:
1. Implement lazy loading for form components
2. Add form data caching for better UX
3. Optimize bundle size and loading times
4. Add performance monitoring
5. Test performance improvements across devices
```

### Testing and Quality Assurance
```
Now I'd like to work on scoping form testing, which involves:
Adding comprehensive test coverage for form functionality.

Please:
1. Create unit tests for form validation logic
2. Add integration tests for submission workflow
3. Implement end-to-end testing for user journeys
4. Add accessibility testing and improvements
5. Document testing procedures and coverage
```


## 🏠 Homepage Design & Content Prompts

### Content Strategy Updates
```
Now I'd like to work on the homepage messaging, which involves:
Updating the value proposition to better address client pain points.

Please:
1. Research common client concerns about web development projects
2. Update hero section messaging to address these concerns
3. Add social proof or testimonials if available
4. Test different call-to-action button text variations
5. Ensure messaging aligns with target client personas
```

### Conversion Optimization
```
Now I'd like to work on homepage conversion optimization, which involves:
Improving the call-to-action placement and effectiveness.

Please:
1. Add multiple CTA buttons at strategic points
2. Implement A/B testing for button colors and text
3. Add urgency or scarcity elements where appropriate
4. Optimize form preview or progress indicators
5. Test and measure conversion improvements
```

### Visual Design Enhancements
```
Now I'd like to work on homepage visual design, which involves:
Adding more engaging visual elements while maintaining simplicity.

Please:
1. Add subtle animations or micro-interactions
2. Include relevant imagery or illustrations
3. Improve typography hierarchy and readability
4. Add visual progress indicators for the process
5. Ensure accessibility standards are met
```

### Trust Building Elements
```
Now I'd like to work on homepage trust building, which involves:
Adding elements that increase client confidence in the process.

Please:
1. Add client testimonials or case study previews
2. Include security badges or certifications
3. Add team photos or company information
4. Include estimated response time commitments
5. Add FAQ section addressing common concerns
```

### Mobile Experience Optimization
```
Now I'd like to work on homepage mobile experience, which involves:
Optimizing the design specifically for mobile users.

Please:
1. Improve mobile navigation and button sizing
2. Optimize text readability on small screens
3. Ensure touch targets meet accessibility guidelines
4. Test loading speed on mobile devices
5. Add mobile-specific features like click-to-call
```


## 🎨 FormWizard UX Improvement Prompting Patterns

### **Feature Completion Workflow Prompts**

#### **UX Analysis and Improvement**
```
"Analyze the current [component] for UX issues focusing on:
- Layout complexity and cognitive load
- Mobile responsiveness and touch targets
- Progress communication and user orientation
- Visual hierarchy and information architecture
- Accessibility and inclusive design principles

Provide specific examples of issues and actionable improvement recommendations with implementation details."
```

#### **Mobile-First Redesign**
```
"Redesign the [component] with mobile-first principles:
- Single-column layout for better focus and reduced complexity
- Touch-friendly interactive elements (minimum 44px targets)
- Progressive enhancement for larger screens
- Optimized typography and spacing for mobile reading
- Simplified navigation patterns that work across devices

Maintain design system consistency and ensure accessibility compliance."
```

#### **Progress Indication Enhancement**
```
"Improve progress communication in [form/wizard] by implementing:
- Multiple progress indicators (overall, category-specific, quality-based)
- Sticky progress header for constant orientation
- Visual completion status with icons and badges
- Real-time feedback on user progress and answer quality
- Gamification elements to encourage completion

Focus on reducing abandonment rates and improving user confidence."
```

### **Implementation Patterns for UX Improvements**

#### **Category Navigation with Icons**
```jsx
// Enhanced category metadata system
const categoryMetadata = {
  [CATEGORY_ID]: {
    icon: IconComponent,           // Meaningful visual identifier
    title: 'Human-Readable Title', // Clear, descriptive title
    description: 'Purpose explanation', // What this section accomplishes
    color: 'theme-color-class',    // Consistent color coding
    estimatedTime: '5-10 minutes' // User expectation setting
  }
};

// Implementation in navigation
{categories.map((category, index) => {
  const metadata = categoryMetadata[category];
  const IconComponent = metadata.icon;
  const completion = getCategoryCompletion(category);
  
  return (
    <Button
      variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
      className="flex items-center space-x-2"
    >
      <IconComponent className="w-4 h-4" />
      <span className="hidden sm:inline">{metadata.title}</span>
      {isCompleted && <CheckCircle className="w-4 h-4 text-green-600" />}
    </Button>
  );
})}
```

#### **Sticky Progress Header Pattern**
```jsx
// Always-visible progress communication
<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
  <div className="max-w-4xl mx-auto px-4 py-6">
    {/* Step Indicator */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Process Title</h1>
        <Badge variant="secondary">Step {current + 1} of {total}</Badge>
      </div>
      <div className="text-sm text-gray-500">
        {Math.round(progressPercentage)}% Complete
      </div>
    </div>
    
    {/* Progress Bar */}
    <Progress value={progressPercentage} className="h-2" />
    
    {/* Category Navigation */}
    <CategoryNavigation />
  </div>
</div>
```

#### **Mobile-First Responsive Layout**
```jsx
// Progressive enhancement approach
<div className="min-h-screen bg-gray-50">
  {/* Mobile-optimized header */}
  <div className="sticky top-0 z-10">
    <MobileProgressHeader />
  </div>
  
  {/* Main content with responsive constraints */}
  <div className="max-w-4xl mx-auto px-4 py-8">
    <Card>
      <CardContent className="space-y-6">
        {/* Single-column focused content */}
        <FormContent />
        
        {/* Responsive navigation */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button variant="outline" className="flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden md:flex">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="flex items-center space-x-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
```

### **UX Testing and Validation Prompts**

#### **Cross-Device Testing**
```
"Test the improved UX across devices by:
- Verifying mobile responsiveness on various screen sizes
- Testing touch interactions and button accessibility
- Validating navigation flow on tablet and desktop
- Checking performance impact of UX improvements
- Ensuring accessibility compliance with screen readers

Document any issues found and provide specific fixes."
```

#### **User Flow Validation**
```
"Validate the complete user flow for [feature] by:
- Walking through each step as a first-time user
- Identifying potential confusion or friction points
- Testing error states and edge cases
- Verifying progress communication clarity
- Checking completion and success states

Provide recommendations for any UX improvements needed."
```

### **Documentation Patterns for UX Features**

#### **UX Improvement Documentation**
```
"Document UX improvements by creating:
- Problem statement with specific user pain points
- Solution overview with before/after comparisons
- Implementation details with code examples
- Expected impact metrics and success criteria
- Testing methodology and validation results
- Future enhancement opportunities

Include visual examples and user journey maps where helpful."
```

#### **Feature Completion Summary**
```
"Create a comprehensive feature completion summary including:
- Feature overview and problem statement
- Technical implementation details
- UX design principles applied
- Testing and quality assurance completed
- Documentation created and updated
- Success criteria met and expected impact
- Lessons learned and best practices established
- Future enhancement opportunities identified

Format as a professional project completion report."
```

### **Common UX Improvement Anti-Patterns**

#### **❌ Avoid: Overwhelming Layouts**
```jsx
// DON'T: Complex multi-column layouts that compete for attention
<div className="grid grid-cols-3 gap-4">
  <Sidebar />
  <MainContent />
  <AnotherSidebar />
</div>
```

#### **✅ Prefer: Focused Single-Column Design**
```jsx
// DO: Single-column layout with clear hierarchy
<div className="max-w-4xl mx-auto">
  <ProgressHeader />
  <MainContent />
  <Navigation />
</div>
```

#### **❌ Avoid: Generic Progress Indicators**
```jsx
// DON'T: Vague or minimal progress communication
<div>Step 1</div>
<ProgressBar value={50} />
```

#### **✅ Prefer: Comprehensive Progress System**
```jsx
// DO: Multiple progress indicators with clear communication
<div className="progress-system">
  <div className="flex justify-between items-center">
    <h2>Section Title</h2>
    <Badge>Step 2 of 6</Badge>
  </div>
  <Progress value={progressPercentage} />
  <CategoryNavigation />
  <ProgressSummary />
</div>
```

### **UX Improvement Success Metrics**

#### **Completion Rate Optimization**
- Target 85%+ form completion rates
- 40%+ improvement in mobile completion
- 20%+ reduction in time to complete
- Reduced user support requests

#### **User Experience Quality**
- Improved user satisfaction scores (4.5+ stars)
- Reduced cognitive load and confusion
- Better accessibility compliance
- Professional brand representation

---

**These patterns establish a foundation for systematic UX improvements across the platform, ensuring consistent, user-centered design decisions.**

## 💰 Budget-Aware Development Prompting Patterns

### **Business Logic Implementation Prompts**

#### **Budget Tier Selection System**
```
"Create a budget tier selection system that:
- Presents clear options for different budget levels (budget-constrained vs full-budget)
- Provides transparent communication about limitations and benefits for each tier
- Uses professional, consultative language that builds trust
- Includes comprehensive warnings and expectations for budget-constrained projects
- Maintains professional presentation while being honest about constraints

Focus on expectation management and client education rather than sales."
```

#### **Conditional Form Logic**
```
"Implement conditional form logic that:
- Shows different options based on previous selections (budget tier, project type, etc.)
- Adapts subsequent questions and validation rules appropriately
- Maintains form state and passes context between components
- Provides clear guidance and examples relevant to the selected path
- Ensures smooth user experience with logical flow progression

Include proper error handling and validation for conditional fields."
```

#### **Professional Limitation Communication**
```
"Design limitation communication that:
- Clearly explains constraints without being negative or discouraging
- Emphasizes the value and quality still provided within constraints
- Uses professional, consultative language that builds confidence
- Provides context for why limitations exist (business viability, quality maintenance)
- Offers alternatives or upgrade paths when appropriate

Focus on transparency and trust-building rather than restriction."
```

### **Component Architecture Patterns**

#### **Budget-Aware Component Design**
```jsx
// Professional budget tier selector with clear expectations
const BudgetTierSelector = ({ selectedTier, onTierSelect }) => {
  const budgetTiers = [
    {
      id: 'budget-constrained',
      title: 'Budget-Constrained Project',
      price: 'Starting from $500-$2,000',
      includes: [/* clear inclusions */],
      limitations: [/* honest limitations */],
      warnings: [/* professional considerations */]
    },
    {
      id: 'full-budget',
      title: 'Custom Development Project', 
      price: 'Starting from $3,000+',
      includes: [/* comprehensive features */],
      limitations: [], // No limitations for full budget
      warnings: []
    }
  ];

  return (
    <div className="space-y-6">
      {/* Professional tier comparison */}
      {budgetTiers.map(tier => (
        <TierCard 
          key={tier.id}
          tier={tier}
          isSelected={selectedTier === tier.id}
          onSelect={() => onTierSelect(tier.id)}
        />
      ))}
    </div>
  );
};
```

#### **Conditional Requirements Component**
```jsx
// Dynamic options based on budget selection
const ConditionalRequirements = ({ budgetTier, selectedType, onTypeSelect }) => {
  // Different options for different budget tiers
  const getOptionsForTier = (tier) => {
    switch (tier) {
      case 'budget-constrained':
        return staticWebsiteOptions; // Limited to static sites
      case 'full-budget':
        return allWebsiteOptions; // All functionality available
      default:
        return [];
    }
  };

  const options = getOptionsForTier(budgetTier);

  return (
    <div>
      {/* Budget-specific guidance */}
      <BudgetGuidance tier={budgetTier} />
      
      {/* Appropriate options for tier */}
      <OptionsGrid 
        options={options}
        selectedType={selectedType}
        onTypeSelect={onTypeSelect}
      />
    </div>
  );
};
```

#### **Form Integration Pattern**
```jsx
// Enhanced FormQuestion with conditional logic support
const FormQuestion = ({ question, value, onChange, error, formData }) => {
  switch (question.type) {
    case 'budget_tier_selector':
      return (
        <BudgetTierSelector
          selectedTier={value}
          onTierSelect={onChange}
        />
      );

    case 'conditional_website_type':
      const budgetTier = formData?.budget_tier;
      return (
        <ConditionalTechnicalRequirements
          budgetTier={budgetTier}
          selectedWebsiteType={value}
          onWebsiteTypeSelect={onChange}
        />
      );

    default:
      return <StandardFormField />;
  }
};
```

### **Business Communication Patterns**

#### **Professional Constraint Messaging**
```
"Frame budget constraints professionally by:
- Emphasizing value and quality within constraints
- Explaining business rationale for limitations (sustainability, quality focus)
- Providing clear examples of what IS included
- Using consultative language that builds trust
- Offering context about why constraints enable better service

Example: 'This option focuses on delivering maximum value within budget constraints by streamlining our process while maintaining professional quality standards.'"
```

#### **Expectation Setting Language**
```
"Use expectation-setting language that:
- Clearly communicates what to expect without being negative
- Builds confidence in the chosen approach
- Provides context for decision-making
- Emphasizes collaborative partnership
- Sets realistic timelines and deliverables

Example: 'This approach requires thorough initial scoping as changes are minimal, ensuring we deliver exactly what you need the first time.'"
```

#### **Trust-Building Communication**
```
"Build trust through transparent communication by:
- Being honest about limitations and constraints
- Explaining the reasoning behind different approaches
- Providing clear value propositions for each option
- Using professional, consultative language
- Demonstrating expertise through thoughtful guidance

Focus on being a trusted advisor rather than a vendor."
```

### **Form Flow Design Patterns**

#### **Progressive Disclosure**
```
"Implement progressive disclosure that:
- Shows information and options at the right time
- Prevents overwhelming users with too many choices initially
- Builds understanding progressively through the form
- Adapts content based on previous selections
- Maintains clear progress indication throughout

Start with high-level decisions and progressively reveal details."
```

#### **Conditional Validation**
```
"Create conditional validation that:
- Adapts validation rules based on user selections
- Provides appropriate error messages for each context
- Ensures required fields are contextually relevant
- Maintains form integrity across different paths
- Gives clear guidance for completing each section

Validation should be helpful and contextually appropriate."
```

#### **Context-Aware Guidance**
```
"Provide context-aware guidance that:
- Adapts help text and examples based on selections
- Offers relevant suggestions for each user path
- Explains why certain information is needed
- Provides appropriate examples for the selected context
- Maintains consistent tone and helpfulness throughout

Guidance should feel personalized and relevant."
```

### **Testing and Validation Patterns**

#### **Budget Tier Flow Testing**
```
"Test budget-aware flows by:
- Validating each budget tier path independently
- Ensuring appropriate options appear for each tier
- Testing conditional logic and form state management
- Verifying professional presentation of limitations
- Checking mobile responsiveness for all components

Test both happy paths and edge cases for each tier."
```

#### **Client Experience Validation**
```
"Validate client experience by:
- Testing complete form flows for different budget tiers
- Ensuring clear understanding of limitations and benefits
- Verifying professional presentation and messaging
- Checking accessibility and usability across devices
- Gathering feedback on expectation clarity and trust-building

Focus on client understanding and confidence building."
```

### **Common Budget-Aware Anti-Patterns**

#### **❌ Avoid: Negative Limitation Framing**
```jsx
// DON'T: Frame limitations negatively
<Alert variant="destructive">
  <p>Budget projects can't have these features...</p>
</Alert>
```

#### **✅ Prefer: Professional Value Framing**
```jsx
// DO: Frame as focused value delivery
<Alert variant="info">
  <p>This option focuses on delivering maximum value through streamlined, 
     professional static websites perfect for your needs.</p>
</Alert>
```

#### **❌ Avoid: Overwhelming Initial Choices**
```jsx
// DON'T: Show all options without context
<div>
  {allWebsiteTypes.map(type => <Option key={type.id} type={type} />)}
</div>
```

#### **✅ Prefer: Progressive, Context-Aware Disclosure**
```jsx
// DO: Show appropriate options based on budget tier
<div>
  {getOptionsForBudgetTier(budgetTier).map(type => 
    <Option key={type.id} type={type} />
  )}
</div>
```

### **Success Metrics for Budget-Aware Features**

#### **Completion Rate Optimization**
- Budget tier selection completion: Target 95%+
- Conditional flow completion: Target 90%+ after tier selection
- Overall form completion: Monitor impact on total rates
- Client satisfaction with expectation setting

#### **Business Process Improvement**
- Reduced scope creep in budget-constrained projects
- Improved project profitability across tiers
- Better client-project matching
- Enhanced professional reputation

---

**These patterns establish a framework for implementing budget-aware features that balance business needs with professional client service, ensuring sustainable and profitable project delivery across different budget tiers.**