interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface QuestionType {
  _id: string;
  title: string;
  content: string;
  images?: string[];
  tags: Tag[];
  author: Author;
  createdAt: Date;

  upvotes: number;
  downvotes: number;
  answers: Answer[];
  views: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface Answer {
  _id: string;
  author: Author;
  content: string;
  upvotes: number;
  images?: string[];
  createdAt: Date;
}

interface SidebarLink {
  icon: string;
  route: string;
  label: string;
}

interface ThemeInfo {
  label: string;
  value: string;
  icon: string;
}

interface MetricProps {
  ICON?: string;
  ICON_ALT_TEXT?: string;
  value: number | string;
  isAuthor?: boolean;
  title: string;
  text_style: string;
  className?: string;
  link?: string;
  linkTitle?: string;
}
