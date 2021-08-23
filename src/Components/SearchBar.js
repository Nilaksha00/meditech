import React from "react";

function Order() {
	return (
    <div class="wrap">
        <div class="search">
          <form action="/order" method="get">
            <input type="text" class="searchTerm" id="input_text" placeholder="Search"></input>
          </form>
        </div>
      </div>
  );
}

export default Order;