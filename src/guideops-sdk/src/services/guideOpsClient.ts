import type { Guide, Handbook, Acknowledgment } from '../types';
import type { GuideOpsConfig } from '../types';

const GET_ASSIGNED_GUIDES = `
  query GetAssignedGuides($azureAdObjectId: String!, $schoolYear: String!) {
    assignedGuides(azureAdObjectId: $azureAdObjectId, schoolYear: $schoolYear) {
      id
      title
      description
      type
      priority
      steps {
        id
        stepOrder
        elementSelector
        title
        description
        side
        pageUrl
      }
    }
  }
`;

const GET_PENDING_HANDBOOKS = `
  query GetPendingHandbooks($azureAdObjectId: String!, $schoolYear: String!) {
    pendingHandbooks(azureAdObjectId: $azureAdObjectId, schoolYear: $schoolYear) {
      id
      title
      contentUrl
      contentHtml
      schoolYear
      requiresAcknowledgment
    }
  }
`;

const RECORD_ACKNOWLEDGMENT = `
  mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
    recordAcknowledgment(input: $input) {
      id
      handbookId
      acknowledgedAt
    }
  }
`;

const RECORD_GUIDE_COMPLETION = `
  mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
    recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
      id
    }
  }
`;

async function graphqlRequest<T>(
  config: GuideOpsConfig,
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const token = await config.getAccessToken();
  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }
  return result.data as T;
}

export function createGuideOpsClient(config: GuideOpsConfig) {
  return {
    async getAssignedGuides(azureAdObjectId: string, schoolYear: string): Promise<Guide[]> {
      const data = await graphqlRequest<{ assignedGuides: Guide[] }>(
        config,
        GET_ASSIGNED_GUIDES,
        { azureAdObjectId, schoolYear },
      );
      return data.assignedGuides;
    },

    async getPendingHandbooks(azureAdObjectId: string, schoolYear: string): Promise<Handbook[]> {
      const data = await graphqlRequest<{ pendingHandbooks: Handbook[] }>(
        config,
        GET_PENDING_HANDBOOKS,
        { azureAdObjectId, schoolYear },
      );
      return data.pendingHandbooks;
    },

    async recordAcknowledgment(
      azureAdObjectId: string,
      handbookId: number,
      schoolYear: string,
    ): Promise<Acknowledgment> {
      const data = await graphqlRequest<{ recordAcknowledgment: Acknowledgment }>(
        config,
        RECORD_ACKNOWLEDGMENT,
        { input: { azureAdObjectId, handbookId, schoolYear } },
      );
      return data.recordAcknowledgment;
    },

    async recordGuideCompletion(azureAdObjectId: string, guideId: number): Promise<void> {
      await graphqlRequest(
        config,
        RECORD_GUIDE_COMPLETION,
        { azureAdObjectId, guideId },
      );
    },
  };
}

export type GuideOpsClient = ReturnType<typeof createGuideOpsClient>;
