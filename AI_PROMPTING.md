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
│   ├── MobileOptimization.jsx
│   ├── BudgetTierSelector.jsx
│   └── ConditionalTechnicalRequirements.jsx
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
- **Key features**: Progress tracking, auto-save, validation, UX improvements
- **Common changes**: Adding new steps, modifying navigation logic, UX enhancements

### FormQuestion.jsx
- **Purpose**: Renders individual questions dynamically
- **Key features**: Type-specific rendering, validation, hints
- **Common changes**: Adding new question types, improving UX

### BudgetTierSelector.jsx
- **Purpose**: Budget-aware project scoping
- **Key features**: Budget tier selection, expectation setting
- **Common changes**: Updating budget tiers, modifying messaging

### ConditionalTechnicalRequirements.jsx
- **Purpose**: Dynamic technical requirements based on budget
- **Key features**: Conditional question display, budget-appropriate options
- **Common changes**: Adding new website types, updating conditional logic

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
- Use mobile-first responsive design
- Implement progressive enhancement

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

## 📝 Feature-Specific Prompting Patterns

### Scoping Form Enhancement Requests
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

### Budget-Aware Feature Development
```
Now I'd like to work on budget-aware technical requirements, which involves:
Creating conditional form flows based on client budget constraints.

Please:
1. Implement budget tier selection component
2. Create conditional technical requirements based on budget
3. Add clear expectation setting for budget constraints
4. Test budget-aware flow thoroughly
5. Update documentation with budget-aware patterns
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

## 🎨 FormWizard UX Improvement Patterns

### UX Analysis and Improvement
```
Analyze the current [component] for UX issues focusing on:
- Layout complexity and cognitive load
- Mobile responsiveness and touch targets
- Progress communication and user orientation
- Visual hierarchy and information architecture
- Accessibility and inclusive design principles

Provide specific examples of issues and actionable improvement recommendations with implementation details.
```

### Mobile-First Redesign
```
Redesign the [component] with mobile-first principles:
- Single-column layout for better focus and reduced complexity
- Touch-friendly interactive elements (minimum 44px targets)
- Progressive enhancement for larger screens
- Optimized typography and spacing for mobile reading
- Simplified navigation patterns that work across devices

Maintain design system consistency and ensure accessibility compliance.
```

### Progress Indication Enhancement
```
Improve progress communication in [form/wizard] by implementing:
- Multiple progress indicators (overall, category-specific, quality-based)
- Sticky progress header for constant orientation
- Visual completion status with icons and badges
- Real-time feedback on user progress and answer quality
- Gamification elements to encourage completion

Focus on reducing abandonment rates and improving user confidence.
```

## 💰 Budget-Aware Development Patterns

### Budget Tier Implementation
```
For budget-conscious implementations:
- Clear expectation setting upfront
- Transparent limitation communication
- Professional constraint explanations
- Value-focused messaging
- Appropriate feature scoping
```

### Conditional Logic Patterns
```javascript
// Budget-aware conditional rendering
const getBudgetAppropriateOptions = (budgetTier) => {
  if (budgetTier === 'budget-constrained') {
    return BUDGET_WEBSITE_TYPES;
  }
  return FULL_WEBSITE_TYPES;
};

// Conditional question display
const shouldShowQuestion = (question, formData) => {
  if (question.showIf) {
    return evaluateCondition(question.showIf, formData);
  }
  return true;
};
```

### Client Communication Patterns
```
Improve client experience for [specific area]:
- Reduce cognitive load
- Provide clear guidance
- Minimize required decisions
- Offer helpful examples
- Build trust through transparency
```

## 🔧 Git Workflow Patterns

### Feature Branch Management
```
For feature development:
1. Create from latest main: `git checkout -b feature/[name]`
2. Regular commits with descriptive messages
3. Keep branch focused on single feature
4. Test thoroughly before pull request
5. Merge to main after review
6. Delete feature branch after merge
```

### Conflict Resolution
```
When encountering merge conflicts:
1. Don't panic - conflicts are normal
2. Identify conflicted files with `git status`
3. Request help for complex conflicts
4. Test thoroughly after resolution
5. Complete merge with proper commit message
```

## 📊 Testing and Quality Assurance

### Comprehensive Testing Prompts
```
Test [feature/component] thoroughly:
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness (phone, tablet, desktop)
- Accessibility compliance (screen readers, keyboard navigation)
- Performance impact assessment
- User flow validation
- Error state handling
```

### Documentation Updates
```
Update documentation for [feature]:
- README.md with feature description
- CONTEXT.md with development status
- Component documentation with usage examples
- API documentation if applicable
- Deployment notes if needed
```

## 🎯 Success Metrics and Monitoring

### User Experience Metrics
- Form completion rates (target: 85%+)
- Mobile vs desktop usage patterns
- Time to complete scoping process
- User satisfaction scores
- Support request volume

### Technical Performance
- Page load times
- Mobile responsiveness scores
- Accessibility compliance ratings
- Cross-browser compatibility
- Error rates and handling

---

This guide evolves with each project iteration to capture effective patterns and improve development efficiency.

