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
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
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
    getData() {
        const getQueueEndpoint = "/any";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
    getAllApplicants() {
        const getQueueEndpoint = "/api/application/all";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },
    test() {
        const getQueueEndpoint = "/api/v1/demo-Controller";
        return ApiCall.apiCall(getQueueEndpoint).then((data) => data);
    },

}

export default ApiCall;