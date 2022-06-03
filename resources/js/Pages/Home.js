import App from "@/Layouts/App";
import React from "react";

function Home(props) {
    return <div className="px-6 py-4">Start chat now . . .</div>;
}

Home.layout = (page) => <App children={page} title="Chatty App" />;

export default Home;
