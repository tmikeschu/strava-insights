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

export interface Activity {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  /** e.g., 2023-03-01T23:04:31Z */
  start_date: string;
  /** e.g., 2023-03-01T18:04:31Z */
  start_date_local: string;
  /** (GMT-05:00) America/New_York */
  timezone: string;
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  start_latlng: LatLong;
  end_latlng: LatLong;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

interface Ref {
  id: number;
  resource_state: number;
}

export interface DetailedActivity {
  resource_state: number;
  athlete: Ref;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  start_latlng: LatLong;
  end_latlng: LatLong;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
  description: string;
  calories: number;
  perceived_exertion: null;
  prefer_perceived_exertion: boolean;
  segment_efforts: SegmentEffort[];
  splits_metric: MetricSplit[];
  splits_standard: ImperialSplit[];
  laps: Lap[];
  best_efforts: BestEffort[];
  gear: Gear;
  photos: {
    primary: null;
    count: number;
  };
  stats_visibility: StatsVisibility[];
  hide_from_home: boolean;
  device_name: string;
  embed_token: string;
  similar_activities: SimilarActivity;
  available_zones: Zone[];
}

type Zone = "heartrate" | "pace";

interface MetricSplit {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  average_grade_adjusted_speed: number;
  average_heartrate: number;
  pace_zone: number;
}

interface ImperialSplit {
  distance: number;
  elapsed_time: number;
  elevation_difference: number;
  moving_time: number;
  split: number;
  average_speed: number;
  average_grade_adjusted_speed: number;
  average_heartrate: number;
  pace_zone: number;
}

interface Lap {
  id: number;
  resource_state: number;
  name: string;
  activity: Ref;
  athlete: Ref;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  device_watts: boolean;
  average_heartrate: number;
  max_heartrate: number;
  lap_index: number;
  split: number;
  pace_zone: number;
}

interface Map {
  id: string;
  polyline?: string;
  resource_state: number;
  summary_polyline: string;
}

type LatLong = [number, number];

interface SegmentEffort {
  id: number;
  resource_state: number;
  name: string;
  activity: Ref;
  athlete: Ref;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  average_cadence: number;
  device_watts: boolean;
  average_heartrate: number;
  max_heartrate: number;
  segment: Segment;
  pr_rank: number;
  achievements: Achievement[];
  kom_rank: null;
  hidden: boolean;
}

interface Segment {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: LatLong;
  end_latlng: LatLong;
  elevation_profile: null;
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
}

interface BestEffort {
  id: number;
  resource_state: number;
  name: string;
  activity: Ref;
  athlete: Ref;
  elapsed_time: number;
  moving_time: number;
  start_date: string;
  start_date_local: string;
  distance: number;
  start_index: number;
  end_index: number;
  pr_rank: null;
  achievements: Achievement[];
}

interface Gear {
  id: string;
  primary: boolean;
  name: string;
  nickname: null;
  resource_state: number;
  retired: boolean;
  distance: number;
  converted_distance: number;
}

interface StatsVisibility {
  type: string;
  visibility: string;
}

interface SimilarActivity {
  effort_count: number;
  average_speed: number;
  min_average_speed: number;
  mid_average_speed: number;
  max_average_speed: number;
  pr_rank: number;
  frequency_milestone: null;
  trend: Trend;
  resource_state: number;
}

interface Trend {
  speeds: number[];
  current_activity_index: number;
  min_speed: number;
  mid_speed: number;
  max_speed: number;
  direction: number;
}

interface Achievement {
  type_id: number;
  type: string;
  rank: number;
}
