import { createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/chat";

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <ChatPage />
    }
]);