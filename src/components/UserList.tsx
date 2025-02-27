import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Avatar,
  Link,
} from "@mui/material";
import { fetchUsers } from "../api/users";

interface UserListProps {
  username: string;
}

export const UserList: React.FC<UserListProps> = ({ username }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["githubUsers", username],
      queryFn: ({ pageParam = 1 }) => fetchUsers(username, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalLoaded = allPages.reduce(
          (acc, page) => acc + page.items.length,
          0
        );
        return totalLoaded < lastPage.total_count
          ? allPages.length + 1
          : undefined;
      },
    });

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading users</Typography>;
  if (!data?.pages[0].items.length)
    return <Typography>No users found</Typography>;

  return (
    <InfiniteScroll
      loadMore={() => fetchNextPage()}
      hasMore={!isLoading && hasNextPage}
      loader={<CircularProgress key="loading" />}
    >
      {/* Functional programming example below */}
      {data?.pages
        .flatMap((page) => page.items)
        .map((user) => (
          <Box key={user.id} mb={2}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt={user.login}
                    src={user.avatar_url}
                    sx={{
                      width: { xs: "48px", sm: "56px", md: "64px" },
                      height: { xs: "48px", sm: "56px", md: "64px" },
                    }}
                  />
                  <Link
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    variant="h4"
                    underline="hover"
                  >
                    {user.login}
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
    </InfiniteScroll>
  );
};
