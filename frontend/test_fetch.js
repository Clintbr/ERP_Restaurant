const BASE_URL = 'http://localhost:5001/api';

const request = async (endpoint, options = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    if (!response.ok) {
      let errorMsg = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorData.error || errorMsg;
      } catch(e) {}
      throw new Error(errorMsg);
    }
    return response.json();
  } catch (err) {
    console.log("Caught natively!", err.message);
  }
};

request('/test');
