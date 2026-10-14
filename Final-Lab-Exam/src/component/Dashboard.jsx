import { useState } from 'react';

const initialRooms = [
    { number: '101', type: 'Standard', floor: '1', capacity: '2', rate: '120', status: 'Available', description: 'A comfortable standard room with a courtyard view.' },
    { number: '204', type: 'Deluxe', floor: '2', capacity: '2', rate: '185', status: 'Occupied', description: 'Spacious room with a king bed and city view.' },
    { number: '305', type: 'Suite', floor: '3', capacity: '4', rate: '320', status: 'Available', description: 'Separate living area, king bed, and a private balcony.' },
    { number: '108', type: 'Standard', floor: '1', capacity: '2', rate: '120', status: 'Maintenance', description: 'Room temporarily unavailable for scheduled maintenance.' },
];

const emptyRoom = {
    number: '',
    type: 'Standard',
    floor: '',
    capacity: '2',
    rate: '',
    status: 'Available',
    description: '',
};

export default function Dashboard() {
    const [rooms, setRooms] = useState(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState(initialRooms[0]);
    const [isAddingRoom, setIsAddingRoom] = useState(false);
    const [newRoom, setNewRoom] = useState(emptyRoom);
    const [formError, setFormError] = useState('');

    const updateNewRoom = (event) => {
        const { name, value } = event.target;
        setNewRoom((room) => ({ ...room, [name]: value }));
        setFormError('');
    };

    const addRoom = (event) => {
        event.preventDefault();
        const roomNumber = newRoom.number.trim();

        if (rooms.some((room) => room.number.toLowerCase() === roomNumber.toLowerCase())) {
            setFormError('That room number is already in the inventory.');
            return;
        }

        const room = { ...newRoom, number: roomNumber };
        setRooms((currentRooms) => [room, ...currentRooms]);
        setSelectedRoom(room);
        setNewRoom(emptyRoom);
        setFormError('');
        setIsAddingRoom(false);
    };

    const availableRooms = rooms.filter((room) => room.status === 'Available').length;
    const occupiedRooms = rooms.filter((room) => room.status === 'Occupied').length;

    return (
        <section className="dashboard room-dashboard">
            <header className="room-page-header">
                <div>
                    <span className="room-eyebrow">PROPERTY OVERVIEW</span>
                    <h1>Room inventory</h1>
                    <p>Manage rooms, rates, and availability.</p>
                </div>
                <button
                    className="room-primary-button"
                    type="button"
                    onClick={() => setIsAddingRoom((isOpen) => !isOpen)}
                    aria-expanded={isAddingRoom}
                    aria-controls="add-room-form"
                >
                    <span aria-hidden="true">{isAddingRoom ? '×' : '+'}</span>
                    {isAddingRoom ? 'Close form' : 'Add room'}
                </button>
            </header>

            <div className="room-summary" aria-label="Room summary">
                <div className="room-summary-item">
                    <span className="summary-label">Total rooms</span>
                    <strong>{rooms.length}</strong>
                </div>
                <div className="room-summary-item">
                    <span className="summary-label">Available</span>
                    <strong>{availableRooms}</strong>
                </div>
                <div className="room-summary-item">
                    <span className="summary-label">Occupied</span>
                    <strong>{occupiedRooms}</strong>
                </div>
            </div>

            {isAddingRoom && (
                <form className="room-form" id="add-room-form" onSubmit={addRoom}>
                    <div className="room-form-heading">
                        <div>
                            <span className="room-eyebrow">NEW ENTRY</span>
                            <h2>Add a room</h2>
                        </div>
                    </div>
                    <div className="room-form-grid">
                        <label>
                            Room number
                            <input name="number" value={newRoom.number} onChange={updateNewRoom} required />
                        </label>
                        <label>
                            Room type
                            <select name="type" value={newRoom.type} onChange={updateNewRoom}>
                                <option>Standard</option>
                                <option>Deluxe</option>
                                <option>Suite</option>
                                <option>Family</option>
                            </select>
                        </label>
                        <label>
                            Floor
                            <input name="floor" type="number" min="0" value={newRoom.floor} onChange={updateNewRoom} required />
                        </label>
                        <label>
                            Guests
                            <input name="capacity" type="number" min="1" value={newRoom.capacity} onChange={updateNewRoom} required />
                        </label>
                        <label>
                            Rate per night ($)
                            <input name="rate" type="number" min="0" step="0.01" value={newRoom.rate} onChange={updateNewRoom} required />
                        </label>
                        <label>
                            Status
                            <select name="status" value={newRoom.status} onChange={updateNewRoom}>
                                <option>Available</option>
                                <option>Occupied</option>
                                <option>Maintenance</option>
                            </select>
                        </label>
                        <label className="room-description-field">
                            Description
                            <textarea name="description" rows="2" value={newRoom.description} onChange={updateNewRoom} placeholder="Add a short room description" />
                        </label>
                    </div>
                    {formError && <p className="room-form-error" role="alert">{formError}</p>}
                    <div className="room-form-actions">
                        <button className="room-secondary-button" type="button" onClick={() => setIsAddingRoom(false)}>Cancel</button>
                        <button className="room-primary-button" type="submit">Save room</button>
                    </div>
                </form>
            )}

            <div className="room-workspace">
                <section className="room-list-section" aria-labelledby="room-list-title">
                    <div className="room-section-heading">
                        <div>
                            <span className="room-eyebrow">ALL UNITS</span>
                            <h2 id="room-list-title">Rooms <span>{rooms.length}</span></h2>
                        </div>
                    </div>
                    <div className="room-table-wrap">
                        <table className="room-table">
                            <thead>
                                <tr>
                                    <th scope="col">Room</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Rate / night</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"><span className="visually-hidden">Room actions</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr className={selectedRoom?.number === room.number ? 'selected-room-row' : ''} key={room.number}>
                                        <td><strong>{room.number}</strong><span className="room-floor-label">Floor {room.floor}</span></td>
                                        <td>{room.type}</td>
                                        <td>${Number(room.rate).toFixed(2)}</td>
                                        <td><span className={`room-status status-${room.status.toLowerCase()}`}>{room.status}</span></td>
                                        <td>
                                            <button className="room-view-button" type="button" onClick={() => setSelectedRoom(room)} aria-label={`View room ${room.number}`}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <aside className="room-details" aria-labelledby="room-details-title">
                    {selectedRoom ? (
                        <>
                            <div className="room-details-topline">
                                <span className="room-eyebrow">ROOM DETAILS</span>
                                <span className={`room-status status-${selectedRoom.status.toLowerCase()}`}>{selectedRoom.status}</span>
                            </div>
                            <h2 id="room-details-title">Room {selectedRoom.number}</h2>
                            <p className="room-detail-type">{selectedRoom.type} room · Floor {selectedRoom.floor}</p>
                            <div className="room-rate-block">
                                <strong>${Number(selectedRoom.rate).toFixed(2)}</strong>
                                <span>per night</span>
                            </div>
                            <dl className="room-detail-list">
                                <div><dt>Maximum guests</dt><dd>{selectedRoom.capacity}</dd></div>
                                <div><dt>Room type</dt><dd>{selectedRoom.type}</dd></div>
                                <div><dt>Floor</dt><dd>{selectedRoom.floor}</dd></div>
                            </dl>
                            <div className="room-description">
                                <h3>About this room</h3>
                                <p>{selectedRoom.description || 'No description has been added.'}</p>
                            </div>
                        </>
                    ) : (
                        <p>Select a room to see its details.</p>
                    )}
                </aside>
            </div>
        </section>
    );
}