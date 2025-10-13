import { useState, memo } from 'react';
import { ChevronDown, Play, Code } from 'lucide-react';
import { ApiEndpoint as ApiEndpointType } from '@/types/api';
import { EndpointForm } from './EndpointForm';
import { ResponseViewer } from './ResponseViewer';
import { useApiHealth } from '@/hooks/useApiHealth';

interface ApiEndpointProps {
  endpoint: ApiEndpointType;
  serverUrl: string;
}

const ApiEndpointComponent = ({ endpoint, serverUrl }: ApiEndpointProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [requestInfo, setRequestInfo] = useState<{method: string; url: string; status: number; contentType?: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const healthStatus = useApiHealth(serverUrl, endpoint.path);

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setResponse(null);
    setRequestInfo(null);
    setResponseKey(prev => prev + 1);
    try {
      // Use local proxy to avoid CORS for specific endpoints
      let url: string;
      if (endpoint.id === 'noticias') {
        const params = new URLSearchParams(formData);
        url = `/api/proxy-noticias?${params.toString()}`;
      } else if (endpoint.id === 'hentai') {
        const params = new URLSearchParams(formData);
        url = `/api/proxy-hentai?${params.toString()}`;
      } else {
        // Default: direct request
        const params = new URLSearchParams(formData);
        url = `${serverUrl}${endpoint.path}?${params.toString()}`;
      }
      
      const res = await fetch(url);
      
      const contentType = res.headers.get('content-type') || '';
      
      // Handle different content types
      const displayUrl = endpoint.id === 'noticias' || endpoint.id === 'hentai' 
        ? `${serverUrl}${endpoint.path}` 
        : url;
      
      if (contentType.includes('video/')) {
        // Direct video stream - create blob URL for player
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setResponse(blobUrl);
        setRequestInfo({
          method: endpoint.method,
          url: displayUrl,
          status: res.status,
          contentType: 'video'
        });
      } else if (contentType.includes('image/')) {
        // Direct image - create blob URL for display
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setResponse(blobUrl);
        setRequestInfo({
          method: endpoint.method,
          url: displayUrl,
          status: res.status,
          contentType: 'image'
        });
      } else {
        // JSON or text response
        try {
          const data = await res.json();
          setResponse(JSON.stringify(data, null, 2));
          setRequestInfo({
            method: endpoint.method,
            url: displayUrl,
            status: res.status,
            contentType: 'json'
          });
        } catch {
          // If JSON parsing fails, treat as text
          const text = await res.text();
          setResponse(text);
          setRequestInfo({
            method: endpoint.method,
            url: displayUrl,
            status: res.status,
            contentType: 'text'
          });
        }
      }
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Request failed', message: String(error) }, null, 2));
      setRequestInfo({
        method: endpoint.method,
        url: `${serverUrl}${endpoint.path}`,
        status: 500
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResponse(null);
    setRequestInfo(null);
  };

  const getStatusClass = () => {
    if (healthStatus === 'online') return 'status-online';
    if (healthStatus === 'offline') return 'status-offline';
    return 'status-checking';
  };

  const getStatusText = () => {
    if (healthStatus === 'online') return 'Operacional';
    if (healthStatus === 'offline') return 'Offline';
    return 'Verificando...';
  };

  return (
    <div className="border-t border-border/50 backdrop-blur-sm hover:bg-accent/5 transition-smooth group/endpoint">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-7 py-4 text-left flex items-center justify-between group/btn"
      >
        <div className="flex items-center min-w-0 flex-1 gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm group-hover/btn:blur-md transition-smooth"></div>
            <span className="relative inline-flex items-center px-3 py-1.5 text-xs font-black gradient-primary text-primary-foreground rounded-lg font-sans shadow-elegant group-hover/btn:scale-105 group-hover/btn:shadow-glow transition-bounce uppercase tracking-wider">
              {endpoint.method}
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1 gap-1">
            <span className="font-bold truncate text-sm font-mono group-hover/btn:text-primary transition-smooth" title={endpoint.path}>
              {endpoint.path}
            </span>
            <span className="text-xs text-muted-foreground truncate font-sans font-medium" title={endpoint.alias}>
              {endpoint.alias}
            </span>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 transition-bounce text-muted-foreground group-hover/btn:text-primary flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="bg-gradient-accent/30 px-7 py-6 border-t border-border/50 backdrop-blur-sm animate-fade-in">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg gradient-primary shadow-elegant">
                <Play className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-foreground font-black text-sm font-sans uppercase tracking-wider">
                Testar Endpoint
              </h3>
            </div>
            <EndpointForm
              endpoint={endpoint}
              onSubmit={handleSubmit}
              onClear={handleClear}
              isLoading={isLoading}
              hasResponse={!!response}
            />
          </div>

          {response && (
            <div className="animate-scale-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg gradient-secondary shadow-elegant">
                  <Code className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="text-foreground font-black text-sm font-sans uppercase tracking-wider">
                  Resposta
                </h3>
              </div>
              <ResponseViewer 
                key={responseKey}
                response={response} 
                method={requestInfo?.method}
                url={requestInfo?.url}
                status={requestInfo?.status}
                contentType={requestInfo?.contentType}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ApiEndpoint = memo(ApiEndpointComponent);
