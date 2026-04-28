"use client"
import React, { useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { addToWhishlist, getLoggedUserWhishlist } from '../_actions/whishlist.Actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cartContext } from '../_contexts/CartContextProvider'

export default function AddToWhishlistbtn({ productId }: { productId: string }) {
    const {setwhishlistItemsNum, setwhishlistItems} = useContext(cartContext)
    async function handleAddToWhishlist(){

        const addRes = await addToWhishlist(productId)
        const whishlist = await getLoggedUserWhishlist()
        if (addRes.status == "success"){
            setwhishlistItems(whishlist.data)
            setwhishlistItemsNum(whishlist.count)

            toast.success(`${addRes.message}`,{
                position : "top-center"
            })
        }else{
            toast.error(`${addRes.message}`,{
                position : "top-center"
            })
        }

    }


    return (
        <Button onClick={handleAddToWhishlist} className="bg-white shadow-2xl border-1 text-gray-700 h-8 w-8 rounded-full cursor-pointer flex items-center justify-center">
            <CiHeart />
        </Button>
    )
}
