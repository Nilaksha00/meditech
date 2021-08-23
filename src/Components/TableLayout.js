import React from "react";

function TableLayout() {
	return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>order ID</th>
                    <th>NIC</th>
                    <th>response</th>
                    <th>status</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableLayout;