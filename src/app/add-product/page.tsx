import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Add Product - Flowmazon"
}

async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageURL = formData.get("imageURL")?.toString();
    const price = Number(formData.get("price") || 0);

    if(!name || !description || !imageURL || !price) {
        throw Error("Missing required fields")
    }

    await prisma.product.create({
        data: {name, description, imageURL, price}
    });

    redirect("/");
}

export default function addProductPage() {
    return (
        <div>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={addProduct}>
                <input 
                    type="text" 
                    name="name" 
                    id="" 
                    placeholder="name" 
                    required 
                    className="mb-3 w-full input input-bordered"
                />
                <textarea 
                    name="description" 
                    id="" 
                    placeholder="description"
                    required
                    className="textarea textarea-bordered mb-3 w-full"
                />
                <input 
                    type="url" 
                    name="imageURL" 
                    id="" 
                    placeholder="imageURL" 
                    required 
                    className="mb-3 w-full input input-bordered"
                />
                <input 
                    type="number" 
                    name="price" 
                    id="" 
                    placeholder="price" 
                    required 
                    className="mb-3 w-full input input-bordered"
                />
                <button type="submit" className="btn btn-primary btn-block">Add product</button>
            </form>
        </div>
    )
}
