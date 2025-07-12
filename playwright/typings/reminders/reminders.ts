export interface RemindData {
  uid_creator: number;
  name_creator: string;
  B: number;
  G: number;
  R: number;
  comm_text: string;
  deal_uid: Nullable<number>;
  dt_complete: Nullable<number>;
  dt_remind: string;
  entity_table: string;
  mango_call_entry_id: Nullable<number>;
  name_confirmer: Nullable<string>;
  remind_uid_user: number;
  sended_email: Nullable<string>;
  tm_complete: Nullable<string>;
  tm_remind: string;
  type_uid: number;
  uid_client: number;
  remind_name_user: string;
  bd_name: string;
  entity_id: number;
  reminder: string;
  dt_create: string;
  tm_create: string;
  dt_text_update: string;
  uid: number;
  remind_viewed: boolean;
  dt_update: string;
  google_event_id: Nullable<number>;
  expressClient: {
    uid: number;
    client_stts: number;
    ex_name: string;
    type: String;
  };
  reminderUserInfo: ReminderUserInfo;
  creatorUserInfo: CreatorUserInfo;
  likeCommentExists: boolean;
  deal: Nullable<any>;
}

interface ReminderUserInfo {
  uid: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  macron_login: string;
  image_file_id: Nullable<number>;
  image_thumbnail_file_id: Nullable<number>;
  image_crop_thumbnail_file_id: Nullable<number>;
  deleted: boolean;
  blocked: boolean;
  type: string;
  function: string;
  email: string;
  avatar: Nullable<any>;
  super_admin: boolean;
  hh_candidate: boolean;
  sip_keep_alive: boolean;
  online: boolean;
  last_seen_at: string;
  last_user_action: string;
  web_user_active: boolean;
  isVisibleRightsIgnored: boolean;
  image: Nullable<any>;
  thumbnail: Nullable<any>;
  crop: Nullable<any>;
  imagePreview: Nullable<any>;
  thumbnailPreview: Nullable<any>;
}

interface CreatorUserInfo {
  uid: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  macron_login: string;
  image_file_id: Nullable<number>;
  image_thumbnail_file_id: Nullable<number>;
  image_crop_thumbnail_file_id: Nullable<number>;
  deleted: boolean;
  blocked: boolean;
  type: string;
  function: string;
  email: string;
  avatar: Nullable<any>;
  super_admin: boolean;
  hh_candidate: boolean;
  sip_keep_alive: boolean;
  online: boolean;
  last_seen_at: string;
  last_user_action: string;
  web_user_active: boolean;
  isVisibleRightsIgnored: boolean;
  image: Nullable<any>;
  thumbnail: Nullable<any>;
  crop: Nullable<any>;
  imagePreview: Nullable<any>;
  thumbnailPreview: Nullable<any>;
}

export type CreateRemindResponse = ApiResponse<RemindData>;

interface RemindersListData {
  data: [ListData];
  pagination: Pagination;
}

interface ListData {
  dt_remind: string;
  item_count: number;
}
interface Pagination {
  total_count: number;
  page_count: number;
  current_page: number;
  per_page: number;
}

export type RemindersListDataResponse = ApiResponse<RemindersListData>;

interface RemindsList {
  items: RemindData[];
  pagination: Pagination;
}

export type RemindersListResponse = ApiResponse<RemindsList>;
