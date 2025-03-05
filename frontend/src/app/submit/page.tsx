"use client"

import { type FormEvent, useState } from "react"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/ui/Navbar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { addProject } from "@/lib/contract"
import { uploadToIPFS } from "@/lib/ipfsHandler"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, ImageIcon, LinkIcon, Loader2, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

const CATEGORY_OPTIONS = ["DeFi", "NFT", "DAO", "Gaming", "Social"]

export default function Submit() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    link: "",
    category: CATEGORY_OPTIONS[0],
  })

  const [status, setStatus] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.imageUrl || !formData.link) {
      setStatus("Please fill in all fields")
      return
    }

    try {
      setIsSubmitting(true)
      setStatus("Submitting project...")

      console.log(formData.name, formData.imageUrl, formData.description, formData.link, formData.category)

      const cid = await uploadToIPFS(
        formData.name,
        formData.imageUrl,
        formData.category,
        formData.description,
        formData.link,
      )

      const tx = await addProject(cid)
      await tx.wait()

      setStatus("Project submitted successfully!")
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        link: "",
        category: CATEGORY_OPTIONS[0],
      })
    } catch (e) {
      console.error(e)
      setStatus("Error adding project.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <Navbar />

      <div className="container max-w-3xl mx-auto px-4 py-12">
        <Card className="border border-gray-800 bg-black/60 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
          <CardHeader className="border-b border-gray-800 pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Submit Your Project
            </CardTitle>
            <CardDescription className="text-gray-400">
              Share your blockchain innovation with the community
            </CardDescription>
          </CardHeader>

          <Form className="w-full" onSubmit={handleSubmit} action="">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Project Name
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    value={formData.name}
                    name="project-name"
                    className="pl-10 bg-gray-900/60 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-300">
                  Description
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Describe your project"
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    value={formData.description}
                    name="description"
                    className="pl-10 min-h-[120px] bg-gray-900/60 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium text-gray-300">
                  Image URL
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="image"
                    placeholder="Enter image URL"
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    value={formData.imageUrl}
                    name="image-url"
                    className="pl-10 bg-gray-900/60 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="mt-2 relative aspect-video rounded-md overflow-hidden border border-gray-800">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=400"
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-300">
                    Category
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400 z-10">
                      <Tag className="h-4 w-4" />
                    </div>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="pl-10 bg-gray-900/60 border-gray-800 focus:ring-emerald-500/20">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        {CATEGORY_OPTIONS.map((cat) => (
                          <SelectItem key={cat} value={cat} className="focus:bg-emerald-500/20 text-white">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="text-sm font-medium text-gray-300">
                    Project Link
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <LinkIcon className="h-4 w-4" />
                    </div>
                    <Input
                      id="link"
                      placeholder="https://your-project.com"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      name="link"
                      className="pl-10 bg-gray-900/60 border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t border-gray-800 pt-6 mt-6">
              <Button
                variant="default"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium py-2 transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Project"
                )}
              </Button>

              {status && (
                <div
                  className={cn(
                    "w-full p-3 rounded-md text-center text-sm font-medium transition-all",
                    status.includes("successfully")
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : status.includes("Error")
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-gray-800/60 text-gray-300",
                  )}
                >
                  {status}
                </div>
              )}
            </CardFooter>
          </Form>
        </Card>
      </div>
    </div>
  )
}

