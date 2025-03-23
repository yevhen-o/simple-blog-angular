import { ZodSchema } from 'zod';

export type AdditionalRequestOption<T> = {
  successMessage?: string;
  deriveSuccessMessage?: (response: T) => string;
  errorMessage?: string;
  deriveErrorMessage?: (error: unknown) => string;
};

export type RequestConfig<T> = {
  method?: 'PATCH' | 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
  additionalOptions?: AdditionalRequestOption<T>;
};

const baseUrl = ''; // You can set a default base URL here if needed

export const httpClient = async <T>(
  url: string,
  validationSchema?: ZodSchema<T>,
  options?: RequestConfig<T>
): Promise<T> => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: options?.method || 'GET',
    ...(options?.headers ? { headers: options.headers } : {}),
    ...(options?.body ? { body: options.body } : {}),
    ...(options?.signal ? { signal: options.signal } : {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${JSON.stringify(
        errorData
      )}`
    );
  }

  const data = await response.json();

  if (validationSchema) {
    const result = validationSchema.safeParse(data);
    if (!result.success) {
      console.error('Validation error:', result.error);
      throw new Error('Invalid response schema');
    }
  }

  return data as T;
};
