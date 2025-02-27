import { UsersResponse } from "../types/user";

const PER_PAGE = 20;

export const fetchUsers = async (
  username: string,
  page: number
): Promise<UsersResponse> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}&page=${page}&per_page=${PER_PAGE}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
