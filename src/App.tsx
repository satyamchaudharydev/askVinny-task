import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import "./styles.css";

// Instructions for Candidate:
// 1. Add an input field to accept an email.
// 2. Add a button that passes the input value to the parent component.
// 3. In the parent component, add logic to send the value to a backend with a POST request to 
//the following url https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721. Along with the email, send your github username in the JSON. 
// 4. Add styling to the button (Button) and input (Input) using the ShadCN Component library here: https://ui.shadcn.com/docs/components/input

const URL = "https://webhook.site/6064735c-c7f2-4584-ba9d-1f0e80f32721"
const githubUsername = "satyamchaudharydev"

const EmailForm = ({
  onSubmit
}: {
  onSubmit: (email: string) => void
}) => {
  const [email, setEmail] = useState<string>("");
  
  const handleSubmit = () => {
    onSubmit(email)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value
      setEmail(email)
  }
  return <div>Email form
    <form onSubmit={handleSubmit}>
      <Input type="email" name="email" value={email} onChange={handleChange} />
      <Button type="submit"  className="mt-3" >
        Submit
      </Button>
    </form>
    
  </div>;
};

export default function App() {

  const onSubmit = async (email: string) => {
    const data = {
      email,
      githubUsername
    }
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if(!response.ok){
        throw new Error("Error is present")
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <div className="App flex justify-center items-center flex-col h-full">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    
      <EmailForm onSubmit={onSubmit} />
    </div>
  );
}