import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import type { Guide, Handbook, Acknowledgment } from '../types';

export function createGuideOpsClient(apiUrl: string, getAccessToken: () => Promise<string>) {
  const client = new GraphQLClient(apiUrl, {
    requestMiddleware: async (request) => {
      const token = await getAccessToken();
      return {
        ...request,
        headers: {
          ...request.headers,
          authorization: `Bearer ${token}`,
        },
      };
    },
  });

  return {
    async getAssignedGuides(azureAdObjectId: string, schoolYear: string): Promise<Guide[]> {
      const query = gql`
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
      const data = await client.request<{ assignedGuides: Guide[] }>(query, { azureAdObjectId, schoolYear });
      return data.assignedGuides;
    },

    async getPendingHandbooks(azureAdObjectId: string, schoolYear: string): Promise<Handbook[]> {
      const query = gql`
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
      const data = await client.request<{ pendingHandbooks: Handbook[] }>(query, { azureAdObjectId, schoolYear });
      return data.pendingHandbooks;
    },

    async recordAcknowledgment(
      azureAdObjectId: string,
      handbookId: number,
      schoolYear: string,
    ): Promise<Acknowledgment> {
      const mutation = gql`
        mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
          recordAcknowledgment(input: $input) {
            id
            handbookId
            acknowledgedAt
          }
        }
      `;
      const data = await client.request<{ recordAcknowledgment: Acknowledgment }>(mutation, {
        input: { azureAdObjectId, handbookId, schoolYear },
      });
      return data.recordAcknowledgment;
    },

    async recordGuideCompletion(azureAdObjectId: string, guideId: number): Promise<void> {
      const mutation = gql`
        mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
          recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
            id
          }
        }
      `;
      await client.request(mutation, { azureAdObjectId, guideId });
    },
  };
}

export type GuideOpsClient = ReturnType<typeof createGuideOpsClient>;
