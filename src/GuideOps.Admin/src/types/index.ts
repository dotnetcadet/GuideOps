export interface User {
  id: number;
  azureAdObjectId: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
  acknowledgments?: Acknowledgment[];
  guideCompletions?: GuideCompletion[];
}

export interface Guide {
  id: number;
  title: string;
  description: string;
  type: string;
  isActive: boolean;
  schoolYear: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  steps: GuideStep[];
  assignments?: Assignment[];
}

export interface GuideStep {
  id: number;
  guideId: number;
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
  isActive: boolean;
  requiresAcknowledgment: boolean;
  createdAt: string;
  updatedAt: string;
  assignments?: Assignment[];
}

export interface Acknowledgment {
  id: number;
  userId: number;
  handbookId: number;
  schoolYear: string;
  acknowledgedAt: string;
  ipAddress: string | null;
  user?: User;
  handbook?: Handbook;
}

export interface GuideCompletion {
  id: number;
  userId: number;
  guideId: number;
  completedAt: string;
  user?: User;
  guide?: Guide;
}

export interface Assignment {
  id: number;
  targetType: string;
  targetId: number;
  assignToRole: string;
  schoolYear: string;
  isActive: boolean;
  createdAt: string;
}

export interface AcknowledgmentStats {
  totalAssigned: number;
  acknowledgedCount: number;
  pendingCount: number;
}

export interface SyncResult {
  created: number;
  updated: number;
  deactivated: number;
}
