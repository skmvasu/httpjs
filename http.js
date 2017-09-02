const headers = {
	"Content-Type": "application/json",
	"Accept": "application/json"
};

const status = (response) => {  
  if (response.ok) {  
    return Promise.resolve(response)  
  }  

  return Promise.reject(new Error(response.statusText))  
};

const serailize = response => response.json();

export const post = (url, params) => {
	return fetch(url, {
		  method: 'post',  
    	headers,
    	body: params
    }).then(status).then(serailize)
    .catch(error => Promise.reject(new Error(error)));
};

export const get = (url, params={}) => {
	return fetch(url).then(status).then(serailize)
    .catch(error => Promise.reject(new Error(error)))
};

export const all = (request_map=[]) => Promise.all(request_map)
  .then(responses => {
    let errors = [];
    responses.forEach(response => {
      if (response instanceof Error) errors.push(response);
    })

    if (errors.length) return Promise.reject(errors);

    return responses;
});