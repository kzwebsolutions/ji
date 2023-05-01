import type {GetServerSideProps, NextPage} from 'next'
import {useContext, useEffect} from "react";
import Stripe from 'stripe';
import ProductCard from "../components/ProductCard";
import CartContext from "../components/context/CartContext";
import Header from "../components/Header";
import Bg from '../components/Bg';
import Footer from '../components/Footer';
import Bgg from '../components/Bgg';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
        apiVersion: '2020-08-27',
    });

    const res = await stripe.prices.list({
        limit: 10,
        expand: ['data.product']
    });

    const prices = res.data.filter(price => {
        return price.active;
    })

    return {
        props: {
            prices
        },
    }
}

type Props = {
    prices: Stripe.Price[]
}

const Home: NextPage<Props> = ({ prices}) => {
    
    return (
        
        <main className="bg-gray-100 bg-contain">
            
            <Header/>
            <Bg />
            <div className="max-w-5xl mx-auto py-8">
          
                <div className="flex items-center justify-between text-center border-b pb-3">
                    <h1 className="font-semibold tracking-wide text-center mx-auto leading-10 text-xl lg:text-3xl">
                        Shop Now
                    </h1>
                </div>
                <hr className='border-solid border-1 border-black'/>

                <div className="mt-8 grid grid-cols-2 gap-4 gap-y-12 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-3 xl:gap-x-8">
                    {
                        prices.map(p => (
                            <ProductCard key={p.id} price={p}/>
                        ))
                    }
                </div>
                
            </div>
            <hr className='border-solid border-1 border-black max-w-5xl mx-auto'/>
            <br />
            <Bgg />
            <Footer />
        </main>
    )
}

export default Home
