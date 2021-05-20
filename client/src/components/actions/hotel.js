import axios from 'axios';

export const createHotel = async (token, data) =>
    await axios.post(`/api/hotel`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
export const allHotels = async () =>
    await axios.get(`/api/viewhotels`);

export const vacayDates = (from, to) =>{
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from);
    const end = new Date(to);
    const toatlTime = Math.round(Math.abs((start - end ) / day));
    return toatlTime
}

// export const sellerHotels = async (token) => 
// await axios.get(`/api/sellerHotels`, {
//     headers:{
//         Authorization: `Bearer ${token}`,
//     }
// });