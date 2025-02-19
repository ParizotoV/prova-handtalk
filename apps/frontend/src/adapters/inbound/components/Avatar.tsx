import React from "react";
import "../../../styles/avatar.css";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  borderColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "medium",
  borderColor,
}) => {
  return (
    <div
      className={`avatar-container ${size}`}
      style={{ borderColor: borderColor || "transparent" }}
    >
      <img className={`avatar ${size}`} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
