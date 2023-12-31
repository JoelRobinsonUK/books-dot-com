import { Tooltip } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { faH, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../hooks/useAuthContext";

const BookPreview = ({ book }) => {
    const { user } = useAuthContext();
    return (
        <div
            key={book.key}
            className="mb-3 grid grid-cols-12 gap-3 rounded-lg bg-white p-2"
        >
            {book.isbn && (
                <div className="col-span-3">
                    <img
                        className="h-auto w-full"
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg?default=false`}
                        alt={`Cover for ${book.title}`}
                        onError={(e) => {
                            e.target.src = "https://placehold.co/180x240";
                        }}
                    />
                </div>
            )}
            <div className="col-span-9 flex flex-col gap-3">
                <div className="grow">
                    <h3 className="text-2xl">{book.title}</h3>
                    {book.author_name && (
                        <span>{book.author_name.join(", ")}</span>
                    )}
                </div>
                {user && (
                    <div className="flex justify-end gap-2">
                        <Tooltip title="Add Book">
                            <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-900 p-2 text-blue-900">
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add Book</span>
                            </button>
                        </Tooltip>
                        <Tooltip title="Wishlist">
                            <button className="flex items-center justify-center rounded-lg bg-blue-900 p-3 text-white">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookPreview;
