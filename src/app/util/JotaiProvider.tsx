
"use client";
import { Provider } from 'jotai'
const JotaiProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    {children}
  </Provider>
);

export default JotaiProvider;
