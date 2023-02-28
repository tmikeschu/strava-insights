export interface Athlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  /** date string */
  created_at: string;
  /** date string */
  updated_at: string;
  badge_type_id: number;
  weight: number;
  /** url */
  profile_medium: string;
  /** url */
  profile: string;
  friend: boolean | null;
  follower: boolean | null;
}
