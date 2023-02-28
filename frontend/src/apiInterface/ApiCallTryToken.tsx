function doThrow(e: Error) {
    throw e;
}

const url = "https://backendjobbapp.herokuapp.com";

interface Params {
    [key: string]: any;
}

const ApiCall = {

    apiCall(params: String) {
        return fetch(url + params, {
            method: "GET", // HTTP method
            //crossDomain: true,
            headers: {
                // HTTP headers
                "Authorization": "Bearer " + localStorage.getItem("access_token") ,
                "Content-Type": "application/json",
                "Access-Control-Request-Headers":
                    "Authorization, Origin, X-Requested-With, "
                +   "Content-Type, Accept",
            },
        })
            .then((response: Response) =>
                response.status === 200
                    ? response
                    : doThrow(
                        new Error(
                            "Status was: " + response.statusText + " " + response.status + " " + params
                        )
                    )
            )
            .then((response) => {
                if(response == null){
                    console.log("Error");
                }else{
                    return response.json();
                }

            });
    },
    admin() {
        const token = localStorage.getItem("access_token")
        const getQueueEndpoint = "/admin/hello";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
    getAllApplicants() {
        const getQueueEndpoint = "/admin/all";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
}
export default ApiCall;