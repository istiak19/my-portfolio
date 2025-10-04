"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BlogCardProps } from "@/src/type";

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    published: z.boolean().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

const UpdateBlog = ({ blog }: BlogCardProps) => {
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            published: blog.published,
        },
    });

    const onSubmit = async (values: BlogFormValues) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (image) formData.append("file", image);

        try {
            setIsSubmitting(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/blog/${blog.id}`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            const data = await res.json();
            if (res.ok) {
                toast.success("Blog updated successfully!");
            } else {
                toast.error(data.message || "Failed to update blog");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="container mx-auto p-8 bg-white dark:bg-black rounded-2xl shadow-lg space-y-6"
        >
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                Update Blog
            </h2>

            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} className="mt-1" />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    {...register("slug")}
                    className="mt-1 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                    readOnly
                />
                {errors.slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    rows={6}
                    {...register("content")}
                    className="mt-1"
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="image">Blog Image (Optional)</Label>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    className="mt-1"
                />
            </div>

            <Button
                type="submit"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-2 text-xl font-semibold w-full border border-emerald-500/30 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 text-transparent bg-clip-text drop-shadow-md animate-text-gradient backdrop-blur-md transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Updating..." : "Update Blog"}
            </Button>
        </form>
    );
};

export default UpdateBlog;