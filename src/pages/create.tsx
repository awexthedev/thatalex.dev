// react modules
import {useState} from 'react'
import type {FormEvent} from 'react';

// trpc api
import { api } from "@/utils/api";

// components
import RootLayout from '@/components/RootLayout';
import InputOption from '@/components/InputOption';

export default function CreatePage() {
    // ui states
    const [message, setMessage] = useState<string | null>(null)

    // trpc hooks
    const linksMutation = api.links.create.useMutation()

    function onLinkSubmit(event: FormEvent<HTMLFormElement>) {
        const form = event.target as HTMLFormElement
        const urlRegex = new RegExp("^((https):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$")

        const titleElement = form.elements.namedItem('title') as HTMLInputElement;
        const urlElement = form.elements.namedItem('url') as HTMLInputElement;
        const urlMatches = urlElement.value.match(urlRegex)

        if (!titleElement.value || !urlElement.value) {
            event.preventDefault();

            setMessage("One or more values were missing!")
            setTimeout(() => setMessage(null), 5000)
        } else if (urlMatches != null && !urlMatches[1]) {
            event.preventDefault();

            setMessage("An invalid URL was provided!")
            setTimeout(() => setMessage(null), 5000)
        } else {
            const object = {
                name: titleElement.value,
                url: urlElement.value
            }
    
            linksMutation.mutate(object)
        }
    }

    return (
        <RootLayout protectedPage={true}>
            <div className="space-y-4">
                <div className="w-96 p-2 mx-auto bg-gray-500 text-center">
                    <h1 className="font-bold text-2xl">Create Link</h1>

                    <div className="pt-2 pb-2">
                        <hr />
                    </div>

                    <form onSubmit={onLinkSubmit}>
                        <InputOption inputName="title" label="Title" />
                        <InputOption inputName="url" label="URL" />

                        <button className="bg-gray-800 text-white rounded-lg p-2" type="submit">Submit</button>
                    </form>
                    
                    <p>{message}</p>
                </div>
            </div>
        </RootLayout>
    )
}