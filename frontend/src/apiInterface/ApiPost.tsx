function doThrow(e: any) {
  throw e;
}


const url = "https://backendjobbapp.herokuapp.com";

const ApiPost = {

  apiCall(params: string, object: any) : Promise<any> {

      return fetch(url + params, {
      method: "POST", // HTTP method
      //crossDomain: true,
      headers: {
        // HTTP headers
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
      logIn(object: any) : Promise<any> {
          const postQueueEndpoint = "/api/v1/auth/authenticate";
          return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
      },

        createAccount(object: any) : Promise<any> {
        const postQueueEndpoint = "/api/v1/auth/register";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
        },

  };

export default ApiPost;