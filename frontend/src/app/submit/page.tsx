"use client";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import { addProject } from "@/lib/contract";
import { FormEvent, useState } from "react";
import { uploadToIPFS } from "@/lib/ipfsHandler";
const CATEGORY_OPTIONS = ["DeFi", "NFT", "DAO", "Gaming", "Social"];
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Submit() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: "",
    category: CATEGORY_OPTIONS[0],
  });

  const [status, setStatus] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setStatus("Submitting project...");
      console.log(
        formData.name,
        formData.imageUrl,
        formData.description,
        formData.link,
        formData.category,
      );
      const cid = await uploadToIPFS(
        formData.name,
        formData.imageUrl,
        formData.category,
        formData.description,
        formData.link,
      );
      const tx = await addProject(cid);
      await tx.wait();
      setStatus("Project submitted successfully!");
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        link: "",
        category: "",
      });
    } catch (e) {
      console.error(e);
      setStatus("Error adding project.");
    }
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar></Navbar>
      <div className="p-4 mt-12 max-w-lg min-w-sm flex flex-col items-center mx-auto">
        <Form
          className="p-4 w-full flex flex-col items-center justify-center gap-6"
          onSubmit={handleSubmit}
          action=""
        >
          <Input
            id="name"
            placeholder="Project name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            name="project-name"
          />
          <Input
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
            name="description"
          />
          <Input
            id="image"
            placeholder="Image url"
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            value={formData.imageUrl}
            name="image-url"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((cat)=>(
                <SelectItem onChange={(e)=> setFormData({...formData, category:cat})} key={cat} value={cat} >{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="link"
            placeholder="Link"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            name="link"
          />
          <Button variant="secondary" type="submit">
            Submit
          </Button>
          {status && <p>{status}</p>}
        </Form>
      </div>
    </div>
  );
}
