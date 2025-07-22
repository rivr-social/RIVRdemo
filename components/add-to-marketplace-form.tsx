"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/image-upload"
import { TagEditor } from "@/components/tag-editor"
import { TransactionType } from "@/lib/types"
import { getResourcesByOwnerId, getSkillsByOwnerId } from "@/lib/mock-group-marketplace-data"
import { Gift, Clock, DollarSign, Package, Briefcase, Plus } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  transactionType: z.nativeEnum(TransactionType),
  price: z.number().optional(),
  duration: z.string().optional(),
  sourceType: z.enum(["resource", "skill", "new"]),
  resourceId: z.string().optional(),
  skillId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AddToMarketplaceFormProps {
  groupId: string
  userId: string
  onSuccess: () => void
}

export function AddToMarketplaceForm({ groupId, userId, onSuccess }: AddToMarketplaceFormProps) {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  // Get user's resources and skills
  const userResources = getResourcesByOwnerId(userId)
  const userSkills = getSkillsByOwnerId(userId)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      transactionType: TransactionType.Gift,
      sourceType: "new",
      tags: [],
      images: [],
    },
  })

  const transactionType = form.watch("transactionType")
  const sourceType = form.watch("sourceType")

  const onSubmit = (values: FormValues) => {
    // Add images and tags to the form values
    values.images = images
    values.tags = tags

    console.log("Form submitted:", values)

    // In a real app, this would send the data to an API
    // For now, we'll just simulate success
    setTimeout(() => {
      onSuccess()
    }, 500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-4 gap-4"
                >
                  <FormItem className="flex flex-col items-center space-y-2 space-x-0">
                    <FormControl>
                      <RadioGroupItem value={TransactionType.Gift} className="peer sr-only" id="gift" />
                    </FormControl>
                    <FormLabel
                      htmlFor="gift"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Gift className="mb-2 h-6 w-6" />
                      Gift
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-y-2 space-x-0">
                    <FormControl>
                      <RadioGroupItem value={TransactionType.Borrow} className="peer sr-only" id="borrow" />
                    </FormControl>
                    <FormLabel
                      htmlFor="borrow"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Clock className="mb-2 h-6 w-6" />
                      Borrow
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-y-2 space-x-0">
                    <FormControl>
                      <RadioGroupItem value={TransactionType.Rent} className="peer sr-only" id="rent" />
                    </FormControl>
                    <FormLabel
                      htmlFor="rent"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Clock className="mb-2 h-6 w-6" />
                      Rent
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-y-2 space-x-0">
                    <FormControl>
                      <RadioGroupItem value={TransactionType.Sale} className="peer sr-only" id="sale" />
                    </FormControl>
                    <FormLabel
                      htmlFor="sale"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <DollarSign className="mb-2 h-6 w-6" />
                      Sale
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Select how you want to offer this item or service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>What are you offering?</FormLabel>
              <FormControl>
                <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="resource" className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      Resource
                    </TabsTrigger>
                    <TabsTrigger value="skill" className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      Skill
                    </TabsTrigger>
                    <TabsTrigger value="new" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      New Item
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="resource" className="pt-4">
                    <FormField
                      control={form.control}
                      name="resourceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select a resource</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a resource" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {userResources.length > 0 ? (
                                userResources.map((resource) => (
                                  <SelectItem key={resource.id} value={resource.id}>
                                    {resource.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>
                                  No resources found
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose from your existing resources or{" "}
                            <Button
                              variant="link"
                              className="p-0 h-auto"
                              onClick={() => form.setValue("sourceType", "new")}
                            >
                              create a new one
                            </Button>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="skill" className="pt-4">
                    <FormField
                      control={form.control}
                      name="skillId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select a skill</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {userSkills.length > 0 ? (
                                userSkills.map((skill) => (
                                  <SelectItem key={skill.id} value={skill.id}>
                                    {skill.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>
                                  No skills found
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose from your existing skills or{" "}
                            <Button
                              variant="link"
                              className="p-0 h-auto"
                              onClick={() => form.setValue("sourceType", "new")}
                            >
                              create a new one
                            </Button>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="new" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a title for your listing" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you're offering..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional fields based on transaction type */}
        {(transactionType === TransactionType.Rent || transactionType === TransactionType.Sale) && (
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  {transactionType === TransactionType.Rent ? "Set the rental price." : "Set the sale price."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(transactionType === TransactionType.Borrow || transactionType === TransactionType.Rent) && (
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      transactionType === TransactionType.Borrow
                        ? "e.g., 1 week, until June 15"
                        : "e.g., $10/day, $50/week"
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {transactionType === TransactionType.Borrow
                    ? "Specify how long you're willing to lend this item."
                    : "Specify the rental period and rate."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Images and Tags */}
        <div className="space-y-4">
          <div>
            <FormLabel>Images</FormLabel>
            <ImageUpload value={images} onChange={setImages} maxFiles={3} />
            <FormDescription>Add up to 3 images to showcase what you're offering.</FormDescription>
          </div>

          <div>
            <FormLabel>Tags</FormLabel>
            <TagEditor
              tags={tags}
              setTags={setTags}
              placeholder="Add tags..."
              suggestions={["community", "tools", "skills", "education", "creative", "food", "technology"]}
            />
            <FormDescription>Add tags to help others find your listing.</FormDescription>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">Create Listing</Button>
        </div>
      </form>
    </Form>
  )
}
