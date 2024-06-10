// "use client";
// import React, { useEffect, useState } from "react";
// import FiverrLogo from "./FiverrLogo";
// import Link from "next/link";
// import { IoSearchOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import axios from "axios";

// import ContextMenu from "./ContextMenu";
// import { getLoggedUser } from "@/actions/get-logged-user";
// import ComunityContext from "./ComunityContext";
// import { getAllComunity } from "@/actions/get-allcomunity";
// import SheetNotification from "./notification-sheet";
// import { Users } from "lucide-react";

// function Navbar() {
//   const router = useRouter();
//   const [navFixed, setNavFixed] = useState(true);
//   const [searchData, setSearchData] = useState("");
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [userInfo, setUserInfo] = useState<any>(null); // i nedd de type user wich in prisma
//   const [isSeller, setIsSeller] = useState(false);
//   const [load, setLoad] = useState(false);
//   const [comunity, setComunity] = useState<any>([]);

//   const handleLogin = () => {};

//   const handleSignup = () => {
//     router.push("/sign-in");
//   };

//   const links = [
//     { linkName: " Business", handler: "#", type: "link" },
//     { linkName: "Explore", handler: "#", type: "link" },
//     { linkName: "English", handler: "#", type: "link" },
//     { linkName: "Become a Seller", handler: "#", type: "link" },
//     { linkName: "Sign in", handler: handleLogin, type: "button" },
//     { linkName: "Join", handler: handleSignup, type: "button2" },
//   ];

//   // useEffect(() => {
//   //   if (router.pathname === "/") {
//   //     const positionNavbar = () => {
//   //       window.pageYOffset > 0 ? setNavFixed(true) : setNavFixed(false);
//   //     };
//   //     window.addEventListener("scroll", positionNavbar);
//   //     return () => window.removeEventListener("scroll", positionNavbar);
//   //   } else {
//   //     setNavFixed(true);
//   //   }
//   // }, [router.pathname]);

//   const handleOrdersNavigate = () => {
//     if (isSeller) router.push("/seller/orders");
//     else router.push("/buyer/orders");
//   };

//   const handleModeSwitch = () => {
//     setIsSeller((prev) => !prev);
//     if (isSeller) {
//       router.push("/buyer/orders");
//     } else {
//       router.push("/seller");
//     }
//   };

//   useEffect(() => {
//     const getUserInfo = async () => {
//       const user = await getLoggedUser();
//       setUserInfo(user);
//       setLoad(true);

//       setIsLoaded(true);
//     };
//     const getComunity = async () => {
//       const cc = await getAllComunity();
//       setComunity(cc);
//     };
//     getComunity();

//     getUserInfo();
//   }, [load]);
//   const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
//   const [iscommunityVisible, setIscomunityVisible] = useState(false);
//   useEffect(() => {
//     const clickListener = (e: any) => {
//       e.stopPropagation();

//       if (isContextMenuVisible) setIsContextMenuVisible(false);
//     };
//     if (isContextMenuVisible) {
//       window.addEventListener("click", clickListener);
//     }
//     return () => {
//       window.removeEventListener("click", clickListener);
//     };
//   }, [isContextMenuVisible]);
//   const ContextMenuData = [
//     {
//       name: "Profile",
//       callback: (e: any) => {
//         e.stopPropagation();

//         setIsContextMenuVisible(false);
//         router.push("/profile");
//       },
//     },
//     {
//       name: "Logout",
//       callback: (e: any) => {
//         e.stopPropagation();

//         setIsContextMenuVisible(false);
//         router.push("/logout");
//       },
//     },
//   ];

//   return (
//     <>
//       {isLoaded && (
//         <nav
//           className={`w-full px-24 flex justify-between items-center py-6  top-0 z-30 transition-all duration-300 ${
//             navFixed || userInfo
//               ? "fixed bg-white border-b border-gray-200"
//               : "absolute bg-transparent border-transparent"
//           }`}
//         >
//           <div>
//             <Link href="/">
//               {userInfo && (
//                 <FiverrLogo
//                   fillColor={!navFixed || !userInfo ? "#ffffff" : "#404145"}
//                 />
//               )}
//             </Link>
//           </div>
//           <div
//             className={`flex ${
//               navFixed || userInfo ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <input
//               type="text"
//               placeholder="What service are you looking for today?"
//               className="w-[30rem] py-2.5 px-4 border"
//               value={searchData}
//               onChange={(e) => setSearchData(e.target.value)}
//             />
//             <button
//               className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
//               onClick={() => {
//                 setSearchData("");
//                 router.push(`/search?q=${searchData}`);
//               }}
//             >
//               <IoSearchOutline className="fill-white text-white h-6 w-6" />
//             </button>
//           </div>
//           {!userInfo ? (
//             <ul className="flex gap-10 items-center">
//               {links.map(({ linkName, handler, type }) => {
//                 return (
//                   <li
//                     key={linkName}
//                     className={`${
//                       navFixed ? "text-black" : "text-white"
//                     } font-medium`}
//                   >
//                     {/* @ts-ignore */}
//                     {type === "link" && <Link href={handler}>{linkName}</Link>}
//                     {type === "button" && (
//                       <button
//                         onClick={() => {
//                           handler;
//                         }}
//                       >
//                         {linkName}
//                       </button>
//                     )}
//                     {type === "button2" && (
//                       <button
//                         onClick={() => {
//                           router.push("/signup");
//                         }}
//                         className={`border   text-md font-semibold py-1 px-3 rounded-sm ${
//                           navFixed
//                             ? "border-[#1DBF73] text-[#1DBF73]"
//                             : "border-white text-white"
//                         } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-500`}
//                       >
//                         {linkName}
//                       </button>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <ul className="flex gap-10 items-center">
//               {isSeller && (
//                 <>
//                   <li
//                     className="cursor-pointer text-[#1DBF73] font-medium"
//                     onClick={() => router.push("/seller/postuled-jobs")}
//                   >
//                     Postuled Jobs
//                   </li>
//                   <li
//                     className="cursor-pointer text-[#1DBF73] font-medium"
//                     onClick={() => router.push("/job-offer")}
//                   >
//                     Job Offers
//                   </li>

//                   <li
//                     className="cursor-pointer text-[#1DBF73] font-medium"
//                     onClick={() => router.push("/seller/gigs/create")}
//                   >
//                     Create Gig
//                   </li>
//                 </>
//               )}

//               {isSeller ? (
//                 <>
//                   <li
//                     className="cursor-pointer font-medium text-[#1DBF73]"
//                     onClick={handleModeSwitch}
//                   >
//                     Switch To client
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li
//                     className="cursor-pointer font-medium text-[#1DBF73]"
//                     onClick={() => router.push("/buyer/job-offers/create")}
//                   >
//                     Create Job Offer
//                   </li>
//                   <li
//                     className="cursor-pointer font-medium text-[#1DBF73]"
//                     onClick={() => router.push("/search")}
//                   >
//                     Gigs
//                   </li>
//                   <li
//                     className="cursor-pointer font-medium text-[#1DBF73]"
//                     onClick={handleModeSwitch}
//                   >
//                     Switch To Freelencer
//                   </li>
//                 </>
//               )}

//               <li
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIscomunityVisible(!iscommunityVisible);
//                 }}
//                 title="Comunity"
//               >
//                 <Users size={18} className="text-sky-600" />
//               </li>

//               <SheetNotification />
//               <li
//                 className="cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsContextMenuVisible(!isContextMenuVisible);
//                 }}
//                 title="Profile"
//               >
//                 {userInfo?.imageName ? (
//                   <Image
//                     src={userInfo.imageName}
//                     alt="Profile"
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                 ) : (
//                   <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
//                     <span className="text-xl text-white">
//                       {userInfo &&
//                         userInfo?.email &&
//                         userInfo?.email.split("")[0].toUpperCase()}
//                     </span>
//                   </div>
//                 )}
//               </li>
//             </ul>
//           )}

//           {iscommunityVisible && <ComunityContext data={comunity} />}
//           {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
//         </nav>
//       )}
//     </>
//   );
// }

// export default Navbar;
