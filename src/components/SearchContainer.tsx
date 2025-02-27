import { useState } from "react";
import { Container, Box } from "@mui/material";
import { SearchForm } from "./SearchForm";
import { UserList } from "./UserList";

export const SearchContainer: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" my={2}>
        <SearchForm onSubmit={setUsername} />
      </Box>
      {username && <UserList username={username} />}
    </Container>
  );
};
