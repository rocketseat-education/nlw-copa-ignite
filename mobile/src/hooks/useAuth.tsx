import { useContext } from 'react';

import { AuthContext, AuthContexDataProps } from '../contexts/AuthContext';

export function useAuth(): AuthContexDataProps {
  const context = useContext(AuthContext);

  return context;
}