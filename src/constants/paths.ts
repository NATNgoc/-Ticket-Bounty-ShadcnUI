class Paths {
  static TicketsPath = () => "/tickets";
  static HomePath = () => "/";
  static TicketPath = (id: string) => `/tickets/${id}`;
  static TicketEditPath = (id: string) => `/tickets/${id}/edit`;
}

export default Paths;
