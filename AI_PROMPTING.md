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


## 🎨 UX/UI Improvement Prompting

### **Effective UX Analysis Prompts**

#### **Identifying UX Issues**
```
"Analyze the current [component/page] for UX issues, focusing on:
- Cognitive load and information hierarchy
- Mobile responsiveness and touch targets
- User flow and navigation clarity
- Accessibility and inclusive design
- Visual consistency and design system adherence

Provide specific examples of issues and actionable improvement recommendations."
```

#### **Mobile-First Design Improvements**
```
"Redesign the [component] with mobile-first principles:
- Single-column layout for better focus
- Touch-friendly interactive elements (min 44px)
- Optimized typography for mobile reading
- Simplified navigation patterns
- Progressive enhancement for larger screens

Maintain design system consistency and accessibility standards."
```

#### **Form UX Optimization**
```
"Improve the form UX by addressing:
- Step progression and progress indication
- Field grouping and logical flow
- Error handling and validation feedback
- Auto-save and data persistence
- Completion encouragement and gamification

Focus on reducing abandonment rates and improving completion."
```

### **UX Implementation Patterns**

#### **Progress Indication Pattern**
```jsx
// Multi-layered progress communication
<div className="progress-header">
  <div className="overall-progress">
    <Progress value={completionPercentage} />
    <Badge>Step {current} of {total}</Badge>
  </div>
  
  <div className="category-navigation">
    {categories.map(category => (
      <CategoryButton 
        icon={category.icon}
        completion={category.completion}
        isCurrent={category.isCurrent}
      />
    ))}
  </div>
</div>
```

#### **Responsive Layout Pattern**
```jsx
// Mobile-first responsive design
<div className="container">
  {/* Mobile: Single column */}
  <div className="block lg:hidden">
    <MobileOptimizedLayout />
  </div>
  
  {/* Desktop: Enhanced layout */}
  <div className="hidden lg:block">
    <DesktopLayout />
  </div>
</div>
```

#### **Category Metadata Pattern**
```jsx
// Enhanced category information
const categoryMetadata = {
  [CATEGORY_ID]: {
    icon: IconComponent,
    title: 'Human-Readable Title',
    description: 'Clear purpose explanation',
    color: 'theme-color-class',
    estimatedTime: '5-10 minutes'
  }
};
```

### **UX Testing Prompts**

#### **Usability Evaluation**
```
"Evaluate the usability of [feature] by:
- Walking through the user journey step-by-step
- Identifying potential confusion points
- Testing on different screen sizes
- Checking keyboard navigation
- Validating error states and edge cases

Provide specific recommendations for each issue found."
```

#### **Accessibility Audit**
```
"Perform an accessibility audit focusing on:
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios
- Focus management and visual indicators

Ensure WCAG 2.1 AA compliance throughout."
```

### **Common UX Anti-Patterns to Avoid**

#### **❌ Cognitive Overload**
```jsx
// DON'T: Too many elements competing for attention
<div className="grid grid-cols-3">
  <Sidebar />
  <MainContent />
  <AnotherSidebar />
</div>
```

#### **✅ Focused Experience**
```jsx
// DO: Single-column, focused layout
<div className="max-w-4xl mx-auto">
  <MainContent />
</div>
```

#### **❌ Unclear Progress**
```jsx
// DON'T: Vague progress indication
<div>Step 1</div>
```

#### **✅ Clear Progress Communication**
```jsx
// DO: Multiple progress indicators
<div className="progress-system">
  <ProgressBar value={percentage} />
  <StepIndicator current={2} total={6} />
  <CategoryNavigation />
</div>
```

### **UX Improvement Workflow**

1. **Analysis Phase**
   ```
   "Analyze current UX issues in [component/feature]"
   "Identify user pain points and friction areas"
   "Research best practices for [specific UX pattern]"
   ```

2. **Design Phase**
   ```
   "Create improved UX design for [component]"
   "Ensure mobile-first responsive design"
   "Maintain design system consistency"
   ```

3. **Implementation Phase**
   ```
   "Implement UX improvements with proper semantic HTML"
   "Add accessibility features and ARIA labels"
   "Test across different devices and browsers"
   ```

4. **Validation Phase**
   ```
   "Test improved UX for usability issues"
   "Validate accessibility compliance"
   "Measure performance impact of changes"
   ```