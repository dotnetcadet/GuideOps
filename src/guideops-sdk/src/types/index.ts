export interface GuideOpsConfig {
  apiUrl: string;
  getAccessToken: () => Promise<string>;
  schoolYear: string;
  userId?: string; // Azure AD object ID — auto-extracted from token if not provided
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  type: string;
  priority: number;
  steps: GuideStep[];
}

export interface GuideStep {
  id: number;
  stepOrder: number;
  elementSelector: string;
  title: string;
  description: string;
  side: string;
  pageUrl: string | null;
}

export interface Handbook {
  id: number;
  title: string;
  contentUrl: string | null;
  contentHtml: string | null;
  schoolYear: string;
  requiresAcknowledgment: boolean;
}

export interface Acknowledgment {
  id: number;
  handbookId: number;
  acknowledgedAt: string;
}
