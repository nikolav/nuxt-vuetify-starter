import { type Ref } from "vue";
// import { Interaction, type ChartData } from "chart.js";
import type {
  JsonDataRecord as RecordJson,
  TJson,
  TJsonLiteral,
} from "~/schemas/json";

export type { TJson, RecordJson, TJsonLiteral };
export type OrNull<T = any> = T | null;
export type OrNoValue<T = any> = OrNull<T> | undefined;
export type TStoreMain<T = any> = Record<string, T>;
export type TStoreFlags = Record<string, boolean>;
export type TDocData<T = any> = Record<string, T>;
export interface IDoc<T = TDocData> {
  id?: number | undefined;
  data: T;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}
export interface IDocDataUsers {
  email: string;
  password: string;
}

export type TAuthUser = OrNull<{ id: number; email: string }>;

export interface IAuthCreds {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token?: string | undefined;
}

export interface IAuthWhoResponse {
  id?: number | undefined;
  email?: string | undefined;
  error?: string | undefined;
}

export interface IAuthLogoutResponse {}

export interface IStorageFileInfo {
  id: number;
  file_id: string;
  title: string;
  description: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  public: boolean;
  created_at: string;
  updated_at: string;
}

export interface IFilesUpload {
  [name: string]: {
    file: any;
    data?: {
      title?: string | undefined;
      description?: string | undefined;
    };
    meta?: Record<string, any>;
  };
}

export interface IStorageFileDataSaved {
  file_id: string;
  user_id: number;
  title: string;
  description: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  public: boolean;
}

export interface IStorageStatusFileSaved {
  id: number;
  data: IStorageFileDataSaved;
  created_at: string;
  updated_at: string;
}

export interface IConfigDocs {
  autoReload: boolean;
}

export interface IThemeToggle {
  theme: Ref<string>;
  themeToggle: (mode?: string | undefined) => void;
}

export interface IAuthData {
  id: number;
  email: string;
}

// export type TChartDataBar<TData = Record<string, any>[]> = ChartData<
//   "bar",
//   TData
// >;

export interface IDocDataChat {
  name: string;
  comment: string;
}

export interface IAppData<T = any> {
  [key: string]: T;
}

export type TVoid = () => void;

export interface IDocDataTask {
  title: string;
  completedAt: OrNull<Date>;
  href?: string | undefined;
  description?: string | undefined;
}

export type TBaseAuthProfile = Record<string, any>;
export interface IAuthProfile extends TBaseAuthProfile {
  firstName?: string | undefined;
  lastName?: string | undefined;
  displayName?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  avatar?: IStorageFileDataSaved;
  businessName?: string | undefined;
  about?: string | undefined;
  facebook?: string | undefined;
  instagram?: string | undefined;
  googleCalendarEditPageLink?: string | undefined;
  googleCalendarEmbedLink?: string | undefined;
  authProvider?: Record<string, any>;
}

export interface IUser {
  id: number;
  email: string;
  profile?: RecordJson;
  is_approved?: boolean;
  is_manager?: boolean;
  is_admin?: boolean;
  is_external?: boolean;
  is_available?: boolean;
  email_verified?: boolean;
  tags?: string[];
  groups?: string[];
  products?: OrNoValue<IProduct[]>;
  posts?: OrNoValue<IPost[]>;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  price?: OrNoValue<number>;
  price_history: { day: string; price: number }[];
  stock?: OrNoValue<number>;
  stockType?: OrNoValue<string>;
  onSale?: OrNoValue<boolean>;
  description?: OrNoValue<string>;
  tags?: OrNoValue<string[]>;
  user?: OrNoValue<IUser>;
  created_at: string;
  updated_at: string;
}

export interface IProductData {
  name?: string | undefined;
  category?: string | undefined;
  price?: number | undefined;
  stock?: number | undefined;
  stockType?: string | undefined;
  onSale?: boolean | undefined;
  description?: string | undefined;
}

export interface IOrder {
  id: number;
  user_id: number;
  code?: OrNoValue<string>;
  description?: OrNoValue<string>;
  completed?: OrNoValue<boolean>;
  canceled?: OrNoValue<boolean>;
  status: OrNoValue<number>;
  delivery_at: string;
  created_at: string;
  updated_at: string;
}
export interface IOrderReceived extends IOrder {}
export interface IOrderPlaced extends IOrder {
  products?: IOrdersProducts[];
}

export interface IOrdersProducts {
  id: number;
  name: string;
  amount: number;
  user_id: number;
  user?: IUser;
  price?: OrNoValue<number>;
  price_history: { day: string; price: number }[];
  stock?: OrNoValue<number>;
  stockType?: OrNoValue<string>;
  onSale?: OrNoValue<boolean>;
  description?: OrNoValue<string>;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export type TGravatars = Record<
  number,
  { src?: OrNoValue<string>; enabled?: OrNoValue<boolean> }
>;

export type TDataLikesDislikesStore = Record<string, number>;

export interface ITopicChatMessage {
  uid?: OrNoValue<number | string>;
  name?: OrNoValue<string>;
  message: string;
}

export interface IDataRating {
  [topic: string]: {
    [key: string]: number;
  };
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
  user?: IAuthData;
  tags?: string[];
  docs?: Record<string, any>[];
  created_at: string;
  updated_at: string;
}

export interface IPostInputData {
  title?: string;
  content?: string;
}

export interface IInputSendMail {
  subject: string;
  template: string;
  data?: Record<string, any>;
}

export interface IInputFileUpload {
  [title: string]: {
    // storage filename
    name?: string;
    file: File;
  };
}

export interface ITranslationQuery {
  q: string;
  target: string;
  source?: string;
  // format?: string;
  format?: "html" | "text";
  model?: string;
  key?: string;
}

export interface IAsset {
  id: number;
  name: string;
  code?: string | undefined;
  type?: string | undefined;
  location?: string | undefined;
  status?: string | undefined;
  condition?: string | undefined;
  data?: Record<string, any> | undefined;
  notes?: string | undefined;

  tags?: string[] | undefined;
  author?: IUser | undefined;
  users?: IUser[] | undefined;
  docs?: RecordJson[] | undefined;
  assets_has?: IAsset[] | undefined;

  created_at?: string | undefined;
  updated_at?: string | undefined;
}
