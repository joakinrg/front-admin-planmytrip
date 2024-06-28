import axios from "axios";

export const getTickets = async () => {
  try {
    const tickets = await axios.get(
      `${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/tickets/list`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return tickets.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTicket = async (id: string) => {
  try {
    const ticket = await axios.get(
      `${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/tickets/get/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return ticket.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
