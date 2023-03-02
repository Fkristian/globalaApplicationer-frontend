import Reract, {useState} from "react";
import {
    Input,
    Flex,
    Button, Text
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPost from "../apiInterface/ApiPost";

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

    function handelChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setFormData((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            };
        });
    }

    const handleResponse = (response : Response) => {
        if (response.ok) {
            response.json().then((token:any) => {
                window.localStorage.setItem('access_token', token.token)
            })
            navigate("/home");
        }else{
            console.log("error" + response.status)
        }
    };

    function registerAttempt() {
        if(formData.password === formData.passwordControl){
            if((formData.firstname !== "") && formData.lastname !== "" && formData.emailaddress !== ""
                && formData.personnumber !== ""&& formData.username !== ""&& formData.password !== ""){
                const post = {
                    firstname   : formData.firstname,
                    lastname    : formData.lastname,
                    emailaddress: formData.emailaddress,
                    personnumber: formData.personnumber,
                    username    :  formData.username,
                    password    : formData.password

                }
                ApiPost.createAccount(post).then(response => {
                    if(typeof response === "string"){
                        setErrorMessage(response)
                    }else{
                        handleResponse(response)
                    }
                });
            }else{
                setErrorMessage("Fill in all the fields")
            }

        }else{
            setErrorMessage("Passwords dont match")
        }

    }

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
                        onChange={handelChange}
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
                        onChange={handelChange}
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
                        onChange={handelChange}
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
                        onChange={handelChange}
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
                        onChange={handelChange}
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
                        onChange={handelChange}
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
                        onChange={handelChange}
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