import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Mindy Memo" />
            <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
                {/* ヘッダーの右上リンク */}
                <div className="absolute top-6 right-6 space-x-4">
                    {auth.user ? (
                        <Link
                            href="/top"
                            className="font-semibold text-gray-700 dark:text-gray-300 hover:underline"
                        >
                            Top
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-700 dark:text-gray-300 hover:underline"
                            >
                                ログイン
                            </Link>
                            <Link
                                href={route("register")}
                                className="font-semibold text-gray-700 dark:text-gray-300 hover:underline"
                            >
                                新規登録
                            </Link>
                        </>
                    )}
                </div>

                {/* メインタイトルセクション */}
                <div className="text-center">
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800 dark:text-white mb-4 tracking-tight">
                        Mindy Memo
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                        自分の思考を、スタイリッシュに整理するメモアプリ。
                    </p>

                    {/* ボタン風リンク（未ログイン時） */}
                    {!auth.user && (
                        <div className="flex justify-center gap-4">
                            <Link
                                href={route("login")}
                                className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
                            >
                                ログイン
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-6 py-3 border border-gray-800 text-gray-800 dark:text-white dark:border-white rounded-md hover:bg-gray-800 hover:text-white transition"
                            >
                                新規登録
                            </Link>
                        </div>
                    )}

                    {auth.user && (
                        <div className="flex justify-center gap-4">
                            <Link
                                href={route("top")}
                                active={route().current("top")}
                                className="px-6 py-3 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
                            >
                                Top
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
