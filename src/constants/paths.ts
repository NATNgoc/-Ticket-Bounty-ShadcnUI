class Paths {
  static TicketsPath = () => "/tickets";
  static HomePath = () => "/";
  static TicketPath = (id: string) => `/tickets/${id}`;
}

export default Paths;
