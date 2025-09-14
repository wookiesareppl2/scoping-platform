import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetTierSelector from '../../components/BudgetTierSelector';

describe('BudgetTierSelector', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders budget tier options', () => {
    render(<BudgetTierSelector value="" onChange={mockOnChange} />);
    
    expect(screen.getByText('Budget-Constrained Project')).toBeInTheDocument();
    expect(screen.getByText('Custom Development Project')).toBeInTheDocument();
  });

  it('shows price ranges', () => {
    render(<BudgetTierSelector value="" onChange={mockOnChange} />);
    
    expect(screen.getByText('$500 - $2,000')).toBeInTheDocument();
    expect(screen.getByText('$3,000+')).toBeInTheDocument();
  });

  it('calls onChange when tier is selected', () => {
    render(<BudgetTierSelector value="" onChange={mockOnChange} />);
    
    const budgetTierCard = screen.getByText('Budget-Constrained Project').closest('div[role="button"]');
    fireEvent.click(budgetTierCard);
    
    expect(mockOnChange).toHaveBeenCalledWith('budget-constrained');
  });

  it('shows selected state correctly', () => {
    render(<BudgetTierSelector value="budget-constrained" onChange={mockOnChange} />);
    
    const selectedCard = screen.getByText('Budget-Constrained Project').closest('.ring-2');
    expect(selectedCard).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Please select a budget tier';
    render(<BudgetTierSelector value="" onChange={mockOnChange} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows confirmation message when tier is selected', () => {
    render(<BudgetTierSelector value="full-budget" onChange={mockOnChange} />);
    
    expect(screen.getByText(/Great choice!/)).toBeInTheDocument();
    expect(screen.getByText(/Custom Development Project/)).toBeInTheDocument();
  });
});