"'use client'"

import { useState, useRef } from "react"
import { Trash2, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ProductFormComponent() {
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [links, setLinks] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [websites, setWebsites] = useState<string[]>([])
  const [displayImage, setDisplayImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleArrayInput = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) => [...prev, value])
  }

  const handleRemoveArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setDisplayImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" required />
        </div>

        <div>
          <Label htmlFor="display_image">Display Image</Label>
          <div className="mt-2 flex items-center space-x-4">
            <div
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Display"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Upload className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </Button>
          </div>
        </div>

        <div>
          <Label>Images</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Image URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleArrayInput(setImages, e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput(setImages, "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={image} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem(setImages, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Videos</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Video URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleArrayInput(setVideos, e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput(setVideos, "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={video} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem(setVideos, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Links</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Link URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleArrayInput(setLinks, e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput(setLinks, "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={link} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem(setLinks, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleArrayInput(setTags, e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput(setTags, "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={tag} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem(setTags, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="openingHrs">Opening Hours</Label>
            <Input id="openingHrs" type="time" />
          </div>
          <div>
            <Label htmlFor="closingHrs">Closing Hours</Label>
            <Input id="closingHrs" type="time" />
          </div>
        </div>

        <div>
          <Label htmlFor="telephone">Telephone</Label>
          <Input id="telephone" type="tel" />
        </div>

        <div>
          <Label>Websites</Label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Website URL"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleArrayInput(setWebsites, e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleArrayInput(setWebsites, "")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {websites.map((website, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={website} readOnly />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveArrayItem(setWebsites, index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" type="number" min="1" max="5" defaultValue="3" />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="hasOwner" />
          <Label htmlFor="hasOwner">Has Owner</Label>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" />
        </div>

        <Button type="submit" className="w-full">Create Product</Button>
      </div>
    </form>
  )
}