"use client";
import { useEffect } from "react";

export default function Home() {
	const users = [
		{ userid: 1, profilephoto: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjurjRUF7t6gM0Yi_f76VWUHaBMQEj6Oi9Q0Ifd_TkJcoqbsE5XYefYHW_WpbYszrwsJunLWkNQxw8KhKQwUwJ63aMUU6S7Aq-AJcmIzaWoGpeeglby2y7_M8CpczYKn2gi8OaDeQTrfrdd3ox2i1rbSkV9hfOtrDtPkjmHZCly50JSlAeM8mv4V1t5/s4096/Sweden%20declares%20Sex%20as%20Sports%20CloudNine%20Sports.jpg" },
		{ userid: 2, profilephoto: "https://people.com/thmb/lLdPEmOpjN_JAUE7ZfVXnJyi2PU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/drake-sexxy-redd-071923-3-f8a6d4ca82a443d6ab67c1f5a080ac46.jpg" },
	];

	useEffect(() => {
		const analyzePhotos = async () => {
			try {
				const response = await fetch("/api/analyzePhotos", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ users }),
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const data = await response.json();
				console.log("Analysis results:", data.data);
			} catch (error) {
				console.log("Error analyzing photos:", error);
			}
		};

		analyzePhotos();
	}, []);

	return (
		<div>
			<h1>hello</h1>
		</div>
	);
}
