import { useState, useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';

interface ErrorState {
  message: string;
  code?: string;
  retry?: () => Promise<void>;
}

interface ErrorHandlerOptions {
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const { timeout = 10000, maxRetries = 3, retryDelay = 1000 } = options;
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { showNotification } = useNotification();

  const handleError = useCallback((error: Error | string, retryFn?: () => Promise<void>) => {
    const message = typeof error === 'string' ? error : error.message;
    setError({ message, retry: retryFn });
    showNotification(message, 'error');
  }, [showNotification]);

  const clearError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  const executeWithTimeout = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`${operationName}がタイムアウトしました`));
      }, timeout);
    });

    try {
      setIsLoading(true);
      const result = await Promise.race([operation(), timeoutPromise]);
      setIsLoading(false);
      return result;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, [timeout]);

  const retryOperation = useCallback(async (operation: () => Promise<void>) => {
    if (retryCount >= maxRetries) {
      handleError('最大リトライ回数を超えました');
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      await executeWithTimeout(operation, '操作');
      clearError();
      setIsLoading(false);
    } catch (error) {
      setRetryCount(prev => prev + 1);
      setIsLoading(false);
      handleError(error as Error, () => retryOperation(operation));
    }
  }, [retryCount, maxRetries, retryDelay, executeWithTimeout, handleError, clearError]);

  const executeWithRetry = useCallback(async (operation: () => Promise<void>) => {
    try {
      await executeWithTimeout(operation, '操作');
    } catch (error) {
      await retryOperation(operation);
    }
  }, [executeWithTimeout, retryOperation]);

  return {
    error,
    isLoading,
    retryCount,
    handleError,
    clearError,
    executeWithRetry,
    executeWithTimeout
  };
}; 