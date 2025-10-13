import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-smooth" />
        </div>
        <div className="absolute inset-0 gradient-primary opacity-0 group-focus-within:opacity-10 rounded-xl blur-xl transition-smooth"></div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar endpoints..."
          className="relative w-full pl-12 pr-4 py-4 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-elegant transition-smooth font-sans shadow-card hover:shadow-md"
        />
      </div>
    </div>
  );
};
