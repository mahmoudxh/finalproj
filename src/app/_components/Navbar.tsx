"use client"

import React, { useContext } from "react"
import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import logo from "@/images/freshCart.png"
import { CiHeart } from "react-icons/ci"
import { FaCartShopping } from "react-icons/fa6"
import { ImProfile } from "react-icons/im"
import { IoIosSearch } from "react-icons/io"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { cartContext } from "../_contexts/CartContextProvider"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
        "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
    ]

    export default function Navbar() {
        const session = useSession()
        const {cartItemsNum, whishlistItemsNum} = useContext(cartContext)

        function handelLogout(){
            signOut({
                redirect : true,
                callbackUrl : "/login"
            })
        }

        
    return <>


        <NavigationMenu className="max-w-none mx-auto py-3 justify-between md:px-20 relative">


            <div>
                <img src={logo.src} alt="freshCart Logo"/>
            </div>

            <div className="w-1/2  flex justify-between items-center relative">
                <input type="text" className="border-1 border-gray-200 w-full pt-3 pe-12 ps-5 pb-3  rounded-3xl " placeholder="Search for products, brands and more..." />
                <button className="bg-emerald-600 text-white absolute right-1 w-8 h-8 rounded-full text-center flex justify-center items-center cursor-pointer"> <IoIosSearch className="h-3.5 w-3.5" /> </button>
            </div>

        <NavigationMenuList className="w-full flex justify-between items-center">

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/">Home</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/cart">Cart</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">Categories</NavigationMenuTrigger>
                <NavigationMenuContent className="left-0 translate-x-0">
                    <ul className="w-96 ">
                    <ListItem href="/docs" title="Introduction">
                        Re-usable components built with Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                        Styles for headings, paragraphs, lists...etc
                    </ListItem>
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/brands">Brands</Link>
                </NavigationMenuLink>
                </NavigationMenuItem>



                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                    <div className="relative">

                    <Link className="bg-transparent hover:bg-transparent" href="/wishlist"> 
                        <CiHeart/> 
                    </Link>

                    { whishlistItemsNum > 0 && <>
                        <span className="bg-red-500 text-white text-xs rounded-xl px-1 absolute top-0.5 right-0.5">
                            {whishlistItemsNum}
                        </span>
                    </> }


                    </div>

                </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                    <div className="relative">
                        <Link className="bg-transparent hover:bg-transparent" href="/cart">
                            <FaCartShopping/>
                        </Link>

                        {cartItemsNum > 0 && <>
                        <span className="bg-red-500 text-white text-xs rounded-xl px-1 absolute top-0.5 right-0.5">
                            {cartItemsNum}
                        </span>
                        </>}
                    </div>

                </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/brands"> <ImProfile/> </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

                {session.status === "unauthenticated" ? 
                <>
                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/login"> Login </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link className="bg-transparent hover:bg-transparent" href="/signup"> Signup </Link>
                </NavigationMenuLink>
                </NavigationMenuItem>

                </> :
                <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Button className="bg-black hover:bg-black" onClick={handelLogout}> Logout </Button>
                </NavigationMenuLink>
                </NavigationMenuItem>
                }





        </NavigationMenuList>
        </NavigationMenu>

        </>
    
    }

    function ListItem({
    title,
    children,
    href,
    ...props
    }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
        <NavigationMenuLink asChild>
            <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
                <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div>
            </Link>
        </NavigationMenuLink>
        </li>
    )
    
}
