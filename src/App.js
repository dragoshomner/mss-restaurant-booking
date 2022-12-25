import { QueryClient, QueryClientProvider } from 'react-query'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AuthProvider } from './sections/auth/utils/AuthProvider';
import { CartProvider } from './layouts/dashboard/header/cart/CartProvider';
import { GlobalModal } from './components/dialogs/DialogProvider';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalModal>
          <CartProvider>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </CartProvider>
        </GlobalModal>
      </AuthProvider>
    </QueryClientProvider>
  );
}
