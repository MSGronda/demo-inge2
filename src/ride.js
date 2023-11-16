// RideComponent.js
import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./contexts/authcontext"; // Adjust the path as necessary
import { callApi } from "./api/api"; // Adjust the path as necessary
import {
    IconDice1Filled,
    IconDice2Filled,
    IconDice3Filled,
    IconDice4Filled,
    IconDice5Filled,
    IconDice6Filled,
} from "@tabler/icons-react";
import classNames from "classnames";
import ConfettiExplosion from "react-confetti-explosion";

const dices = [
    <IconDice1Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
    <IconDice2Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
    <IconDice3Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
    <IconDice4Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
    <IconDice5Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
    <IconDice6Filled
        size={32}
        className="aspect-square text-gray-500 m-auto"
    />,
];

const foo = {
    RideId: "IgsZk8e4RuJS9tapekAW5A",
    Unicorn: { Name: "Rocinante", Color: "Yellow", Gender: "Female" },
    Eta: "30 seconds",
    Rider: "elianparedes",
};

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const RideComponent = () => {
    const { accessToken } = useContext(AuthContext);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [rideInfo, setRideInfo] = useState(null);
    const [randomDice, setRandomDice] = useState(0);
    const [latitude, setLatitude] = useState(47.617475583566);
    const [longitude, setLongitude] = useState(-122.28837066650185);
    const [isExploding, setIsExploding] = useState(false);

    // 'fetchRideData' function is now accessible within 'useEffect' and 'onClick' handler
    const fetchRideData = async () => {
        try {
            if (accessToken) {
                const endpoint = `${API_BASE_URL}/ride`;
                const method = "POST";
                const body = {
                    PickupLocation: {
                        Latitude: latitude,
                        Longitude: longitude,
                    },
                };
                console.log(accessToken);
                const rideData = await callApi(
                    endpoint,
                    accessToken,
                    method,
                    body
                );
                console.log("Ride data:", rideData);
                setRideInfo(rideData);
            }
        } catch (error) {
            console.error("Failed to fetch ride data:", error);
            // Handle error here
        }
    };

    return (
        <div className="h-screen w-screen flex bg-gray-100">
            <div className="absolute left-1/2 top-8 -translate-x-1/2 bg-white shadow-md rounded-md px-6 py-4  w-[60vw]">
                <h1 className="text-2xl font-semibold mb-8">🦄 Get a ride</h1>
                <div className="flex space-x-4">
                    <div className="mt-auto">
                        <button
                            className="aspect-square h-16 flex duration-200"
                            onClick={() => {
                                setRandomDice(Math.floor(Math.random() * 6));

                                const randomLat = getRandomInRange(-90, 90, 12);
                                const randomLong = getRandomInRange(
                                    -180,
                                    180,
                                    12
                                );

                                setLatitude(randomLat);
                                setLongitude(randomLong);
                            }}
                        >
                            {dices[randomDice]}
                        </button>
                    </div>

                    <div className="w-full ml-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            Latitude
                        </h3>
                        <input
                            className="h-16 w-full text-gray-900 border border-gray-200 border-solid rounded-lg bg-gray-50 sm:text-md focus:ring-purple-500 focus:border-transparent focus:ring-2 duration-200 shadow-none hover:shadow-none selection:bg-purple-200"
                            type="text"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>

                    <div className="w-full ml-4">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">
                            Longitude
                        </h3>
                        <input
                            className="w-full h-16 text-gray-900 border border-gray-200 border-solid rounded-lg bg-gray-50 sm:text-md focus:ring-purple-500 focus:border-transparent focus:ring-2 duration-200 shadow-none hover:shadow-none selection:bg-purple-200"
                            type="text"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>

                    <button
                        className="ml-4 w-64 h-16 text-white bg-gradient-to-r from-purple-500 to-pink-500 focus:ring-2 focus:outline-none hover:hue-rotate-15 duration-200 ease-in-out font-bold rounded-lg text-sm text-center hover:shadow-none focus:ring-purple-500 mt-auto"
                        onClick={fetchRideData}
                    >
                        Get a Ride
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {rideInfo && (
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -200, opacity: 0 }}
                        className="m-auto bg-white shadow-xl flex rounded-lg relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-full align-middle justify-center flex">
                            <ConfettiExplosion
                                force={0.8}
                                duration={3000}
                                particleCount={250}
                                width={1600}
                            />
                        </div>

                        <div className="py-12 px-8">
                            <h3 className="text-lg text-gray-500 mb-2 ">
                                Ride ID
                            </h3>
                            <div className="text-gray-900 text-4xl">
                                {rideInfo.RideId}
                            </div>
                        </div>
                        <div className="bg-gray-300 w-[1px]"></div>
                        <div className="py-12 px-8">
                            <h3 className="text-lg text-gray-500 mb-2">
                                Unicorn
                            </h3>
                            <div className="flex">
                                <div className="text-gray-900 text-4xl font-normal">
                                    {rideInfo.Unicorn.Name}
                                </div>
                                <div
                                    class={classNames(
                                        "ml-4 w-[2.25rem] h-[2.25rem] rounded-full border-gray-300 border-spacing-6 border border-separate border-solid",
                                        rideInfo.Unicorn.Color === "white" ||
                                            rideInfo.Unicorn.Color === "black"
                                            ? `bg-${rideInfo.Unicorn.Color}`
                                            : `bg-${rideInfo.Unicorn.Color}-500`
                                    )}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-gray-300 w-[1px]"></div>
                        <div className="py-12 px-8">
                            <h3 className="text-lg text-gray-500 mb-2">ETA</h3>
                            <div className="text-gray-900 text-4xl font-normal">
                                {rideInfo.Eta}
                            </div>
                        </div>
                        <div className="bg-gray-300 w-[1px]"></div>
                        <div className="py-12 px-8">
                            <h3 className="text-lg text-gray-500 mb-2">
                                Rider
                            </h3>
                            <div className="text-gray-900 text-4xl font-normal">
                                @{rideInfo.Rider}
                            </div>
                        </div>
                        <div></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RideComponent;
