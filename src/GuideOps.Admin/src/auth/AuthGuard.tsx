import { InteractionType } from '@azure/msal-browser';
import {
  MsalAuthenticationTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { loginRequest } from './msalConfig';

function LoadingMessage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error: Error | null }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h2 className="text-red-800 font-semibold text-lg">Authentication Error</h2>
        <p className="text-red-600 mt-2">{error?.message || 'An unknown error occurred'}</p>
      </div>
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
        loadingComponent={LoadingMessage}
        errorComponent={({ error }) => <ErrorMessage error={error} />}
      >
        {children}
      </MsalAuthenticationTemplate>
      <UnauthenticatedTemplate>
        <LoadingMessage />
      </UnauthenticatedTemplate>
    </>
  );
}
