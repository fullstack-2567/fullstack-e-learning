// import { CreateUser } from "@/utils/backend-openapi";
// import axios from "axios";
// 
// export const createUser = async (user: User) => {
//     const response = await fetch(`${API_BASE_URL}/user`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         body: JSON.stringify(user),
//     });
// 
//     return response;
// }