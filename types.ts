
export type AppState = 'landing' | 'how-it-works' | 'news' | 'standards' | 'about' | 'calculating' | 'result' | 'payment' | 'chat' | 'terms' | 'privacy';

export type ComplianceValue = 'yes' | 'no' | 'unsure';

export interface ChatMessage {
  role: 'user' | 'model' | 'system' | 'thinking';
  content: string;
}

export interface QuizResults {
  [key: string]: ComplianceValue;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}
