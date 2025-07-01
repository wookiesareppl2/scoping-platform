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