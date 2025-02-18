
export default async function page({ params }: { params: { slug: string } }) {
    const { slug } = await params; 
    return (
        <main>
            <h1>Project: {slug}</h1>
        </main>
    );
}