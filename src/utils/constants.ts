import { Search, ShoppingCart } from "lucide-react";

export const header = {
    logo: 'ecommerce',
    support: [
        {
            name: 'Help',
            link: '/',
            id: 10
        },
        {
            name: 'Orders & Returns',
            link: '/',
            id: 11
        },
    ],
    nav: [
        {
            name: 'Categories',
            link: '/',
            id: 1
        },
        {
            name: 'Sale',
            link: '/',
            id: 2
        },
        {
            name: 'Clearance',
            link: '/',
            id: 3
        },
        {
            name: 'New stock',
            link: '/',
            id: 4
        },
        {
            name: 'Trending',
            link: '/',
            id: 5
        },
    ],
    addtionalDetails: [
        {
            name: 'search',
            icon: Search,
            link: '/',
            id: 6
        },
        {
            name: 'Trending',
            icon: ShoppingCart,
            link: '/',
            id: 7
        },
    ]
}