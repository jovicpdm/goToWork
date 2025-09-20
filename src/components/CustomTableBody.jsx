import React from "react";
import { CustomTableTr } from "./ClicableTr";

export const CustomTableBody = ({ data = [], isLoading }) => {
    const dataArray = Array.isArray(data) ? data : [];

    return (
        <tbody>
            {isLoading ? (
                <tr className="h-5 m-2 ">
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td class="px-4 py-2">
                        <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </td>
                </tr>
            ) : (
                dataArray.map((item) => (
                    <CustomTableTr key={item.id} data={item}>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.company}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">{item.source}</td>
                        <td className="px-4 py-2">{item.score}</td>
                        <td className="px-4 py-2">{item.status}</td>
                    </CustomTableTr>
                ))
            )}
        </tbody>
    );
};
