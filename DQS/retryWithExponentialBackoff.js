async function retryWithExponentialBackoff(
  fn,
  maxAttempts = 3,
  baseDelayMs = 1000
) {
  let attempt = 1;

  const execute = async () => {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      const delayMs = baseDelayMs * 2 ** attempt;
      console.log(`Retry attempt ${attempt} after ${delayMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      attempt++;
      return execute();
    }
  };

  return execute();
}

module.exports = retryWithExponentialBackoff;
