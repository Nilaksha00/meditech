import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<div className='Sidebar'>
			<ul className='SidebarList'>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/home'
					activeClassName='active-nav'
					className='row'>
					Home
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/order'
					activeClassName='active-nav'
					className='row'>
					Orders
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/stock'
					activeClassName='active-nav'
					className='row'>
					Stock
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/invoice'
					activeClassName='active-nav'
					className='row'>
					Invoice
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/history'
					activeClassName='active-nav'
					className='row'>
					History
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/leaves'
					activeClassName='active-nav'
					className='row'>
					Leaves
				</NavLink>
				<NavLink
					style={{ textDecoration: "none" }}
					to='/salary'
					activeClassName='active-nav'
					className='row'>
					Salary
				</NavLink>
			</ul>
		</div>
	);
}

export default Sidebar;
