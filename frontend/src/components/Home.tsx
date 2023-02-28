import Reract from "react";
import {
    Button, Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiCallTryToken from "../apiInterface/ApiCallTryToken";

export default function LogIn() {
    const navigate = useNavigate();
    function newSide(){
        navigate("/home");
    }
    function goToForm(){
        navigate("/applicantForm");
    }
    function test(){
        console.log(globalThis.isAdmin)
    }


    function test2() {
        globalThis.isAdmin = false
    }


    function logOut() {
        window.localStorage.setItem('access_token', "")
        globalThis.isAdmin = false
        navigate("/")
    }

    function goToApplicants() {
        navigate("/all")
    }

    return <div>
                <Text>Welcome to home</Text>
        <Button
            width="100%"
            colorScheme="blue"
            onClick={goToForm}
            mb={3}
        >
            {" "}
            Apply
        </Button>
        <Button
            width="100%"
            colorScheme="blue"
            onClick={logOut}
            mb={3}
        >
            {" "}
            Log out
        </Button>
        <Button
            width="100%"
            colorScheme="blue"
            onClick={test}
            mb={3}
        >
            {" "}
            Display
        </Button>

        {globalThis.isAdmin && <Button
            width="100%"
            colorScheme="blue"
            onClick={goToApplicants}
            mb={3}
        >
            {" "}
            Go to application handeler
        </Button>}
             </div>
};