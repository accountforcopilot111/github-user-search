import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContainer } from "./SearchContainer";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContainer />
    </QueryClientProvider>
  );
};

export default App;
