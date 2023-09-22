import Link from 'next/link';

const Home = () => {
    return (
        <div className="overflow-y-hidden">
            <div className="mx-auto container">
                <div className="w-full flex pt-6 pl-4 pr-4 pb-4">
                    <div className="w-full xl:w-full bg-gradient-to-r from-sky-600 to-emerald-500 px-5 py-4 xl:px-12 xl:py-16 rounded-lg">
                        <div>
                            <div className="flex flex-wrap items-center md:flex-row flex-col-reverse">
                                <div className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                                    <div>
                                        <h1 role="heading" className="text-xl xl:text-5xl lg:w-10/12 text-white font-bold leading-6 lg:leading-10 md:text-left text-center">Live<span className="text-black">streaming</span> that keeps you ahead</h1>
                                    </div>
                                    <div className="mt-9"><Link href="/livestream" className="mt-8 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-gray-700 rounded-lg text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none">Stream Now</Link></div>
                                </div>
                                <div className="md:w-1/3 w-2/3">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/CTA.png" alt="cartoon avatars" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
