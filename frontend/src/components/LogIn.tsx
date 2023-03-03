import {useState} from "react";
import {
    Input,
    Flex,
    Button, Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPost from "../apiInterface/ApiPost";
import ApiCallTryToken from "../apiInterface/ApiCallTryToken";

/**
 * Function that displays and handles logic regarding the log in functionality
 *
 * Initiates variables to handle error messages, and input login information
 */
export default function LogIn() {
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();

    /**
     * Function that handles login information input changes
     *
     * @param event the input information
     */
    function handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setFormData((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            };
        });
    }

    /**
     * Function to go to the registration page
     */
    function goToCreateAccount() {
        navigate("/SignUp");
    }

    /**
     * Function to handle the response from the API
     * call in the logInAttempt() function
     *
     * @param response the response
     */
    const handleResponse = (response : Response) => {
        if (response.ok) {
            response.json().then((token:any) => {
                window.localStorage.setItem('access_token', token.token)
                ApiCallTryToken.admin().then((response:Response) => {
                    if(response.status){
                        globalThis.isAdmin = true
                        navigate("/home");
                    }else{
                        globalThis.isAdmin = false
                    }
                })
            })
            navigate("/home");
        }else if (response.status === 401){
            setErrorMessage("Wrong credentials")
        }
    };

    /**
     * Function to attempt to log in by doing an API call to backend
     */
    function logInAttempt() {
        if(formData.password === "" || formData.username === ""){
            setErrorMessage("Fill in all fields")
        }else{
            const post = {
                username :  formData.username,
                password : formData.password
            }
            ApiPost.logIn(post).catch(reason => setErrorMessage("Something went wrong, please try again later")).then(response => handleResponse(response));
        }
    }
    
    return(
    <Flex>
        <form>
            <Text
                color='red'> {errorMessage} </Text>
            <p>
                <Input
                    className="LogInPage--form"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    name="username"
                    mb={3}
                    value={formData.username}
                />
            </p>
            <p>
                <Input
                    className="LogInPage--form"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    mb={3}
                    value={formData.password}
                />
            </p>
            <Button
                width="100%"
                colorScheme="blue"
                onClick={logInAttempt}
                mb={3}
            >
                {" "}
                Log in
            </Button>
            <Button
                variant="link"
                width="100%"
                colorScheme="blue"
                onClick={goToCreateAccount}
            >
                {" "}
                Create an account
            </Button>
        </form>
    </Flex>
    )
};