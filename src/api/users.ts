import { api, authApi } from "@/lib/axios-instances";
import { transformCamelCaseToSnakeCase, transformSnakeCaseToCamelCase } from "@/lib/data-transformer";

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  memberType: string;
  profilePicture: string;
  selectedTemplate: string;
//   currency: Currency;
  updatedAt: string;
};

export const signup = async ({
  userData,
}: {
  userData: { name: string; email: string; password: string };
}) => {
  const response = await authApi.post("/user/register", userData);
  return response.data.data.access_token as string;
};

export const signin = async ({
  userData,
}: {
  userData: { email: string; password: string };
}) => {
  const response = await authApi.post("/user/login", userData);
  return response.data.data.access_token as string;
};

export const getUserProfile = async () => {
  const response = await authApi.get("/profile");
  return transformSnakeCaseToCamelCase(response.data.data) as User;
};

export const updateUserProfile = async ({
  userData,
}: {
  userData: Partial<User>;
}) => {
  const data = transformCamelCaseToSnakeCase(userData);
  const response = await authApi.patch("/profile", data);
  return transformSnakeCaseToCamelCase(response.data.data) as User;
};

export const checkUsernameAvailability = async ({
  username,
}: {
  username: string;
}) => {
  const response = await api.get(`/user/check-username/${username}`);
  // API returns 404 if username is not available which will throw an error
  return true;
};

export const changeUsername = async ({
  usernameData,
}: {
  usernameData: { oldUsername: string; username: string };
}) => {
  const data = transformCamelCaseToSnakeCase(usernameData);
  const response = await api.put("/user/update-username", data);
  return "Username changed successfully";
};
