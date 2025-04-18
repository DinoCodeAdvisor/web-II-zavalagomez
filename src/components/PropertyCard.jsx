import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import "../styles/components/PropertyCard.css";

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-link">
        <div className="property-image-wrapper">
          {/* SuperHost badge */}
          {property.superhost && (
            <span className="superhost-badge">
              Superhost
              <svg
                className="superhost-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </span>
          )}
          {/* Property image */}
          <img
            src={property.image}
            alt={property.title}
            className="property-image"
          />
        </div>
        {/* Property Content */}
        <div className="property-content">
          {/* Property Title  */}
          <div className="property-title-container">
            <h2 className="property-title">{property.title}</h2>
          </div>
          {/* Property Description  */}
          <h3 className="property-description">{property.description}</h3>
          {/* Property Rooms & Capacity */}
          <div className="property-details">
            <div>
              <FaHome className="property-details-icon" />
              <p>{property.capacity.bedroom}</p>
              BedRoom
            </div>
            <div>
              <FaUser className="property-details-icon" />
              <p>{property.capacity.people}</p>
              Guest
            </div>
          </div>
          {/* Divider */}
          <hr className="property-card-divider" />
          {/* Property Price and rating */}
          <div className="property-price-and-rating">
            <p className="property-price">${property.price}/night</p>
            <div className="property-rating">
              <svg
                className="property-rating-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="property-rating-value">{property.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
