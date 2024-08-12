const CryptoJS = require("crypto-js");
const { jwtDecode } = require("jwt-decode");

const apiUrl = "http://127.0.0.1:3000";

async function login(email, password) {
    try {
        const encPassword = CryptoJS.AES.encrypt(
            password,
            "ride-buddy-aes-key"
        ).toString();
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password: encPassword }),
        });
        const data = await response.json();
        console.log(data);
        console.log("\n\n\n\n");
        if (response.ok) {
            return data.token;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function getUserIdByToken(token) {
    return jwtDecode(token).userId;
}

async function postRide(token, body) {
    const response = await fetch(`${apiUrl}/ride`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        return data.rideId;
    }
    return null;
}

async function bookRide(token, rideId, userId, seats) {
    const response = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            rideId,
            userId,
            seats,
        }),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
        return result;
    }
    return null;
}
let driverToken, passengerToken, rideId;
test("the booking should be successful", async () => {
    driverToken = await login("111@111.com", "111");
    passengerToken = await login("222@222.com", "222");
    console.log(driverToken, passengerToken);
    rideId = await postRide(driverToken, {
        origin: "Waterloo",
        destination: "Kitchener",
        departureTime: "2024-07-25T02:12:00.000Z",
        returnTime: "2024-07-25T03:12:00.000Z",
        travelDate: "2024-07-24",
        carModel: "RAV4",
        carType: "suv",
        carColor: "white",
        carYear: "2024",
        licensePlate: "123456",
        seatsNumber: "1",
        seatPrice: "3",
    });
    console.log("rideId: ", rideId);
    let result = await bookRide(
        passengerToken,
        rideId,
        getUserIdByToken(passengerToken),
        1
    );
    console.log(result);
    expect(result.message).toBe("ride booked successfully");
});

test("the booking should be failed", async () => {
    let result = await bookRide(
        passengerToken,
        rideId,
        getUserIdByToken(passengerToken),
        1
    );
    expect(result.message).toBe("Ride has already been booked");
});
