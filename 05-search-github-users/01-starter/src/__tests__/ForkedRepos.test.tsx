import { render, screen } from '@testing-library/react';
import ForkedRepos from '../components/charts/ForkedRepos';
import { mockRepositories } from './utils.test';

vi.mock('@/components/ui/chart', () => {
  return {
    ChartContainer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    ChartTooltip: ({ content }: { content: React.ReactNode }) => (
      <div>{content}</div>
    ),
    ChartTooltipContent: () => <div>Tooltip Content</div>,
  };
});

vi.mock('recharts', () => {
  return {
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    CartesianGrid: () => <div>CartesianGrid</div>,
    YAxis: () => <div>YAxis</div>,
    XAxis: () => <div>XAxis</div>,
    Bar: () => <div>Bar</div>,
  };
});

describe('Forked Repos', () => {
  beforeEach(() => {
    render(<ForkedRepos repositories={mockRepositories} />);
  });

  test('should render the forked repos component', () => {
    expect(screen.getByText('Forked Repos')).toBeInTheDocument();
  });

  test('should render the chart with correct data', () => {
    expect(screen.getByText('CartesianGrid')).toBeInTheDocument();
    expect(screen.getByText('XAxis')).toBeInTheDocument();
    expect(screen.getByText('YAxis')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
  });
});
