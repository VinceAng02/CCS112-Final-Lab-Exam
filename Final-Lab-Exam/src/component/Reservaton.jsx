import { useEffect, useState } from 'react';
import { apiRequest } from '../api';

const emptyReservation = {
    room_id: '',
    guest_name: '',
    guest_email: '',
    check_in: '',
    check_out: '',
    guests: '1',
    status: 'Confirmed',
};

export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newReservation, setNewReservation] = useState(emptyReservation);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        Promise.all([apiRequest('/reservations'), apiRequest('/rooms')])
            .then(([loadedReservations, loadedRooms]) => {
                if (isCurrent) {
                    setReservations(loadedReservations);
                    setRooms(loadedRooms);
                    setNewReservation((current) => ({ ...current, room_id: String(loadedRooms[0]?.id || '') }));
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

    const updateReservation = (event) => {
        const { name, value } = event.target;
        setNewReservation((current) => ({ ...current, [name]: value }));
        setError('');
    };

    const addReservation = async (event) => {
        event.preventDefault();
        setError('');
        setIsSaving(true);

        try {
            const reservation = await apiRequest('/reservations', {
                method: 'POST',
                body: JSON.stringify({
                    ...newReservation,
                    room_id: Number(newReservation.room_id),
                    guests: Number(newReservation.guests),
                }),
            });

            setReservations((current) => [reservation, ...current]);
            setNewReservation({ ...emptyReservation, room_id: String(rooms[0]?.id || '') });
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <section className="dashboard room-dashboard">
            <header className="room-page-header">
                <div>
                    <span className="room-eyebrow">GUEST SERVICES</span>
                    <h1>Reservations</h1>
                    <p>{reservations.length} reservations</p>
                </div>
            </header>

            <form className="room-form" onSubmit={addReservation}>
                <div className="room-form-heading">
                    <div>
                        <span className="room-eyebrow">NEW BOOKING</span>
                        <h2>Add a reservation</h2>
                    </div>
                </div>
                <div className="room-form-grid">
                    <label>
                        Guest name
                        <input name="guest_name" value={newReservation.guest_name} onChange={updateReservation} required />
                    </label>
                    <label>
                        Guest email
                        <input name="guest_email" type="email" value={newReservation.guest_email} onChange={updateReservation} />
                    </label>
                    <label>
                        Room
                        <select name="room_id" value={newReservation.room_id} onChange={updateReservation} required disabled={rooms.length === 0}>
                            {rooms.length === 0 ? <option value="">No rooms available</option> : rooms.map((room) => (
                                <option key={room.id} value={room.id}>Room {room.number} - {room.type}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Check-in
                        <input name="check_in" type="date" value={newReservation.check_in} onChange={updateReservation} required />
                    </label>
                    <label>
                        Check-out
                        <input name="check_out" type="date" value={newReservation.check_out} onChange={updateReservation} required />
                    </label>
                    <label>
                        Guests
                        <input name="guests" type="number" min="1" value={newReservation.guests} onChange={updateReservation} required />
                    </label>
                </div>
                {error && <p className="room-form-error" role="alert">{error}</p>}
                {rooms.length === 0 && !isLoading && <p className="room-form-error">Add a room before creating a reservation.</p>}
                <div className="room-form-actions">
                    <button className="room-primary-button" type="submit" disabled={isSaving || rooms.length === 0}>
                        {isSaving ? 'Saving...' : 'Save reservation'}
                    </button>
                </div>
            </form>

            <div className="room-section-heading">
                <div>
                    <span className="room-eyebrow">BOOKING RECORDS</span>
                    <h2>All reservations <span>{reservations.length}</span></h2>
                </div>
            </div>
            <div className="room-table-wrap">
                <table className="room-table">
                    <thead>
                        <tr>
                            <th scope="col">Guest</th>
                            <th scope="col">Room</th>
                            <th scope="col">Check-in</th>
                            <th scope="col">Check-out</th>
                            <th scope="col">Guests</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="6">Loading reservations...</td></tr>
                        ) : reservations.length === 0 ? (
                            <tr><td colSpan="6">No reservations have been added yet.</td></tr>
                        ) : reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td><strong>{reservation.guest_name}</strong><span className="room-floor-label">{reservation.guest_email || 'No email'}</span></td>
                                <td>{reservation.room ? `Room ${reservation.room.number}` : `Room ${reservation.room_id}`}</td>
                                <td>{reservation.check_in}</td>
                                <td>{reservation.check_out}</td>
                                <td>{reservation.guests}</td>
                                <td>{reservation.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}