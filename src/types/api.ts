export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  alias: string;
  category: string;
  parameters?: Parameter[];
  description?: string;
}

export interface Parameter {
  name: string;
  type: 'text' | 'select' | 'textarea';
  required: boolean;
  description?: string;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

export interface ApiCategory {
  name: string;
  endpoints: ApiEndpoint[];
}

export interface Server {
  url: string;
  name: string;
}
