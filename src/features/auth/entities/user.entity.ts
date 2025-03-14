import { Ticket } from "../../ticket/type";

export type User = {

    name: string;


    email: string;


    password: string;

    tickets: Ticket[];

    refreshToken: string;
}