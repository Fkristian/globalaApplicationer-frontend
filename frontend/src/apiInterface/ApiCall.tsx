/**
 * Function used to throw errors
 *
 * @param e the error to throw
 */
function doThrow(e: Error) {
    throw e;
}

const url = "https://backendjobbapp.herokuapp.com";

/**
 * Function to make Get api calls without token
 */
const ApiCall = {
    apiCall(params: String) {
        return fetch(url + params, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
            },
        })
            .then((response: Response) => {
                if (response.status === 200 || response.status === 500 || response.status === 503) {
                    return response;
                }
                else doThrow(
                    new Error(
                        "Status was: " + response.statusText + " " + response.status + " " + params)
                )
            })
            .then((response) => {
                if(response == null){
                    return "Error";
                }else{
                    return response.json();
                }

            });
    },
    /**
     * Function to get all applications via backend
     */
    getAllApplicants() {
        const getQueueEndpoint = "/api/application/all";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
}
export default ApiCall;