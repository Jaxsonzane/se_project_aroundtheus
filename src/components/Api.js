class Api {
    constructor(options) {
      // constructor body
    }
  
    getInitialCards() {
        getInitialCards() {
            return fetch("https://around-api.en.tripleten-services.com/v1",, {
              headers: {
                authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6"
              }
            })
              .then(res => {
                if (res.ok) {
                  return res.json();
                }

                return 
              }); 
          }
          
    }
  
    // other methods for working with the API
  }
  
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      "Content-Type": "application/json"
    }
  });