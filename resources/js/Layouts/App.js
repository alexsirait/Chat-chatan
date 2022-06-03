import { usePage, Head, Link } from "@inertiajs/inertia-react";
import React from "react";

function App({ children, title }) {
    console.info(usePage());
    const { users, auth } = usePage().props;
    return (
        <div className="flex min-h-screen bg-[#111827]">
            <Head title={title} />
            <div className="w-1/3">
                <div className="w-1/3 fixed h-full flex flex-col text-right px-6 py-4 border-r space-y-3">
                    <div className="flex-1 overflow-y-auto bg-[#111827]">
                        {users.map((user) => (
                            <Link
                                key={user.id}
                                href={route("chats.show", user.username)}
                                className={`block ${
                                    route().current("chats.show", user.username)
                                        ? "text-white font-bold"
                                        : "text-gray-400"
                                }`}
                            >
                                {user.name}
                            </Link>
                        ))}
                    </div>
                    <div className="rounded-xl p-4 space-y-3 bg-[#111827] border">
                        <div className="text-white">{auth.user.name}</div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="border bg-white font-medium text-black rounded-xl px-4 py-2"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-2/3">{children}</div>
        </div>
    );
}

export default App;
