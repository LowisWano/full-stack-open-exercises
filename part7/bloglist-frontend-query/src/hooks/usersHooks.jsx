import { useQuery } from "@tanstack/react-query";
import userService from "../services/userService";

export const useUsersHook = () => {

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllUsers,
    refetchOnWindowFocus: false
  })

  const getAllUsers = () => {
    return usersQuery.isLoading ? null : usersQuery.data
  }

  return {
    getAllUsers
  }
}