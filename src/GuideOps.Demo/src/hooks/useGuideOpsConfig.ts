import { useMsal } from "@azure/msal-react";
import { graphqlScopes } from "../auth/msalConfig";
import { type GuideOpsConfig } from "@guideops/sdk";

export const useGuideOpsConfig = () => {
    const { accounts, instance } = useMsal();
    
      async function getAccessToken(): Promise<string> {
    
        const response = await instance.acquireTokenSilent({
          ...graphqlScopes,
          account: accounts[0],
        });
    
        return response.accessToken
      }
    
      const guideOpsConfig: GuideOpsConfig = {
        apiUrl: 'http://localhost:5164/graphql',
        getAccessToken,
        schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        userId: accounts[0]?.localAccountId, // Would come from MSAL account's localAccountId
      };

      return guideOpsConfig
}