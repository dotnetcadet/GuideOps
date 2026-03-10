import { gql, type ApolloClient } from '@apollo/client';
import type { Guide, Handbook, Acknowledgment } from '../types';

const GET_ASSIGNED_GUIDES = gql`
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

const GET_PENDING_HANDBOOKS = gql`
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

const RECORD_ACKNOWLEDGMENT = gql`
  mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
    recordAcknowledgment(input: $input) {
      id
      handbookId
      acknowledgedAt
    }
  }
`;

const RECORD_GUIDE_COMPLETION = gql`
  mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
    recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
      id
    }
  }
`;

export function createGuideOpsClient(apolloClient: ApolloClient) {
  return {
    async getAssignedGuides(azureAdObjectId: string, schoolYear: string): Promise<Guide[]> {
      const { data } = await apolloClient.query({
        query: GET_ASSIGNED_GUIDES,
        variables: { azureAdObjectId, schoolYear },
        fetchPolicy: 'network-only',
      });
      return (data as any).assignedGuides as Guide[];
    },

    async getPendingHandbooks(azureAdObjectId: string, schoolYear: string): Promise<Handbook[]> {
      const { data } = await apolloClient.query({
        query: GET_PENDING_HANDBOOKS,
        variables: { azureAdObjectId, schoolYear },
        fetchPolicy: 'network-only',
      });
      return (data as any).pendingHandbooks as Handbook[];
    },

    async recordAcknowledgment(
      azureAdObjectId: string,
      handbookId: number,
      schoolYear: string,
    ): Promise<Acknowledgment> {
      const { data } = await apolloClient.mutate({
        mutation: RECORD_ACKNOWLEDGMENT,
        variables: {
          input: { azureAdObjectId, handbookId, schoolYear },
        },
      });
      return (data as any).recordAcknowledgment as Acknowledgment;
    },

    async recordGuideCompletion(azureAdObjectId: string, guideId: number): Promise<void> {
      await apolloClient.mutate({
        mutation: RECORD_GUIDE_COMPLETION,
        variables: { azureAdObjectId, guideId },
      });
    },
  };
}

export type GuideOpsClient = ReturnType<typeof createGuideOpsClient>;
