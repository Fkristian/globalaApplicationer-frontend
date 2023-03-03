
/**
 * Function used to throw errors
 *
 * @param e the error to throw
 */
/*
function doThrow(e: Error) {
    throw e;
}

 */

const url = "https://backendjobbapp.herokuapp.com";

/**
 * Function to make GET api calls with token
 */
const ApiCall = {
    apiCall(params: String) {
            return fetch(url + params, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers":
                        "Authorization, Origin, X-Requested-With, "
                        + "Content-Type, Accept",
                },
            })
            /*
            .then((response: Response) =>
                response.status === 200
                    ? response
                    : doThrow(
                        new Error(
                            "Status was: " + response.statusText + " " + response.status + " " + params
                        )
                    )
            )
            */
            .then((response: Response) => {
                if (response.status === 200)
                     return response;
                else
                    return response.json();
            })
                /*
            .then((response) => {
                if(response == null){
                    return("Error");
                }else{
                    return response.json();
                }

            })*/;
    },
    /**
     * Function to check if user is an admin via backend
     */
    admin() {
        const getQueueEndpoint = "/admin/hello";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
    /**
     * Function to get all applicants via backend
     */
    getAllApplicants() {
        const getQueueEndpoint = "/admin/all";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
}
export default ApiCall;