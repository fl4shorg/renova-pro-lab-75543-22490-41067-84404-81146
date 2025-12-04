import { useState, useEffect } from 'react';
import { ApiEndpoint } from '@/types/api';
import { Loader2, Play } from 'lucide-react';

interface EndpointFormProps {
  endpoint: ApiEndpoint;
  onSubmit: (data: Record<string, string>) => void;
  onClear: () => void;
  isLoading: boolean;
  hasResponse: boolean;
}

export const EndpointForm = ({ endpoint, onSubmit, onClear, isLoading, hasResponse }: EndpointFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const hiddenParams: Record<string, string> = {};
    endpoint.parameters?.forEach(param => {
      if (param.hidden && param.defaultValue) {
        hiddenParams[param.name] = param.defaultValue;
      }
    });
    setFormData(hiddenParams);
  }, [endpoint]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {endpoint.parameters && endpoint.parameters.filter(p => !p.hidden).length > 0 && (
        <div className="space-y-3">
          {endpoint.parameters.filter(param => !param.hidden).map((param) => (
            <div key={param.name}>
              <label className="block text-xs font-medium text-muted-foreground mb-1 font-sans">
                {param.name}
                {param.required && <span className="text-destructive ml-1">*</span>}
              </label>
              
              {param.description && (
                <div className="text-xs text-muted-foreground/70 mb-2 font-sans">
                  {param.description}
                </div>
              )}

              {param.type === 'select' ? (
                <select
                  name={param.name}
                  value={formData[param.name] || param.defaultValue || ''}
                  onChange={(e) => handleChange(param.name, e.target.value)}
                  required={param.required}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-card placeholder:text-muted-foreground font-mono transition-colors"
                >
                  {param.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : param.type === 'textarea' ? (
                <textarea
                  name={param.name}
                  value={formData[param.name] || ''}
                  onChange={(e) => handleChange(param.name, e.target.value)}
                  placeholder={param.placeholder}
                  required={param.required}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-card placeholder:text-muted-foreground font-mono resize-none transition-colors"
                />
              ) : (
                <input
                  type="text"
                  name={param.name}
                  value={formData[param.name] || ''}
                  onChange={(e) => handleChange(param.name, e.target.value)}
                  placeholder={param.placeholder}
                  required={param.required}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary bg-card placeholder:text-muted-foreground font-mono transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary/90 font-semibold text-primary-foreground px-6 py-3 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          Enviar
        </button>
        
        <button
          type="button"
          onClick={onClear}
          disabled={!hasResponse}
          className="bg-card border border-border hover:border-primary font-semibold text-foreground px-6 py-3 rounded-lg text-sm transition-colors font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpar
        </button>
      </div>
    </form>
  );
};
