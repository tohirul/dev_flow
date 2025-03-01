interface SignInWithOAuthParams {
  provider: 'github' | 'google';
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
}

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  address?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved?: string[];
  joinedAt?: Date;
  createdAt?: Date;
  id?: string;
}
type UpdateUserParams = Partial<CreateUserParams>;

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: string;
}

interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

interface GetAllQuestionsParams extends PaginatedSearchParams {
  searchQuery?: string;
}

interface GetQuestionParams {
  questionId: string;
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, 'filter'> {
  tagId: string;
}

interface IncrementViewsParams {
  questionId: string;
}

interface CreateAnswerParams {
  questionId: string;
  content: string;
}

interface GetAnswersParams extends PaginatedSearchParams {
  questionId: string;
}
