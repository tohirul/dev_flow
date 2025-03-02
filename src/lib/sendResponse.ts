export async function sendResponse<T>(
  message: string,
  data: T,
  status: number = 200,
  error?: Error
): Promise<Response<T>> {
  const response: {
    success: boolean;
    message: string;
    data?: T | null;
    error?: { message: string } | null;
  } = {
    success: status < 400,
    message: 'Questions fetched successfully.'
  };
  if (data !== null) response.data = data;
  if (error)
    response.error = {
      message: error.message
    };
  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
    status: status
  });
}
