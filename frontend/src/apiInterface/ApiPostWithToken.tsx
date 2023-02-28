function doThrow(e: any) {
  throw e;
}


const url = "http://localhost:8088";

const ApiPost = {

  apiCall(params: string, object: any) : Promise<any> {

      return fetch(url + params, {
      method: "POST", // HTTP method
      //crossDomain: true,
      headers: {
          "Authorization": "Bearer " + localStorage.getItem("access_token") ,
          "Content-Type": "application/json",
          "Access-Control-Request-Headers":
              "Authorization, Origin, X-Requested-With, "
              +   "Content-Type, Accept",
          },

      body: JSON.stringify(object),
      })
        .then((response: Response) => {

        if(response.status === 200){
           // ("Logged in successfully")
            return response;
        }
        else if(response.status === 401){
            return response;
        }
        else if(response.status === 409){
           //"Username already exists"
            return "Username already exists";
        }
        else if(response == null){
            console.log("Error");
        }else{
            doThrow(
                new Error(
                    "Status was: " + response.statusText + " " + response.status + " " + params
                )
            )
        }

        });
      },
    createApplication(object: any) : Promise<any> {
        const postQueueEndpoint = "/api/application/post";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
    },
    specificApplication(object: any) : Promise<any> {
        const postQueueEndpoint = "/admin/specificApplication";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
    },

  };

export default ApiPost;