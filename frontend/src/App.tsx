import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import AllApplicants from "./components/AllApplicants";
import ApplicantForm from "./components/ApplicantForm";
import ErrorPage from "./components/ErrorPage"

/**
 * Variable used for logic regarding admins and regular users
 */
declare global {
  var isAdmin: Boolean;
}
export const App = () => (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Router>
              <Routes>
                <Route path="/" element={<LogIn />}/>
                <Route path="/all" element={<AllApplicants />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/signUp" element={<SignUp />}/>
                <Route path="/applicantForm" element={<ApplicantForm />}/>
                <Route path="/errorpage" element={<ErrorPage />}/>
              </Routes>
            </Router>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
)
