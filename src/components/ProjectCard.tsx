export default function Project({
    name,
    image,
    description,
    urlTo
}: {
    name: string,
    image: string,
    description: string,
    urlTo?: string,
}) {
    return (
        <a href={urlTo} target="_blank">
            <div className="bg-white text-black mx-auto rounded-lg overflow-hidden max-w-fit lg:max-w-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-24 object-cover"
                />

                <div className="p-4 space-y-2">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
        </a>
    )
}