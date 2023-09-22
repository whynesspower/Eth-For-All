import { useState } from "react";
import { Auth, useAuth } from "@arcana/auth-react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";

const onLogin = () => {
    // Route to authenticated page
}

export default function Navbar() {
    const auth = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <nav class="fixed top-0 z-1 w-full bg-[#FFF] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center justify-start">
                            <div className="flex items-center gap-3">
                            <img src="/logo.svg" class="h-8" alt="StreamHub Logo" /> 
                                <h1 className="font-display font-bold text-2xl">StreamHub</h1>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="flex items-center ml-3">
                                <div className="flex gap-3 items-center">
                                    {auth.isLoggedIn ? (
                                        <button className="px-4 py-2 font-semibold font-headline text-white bg-black rounded text-lg"
                                            onClick={() => auth.logout()}>Logout</button>
                                    ) : (
                                        <button
                                            className="px-4 py-2 font-semibold font-headline text-white bg-black rounded text-lg"
                                            onClick={() => setModalOpen(true)}>
                                            Connect Wallet
                                        </button>
                                    )}
                                    <ReactModal
                                        isOpen={modalOpen}
                                        onRequestClose={() => setModalOpen(false)}
                                        ariaHideApp={false}
                                        style={{
                                            overlay: {
                                                background: "rgba(0, 0, 0, 0.200)",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            },
                                            content: {
                                                marginRight: "auto",
                                                marginLeft: "auto",
                                                width: "fit-content",
                                                height: "fit-content",
                                                padding: "0px",
                                                borderRadius: "16px"
                                            }
                                        }}
                                    >
                                        <button className="p-2 rounded-lg bg-white hover:bg-gray-100 border border-transparent float-right"
                                            onClick={() => { setModalOpen(false) }}
                                        >
                                            <FaTimes />
                                        </button>
                                        <Auth externalWallet={false} theme={"light"} onLogin={onLogin} />
                                    </ReactModal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    )
}