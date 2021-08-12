import Head from "next/head";

export default function InternalError(){
    return (
        <div>
            <Head>
                <title>500 - something went wrong</title>
            </Head>

            <h2 className="font-light text-4xl mb-8">500 - something went wrong</h2>
        </div>
    )
}