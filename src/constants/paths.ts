class Paths {
  static TicketsPath = () => "/tickets";
  static HomePath = () => "/";
  static TicketPath = (id: string) => `/tickets/${id}`;
  static TicketEditPath = (id: string) => `/tickets/${id}/edit`;
  static LoginPath = () => "/login";
  static SignUpPath = () => "/signup";
  static ProfilePath = () => "/account/profile";
  static PasswordPath = () => "/account/password";

}

export default Paths;
