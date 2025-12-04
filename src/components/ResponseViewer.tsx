import { useState } from 'react';
import { Link2, Terminal, Copy, Check } from 'lucide-react';

interface ResponseViewerProps {
  response: string;
  method?: string;
  url?: string;
  status?: number;
  contentType?: string;
}

export const ResponseViewer = ({ response, method, url, status, contentType }: ResponseViewerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlCommand = method && url ? `curl -X ${method} "${url}"` : '';

  const copyToClipboard = async (text: string, type: 'url' | 'curl') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'url') {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } else {
        setCopiedCurl(true);
        setTimeout(() => setCopiedCurl(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const RequestInfo = ({ method, url, status }: { method?: string; url?: string; status?: number }) => (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      {method && (
        <div className="text-sm font-mono mb-1">
          <span className="text-muted-foreground">Method:</span> <span className="font-bold text-foreground">{method}</span>
        </div>
      )}
      {url && (
        <div className="text-sm font-mono mb-1 break-all">
          <span className="text-muted-foreground">URL:</span> <span className="font-bold text-foreground">{url}</span>
        </div>
      )}
      {status && (
        <div className="text-sm font-mono">
          <span className="text-muted-foreground">Status:</span> <span className={`font-bold ${status >= 200 && status < 300 ? 'text-green-500' : 'text-red-500'}`}>{status}</span>
        </div>
      )}
    </div>
  );

  const EndpointUrlSection = () => url && (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Endpoint URL</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-start justify-between gap-2">
        <code className="text-sm font-mono text-primary break-all flex-1">{url}</code>
        <button
          onClick={() => copyToClipboard(url, 'url')}
          className="p-1.5 hover:bg-accent rounded transition-colors shrink-0"
          title="Copiar URL"
        >
          {copiedUrl ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );

  const CurlCommandSection = () => curlCommand && (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Curl Command</span>
      </div>
      <div className="bg-card border border-border rounded-lg p-3 flex items-start justify-between gap-2">
        <code className="text-sm font-mono text-green-400 break-all flex-1">{curlCommand}</code>
        <button
          onClick={() => copyToClipboard(curlCommand, 'curl')}
          className="p-1.5 hover:bg-accent rounded transition-colors shrink-0"
          title="Copiar comando"
        >
          {copiedCurl ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );
  
  // Only show media when contentType is explicitly set by the server
  if (contentType === 'video') {
    return (
      <div>
        <RequestInfo method={method} url={url} status={status} />
        <div className="w-full bg-black rounded-lg overflow-hidden mb-4">
          <video 
            src={response} 
            controls
            autoPlay={false}
            playsInline
            className="w-full h-auto"
            style={{ maxHeight: '400px', display: 'block' }}
            preload="auto"
          >
            Seu navegador não suporta a reprodução de vídeos.
          </video>
        </div>
        <EndpointUrlSection />
        <CurlCommandSection />
      </div>
    );
  }
  
  if (contentType === 'image') {
    return (
      <div>
        <RequestInfo method={method} url={url} status={status} />
        <div className="w-full bg-black/10 rounded-lg overflow-hidden flex items-center justify-center mb-4">
          <img 
            src={response} 
            alt="" 
            className="max-w-full h-auto rounded"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none', maxHeight: '300px' }}
          />
          {!imageLoaded && (
            <div className="p-4 text-sm text-muted-foreground">Carregando imagem...</div>
          )}
        </div>
        <EndpointUrlSection />
        <CurlCommandSection />
      </div>
    );
  }

  // For JSON/text responses, just show the data
  return (
    <div>
      <RequestInfo method={method} url={url} status={status} />
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">JSON Response</div>
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words max-h-60 overflow-auto">
          {response}
        </pre>
      </div>
      <EndpointUrlSection />
      <CurlCommandSection />
    </div>
  );
};
