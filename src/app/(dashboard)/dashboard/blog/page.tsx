import BlogForm from "@/src/components/BlogForm/BlogForm";

export const metadata = {
    title: "Create Blog – Istiak Ahamed",
    description:
        "Portfolio of Istiak Ahamed, a passionate full-stack web developer specializing in building modern, responsive web applications using Next.js, React, and MongoDB.",
};

const Blog = () => {
    return (
        <div>
            <BlogForm />
        </div>
    );
};

export default Blog;