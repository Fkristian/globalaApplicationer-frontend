import {
    Button, Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

/**
 * Function that displays and handles basic logic regarding the home-page
 */
export default function Home() {
    const navigate = useNavigate();

    /**
     * Function to go to the application form
     */
    function goToForm(){
        navigate("/applicantForm");
    }

    /**
     * Function to log out a user and navigate to log in
     */
    function logOut() {
        window.localStorage.setItem('access_token', "")
        globalThis.isAdmin = false
        navigate("/")
    }

    /**
     * Function to go to all applicants
     */
    function goToApplicants() {
        navigate("/all")
    }

    return <div>
                <Text>Welcome</Text>
        {!globalThis.isAdmin && <Button
            width="100%"
            colorScheme="blue"
            onClick={goToForm}
            mb={3}
        >
            {" "}
            Apply
        </Button>}
        <Button
            width="100%"
            colorScheme="blue"
            onClick={logOut}
            mb={3}
        >
            {" "}
            Log out
        </Button>
        {globalThis.isAdmin && <Button
            width="100%"
            colorScheme="blue"
            onClick={goToApplicants}
            mb={3}
        >
            {" "}
            Go to application handler
        </Button>}
             </div>
};