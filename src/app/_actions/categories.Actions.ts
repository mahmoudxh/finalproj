export async function getAllCategories() {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const finalRes = await res.json()
    return finalRes
}