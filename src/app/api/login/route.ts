
export async function POST(request: Request, response: Response) {
    try {
        const body = await request.json()
        return new Response(JSON.stringify({ status: 200 }))
    } catch (error) {
        console.log(error)
        throw new Error
    }
}