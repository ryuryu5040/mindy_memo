import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const Top = (props) => {
    const { memos } = props;

    return (
        <Authenticated
            user={props.auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Top
                    </h2>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
                        Create
                    </button>
                </div>
            }
        >
            <div className="p-6">
                {memos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {memos.map((memo) => (
                            <div
                                key={memo.id}
                                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    <Link
                                        href={`/edit/${memo.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {memo.title}
                                    </Link>
                                </h3>
                                {/* ここにメモの内容や日時なども追加できます */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">メモがまだありません。</p>
                )}
            </div>
        </Authenticated>
    );
};

export default Top;
