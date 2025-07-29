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
                        Create
                    </h2>
                </div>
            }
        >
            <h3>Input memo's title</h3>
            <form>
                <input></input>
            </form>
        </Authenticated>
    );
};

export default Top;
