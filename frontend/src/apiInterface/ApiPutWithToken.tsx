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
 * Function to make PUT api calls with token
 */
const ApiCallWithToken = {
  apiCall(params: string, object: any) : Promise<any> {

      return fetch(url + params, {
      method: "PUT",
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
            if (response.status === 200 || response.status === 412 || response.status === 500 || response.status === 503) {
                return response;
            }
            else{
                doThrow(
                    new Error(
                        "Status was: " + response.statusText + " " + response.status + " " + params
                    )
                )
            }

        });
      },
    /**
     * Function to update the status of an application via backend
     */
      updateApplicationStatus(object: any) : Promise<any> {
        const postQueueEndpoint = "/admin/update-status";
          return ApiCallWithToken.apiCall(postQueueEndpoint, object).then((data) => data);
      },
  };
export default ApiCallWithToken;