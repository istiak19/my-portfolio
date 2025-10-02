export const getProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
            method: "GET",
            credentials: "include",
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        return data?.data || null;

    } catch (error) {
        console.error("Error fetching projects:", error);
        return null;
    }
};

export const getProjectById = async (id: number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
            method: "GET",
            next: { revalidate: 60 }, // ISR: revalidate every 60s
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data?.data || null;

    } catch (error) {
        console.error("Error fetching project by ID:", error);
        return null;
    }
};