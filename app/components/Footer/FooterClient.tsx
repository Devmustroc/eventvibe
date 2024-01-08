import Image from "next/image";
import {FaFacebookF, FaXTwitter} from "react-icons/fa6";
import {FiInstagram} from "react-icons/fi";
import Link from "next/link";

export const FooterClient = () => {
    return (
        <footer className="
                relative
                bg-blueGray-200
                pb-6 border-t-1
                 bottom-0
                "
        >
            <div className="
                        container
                        mx-auto
                        px-4">
                <div className="flex
                        flex-wrap
                        text-left
                        lg:text-left"
                >
                    <div className="w-full
                     lg:w-6/12
                      px-4"
                    >
                        <div className="
                        text-3xl
                        fonat-semibold
                        text-blueGray-700"
                        >
                            <Image
                                src="/images/logo1.png"
                                alt="logo"
                                width={200}
                                height={200}
                            />
                        </div>
                        <h5 className="text-lg
                                    mt-0 mb-2
                                    text-blueGray-600
                        ">
                            Share You Event with the world and let them know about it.
                        </h5>
                        <div className="mt-6
                                    lg:mb-0
                                    mb-6
                                    flex flex-row
                                     gap-8">
                            <div
                                className="text-blueGray-500
                                    hover:text-brand_secondary
                                     rounded-full ">
                                <FaXTwitter
                                    className="text-blueGray-500
                                     hover:text-brand_secondary"
                                    size={20}
                                />
                            </div>
                            <div
                                className="
                                text-blueGray-500
                                hover:text-brand_secondary"
                            >
                                <FaFacebookF
                                    className="
                                    text-blueGray-500
                                     hover:text-brand_secondary"
                                    size={20}
                                />
                            </div>
                            <div
                                className="
                                    text-blueGray-500
                                     hover:text-brand_secondary
                                 ">
                                <FiInstagram
                                    className="
                                    text-blueGray-500
                                    hover:text-brand_secondary
                                    "
                                    size={20}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="
                            w-full
                            lg:w-6/12
                            px-4"
                    >
                        <div className="
                                  flex
                                  flex-wrap
                                  items-top
                                  mb-6"
                        >
                            <div className="
                                    w-full
                                    lg:w-4/12
                                    px-4
                                    ml-auto"
                            >
                                <span
                                    className="
                                    block
                                    uppercase
                                     text-blueGray-500
                                     text-sm
                                     font-bold
                                     mb-2
                                     hover:text-brand_secondary"
                                >Useful Links</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link className="
                                            text-blueGray-600
                                            hover:text-blueGray-800
                                            font-semibold
                                            block pb-2 text-sm
                                             hover:text-brand_secondary"
                                           href="/privacy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="
                                                 text-blueGray-600
                                                 hover:text-blueGray-800
                                                 font-semibold block pb-2
                                                 text-sm
                                                 hover:text-brand_secondary"
                                            href='/terms'>Terms &amp; Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <span
                                    className="block
                                        uppercase
                                        text-blueGray-500
                                        text-sm font-bold
                                        mb-2
                                        hover:text-brand_secondary">Other Resources</span>
                                <ul className="list-unstyled">
                                    <li>
                                        <Link className="text-blueGray-600
                                         hover:text-blueGray-800
                                          font-semibold
                                          block
                                          pb-2 text-sm
                                          hover:text-brand_secondary"
                                           href="/contact-us">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link className="
                                        text-blueGray-600
                                         hover:text-blueGray-800
                                         font-semibold
                                         block
                                          pb-2 text-sm
                                           hover:text-brand_secondary"
                                           href="/faq">FAQ</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr
                    className="my-6 border-blueGray-300"/>
                <div
                    className="flex flex-wrap items-center md:justify-between justify-center">
                    <div
                        className="w-full md:w-4/12 px-4 mx-auto text-center gap-5">
                        <div
                            className="text-sm text-blueGray-500 font-semibold py-1">
                            Copyright ©
                            <span> 2024 </span>
                            <Link href="/"
                               className="text-blueGray-500 hover:text-gray-800" target="_blank">
                                 Event Vibe by </Link>
                            <Link href="https://github.com/Devmustroc"
                               className="text-blueGray-500 hover:text-blueGray-800">
                                Mustapha Abourar </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
