export const callApi = async (endpoint, accessToken, method = 'GET', body = null) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);
    
    const config = {
      method: method,
      headers: headers,
      mode: 'cors'
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(endpoint, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error occurred while calling the API');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  