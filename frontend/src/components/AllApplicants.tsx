import React, {useEffect, useState} from "react";
import {
    Input,
    Flex,
    Button, Text, Select, Square, VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPutWithToken from "../apiInterface/ApiPutWithToken";
import ApiCallTryToken from "../apiInterface/ApiCallTryToken";
import ApiPostWithToken from "../apiInterface/ApiPostWithToken";

export default function AllApplicants() {
    const [errorMessage, setErrorMessage] = useState("")
    const [applicants, setApplicants] = useState("")
    const [applicantsList, setApplicantsList] = useState([])
    const [showAllOrOne, setShowAllOrOne] = useState("all")
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

    function changeTheOneToShow(response: any) {
        console.log(response)
        console.log("asdasd")
        response.then((r: any) => {
            console.log("r")
            console.log(r)
            setTheOneToShow(r)
            setApplicationVersion(r.applicationStatus.version)
            setShowAllOrOne("one")
        })
    }


    function changeShowingForApp(event: any) {
        ApiPostWithToken.specificApplication(event.target.value).then(response => changeTheOneToShow(response.json()))
    }
    const handleResponse = (response : any) => {
        setApplicants(response)
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


    function getAllApplicants() {
        ApiCallTryToken.getAllApplicants().then(response => handleResponse(response));
        clearErrorMessage();
        setShowAllOrOne("all")
    }

    function declineApplication() {
        const post = {
            status : "rejected",
            personId : theOneToSHow.personId,
            version : applicationVersion
        }
        ApiPutWithToken.updateApplicationStatus(post).then(response => {
            if(response.status === 412){
                setErrorMessage("Someone has already updated this application")
            }
            else if(response.status !== 200){
                setErrorMessage("Something went wrong")
            }else{
                getAllApplicants();
                clearErrorMessage();
            }
        });
    }

    function clearErrorMessage() {
        setErrorMessage("")
    }

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
            else if(response.status !== 200){
                setErrorMessage("Something went wrong")
            }
            else{
                getAllApplicants();
                clearErrorMessage();
            }
        });

    }

    return(
    <Flex>
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
            </form>
        </Flex>



        <VStack
            height='calc(90vh)'
            // overflowY="scroll"
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
    </Flex>
    )

};