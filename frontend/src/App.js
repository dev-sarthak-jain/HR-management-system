import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Chat, Products, About, SignIn, SignUp, EachTranscriptPage, Dashboard } from "./pages";
import Header from "./layout/Header";
import { ChatbotIcon } from "./components";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen overflow-hidden relative bg-[#353535]">
          <Header />

          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/chat/:transcriptID"
              element={<EachTranscriptPage />}
            />

            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />



            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <ChatbotIcon />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
