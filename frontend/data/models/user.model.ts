export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface GetUserResponse {
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  birth_date: string | null;
  gender: string | null;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  drivers_license_number: string | null;
  license_expiry: string | null;
  license_image: string | null;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
