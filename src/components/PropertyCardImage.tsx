import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function PropertyCardImage(props) {
  const postCode = props.Apartment.postCode;
  const apartmentId = props.Apartment.extra.apartmentId;

  console.log(apartmentId);

  return (
    <Link
      to={`/apartment/${props.currentUserId}/${apartmentId}/${postCode}`}
      className={props.className}
    >
      <div className="pictureCard">
        <img src={props.Apartment.imageUrl1} />
      </div>
    </Link>
  );
}

export default styled(PropertyCardImage)`
  .pictureCard {
    width: 250px;
    height: 250px;
    border: 1px solid lightgrey;
    border-radius: 20px;
  }

  img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
`;
