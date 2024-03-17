'use client'

import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Searchbar() {
    const [input, setInput] = useState('')
    const router = useRouter()
    function Search(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.push('/search?query' + encodeURIComponent(input))
    }
    return (
        <form onSubmit={Search} className="flex gap-2">
            <Input
                className="max-w-sm rounded-lg pl-10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search..."
            />
            <Button className="rounded-lg" type="submit">
                Search
            </Button>
        </form>
    )
}
