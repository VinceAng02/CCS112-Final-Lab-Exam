import { useEffect, useState } from 'react';
import { apiRequest } from '../api';

export default function HotelRoomInventory() {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        apiRequest('/rooms')
            .then((loadedRooms) => {
                if (isCurrent) {
                    setRooms(loadedRooms);
                }
            })
            .catch((requestError) => {
                if (isCurrent) {
                    setError(requestError.message);
                }
            })
            .finally(() => {
                if (isCurrent) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    return (
        <section className="dashboard room-dashboard">
            <header className="room-page-header">
                <div>
                    <span className="room-eyebrow">PROPERTY OVERVIEW</span>
                    <h1>Hotel rooms</h1>
                    <p>{rooms.length} rooms in inventory</p>
                </div>
            </header>
            {error && <p className="room-form-error" role="alert">Could not load rooms: {error}</p>}
            <div className="room-table-wrap">
                <table className="room-table">
                    <thead>
                        <tr>
                            <th scope="col">Room</th>
                            <th scope="col">Type</th>
                            <th scope="col">Guests</th>
                            <th scope="col">Rate / night</th>
                            <th scope="col">Status</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="6">Loading rooms...</td></tr>
                        ) : rooms.length === 0 ? (
                            <tr><td colSpan="6">No rooms have been added yet.</td></tr>
                        ) : rooms.map((room) => (
                            <tr key={room.id}>
                                <td><strong>{room.number}</strong><span className="room-floor-label">Floor {room.floor}</span></td>
                                <td>{room.type}</td>
                                <td>{room.capacity}</td>
                                <td>${Number(room.rate).toFixed(2)}</td>
                                <td><span className={`room-status status-${room.status.toLowerCase()}`}>{room.status}</span></td>
                                <td>{room.description || 'No description'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}