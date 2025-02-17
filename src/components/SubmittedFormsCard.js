import React from "react";

const SubmittedFormsCard = (props) => {
  return (
    <>
      <div class="card my-4">
        <div class="card-body">
          <h5 class="card-title">{props.company}</h5>
          <p class="card-text">
            {props.role}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Roll No - {props.roll}</li>
          <li class="list-group-item">Year - {props.year}</li>
          <li class="list-group-item">Branch - {props.branch}</li>
          <li class="list-group-item">Resume Link - {props.resume}</li>
        </ul>
        {/* <div class="card-body">
          <a href="#" class="card-link">
            Card link
          </a>
          <a href="#" class="card-link">
            Another link
          </a>
        </div> */}
      </div>
    </>
  );
};

export default SubmittedFormsCard;
