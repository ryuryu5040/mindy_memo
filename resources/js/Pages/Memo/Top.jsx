import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from '@inertiajs/react';

const Top = (props) => {
    const { memos } = props;
    console.log(props);
    
    return (
        <Authenticated user={props.auth.user} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Top
                </h2>
            }>
            
            <div className="p-12">
                { memos.map((memo) => (
                    <div key ={memo.id}>
                        <h2>
                            <Link href={`/edit/${memo.id}`}>{ memo.title }</Link>
                        </h2>
                    </div>
                    
                )) }
            </div>
            
        </Authenticated>
        );
}

export default Top;
