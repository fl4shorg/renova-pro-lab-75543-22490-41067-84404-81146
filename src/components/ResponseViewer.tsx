import { useState } from 'react';

interface ResponseViewerProps {
  response: string;
  method?: string;
  url?: string;
  status?: number;
  contentType?: string;
}

export const ResponseViewer = ({ response, method, url, status, contentType }: ResponseViewerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const RequestInfo = ({ method, url, status }: { method?: string; url?: string; status?: number }) => (
    <div className="mb-3 pb-3 border-b border-primary-foreground/20">
      {method && (
        <div className="text-xs font-mono mb-1">
          <span className="opacity-70">Method:</span> <span className="font-bold">{method}</span>
        </div>
      )}
      {url && (
        <div className="text-xs font-mono mb-1 break-all">
          <span className="opacity-70">URL:</span> <span className="font-bold">{url}</span>
        </div>
      )}
      {status && (
        <div className="text-xs font-mono">
          <span className="opacity-70">Status:</span> <span className="font-bold">{status}</span>
        </div>
      )}
    </div>
  );
  
  // If contentType is explicitly set (direct media), use it
  if (contentType === 'video') {
    return (
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-h-[600px] overflow-auto flex flex-col gap-4">
          <RequestInfo method={method} url={url} status={status} />
          <div className="w-full bg-black rounded overflow-hidden">
            <video 
              src={response} 
              controls
              autoPlay={false}
              playsInline
              className="w-full h-auto"
              onLoadedData={() => setVideoLoaded(true)}
              style={{ maxHeight: '500px', display: 'block' }}
              preload="auto"
            >
              Seu navegador não suporta a reprodução de vídeos.
            </video>
          </div>
        </div>
      </div>
    );
  }
  
  if (contentType === 'image') {
    return (
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-h-80 overflow-auto flex flex-col gap-4">
          <RequestInfo method={method} url={url} status={status} />
          <div className="w-full bg-black/10 rounded overflow-hidden flex items-center justify-center">
            <img 
              src={response} 
              alt="Response media" 
              className="max-w-full h-auto rounded"
              onLoad={() => setImageLoaded(true)}
              style={{ display: 'block' }}
            />
          </div>
          {!imageLoaded && (
            <div className="text-xs text-center opacity-70">Carregando imagem...</div>
          )}
        </div>
      </div>
    );
  }
  
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(response);
  } catch {
    parsedResponse = null;
  }

  // Check if response contains media URLs in JSON
  const findMediaUrl = (obj: any): { url: string; type: 'image' | 'video' } | null => {
    if (!obj || typeof obj !== 'object') return null;
    
    // First check if type is explicitly set
    if (obj.type === 'video' && obj.url) {
      return { url: obj.url, type: 'video' };
    }
    if (obj.type === 'image' && obj.url) {
      return { url: obj.url, type: 'image' };
    }
    
    // Check common media URL properties
    const mediaKeys = ['url', 'image', 'imageUrl', 'img', 'picture', 'photo', 'src', 'link', 'video', 'videoUrl'];
    for (const key of mediaKeys) {
      if (obj[key] && typeof obj[key] === 'string') {
        const value = obj[key];
        
        // Check if it's a video URL
        if (value.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)(\?|$)/i) || 
            value.startsWith('data:video') ||
            key.toLowerCase().includes('video')) {
          return { url: value, type: 'video' };
        }
        
        // Check if it's an image URL
        if (value.startsWith('http') || value.startsWith('data:image') ||
            value.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i)) {
          return { url: value, type: 'image' };
        }
      }
    }
    
    // Search recursively
    for (const key in obj) {
      const result = findMediaUrl(obj[key]);
      if (result) return result;
    }
    
    return null;
  };

  const mediaInfo = parsedResponse ? findMediaUrl(parsedResponse) : null;

  if (mediaInfo) {
    if (mediaInfo.type === 'video') {
      return (
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-h-[600px] overflow-auto flex flex-col gap-4">
            <RequestInfo method={method} url={url} status={status} />
            <div className="w-full bg-black rounded overflow-hidden">
              <video 
                src={mediaInfo.url} 
                controls
                autoPlay={false}
                playsInline
                className="w-full h-auto"
                onLoadedData={() => setVideoLoaded(true)}
                onError={(e) => {
                  console.error('Video error:', e);
                  setVideoLoaded(false);
                }}
                style={{ maxHeight: '500px', display: 'block' }}
                preload="auto"
                crossOrigin="anonymous"
              >
                <source src={mediaInfo.url} />
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>
            <div className="border-t border-primary-foreground/20 pt-3">
              <div className="text-xs font-semibold mb-2 opacity-70">JSON Response:</div>
              <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                {response}
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-primary text-primary-foreground p-4">
          <div className="max-h-80 overflow-auto flex flex-col gap-4">
            <RequestInfo method={method} url={url} status={status} />
            <div className="w-full bg-black/10 rounded overflow-hidden flex items-center justify-center">
              <img 
                src={mediaInfo.url} 
                alt="Response media" 
                className="max-w-full h-auto rounded"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error('Image error:', e);
                  setImageLoaded(false);
                }}
                style={{ display: 'block' }}
                crossOrigin="anonymous"
              />
            </div>
            {!imageLoaded && (
              <div className="text-xs text-center opacity-70">Carregando imagem...</div>
            )}
            <div className="border-t border-primary-foreground/20 pt-3">
              <div className="text-xs font-semibold mb-2 opacity-70">JSON Response:</div>
              <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                {response}
              </pre>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="bg-primary text-primary-foreground p-4">
      <div className="max-h-80 overflow-auto">
        <RequestInfo method={method} url={url} status={status} />
        <pre className="text-xs font-mono whitespace-pre-wrap break-words">
          {response}
        </pre>
      </div>
    </div>
  );
};
