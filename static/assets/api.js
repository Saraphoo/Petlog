let api={
	endpoint:'http://localhost:3000/api/blob/',
	token: sessionStorage.getItem('token'),
	GET:function(documentID,callback){
		axios.get(`${api.endpoint}${documentID}`, { headers: { Authorization: `Bearer ${api.token}` } }).then(function(response){
			console.log(response);
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	},
	PUT:function(documentID,data,callback){
		axios.put(`${api.endpoint}${documentID}`,data, { headers: { Authorization: `Bearer ${api.token}` } }).then(function(response){
			callback(response);
		}).catch(function(error){
			console.log(error);
		});
	}
}