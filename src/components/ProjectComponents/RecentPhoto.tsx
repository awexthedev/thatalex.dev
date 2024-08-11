import { useState, useEffect } from 'react';

type PhotoData = {
    id: number,
    name: string,
    imageUrl: string,
    dateTaken: Date
}

export default function RecentPhoto() {
    const [ data, setData ] = useState<PhotoData | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ errorState, setErrorState ] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://api.alexav.gg/v4/social/photos", {
            method: 'get',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(async (res) => {    
            if (res.ok) {
                console.log("ok!")
                const json = await res.json()
                setData(json.data[0]);
                setLoading(false)
            } else {
                console.log("not ok :(")
                setErrorState("Failed to fetch data!");
                setLoading(false);
            }
        })
        .catch((e) => {
            setLoading(false);
            setErrorState(e.message)
        })
    }, []);
    useEffect(() => {
        console.log(data)
    }, [data])

    const parseDate = (date: Date) => {
        const jsDate = new Date(date);
        return `${jsDate.getFullYear()}/${jsDate.getMonth() + 1}/${jsDate.getDate()}`;
    }

    return (
        <a href={"https://photos.alexav.gg/"} target="_blank">
            <div className="bg-white text-black p-4 max-w-fit lg:max-w-full mx-auto">
                {
                    (loading) ? (
                        <h1>Loading..</h1>
                    ) : (!errorState && data) ? (
                        <div className="flex items-center">
                            <img 
                                src={data.imageUrl}
                                width="200"
                            />
                            <div className="flex flex-wrap mx-2">
                                <h1 className="w-full font-bold">{data.name}</h1>

                                <h1>{parseDate(data.dateTaken as Date)}</h1>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="font-bold text-2xl">Failed to fetch :(</h1>
                            <p>Check out <a className="underline" href="https://photos.alexav.gg" target="_blank">photos.alexav.gg</a> if this isn't working.</p>
                            <p className="text-sm italic">{errorState}</p>
                        </>
                    )
                }
            </div>
        </a>
    )

}