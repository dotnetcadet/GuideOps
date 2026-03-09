import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { useApolloClient } from './graphql/client';
import { AuthGuard } from './auth/AuthGuard';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Guides } from './pages/Guides';
import { GuideEditor } from './pages/GuideEditor';
import { Handbooks } from './pages/Handbooks';
import { HandbookEditor } from './pages/HandbookEditor';
import { Acknowledgments } from './pages/Acknowledgments';

export default function App() {
  const client = useApolloClient();

  return (
    <AuthGuard>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="guides" element={<Guides />} />
              <Route path="guides/new" element={<GuideEditor />} />
              <Route path="guides/:id" element={<GuideEditor />} />
              <Route path="handbooks" element={<Handbooks />} />
              <Route path="handbooks/new" element={<HandbookEditor />} />
              <Route path="handbooks/:id" element={<HandbookEditor />} />
              <Route path="acknowledgments" element={<Acknowledgments />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthGuard>
  );
}
