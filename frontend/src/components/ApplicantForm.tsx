import Reract, {useState} from "react";
import React, { Component }  from 'react';
import {
    Input,
    Flex,
    Button, Text, Select, VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import ApiPostWithToken from "../apiInterface/ApiPostWithToken";


export default function ApplicantForm() {
    const [avErrorMessage, setAvErrorMessage] = useState("")
    const [compErrorMessage, setCompErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [competenceArray, setCompetenceArray] = useState([])
    const [availabilityArray, setAvailabilityArray] = useState([])
    const [compFormData, setCompFormData] = useState({
        competence: "",
        yearsOfExperience: "",
    })
    const [avFormData, setAvFormData] = useState({
        startDate: "",
        endDate: "",
    })
    const navigate = useNavigate();

    function handleCompChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setCompFormData((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            };
        });
    }
    function handleAvChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setAvFormData((prevValues) => {
            return {
                ...prevValues,
                [name]: value,
            };
        });
    }

    function addCompetence() {
        if(compFormData.competence === "" || compFormData.yearsOfExperience === ""){
            setCompErrorMessage("Fill in all fields")
        }
        else if(!/^[0-9.]*$/.test(compFormData.yearsOfExperience)){
            setCompErrorMessage("Use the format x.xx for Years of Experience")
        }
        else{
            setCompErrorMessage("")
            setErrorMessage("")
            const post:any = {
                competence :  compFormData.competence,
                yearsOfExperience : compFormData.yearsOfExperience

            }
            setCompetenceArray(competenceArray.concat(post))
        }
    }

    function addAvailability() {
        if(avFormData.startDate === "" || avFormData.endDate === ""){
            setAvErrorMessage("Fill in all fields")
        }
        else if(avFormData.startDate >= avFormData.endDate){
            setAvErrorMessage("Make sure that the End Date comes after the Start Date")
        }
        else{
            setAvErrorMessage("")
            setErrorMessage("")
            const post:any = {
                startDate :  avFormData.startDate,
                endDate : avFormData.endDate

            }
            setAvailabilityArray(availabilityArray.concat(post))
        }
    }
    function clearApplication(){
        setErrorMessage("")
        setCompErrorMessage("")
        setAvErrorMessage("")
        setCompetenceArray([])
        setAvailabilityArray([])
    }

    function cancelApplication(){
        setErrorMessage("")
        setCompErrorMessage("")
        setAvErrorMessage("")
        setCompetenceArray([])
        setAvailabilityArray([])
        navigate("/home");
    }

    function handInApplication(){
        if(competenceArray.length < 1 || availabilityArray.length < 1){
            setErrorMessage("Add at least one competence and one availability period")
        }
        else{
            const application = {competenceArray, availabilityArray}

            ApiPostWithToken.createApplication(application).then(response => {
                if(typeof response === "string"){
                    setErrorMessage(response)
                }
                else{
                    handleResponse(response)
                }
            });
            setErrorMessage("Application submitted!")
        }
    }

    const handleResponse = (response : Response) => {
        if (response.ok) {
            console.log("ok");
        }else{
            console.log("error" + response.status)
        }
    };

    const showCompetences = () => {
        const items = competenceArray.map((element, index)=>
            <div key={index}>{element['competence']} - {element['yearsOfExperience']}</div>)
        return <div>{'Added Competences and Years of Experience:'}{items}</div>
    }

    const showAvailability = () => {
        const items = availabilityArray.map((element, index)=>
            <div key={index}>{element['startDate']} - {element['endDate']}</div>)
        return <div>{'Added Availability periods:'}{items}</div>
    }



    return(
        <VStack>

            <form>
                <h3>Add Competences</h3>
                <Text color='red'> {compErrorMessage} </Text>
                <Select placeholder='Select option' onChange={handleCompChange} name="competence">
                    <option defaultValue={compFormData.competence} label="Ticket Sales">ticket sales</option>
                    <option defaultValue={compFormData.competence} label="Lotteries">lotteries</option>
                    <option defaultValue={compFormData.competence} label="Roller Coaster Operation">roller coaster operation</option>
                </Select>
                <Input
                    type="text"
                    placeholder="Years of Experience"
                    onChange={handleCompChange}
                    name="yearsOfExperience"
                    mb={3}
                    defaultValue={compFormData.yearsOfExperience}
                />
                <Button
                    width="100%"
                    colorScheme="blue"
                    onClick={addCompetence}
                    mb={3}
                >
                    Add Competence
                </Button>
            </form>

            <form>
                <h3>Add Availability Periods</h3>
                <Text color='red'> {avErrorMessage} </Text>
                <label>
                    Start Date:
                    <Input
                        width="100%"
                        type="date"
                        onChange={handleAvChange}
                        name="startDate"
                        mb={3}
                        defaultValue={avFormData.startDate}
                    />
                </label>
                <label>
                    End Date:
                    <Input
                        width="100%"
                        type="date"
                        onChange={handleAvChange}
                        name="endDate"
                        mb={3}
                        defaultValue={avFormData.endDate}
                    />
                </label>
            </form>
            <Button
                width="50%"
                colorScheme="blue"
                onClick={addAvailability}
                mb={3}
            >
                Add Availability Period
            </Button>
            <Flex>
                {showCompetences()}
            </Flex>
            <Flex>
                {showAvailability()}
            </Flex>
            <Text color='red'> {errorMessage} </Text>
            <Button
                width="50%"
                colorScheme="blue"
                onClick={handInApplication}
                mb={3}
            >
                Hand in Application
            </Button>
            <Button
                variant="link"
                width="100%"
                colorScheme="blue"
                onClick={clearApplication}
            >
                Clear Application
            </Button>
            <Button
                variant="link"
                width="100%"
                colorScheme="blue"
                onClick={cancelApplication}
            >
                Cancel Application
            </Button>

        </VStack>
    )

};