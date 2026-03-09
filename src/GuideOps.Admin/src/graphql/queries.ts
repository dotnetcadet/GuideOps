import { gql } from '@apollo/client/core';

export const GET_USERS = gql`
  query GetUsers {
    users {
      nodes {
        id
        azureAdObjectId
        displayName
        email
        role
        isActive
        lastSyncedAt
        createdAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Int!) {
    userById(id: $id) {
      id
      azureAdObjectId
      displayName
      email
      role
      isActive
      lastSyncedAt
      acknowledgments {
        id
        handbookId
        schoolYear
        acknowledgedAt
        handbook {
          title
        }
      }
      guideCompletions {
        id
        guideId
        completedAt
        guide {
          title
        }
      }
    }
  }
`;

export const GET_GUIDES = gql`
  query GetGuides {
    guides {
      nodes {
        id
        title
        description
        type
        isActive
        schoolYear
        priority
        createdAt
        steps {
          id
        }
      }
    }
  }
`;

export const GET_GUIDE_BY_ID = gql`
  query GetGuideById($id: Int!) {
    guideById(id: $id) {
      id
      title
      description
      type
      isActive
      schoolYear
      priority
      createdBy
      steps {
        id
        stepOrder
        elementSelector
        title
        description
        side
        pageUrl
      }
      assignments {
        id
        assignToRole
        schoolYear
        isActive
      }
    }
  }
`;

export const GET_HANDBOOKS = gql`
  query GetHandbooks {
    handbooks {
      nodes {
        id
        title
        contentUrl
        schoolYear
        isActive
        requiresAcknowledgment
        createdAt
      }
    }
  }
`;

export const GET_HANDBOOK_BY_ID = gql`
  query GetHandbookById($id: Int!) {
    handbookById(id: $id) {
      id
      title
      contentUrl
      contentHtml
      schoolYear
      isActive
      requiresAcknowledgment
      assignments {
        id
        assignToRole
        schoolYear
        isActive
      }
    }
  }
`;

export const GET_ACKNOWLEDGMENTS = gql`
  query GetAcknowledgments {
    acknowledgments {
      nodes {
        id
        userId
        handbookId
        schoolYear
        acknowledgedAt
        ipAddress
        user {
          displayName
          email
          role
        }
        handbook {
          title
        }
      }
    }
  }
`;

export const GET_ACKNOWLEDGMENT_STATS = gql`
  query GetAcknowledgmentStats($schoolYear: String!, $handbookId: Int!) {
    acknowledgmentStats(schoolYear: $schoolYear, handbookId: $handbookId) {
      totalAssigned
      acknowledgedCount
      pendingCount
    }
  }
`;
