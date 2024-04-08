import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import './App.css';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { ReactCsspin } from 'react-csspin';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense fallback={<ReactCsspin />}>
          <RouterProvider router={router} />
        </Suspense>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
