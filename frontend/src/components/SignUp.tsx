import {useState} from "react";
import {
    Input,
    Flex,
    Button, Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPost from "../apiInterface/ApiPost";

/**
 * Function that displays and handles logic regarding the registration of a new user
 *
 * Initiates variables to handle error messages, and input registration information
 */
export default function SignUp() {
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        emailaddress: "",
        personnumber: "",
        username: "",
        password: "",
        passwordControl: "",
    })

    const navigate = useNavigate();

    /**
     * Function that handles registration information input changes
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
     * Function to handle the response from the API
     * call in the registerAttempt() function
     *
     * @param response the response
     */
    const handleResponse = (response : Response) => {
        if (response.ok) {
            response.json().then((token:any) => {
                window.localStorage.setItem('access_token', token.token)
            })
            navigate("/home");
        }else{
            setErrorMessage("Something went wrong, try again!")
        }
    };

    /**
     * Function to attempt to register a user by doing an API call to backend
     */
    function registerAttempt() {
        if(formData.firstname === "" || formData.lastname === "" || formData.emailaddress === ""
            || formData.personnumber === "" || formData.username === "" || formData.password === ""){
            setErrorMessage("Fill in all the fields")
        }
        else if(formData.password !== formData.passwordControl){
            setErrorMessage("Passwords dont match")
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.emailaddress)){
            setErrorMessage("Enter a valid email")
        }
        else if(!/^\d{8}-\d{4}$/.test(formData.personnumber)){
            setErrorMessage("Use person number format yyyymmdd-xxxx")
        }
        else{
            const post = {
                firstname   : formData.firstname,
                lastname    : formData.lastname,
                emailaddress: formData.emailaddress,
                personnumber: formData.personnumber,
                username    :  formData.username,
                password    : formData.password

            }
            ApiPost.createAccount(post).catch(reason => setErrorMessage("Something went wrong, please try again later")).then(response => {
                if(typeof response === "string"){
                    setErrorMessage("Something went wrong, try again!")
                }else{
                    handleResponse(response)
                }
            });
        }
    }

    /**
     * Function to go to the login page
     */
    function goToLogin() {
        navigate("/");
    }

    return (
        <Flex>
            <form>

                    <Text
                        color='red'> {errorMessage} </Text>

                <p>
                    <Input
                        className="LogInPage--form"
                        type="text"
                        placeholder="First name"
                        onChange={handleChange}
                        name="firstname"
                        mb={3}
                        value={formData.firstname}
                    />
                </p>
                <p>
                    <Input
                        className="LogInPage--form"
                        type="text"
                        placeholder="Last name"
                        onChange={handleChange}
                        name="lastname"
                        mb={3}
                        value={formData.lastname}
                    />
                </p>
                <p>
                    <Input
                        className="LogInPage--form"
                        type="text"
                        placeholder="Email address"
                        onChange={handleChange}
                        name="emailaddress"
                        mb={3}
                        value={formData.emailaddress}
                    />
                </p>
                <p>
                    <Input
                        className="LogInPage--form"
                        type="text"
                        placeholder="Person number"
                        onChange={handleChange}
                        name="personnumber"
                        mb={3}
                        value={formData.personnumber}
                    />
                </p>
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
                <p>
                    <Input
                        className="LogInPage--form"
                        type="password"
                        placeholder="Confirm password"
                        onChange={handleChange}
                        name="passwordControl"
                        mb={3}
                        value={formData.passwordControl}
                    />
                </p>
                <Button
                    width="100%"
                    colorScheme="blue"
                    onClick={registerAttempt}
                    mb={3}
                >
                    {" "}
                    Register
                </Button>
                <Button
                    variant="link"
                    width="100%"
                    colorScheme="blue"
                    onClick={goToLogin}
                >
                    {" "}
                    Log in
                </Button>
            </form>
        </Flex>
    )
};