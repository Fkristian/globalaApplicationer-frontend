function doThrow(e: any) {
  throw e;
}


const url = "https://backendjobbapp.herokuapp.com/";

const ApiCallWithToken = {

  apiCall(params: string, object: any) : Promise<any> {

      return fetch(url + params, {
      method: "PUT", // HTTP method
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
        else if(response.status === 412){
             return response;
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
      updateApplicationStatus(object: any) : Promise<any> {
        const postQueueEndpoint = "/admin/update-status";
          return ApiCallWithToken.apiCall(postQueueEndpoint, object).then((data) => data);
      },
  };
//window.localStorage.getItem('access_token')
export default ApiCallWithToken;