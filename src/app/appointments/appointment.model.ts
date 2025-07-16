export interface Appointment {
    id: number;
    date: string;
    time: string;
    userId: number;
    available?: boolean;
}