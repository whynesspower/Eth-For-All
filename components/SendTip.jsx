import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import useSendTip from '@/hooks/useSendTip';
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@arcana/auth-react";

const SendTip = ({ isOpen, setIsOpen }) => {
    const [tipAmount, setTipAmount] = useState(0.0);
    const { signTransaction } = useSendTip();
    const auth = useAuth();
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        if (auth.isLoggedIn) {
            setWalletAddress(auth.user?.address);
            console.log("Address: ", auth.user?.address);
        }
    }, []);

    const closeModal = () => setIsOpen(false);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 backdrop-blur-lg" />
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-2xl mb-4 font-display font-medium leading-6 text-gray-100"
                            >
                                Send Tip
                                <button
                                    className="p-2 rounded-lg bg-white text-black hover:bg-gray-50 border border-transparent text-base text-clamp-surface-gray float-right"
                                    onClick={closeModal}>
                                    <FaTimes />
                                </button>
                            </Dialog.Title>
                            <p className="text-sm text-gray-400 font-display italic ">Receivers Address : 0xca0AAC84A57e239A2918E9537BCc3Ee29E24b6cd</p>
                            <div className="mt-4 flex flex-col">
                                <label className="mb-2 font-medium text-gray-300 text-sm">
                                    Tip Amount in MATIC
                                </label>
                                <input
                                    type="number"
                                    min="0.01"
                                    step={0.01}
                                    value={tipAmount}
                                    placeholder="0.01"
                                    className="rounded p-2"
                                    onChange={(e) => setTipAmount(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={(e) => signTransaction(tipAmount, walletAddress)}
                                    // className="w-full py-2  rounded-xl justify-center bg-emerald-500 group hover:bg-emerald-400"
                                    className="mt-4 ml-40 inline-flex px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-emerald-500 to-sky-600 rounded-lg"
                                >
                                    Send Tip
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default SendTip;
