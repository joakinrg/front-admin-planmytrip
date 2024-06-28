import axios from "axios";

export const getUsers = async () => {
  try {
    const users = await axios.get(
      `
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/user/list
            `,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return users.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getSupportUsers = async () => {
  try {
    const users = await axios.get(
      `
                ${process.env.NEXT_PUBLIC_SUPPORT_BACKEND_URL}/user/list
                `,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return users.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
