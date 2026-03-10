import { gql } from '@apollo/client';
import type { Guide, Handbook, Acknowledgment } from '../types';
import { useQuery, useMutation } from '@apollo/client/react';

export function createGuideOpsClient() {
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

      const { data, loading }: { data: any, loading: boolean}  = useQuery(query, {
        variables: {
          azureAdObjectId,
          schoolYear
        }
      })

      while (loading) {
        if (!loading) {
          break
        }
      }

      console.log(data)
      
      return new Promise<Guide[]>((accept, reject) => accept(data.assignedGuides as Guide[]));
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
      const { data, loading }: { data: any, loading: boolean} = useQuery(query, {
        variables: {
          azureAdObjectId,
          schoolYear
        }
      })

      while (loading) {
        if (!loading) {
          break
        }
      }

      console.log(data)
      
      return new Promise<Handbook[]>((accept, reject) => accept(data.pendingHandbooks as Handbook[]));
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

      const [invoke, { }]= useMutation(mutation, {
        variables: {
          azureAdObjectId,
          handbookId,
          schoolYear
        }
      })
      const { data }: { data: any } = await invoke({ variables: {
          azureAdObjectId,
          handbookId,
          schoolYear
        }})
      return data.recordAcknowledgment as Acknowledgment;
    },

    async recordGuideCompletion(azureAdObjectId: string, guideId: number): Promise<void> {
      const mutation = gql`
        mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
          recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
            id
          }
        }
      `;

      const [invoke, { }]= useMutation(mutation, {
        variables: {
          azureAdObjectId,
          guideId
        }
      })
      const { data } = await invoke({ variables: {
          azureAdObjectId,
          guideId
        }})
  
    },
  };
}

export type GuideOpsClient = ReturnType<typeof createGuideOpsClient>;
