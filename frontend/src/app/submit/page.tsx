"use client";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/Navbar";
import {Button} from "@/components/ui/button";
import { addProject } from "@/lib/contract";
import { FormEvent, useState } from "react";
import { uploadToIPFS } from "@/lib/ipfsHandler";

export default function Submit() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: "",
  })

  const [status, setStatus] = useState("");
  
  async function handleSubmit(e:FormEvent) {
    e.preventDefault();
    try{
      setStatus("Submitting project...");
      console.log(formData.name, formData.imageUrl, formData.description, formData.link)
      const cid = await uploadToIPFS(formData.name, formData.imageUrl, formData.description, formData.link)
      const tx = await addProject(cid);
      await tx.wait();
      setStatus("Project submitted successfully!");
      setFormData({name: "", description: "", imageUrl: "", link: ""});
    }catch(e){
      console.error(e);
      setStatus("Error adding project.");
    }
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar></Navbar>
      <div className="p-4 mt-12 max-w-lg min-w-sm flex flex-col items-center mx-auto">
        <Form className="p-4 w-full flex flex-col items-center justify-center gap-6" onSubmit={handleSubmit} action="">
          <Input 
          id="name" 
          placeholder="Project name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          value={formData.name}
          name="project-name" />
          <Input  
          placeholder="Description" 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          value={formData.description}
          name="description"  />
          <Input id="image" 
          placeholder="Image url"
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          value={formData.imageUrl}
           name="image-url" />
          <Input 
          id="link" 
          placeholder="Link" 
          value={formData.link}
          onChange={(e) => setFormData({...formData, link: e.target.value})}
          name="link" />
          <Button variant="secondary" type="submit">Submit</Button>
          {status && <p>{status}</p>}
        </Form>
      </div>
    </div>
  );
}
