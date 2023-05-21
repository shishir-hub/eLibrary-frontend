import React from "react";

function Collection() {
  //   let myBooks = [{ title: "Ramayan" }, { title: "Mahabharat" }];
  let myBooks = [];
  return (
    <div className="Collextion">
      <div className="collection-wrapper">
        {myBooks.length !== 0 ? (
          <>
            <h1>My Books</h1>
          </>
        ) : (
          <>
            <h3>Your collection doesnot have any books.</h3>
            <button>Add Book</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Collection;
