import { gql } from '@apollo/client/core';

export const SYNC_USERS = gql`
  mutation SyncUsersFromAzureAd {
    syncUsersFromAzureAd {
      created
      updated
      deactivated
    }
  }
`;

export const CREATE_GUIDE = gql`
  mutation CreateGuide($input: CreateGuideInput!) {
    createGuide(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_GUIDE = gql`
  mutation UpdateGuide($id: Int!, $input: UpdateGuideInput!) {
    updateGuide(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_GUIDE = gql`
  mutation DeleteGuide($id: Int!) {
    deleteGuide(id: $id)
  }
`;

export const SET_GUIDE_STEPS = gql`
  mutation SetGuideSteps($guideId: Int!, $steps: [GuideStepInput!]!) {
    setGuideSteps(guideId: $guideId, steps: $steps) {
      id
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

export const CREATE_HANDBOOK = gql`
  mutation CreateHandbook($input: CreateHandbookInput!) {
    createHandbook(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_HANDBOOK = gql`
  mutation UpdateHandbook($id: Int!, $input: UpdateHandbookInput!) {
    updateHandbook(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_HANDBOOK = gql`
  mutation DeleteHandbook($id: Int!) {
    deleteHandbook(id: $id)
  }
`;

export const CREATE_GUIDE_ASSIGNMENT = gql`
  mutation CreateGuideAssignment($input: CreateGuideAssignmentInput!) {
    createGuideAssignment(input: $input) {
      id
      guideId
      assignToRole
      schoolYear
    }
  }
`;

export const DELETE_GUIDE_ASSIGNMENT = gql`
  mutation DeleteGuideAssignment($id: Int!) {
    deleteGuideAssignment(id: $id)
  }
`;

export const CREATE_HANDBOOK_ASSIGNMENT = gql`
  mutation CreateHandbookAssignment($input: CreateHandbookAssignmentInput!) {
    createHandbookAssignment(input: $input) {
      id
      handbookId
      assignToRole
      schoolYear
    }
  }
`;

export const DELETE_HANDBOOK_ASSIGNMENT = gql`
  mutation DeleteHandbookAssignment($id: Int!) {
    deleteHandbookAssignment(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      displayName
      email
      role
    }
  }
`;
