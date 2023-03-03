import {useNavigate} from "react-router-dom";

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
        "Content-Type": "application/json",
        "Access-Control-Request-Headers":
            "Authorization, Origin, X-Requested-With, "
        +   "Content-Type, Accept",
    },
      body: JSON.stringify(object),
      })
        .then((response: Response) => {

        if(response.status === 200 || response.status === 401 || response.status === 409 || response.status === 500 || response.status === 503){
            return response;
        }
        else {
            doThrow(
                new Error(
                    "Status was: " + response.statusText + " " + response.status + " " + params
                )
            )
        }

        });
      },
    /**
     * Function to login via backend
     */
      logIn(object: any) : Promise<any> {
          const postQueueEndpoint = "/api/v1/auth/authenticate";
          return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
      },
    /**
     * Function to create an account via backend
     */
        createAccount(object: any) : Promise<any> {
        const postQueueEndpoint = "/api/v1/auth/register";
        return ApiPost.apiCall(postQueueEndpoint, object).then((data) => data);
        },

  };

export default ApiPost;