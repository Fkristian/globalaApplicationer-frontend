/**
 * Function used to throw errors
 *
 * @param e the error to throw
 */
function doThrow(e: any) {
  throw e;
}


const url = "https://backendjobbapp.herokuapp.com";

/**
 * Function to make POST api calls with token
 */
const ApiPost = {
  apiCall(params: string, object: any) : Promise<any> {

      return fetch(url + params, {
      method: "POST",
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
            return response;
        }
        else if(response.status === 401){
            return response;
        }
        else if(response.status === 409){
            return "Username already exists";
        }
        else if(response == null){
            return "Error";
        }else{
            doThrow(
                new Error(
                    "Status was: " + response.statusText + " " + response.status + " " + params
                )
            )
        }

        });
      },
    /**
     * Function to create an application via backend
     */
    createApplication(object: any) : Promise<any> {
        const postQueueEndpoint = "/api/application/post";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
    },
    /**
     * Function to get information regarding a specific application via backend
     */
    specificApplication(object: any) : Promise<any> {
        const postQueueEndpoint = "/admin/specificApplication";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
    },

  };

export default ApiPost;