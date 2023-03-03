import React, {useState} from "react";
import {
    Flex,
    Button, Text, VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPutWithToken from "../apiInterface/ApiPutWithToken";
import ApiCallTryToken from "../apiInterface/ApiCallTryToken";
import ApiPostWithToken from "../apiInterface/ApiPostWithToken";

/**
 * Function that displays and handles logic regarding how an admin can
 * look at all applications and handle a specific application
 *
 * Initiates variables to handle error messages, what to show,
 * the list of applicants, and information regarding the applicant to show
 *
 */
export default function AllApplicants() {
    const [errorMessage, setErrorMessage] = useState("")
    const [showAllOrOne, setShowAllOrOne] = useState("all")
    const [applicantsList, setApplicantsList] = useState([])
    const [theOneToSHow, setTheOneToShow] = useState({
        availabilities: [],
        email: undefined,
        pnr: undefined,
        name: undefined,
        surname: undefined,
        competenceProfiles: [],
        personId: undefined
    })
    const [applicationVersion, setApplicationVersion] = useState(null)
    const navigate = useNavigate();

    /**
     * Function to change the specific application to show
     *
     * @param response the application to show
     */
    function changeTheOneToShow(response: any) {
        response.then((r: any) => {
            setTheOneToShow(r)
            setApplicationVersion(r.applicationStatus.version)
            setShowAllOrOne("one")
        })
    }

    /**
     * Function to get information regarding a specific application
     *
     * @param event the person id of the application clicked at
     */
    function changeShowingForApp(event: any) {
        ApiPostWithToken.specificApplication(event.target.value).catch(reason => setErrorMessage("Something went wrong, please try again later")).then(response => changeTheOneToShow(response.json()))
    }


    /**
     * Function to handle the response from the API call made in the getAllApplicants() function
     *
     * @param response the response
     */
    const handleResponse = (response : any) => {
        setShowAllOrOne("all")
        const appList = response.map((element: any) => {
            if(element.applicationStatus == null) {
                element.applicationStatus = "unhandled"
            }else{
                element.applicationStatus = element.applicationStatus.status
            }
            return(
            <Flex

                key={element.personId}
                background="blue.200"
                width="fit-content"
                minWidth="100px"
                borderRadius="lg"
                p={3}
                alignSelf="flex-end"
            >
                <Button
                    onClick={changeShowingForApp}
                    value={element.personId}
                    >
                    Go to Applicant
                </Button>
                <Text>
                    {element.name}, {element.surname}:<br />
                     Application status:{element.applicationStatus}<br />
                        Applicant id: {element.personId}
                </Text>
            </Flex>)


        } )
        setApplicantsList(appList)
    };

    /**
     * Function to get all applicants
     */
    function getAllApplicants() {
        ApiCallTryToken.getAllApplicants().catch(reason => setErrorMessage("Something went wrong, please try again later")).then(response => handleResponse(response));
        setShowAllOrOne("all")
    }

    /**
     * Function to decline an application
     */
    function declineApplication() {
        const post = {
            status : "rejected",
            personId : theOneToSHow.personId,
            version : applicationVersion
        }
        ApiPutWithToken.updateApplicationStatus(post).catch(reason => setErrorMessage("Something went wrong, please try again later")).then(response => {
            if(response.status === 412){
                setErrorMessage("Someone has already updated this application")
            }
            else if(response.status === 500 || response.status === 503){
                navigate("/errorpage")
            }
            else{
                getAllApplicants();
                clearErrorMessage();
            }
        });
    }

    /**
     * Function to clear the displayed error message
     */
    function clearErrorMessage() {
        setErrorMessage("")
    }

    /**
     * Function to approve an application
     */
    function approveApplication() {
        const post = {
            status : "approved",
            personId : theOneToSHow.personId,
            version : applicationVersion
        }
        ApiPutWithToken.updateApplicationStatus(post).then(response => {
            if(response.status === 412){
                setErrorMessage("Someone has already updated this application")
            }
            else if(response.status === 500 || response.status === 503){
                navigate("/errorpage")
            }
            else if(response.status !== 200){
                navigate("/errorpage")
            }
            else{
                getAllApplicants();
                clearErrorMessage();
            }
        }).catch(reason => setErrorMessage("Something went wrong, please try again later"));
    }

    /**
     * Function to navigate to the home-page
     */
    function goToHome(){
        navigate("/home")
    }

    return(
    <VStack>
        <Flex color={"red.100"}>
            <form>
                <Text
                    color='red'> {errorMessage} </Text>
                <Button
                    variant="link"
                    width="100%"
                    colorScheme="blue"
                    onClick={getAllApplicants}
                >
                    {" "}
                    Get applicants
                </Button>
                <Button
                    variant="link"
                    width="100%"
                    colorScheme="blue"
                    onClick={goToHome}
                >
                    {" "}
                    Go back
                </Button>
            </form>
        </Flex>
        <VStack
            height='calc(90vh)'
            direction="column">
            {showAllOrOne === "all" && applicantsList}
            {showAllOrOne === "one" &&
            <VStack background={"blue.200"} borderRadius={3}>
                <Text>Applicant: {theOneToSHow.name} {theOneToSHow.surname}</Text>
                <Text>PersonalNumber: {theOneToSHow.pnr}</Text>
                <Text> email: {theOneToSHow.email}</Text>
                <Text>Availabilities: </Text>{theOneToSHow.availabilities.map((element:any) => {
                    return(<Flex key = {element.fromDate}>
                           <Text>From  {element.fromDate}  To  {element.toDate}</Text>
                            <br/>
                    </Flex>
                    )}
                 )}
                <Text> Competence: </Text>{theOneToSHow.competenceProfiles.map((element:any) => {
                return(<Flex key = {element.competenceName.name}>
                        <Text>Competence: {element.competenceName.name} for {element.yearsOfExperience} years</Text>
                        <br/>
                    </Flex>
                )}
            )}
                <Button onClick={approveApplication} color={"blue"}>Approve application</Button>
                <Button onClick={declineApplication} color={"red"}>Decline application</Button>
            </VStack>}
        </VStack>
    </VStack>
    )

};