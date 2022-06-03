import App from "@/Layouts/App";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useRef, useState } from "react";

export default function Show({ user, chats }) {
    const { auth } = usePage().props;
 
    const [typing, setTyping] = useState(false);

    const { data, setData, reset, post, errors } = useForm({
        message: "",
    });

    const scrollRef = useRef(null);
    const messageRef = useRef(null);

    const sts = (x, y, option = "justify") => {
        if (option == "justify") {
            return x === y ? "justify-end" : "justify-start";
        }

        if (option == "background") {
            return x === y ? 'bg-green-100 text-green-900' : 'bg-gray-100 text-gray-900';
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("chats.store", user.username), {
            data,
            onSuccess: () => {
                reset("message");
                scrollRef.current.scrollTo(0, 99999999);
            },
        });
    };

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const onTyping = () => {
        setTimeout(() => {
            Echo.private(`chats.${user.uuid}`)
                .whisper('isTyping', { name: user.name });
        }, 500);
    }

    Echo.private('chats.' + auth.user.uuid)
        .listenForWhisper('isTyping', (e) => {
            setTyping(true)

            setTimeout(() => setTyping(false), 5000)
        })
        .listen('MessageSent', ({chat}) => {
            Inertia.reload({
                preserveScroll: true,
                onSuccess: () => {
                    scrollRef.current.scrollTo(0, 99999999);
                    setTyping(false);
                }
            });
        })

    useEffect(() => {
        scrollRef.current.scrollTo(0, 99999999)
        messageRef.current.focus()
    }, [])

    return (
        <div>
            <Head title={`Chat with ${user.name}`} />
            <div className="flex flex-col justify-between h-screen text-white">
                <div className="border-b p-4">
                    <h1 className="font-semibold">{user.name}</h1>
                    {
                        typing && <div className="text-xs text-gray-500">is typing . . .</div>
                    }
                </div>
                <div className="px-4 py-2 flex-1 overflow-y-auto space-y-2" ref={scrollRef}>
                    {chats.length ? (
                        chats.map((chat) => (
                            <div className={`flex text-sm ${sts(auth.user.id, chat.sender_id)}`} key={chat.id}>
                                <div className={`p-4 rounded-xl ${sts( auth.user.id, chat.sender_id, "background")}`}>
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500">start . . .</div>
                    )}
                </div>
                <div className="border-t px-4 py-2">
                    <form onSubmit={onSubmit}>
                        <input onKeyUp={onTyping} ref={messageRef} type="text" autoComplete="off" name="message" id="message" placeholder="Start Typeing" className="form-text w-full focus:outline-none focus:border-0 border-0 focus:ring-0 p-0 text-white bg-[#111827]" value={data.message} onChange={onChange} />
                    </form>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <App children={page} />;
